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

import F8Analytics from "../F8Analytics";
import type { Action } from "../actions/types";

function track(action: Action): void {
  switch (action.type) {
    case "LOGGED_IN":
      F8Analytics.logEvent("Login", 1, { source: action.source || "" });
      break;

    case "LOGGED_OUT":
      F8Analytics.logEvent("Logout", 1);
      break;

    case "SKIPPED_LOGIN":
      F8Analytics.logEvent("Skip login", 1);
      break;

    case "SESSION_ADDED":
      F8Analytics.logEvent("Added To Schedule", 1, { id: action.id });
      break;

    case "SESSION_REMOVED":
      F8Analytics.logEvent("Removed From Schedule", 1, { id: action.id });
      break;

    case "TURNED_ON_PUSH_NOTIFICATIONS":
      F8Analytics.logEvent("Enabled Push", 1);
      break;

    case "SKIPPED_PUSH_NOTIFICATIONS":
      F8Analytics.logEvent("Disabled Push", 1);
      break;

    case "SET_SHARING":
      F8Analytics.logEvent(
        action.enabled ? "Enabled Sharing" : "Disabled Sharing",
        1
      );
      break;

    case "APPLY_SCHEDULE_TOPICS_FILTER":
      F8Analytics.logEvent("Filtered Schedule", 1);
      break;

    case "APPLY_VIDEO_TOPICS_FILTER":
      F8Analytics.logEvent("Filtered Videos", 1);
      break;
  }
}

module.exports = track;
