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
 */

"use strict";

import Parse from "parse/react-native";
import { Alert, ActionSheetIOS, Platform } from "react-native";
import { version } from "../env";

import type { Action, ThunkAction } from "./types";

function testPlainPush(): ThunkAction {
  return () => Parse.Cloud.run("test_push");
}

function testLinkPush(): ThunkAction {
  return () => Parse.Cloud.run("test_push", { url: "link" });
}

function testSessionPush(): ThunkAction {
  return () => Parse.Cloud.run("test_push", { url: "session" });
}

function testImagePush(): ThunkAction {
  return () => Parse.Cloud.run("test_push", { url: "image" });
}
function testVideoPush(): ThunkAction {
  return () => Parse.Cloud.run("test_push", { url: "video" });
}

function testSurveyPush(): ThunkAction {
  return () => Parse.Cloud.run("test_survey");
}

function testResetNuxes(): Action {
  return {
    type: "RESET_NUXES"
  };
}

function getAppInfo(): ThunkAction {
  return (dispatch, getState) => {
    const subject = `App v${version} state`;
    const message = JSON.stringify(getState(), undefined, 2);
    if (Platform.OS === "ios") {
      ActionSheetIOS.showShareActionSheetWithOptions(
        {
          subject: subject,
          message: message
        },
        () => {},
        () => {}
      );
    } else {
      Alert.alert(subject);
    }
  };
}

function testSetCurrentDate(value: ?number): Action {
  return {
    type: "SET_TIMED_TESTING",
    value
  };
}

const TEST_MENU = {
  "Request a push notification": testPlainPush,
  "Push with link": testLinkPush,
  "Push with session": testSessionPush,
  "Push with image": testImagePush,
  "Push with video": testVideoPush,
  "Request a survey": testSurveyPush,
  "Reset NUXes": testResetNuxes,
  "Get app info": getAppInfo,
  "Set current date: Day 1": _ => testSetCurrentDate(1),
  "Set current date: Day 2": _ => testSetCurrentDate(2),
  "Reset current date": _ => testSetCurrentDate(null)
};

module.exports = { TEST_MENU };
