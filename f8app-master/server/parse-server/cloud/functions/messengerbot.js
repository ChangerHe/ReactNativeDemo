"use strict";
/* global Parse */

const Agenda = Parse.Object.extend("Agenda");

import CloudAuth from "../auth";

Parse.Cloud.define("mbot_get_schedule", function(request, response) {
  // require mbot permissions token (instead of master key)
  if (!CloudAuth.valid(CloudAuth.type.MessengerBot, request.params._token)) {
    return response.error("CloudAuth: Permission denied (mbot)");
  }
  // necessary for action
  if (!request.params.facebook_user_id) {
    return response.error("fb user id required");
  }

  // just in case passed as number
  const fbid = String(request.params.facebook_user_id);

  // do query
  new Parse.Query(Parse.User)
    .equalTo("facebook_id", fbid)
    .find({ useMasterKey: true })
    .then(function(users) {
      console.log("mbot found users", users);
      return Parse.Promise.when(users.map(fetchSchedule));
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
  // if (!user.get('sharedSchedule')) {
  //   return Parse.Promise.as(null);
  // }
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
        schedule: schedule
      };
    });
}

Parse.Cloud.define("mbot_add_to_schedule", function(request, response) {
  // require mbot permissions token (instead of master key)
  if (!CloudAuth.valid(CloudAuth.type.MessengerBot, request.params._token)) {
    return response.error("CloudAuth: Permission denied (mbot)");
  }
  // necessary for action
  if (!request.params.facebook_user_id || !request.params.session_id) {
    return response.error("fb user id and session id required");
  }

  // just in case passed as number
  const fbid = String(request.params.facebook_user_id);
  const sid = String(request.params.session_id);

  // do query
  new Parse.Query(Parse.User)
    .equalTo("facebook_id", fbid)
    .find({ useMasterKey: true })
    .then(function(users) {
      return Parse.Promise.when(
        users.map(function(user) {
          console.log("add to user schedule", user);
          user.relation("mySchedule").add(new Agenda({ id: sid }));
          return user.save(null, { useMasterKey: true });
          // removed installation channel updates as
          // it's now handled by afterSave Parse.User
        })
      );
    })
    .then(
      function(value) {
        response.success(true);
      },
      function(error) {
        response.error(error);
      }
    );
});

Parse.Cloud.define("mbot_remove_from_schedule", function(request, response) {
  // require mbot permissions token (instead of master key)
  if (!CloudAuth.valid(CloudAuth.type.MessengerBot, request.params._token)) {
    return response.error("CloudAuth: Permission denied (mbot)");
  }
  // necessary for action
  if (!request.params.facebook_user_id || !request.params.session_id) {
    return response.error("fb user id and session id required");
  }

  // just in case passed as number
  const fbid = String(request.params.facebook_user_id);
  const sid = String(request.params.session_id);

  // do query
  new Parse.Query(Parse.User)
    .equalTo("facebook_id", fbid)
    .find({ useMasterKey: true })
    .then(function(users) {
      return Parse.Promise.when(
        users.map(function(user) {
          console.log("remove from user schedule", user);
          user.relation("mySchedule").remove(new Agenda({ id: sid }));
          return user.save(null, { useMasterKey: true });
          // removed installation channel updates as
          // it's now handled by afterSave Parse.User
        })
      );
    })
    .then(
      function(value) {
        response.success(true);
      },
      function(error) {
        response.error(error);
      }
    );
});

Parse.Cloud.define("mbot_users_by_session", function(request, response) {
  // require mbot permissions token (instead of master key)
  if (!CloudAuth.valid(CloudAuth.type.MessengerBot, request.params._token)) {
    return response.error("CloudAuth: Permission denied (mbot)");
  }
  // necessary for action
  if (!request.params.session_id) {
    return response.error("session id required");
  }

  // just in case passed as number
  const sid = String(request.params.session_id);

  // do many queries
  new Parse.Query(Parse.User)
    .limit(1000) // TODO: paginate/chunk results!
    .find({ useMasterKey: true })
    .then(function(users) {
      return Parse.Promise.when(
        users.map(function(user) {
          return hasSavedSession(user, sid);
        })
      );
    })
    .then(
      function(value) {
        const filtered = [];
        value.forEach(function(u) {
          if (u !== null) {
            filtered.push({
              id: u.id,
              name: u.get("name"),
              facebook_id: u.get("facebook_id")
            });
          }
        });
        response.success(filtered);
      },
      function(error) {
        response.error(error);
      }
    );
});

function hasSavedSession(user, sid) {
  // if (!user.get('sharedSchedule')) {
  //   return Parse.Promise.as(null);
  // }
  return user
    .relation("mySchedule")
    .query()
    .find({ useMasterKey: true })
    .then(function(sessions) {
      let userSavedSession = false;
      sessions.forEach(function(session) {
        if (session.id === sid) {
          userSavedSession = true;
        }
      });
      return userSavedSession ? user : null;
    });
}
