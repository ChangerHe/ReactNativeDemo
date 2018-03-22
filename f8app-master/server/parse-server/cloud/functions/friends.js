"use strict";
/* global Parse */

Parse.Cloud.define("friends", function(request, response) {
  const user = request.user;
  if (!user) {
    return response.success([]);
  }
  if (!Parse.FacebookUtils.isLinked(user)) {
    return response.error("Current user is not linked to Facebook");
  }

  const authData = user.get("authData");
  const token = authData.facebook.access_token;
  // TODO: Fetch all friends using paging
  Parse.Cloud
    .httpRequest({
      url:
        "https://graph.facebook.com/me/friends?fields=id&access_token=" + token
    })
    .then(function(res) {
      const friendIds = res.data.data.map(function(friend) {
        return friend.id;
      });

      const query = new Parse.Query(Parse.User)
        .containedIn("facebook_id", friendIds)
        .ascending("name");

      return query
        .find({ useMasterKey: true })
        .then(function(users) {
          return Parse.Promise.when(users.map(fetchSchedule));
        })
        .then(function(friends) {
          return friends.filter(function(friend) {
            return friend !== null;
          });
        });
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

function fetchSchedule(user) {
  if (!user.get("sharedSchedule")) {
    return Parse.Promise.as(null);
  }
  // https://www.parse.com/questions/can-i-use-include-in-a-query-to-include-all-members-of-a-parserelation-error-102
  return user
    .relation("mySchedule")
    .query()
    .find({ useMasterKey: true })
    .then(function(sessions) {
      const schedule = {};
      sessions.forEach(function(session) {
        schedule[session.id] = true;
      });
      return {
        id: user.get("facebook_id"),
        name: user.get("name"),
        link: user.get("link"),
        schedule: schedule
      };
    });
}
