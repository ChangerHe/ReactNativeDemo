"use strict";
/* global Parse */

const Demo = Parse.Object.extend("Demo"),
  UnmaskedDemo = Parse.Object.extend("UnmaskedDemo");

Parse.Cloud.job("unmaskDemo", function(request, status) {
  let countTotal = 0,
    countUpdated = 0; // for job status feedback

  new Parse.Query(UnmaskedDemo)
    .limit(1000)
    .equalTo("unlocked", true)
    .find({ useMasterKey: true })
    .then(function(demos) {
      return Parse.Promise.when(
        demos.map(function(unmasked) {
          // get the total length for status result message
          if (countTotal !== demos.length) {
            countTotal = demos.length;
          }
          // find the matching demo to update
          return new Parse.Query(Demo)
            .get(unmasked.get("demo").id, { useMasterKey: true })
            .then(function(masked) {
              // Throw if we got here despite an invalid result
              if (!masked) {
                throw new Error("No matching Demo item to update!");
              }
              // ...or proceed to updating the fields
              const updates = {};
              if (unmasked.get("title")) {
                updates.title = unmasked.get("title");
              }
              if (unmasked.get("description")) {
                updates.description = unmasked.get("description");
              }
              if (unmasked.get("links")) {
                updates.links = unmasked.get("links");
              }
              if (unmasked.get("location")) {
                updates.location = unmasked.get("location");
              }
              // update the Demo item with unmasked data, or throw if it there's nothing
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
                console.log("Error / unmaskDemo:", error);
                return error;
              }
            );
        })
      );
    })
    .then(
      function() {
        status.success(
          "Success! Unmasked " + countUpdated + " of " + countTotal + " demos"
        );
      },
      function(error) {
        console.log("Error / unmaskDemo:", error);
        status.error("Error! " + error.message);
      }
    );
});
