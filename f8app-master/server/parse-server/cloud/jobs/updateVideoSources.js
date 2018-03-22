"use strict";
/* global Parse */

const Video = Parse.Object.extend("Video"),
  GRAPH_BASE_URL = "https://graph.facebook.com/v2.8/",
  GRAPH_FIELDS_PARAM = "?fields=source", //,picture -> poor quality
  GRAPH_ACCESS_PARAM = "&access_token=" + process.env.FB_GRAPH_ACCESS_TOKEN;

Parse.Cloud.job("updateVideoSources", function(request, status) {
  let countTotal = "?";
  let countUpdated = 0;

  new Parse.Query(Video)
    .find({ useMasterKey: true })
    .then(function(videos) {
      return Parse.Promise.when(
        videos.map(function(video) {
          const fbid = video.get("facebookId");
          if (countTotal !== videos.length) {
            countTotal = videos.length;
          }
          return Parse.Cloud
            .httpRequest({
              url:
                GRAPH_BASE_URL + fbid + GRAPH_FIELDS_PARAM + GRAPH_ACCESS_PARAM
            })
            .then(
              function(response) {
                const data = response.data;
                let changed = false;
                // update the video source, if necessary
                if (data.source && data.source !== video.get("source")) {
                  video.set("source", data.source);
                  changed = true;
                }
                // update cover image, if necessary // BAD QUALITY
                // if(data.picture && data.picture !== video.get('image')){
                //   video.set('image', data.picture);
                //   changed = true;
                // }
                // save changes
                if (changed) {
                  countUpdated++;
                }
                return video.save(null, { useMasterKey: true });
              },
              function(error) {
                status.error(error);
              }
            );
        })
      );
    })
    .then(
      function() {
        status.success(
          "Success! Updated " + countUpdated + " of " + countTotal + " videos"
        );
      },
      function(error) {
        console.error(error);
        status.error("Error! " + error.message);
      }
    );
});
