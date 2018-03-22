"use strict";
/* global Parse */

const Agenda = Parse.Object.extend("Agenda"),
  UnmaskedAgenda = Parse.Object.extend("UnmaskedAgenda");

Parse.Cloud.job("unmaskAgenda", function(request, status) {
  let countTotal = 0,
    countUpdated = 0;
  // here we go
  new Parse.Query(UnmaskedAgenda)
    .limit(1000)
    .equalTo("unlocked", true)
    .find({ useMasterKey: true })
    .then(function(sessions) {
      return Parse.Promise.when(
        sessions.map(function(unmasked) {
          // get the total length for status result message
          if (countTotal !== sessions.length) {
            countTotal = sessions.length;
          }
          // find the matching session to update
          return new Parse.Query(Agenda)
            .get(unmasked.get("agenda").id, { useMasterKey: true })
            .then(function(masked) {
              // Throw if we got here despite an invalid result
              if (!masked) {
                throw new Error("No matching Agenda item to update!");
              }
              // ...or proceed to updating the fields
              const updates = {};
              if (unmasked.get("sessionSlug")) {
                updates.sessionSlug = unmasked.get("sessionSlug");
              }
              if (unmasked.get("sessionTitle")) {
                updates.sessionTitle = unmasked.get("sessionTitle");
              }
              if (unmasked.get("sessionDescription")) {
                updates.sessionDescription = unmasked.get("sessionDescription");
              }
              if (unmasked.get("ogImage")) {
                updates.ogImage = unmasked.get("ogImage");
              }
              if (unmasked.get("day")) {
                updates.day = unmasked.get("day");
              }
              if (unmasked.get("speakers")) {
                updates.speakers = unmasked.get("speakers");
              }
              if (unmasked.get("tags")) {
                updates.tags = unmasked.get("tags");
              }
              // update the Agenda item with unmasked data, or throw if it there's nothing
              const updatedFields = Object.keys(updates);
              if (updatedFields.length) {
                return masked.save(updates, { useMasterKey: true });
              } else {
                throw new Error("No new data!");
              }
            })
            .then(
              function(value) {
                countUpdated++;
                return value;
              },
              function(error) {
                console.log("Error / unmaskAgenda:", error);
                return error;
              }
            );
        })
      );
    })
    .then(
      function() {
        status.success(
          "Success! Unmasked " +
            countUpdated +
            " of " +
            countTotal +
            " sessions"
        );
      },
      function(error) {
        console.log("Error / unmaskAgenda:", error);
        status.error("Error! " + error.message);
      }
    );
});
