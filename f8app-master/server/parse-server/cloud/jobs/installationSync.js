"use strict";
/* global Parse */

Parse.Cloud.job("installationSync", function(request, status) {
  // Parse.Cloud.useMasterKey();
  let counter = 0;

  new Parse.Query(Parse.Installation)
    .get({ useMasterKey: true })
    .each(function(installation) {
      return findUserChannels(installation.get("user")).then(function(
        channels
      ) {
        counter++;
        if (counter % 10 === 0) {
          status.message(counter + " installations processed.");
        }
        installation.set("channels", channels);
        return installation.save(null, { useMasterKey: true });
      });
    })
    .then(
      function() {
        status.success("Sync finished successfully");
      },
      function(error) {
        console.error(error);
        status.error("Error! " + error.message);
      }
    );
});

function findUserChannels(user) {
  if (!user) {
    return Parse.Promise.as([]);
  }

  return user
    .relation("mySchedule")
    .query()
    .select(["id"])
    .find({ useMasterKey: true })
    .then(function(schedule) {
      return schedule.map(function(s) {
        return "session_" + s.id;
      });
    });
}
