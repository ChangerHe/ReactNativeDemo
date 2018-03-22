"use strict";

/* global Parse */

import CloudAuth from "../auth";

const Notification = Parse.Object.extend("Notification"); // Done: make real
const PendingNotifications = Parse.Object.extend("PendingNotifications");

Parse.Cloud.define("send_push_by_channel", function(request, response) {
  // gate request by cc push token
  if (!CloudAuth.valid(CloudAuth.type.PushConsole, request.params._token)) {
    return response.error("CloudAuth: Permission denied (push)");
  }

  // data and channels required
  if (!request.params.data || !request.params.channels) {
    return response.error("Error: missing required params");
  }

  const pushData = request.params.data;
  pushData.badge = "Increment";
  pushData.sound = "default";

  Parse.Push
    .send(
      {
        // channels: ['developer'], // DONE: remove scoping
        channels: request.params.channels, // DONE: remove scoping
        data: pushData
      },
      { useMasterKey: true }
    )
    // return a success or error response
    .then(
      function(value) {
        response.success(value);
      },
      function(error) {
        response.error(error);
      }
    );
});

Parse.Cloud.define("send_pending_notification", function(request, response) {
  // gate request by cc push token
  if (!CloudAuth.valid(CloudAuth.type.PushConsole, request.params._token)) {
    return response.error("CloudAuth: Permission denied (push)");
  }
  // require an id in request body
  if (!request.params.id) {
    return response.error("Error: pending id required");
  }

  // get the corresponding PendingNotification based on request's id param
  new Parse.Query(PendingNotifications)
    .get(request.params.id, { useMasterKey: true })
    .then(function(pending) {
      // Check if anything was found
      if (!pending) {
        throw new Error("No pending notification found");
      }

      // create a new notificatoin based on pending data
      return new Notification().save(
        {
          text: pending.get("text"),
          url: pending.get("url"),
          urlTitle: pending.get("urlTitle"),
          image: pending.get("image")
        },
        { useMasterKey: true }
      );
    })
    .then(function(notif) {
      // after creating the notification object, send to users
      return Parse.Push.send(
        {
          // channels: ['developer'], // TODO: remove scoping
          where: {}, // TODO: replace dev channel with empty query
          data: {
            alert: notif.get("text"),
            url: notif.get("url"),
            urlTitle: notif.get("urlTitle"),
            image: notif.get("image"),

            badge: "Increment",
            sound: "default"
          }
        },
        { useMasterKey: true }
      );
    })
    // return a success or error response
    .then(
      function(value) {
        response.success(value);
      },
      function(error) {
        response.error(error);
      }
    );
});
