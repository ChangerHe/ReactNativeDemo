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

import * as parseActions from "./parse";
import * as navigationActions from "./navigation";
import * as loginActions from "./login";
import * as scheduleActions from "./schedule";
import * as filterActions from "./filter";
import * as notificationActions from "./notifications";
import * as configActions from "./config";
import * as surveyActions from "./surveys";
import * as testActions from "./test";
import * as installationActions from "./installation";
import * as videoActions from "./video";

module.exports = {
  ...loginActions,
  ...scheduleActions,
  ...filterActions,
  ...notificationActions,
  ...configActions,
  ...surveyActions,
  ...testActions,
  ...parseActions,
  ...navigationActions,
  ...installationActions,
  ...videoActions
};
