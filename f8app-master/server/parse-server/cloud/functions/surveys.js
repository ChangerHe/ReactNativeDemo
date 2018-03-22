"use strict";
/* global Parse */

const Agenda = Parse.Object.extend("Agenda");
const Attendance = Parse.Object.extend("Attendance");
const Survey = Parse.Object.extend("Survey");
const SurveyResult = Parse.Object.extend("SurveyResult");

import CloudAuth from "../auth";

Parse.Cloud.define("send_surveys", function(request, response) {
  if (!CloudAuth.valid(CloudAuth.type.PushConsole, request.params._token)) {
    return response.error("CloudAuth: Permission denied (push)");
  }

  const sessionId = request.params.sessionId;
  if (!sessionId) {
    return response.error("Need sessionId");
  }

  console.log("Fetching attendees for " + sessionId);
  const agenda = new Agenda({ id: sessionId });
  const attendees = new Parse.Query(Attendance)
    .equalTo("agenda", agenda)
    .notEqualTo("sent", true)
    .find({ useMasterKey: true });
  const survey = new Parse.Query(Survey)
    .equalTo("session", agenda)
    .first({ useMasterKey: true });

  Parse.Promise
    .when(attendees, survey, new Parse.Query(Agenda).get(sessionId))
    .then(sendSurveys)
    .then(
      function(value) {
        response.success(value);
      },
      function(error) {
        response.error(error);
      }
    );
});

Parse.Cloud.define("surveys", function(request, response) {
  // Parse.Cloud.useMasterKey();

  const user = request.user;
  if (!user) {
    return response.success([]);
  }

  new Parse.Query(SurveyResult)
    .equalTo("user", user)
    .equalTo("rawAnswers", null)
    .include("survey")
    .include("survey.session")
    .include("survey.questions")
    .find({ useMasterKey: true })
    .then(toSurveys)
    .then(
      function(value) {
        response.success(value);
      },
      function(error) {
        response.error(error);
      }
    );
});

Parse.Cloud.define("submit_survey", function(request, response) {
  // Parse.Cloud.useMasterKey();

  const user = request.user;
  if (!user) {
    return response.error({ message: "Not logged in" });
  }

  const params = request.params;
  if (!params.id || !params.answers) {
    return response.error({ message: "Need id and answers" });
  }

  new Parse.Query(SurveyResult)
    .equalTo("user", user)
    .equalTo("objectId", params.id)
    .find({ useMasterKey: true })
    .then(function(results) {
      if (results.length === 0) {
        throw new Error("No user/id combination found");
      }
      return results[0].save(
        {
          // a1: params.answers[0],
          // a2: params.answers[1],
          rawAnswers: JSON.stringify(params.answers)
        },
        { useMasterKey: true }
      );
    })
    .then(
      function(value) {
        response.success(value);
      },
      function(error) {
        response.error(error);
      }
    );
});

function sendSurveys(attendees, survey, session) {
  if (!survey) {
    throw new Error("Survey not found for session " + session.id);
  }

  console.log("Found " + attendees.length + " attendees");
  return Parse.Promise
    .when(
      attendees.map(function(record) {
        const user = record.get("user");
        return new SurveyResult()
          .save(
            {
              user: user,
              survey: survey
            },
            { useMasterKey: true }
          )
          .then(function() {
            return Parse.Push.send(
              {
                where: new Parse.Query(Parse.Installation).equalTo(
                  "user",
                  user
                ),
                data: {
                  badge: "Increment",
                  alert: 'How was "' + session.get("sessionTitle") + '"?',
                  e: true, // ephemeral
                  sound: "default"
                }
              },
              { useMasterKey: true }
            );
          })
          .then(function() {
            return record.save({ sent: true });
          });
      })
    )
    .then(function() {
      return arguments.length;
    });
}

function toSurveys(emptyResults) {
  return emptyResults.map(function(emptyResult) {
    const survey = emptyResult.get("survey");
    return {
      id: emptyResult.id,
      sessionId: survey.get("session").id,
      description: survey.get("description"),
      questions: survey.get("questions").get("questions"),
      time: emptyResult.createdAt.getTime()
    };
  });
}
