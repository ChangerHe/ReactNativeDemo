/**
 * Copyright 2016 Facebook, Inc.
 *
 * You are hereby granted a non-exclusive, worldwide, royalty-free license to
 * use, copy, modify, and distribute this software in source code or binary
 * form for use in connection with the web services and APIs provided by
 * Facebook.
 *
 * As with any software that integrates with the Facebook platform, your use
 * of this software is subject to the Facebook Developer Principles and
 * Policies [http://developers.facebook.com/policy/]. This copyright notice
 * shall be included in all copies or substantial portions of the software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE
 *
 * @flow
 */

"use strict";

import Parse from "parse/react-native";
import { logError, InteractionManager } from "react-native";

import type { ThunkAction } from "./types";

const Maps = Parse.Object.extend("Maps");
const Notification = Parse.Object.extend("Notification");
const FAQ = Parse.Object.extend("FAQ");
const Page = Parse.Object.extend("Page");
const Video = Parse.Object.extend("Video");
const Policy = Parse.Object.extend("Policy");

function loadParseQuery(type: string, query: Parse.Query): ThunkAction {
  return dispatch => {
    return query.find({
      success: list => {
        // We don't want data loading to interfere with smooth animations
        InteractionManager.runAfterInteractions(() => {
          // Flow can't guarantee {type, list} is a valid action
          dispatch(({ type, list }: any));
        });
      },
      error: logError
    });
  };
}

function loadSessions(): ThunkAction {
  return loadParseQuery(
    "LOADED_SESSIONS",
    new Parse.Query("Agenda").include("speakers").ascending("startTime")
  );
}

function loadMaps(): ThunkAction {
  return loadParseQuery("LOADED_MAPS", new Parse.Query(Maps));
}

function loadNotifications(): ThunkAction {
  return loadParseQuery("LOADED_NOTIFICATIONS", new Parse.Query(Notification));
}

function loadFAQs(): ThunkAction {
  return loadParseQuery(
    "LOADED_FAQS",
    new Parse.Query(FAQ).ascending("updatedAt")
  );
}

function loadPages(): ThunkAction {
  return loadParseQuery(
    "LOADED_PAGES",
    new Parse.Query(Page).ascending("title")
  );
}

function loadVideos(): ThunkAction {
  return loadParseQuery(
    "LOADED_VIDEOS",
    new Parse.Query(Video).descending("updatedAt")
  );
}

function loadPolicies(): ThunkAction {
  return loadParseQuery(
    "LOADED_POLICIES",
    new Parse.Query(Policy).ascending("title")
  );
}

export {
  loadSessions,
  loadMaps,
  loadNotifications,
  loadFAQs,
  loadPages,
  loadVideos,
  loadPolicies
};
