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

import moment from "moment-timezone";
import React from "react";
import { View, StyleSheet } from "react-native";
import F8Colors from "../../common/F8Colors";

/* constants ================================================================ */
const NOW_MARKER_DOT = 6,
  NOW_MARKER_LINE = 1,
  LABELS_HEIGHT = 22;

/* =============================================================================
<F8GanttNowMarker />
============================================================================= */

export default class F8GanttNowMarker extends React.Component {
  render() {
    const { nowTime, startTime, endTime, containerWidth } = this.props;

    const mNow = moment.utc(nowTime),
      mDayStart = moment.utc(startTime),
      mDayEnd = moment.utc(endTime);

    const minutesTotalDayLength = mDayEnd.diff(mDayStart, "minutes"),
      minutesSinceStartOfDay = mNow.diff(mDayStart, "minutes");

    const pos =
      containerWidth / minutesTotalDayLength * minutesSinceStartOfDay -
      NOW_MARKER_DOT / 2;

    return (
      <View style={[styles.container, { left: pos }]}>
        <View style={styles.line} />
        <View style={styles.dot} />
      </View>
    );
  }
}

/* Styles
============================================================================= */
const styles = StyleSheet.create({
  container: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: LABELS_HEIGHT,
    width: NOW_MARKER_DOT,
    backgroundColor: "transparent"
  },
  line: {
    position: "absolute",
    width: NOW_MARKER_LINE,
    left: NOW_MARKER_DOT / 2 - NOW_MARKER_LINE / 2,
    top: 0,
    bottom: NOW_MARKER_DOT / 2,
    backgroundColor: F8Colors.white
  },
  dot: {
    position: "absolute",
    width: NOW_MARKER_DOT,
    height: NOW_MARKER_DOT,
    borderRadius: NOW_MARKER_DOT / 2,
    bottom: 0,
    left: 0,
    backgroundColor: F8Colors.white
  }
});
