"use strict";
/* global Parse */

const Meetups = Parse.Object.extend("Meetups");
const Sponsors = Parse.Object.extend("MeetupSponsors");

Parse.Cloud.define("meetups", function(request, response) {
  const meetupsQuery = new Parse.Query(Meetups);
  const sponsorsQuery = new Parse.Query(Sponsors);

  function queryMeetups() {
    return new Promise(function(resolve, reject) {
      meetupsQuery.find({
        success: function(results) {
          resolve(results);
        },
        useMasterKey: true
      });
    });
  }

  function querySponsors() {
    return new Promise(function(resolve, reject) {
      sponsorsQuery.find({
        success: function(results) {
          resolve(results);
        },
        useMasterKey: true
      });
    });
  }

  Parse.Promise.when([queryMeetups(), querySponsors()]).then(
    function(results) {
      response.success(results);
    },
    function(error) {
      response.error(error);
    }
  );
});
