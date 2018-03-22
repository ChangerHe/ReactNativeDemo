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

import type { Action } from "./types";

type Schedule = { [key: string]: boolean };
type Video = { [key: string]: boolean };

function applyScheduleFilter(scheduleTopics: Schedule): Action {
  return {
    type: "APPLY_SCHEDULE_TOPICS_FILTER",
    scheduleTopics
  };
}

function clearScheduleFilter(): Action {
  return {
    type: "CLEAR_SCHEDULE_FILTER"
  };
}

function applyVideoFilter(videoTopics: Video): Action {
  return {
    type: "APPLY_VIDEO_TOPICS_FILTER",
    videoTopics
  };
}

function clearVideoFilter(): Action {
  return {
    type: "CLEAR_VIDEO_FILTER"
  };
}

module.exports = {
  applyScheduleFilter,
  clearScheduleFilter,
  applyVideoFilter,
  clearVideoFilter
};
