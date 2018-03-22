"use strict";
/* global Parse */

const Video = Parse.Object.extend("Video");

Parse.Cloud.afterSave(Video, function(request) {
  if (request.object.existed()) {
    // skip this if it's an update to an existing object
    return;
  }
  // request up-to-date video source url from Graph API
  // see ../jobs/updateVideoSources.js
  return Parse.Cloud
    .httpRequest({
      method: "POST",
      url: process.env.PARSE_SERVER_URL + "/jobs/updateVideoSources",
      headers: {
        "X-Parse-Application-Id": process.env.PARSE_APP_ID,
        "X-Parse-Master-Key": process.env.PARSE_MASTER_KEY
      }
    })
    .then(
      function(value) {
        console.log("Video.afterSave success!", value);
      },
      function(error) {
        console.log("Video.afterSave error!", error);
      }
    );
});
