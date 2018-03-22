"use strict";
/* global Parse */

Parse.Cloud.afterSave(Parse.User, function(request) {
  //   Parse.Cloud.useMasterKey();
  const installationsQ = new Parse.Query(Parse.Installation)
    .equalTo("user", request.object)
    .find({ useMasterKey: true });
  const scheduleQ = request.object
    .relation("mySchedule")
    .query()
    .select(["id"])
    .find({ useMasterKey: true });
  Parse.Promise
    .when(installationsQ, scheduleQ)
    .then(function(installations, schedule) {
      console.log(
        "Found " +
          installations.length +
          " installations and " +
          schedule.length +
          " sessions in schedule"
      );
      const sessionIds = schedule.map(function(s) {
        return "session_" + s.id;
      });
      console.log(sessionIds);
      return Parse.Promise.when(
        installations.map(function(installation) {
          installation.set("channels", sessionIds);
          return installation.save(null, { useMasterKey: true });
        })
      );
    })
    .then(
      function() {
        console.log("Updated " + arguments.length + " installations");
      },
      function(errors) {
        if (Array.isArray(errors)) {
          for (let i = 0; i < errors.length; i++) {
            console.error(
              "Error! #" + i + " " + errors[i].message || errors[i]
            );
          }
        } else {
          console.error("Error! " + errors.message || errors);
        }
      }
    );
});

Parse.Cloud.beforeSave(Parse.Installation, function(request, response) {
  const installation = request.object;
  const user = installation.get("user");
  if (installation.dirtyKeys().indexOf("user") === -1) {
    response.success();
    return;
  }

  if (user) {
    console.log("Set user, will fetch sessions");
    user
      .relation("mySchedule")
      .query()
      .select(["id"])
      .find({ useMasterKey: true })
      .then(function(schedule) {
        const sessionIds = schedule.map(function(s) {
          return "session_" + s.id;
        });
        installation.set("channels", sessionIds);
        console.log(
          "Updated channels to " + installation.get("channels").join(", ")
        );
        response.success();
      });
  } else {
    console.log("No user, will empty channels");
    installation.set("channels", []);
    response.success();
  }
});
