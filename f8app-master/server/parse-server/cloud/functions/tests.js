"use strict";
/* global Parse */

const Survey = Parse.Object.extend("Survey");
const SurveyResult = Parse.Object.extend("SurveyResult");

Parse.Cloud.define("test_push", function(request, response) {
  // Parse.Cloud.useMasterKey();

  const user = request.user;
  if (!user) {
    return response.error({ message: "Not logged in" });
  }

  const query = new Parse.Query(Parse.Installation);
  query.equalTo("user", user);

  const userName = user.get("name").split(" ")[0];
  let data;
  if (request.params.url === "link") {
    data = {
      alert: "Hey " + userName + ", check out this great website",
      url: "https://www.fbf8.com/",
      urlTitle: "Facebook Developer Conference"
    };
  } else if (request.params.url === "image") {
    data = {
      alert: "Hey " + userName + ", F8 shared a photo!",
      image:
        "https://scontent-lga3-1.xx.fbcdn.net/v/t31.0-0/q88/c239.0.1198.630/s526x296/14480488_10154024657733553_686849147673384434_o.jpg?oh=57be4988e732a1df38b86356888a7138&oe=590EDE1D"
    };
  } else if (request.params.url === "video") {
    data = {
      alert: "Hey " + userName + ", F8 shared a video!",
      urlTitle: "Watch 2016 highlights",
      url: "https://developers.facebook.com/videos/f8-2016/f8-2016-highlights/",
      image:
        "https://scontent-lga3-1.xx.fbcdn.net/v/t31.0-0/q88/c239.0.1198.630/s526x296/14480488_10154024657733553_686849147673384434_o.jpg?oh=57be4988e732a1df38b86356888a7138&oe=590EDE1D"
    };
  } else if (request.params.url === "session") {
    data = {
      alert:
        userName +
        ', "The Evolution of React and GraphQL at Facebook and Beyond" is about to begin',
      url: "f8://KvqMttRNBG"
    };
  } else {
    data = {
      alert: "Test notification for " + userName
    };
  }

  data.badge = "Increment";

  Parse.Push
    .send(
      {
        where: query,
        push_time: new Date(Date.now() + 3000),
        badge: "Increment",
        data: data
      },
      { useMasterKey: true }
    )
    .then(
      function() {
        response.success([]);
      },
      function(error) {
        response.error(error);
      }
    );
});

Parse.Cloud.define("test_survey", function(request, response) {
  // Parse.Cloud.useMasterKey();

  const user = request.user;
  if (!user) {
    return response.error({ message: "Not logged in" });
  }

  new Parse.Query(Survey)
    .include(["session", "questions"])
    .find({ useMasterKey: true })
    .then(pickRandom)
    .then(function(survey) {
      console.log(survey);
      const sessionTitle = survey.get("session").get("sessionTitle");
      return new SurveyResult()
        .save({ user: user, survey: survey }, { useMasterKey: true })
        .then(function() {
          return Parse.Push.send(
            {
              where: new Parse.Query(Parse.Installation).equalTo("user", user),
              push_time: new Date(Date.now() + 3000),
              data: {
                badge: "Increment",
                alert: 'How did "' + sessionTitle + '" go?',
                e: true // ephemeral
              }
            },
            { useMasterKey: true }
          );
        });
    })
    .then(
      function() {
        response.success([]);
      },
      function(error) {
        response.error(error);
      }
    );
});

function pickRandom(list) {
  if (list.length === 0) {
    throw new Error("Can not pick random item from empty list");
  }
  const index = Math.floor(Math.random() * list.length);
  return list[index];
}

Parse.Cloud.define("test_attendance", function(request, response) {
  const Agenda = Parse.Object.extend("Agenda");
  new Parse.Query(Agenda)
    .select(["id", "sessionTitle"])
    .find({ useMasterKey: true })
    .then(function(agendas) {
      return Parse.Promise.when(
        agendas.map(function(agenda) {
          return new Parse.Query(Parse.User)
            .equalTo("attendance", agenda)
            .find(function(users) {
              console.log(
                "Users attending " +
                  agenda.get("sessionTitle") +
                  ": " +
                  users.length
              );
            });
        })
      );
    })
    .then(
      function() {
        response.success([]);
      },
      function(error) {
        response.error(error);
      }
    );
});
