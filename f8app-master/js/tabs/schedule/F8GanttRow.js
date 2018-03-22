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
import { View, StyleSheet, Image } from "react-native";
import { Text } from "../../common/F8Text";
import F8Colors from "../../common/F8Colors";

/* constants ================================================================ */

const ROW_HEIGHT = 26;

/* =============================================================================
<F8GanttRow />
============================================================================= */

export default class F8GanttRow extends React.Component {
  calculateSize() {
    const {
      sessionStart,
      sessionEnd,
      dayStart,
      dayEnd,
      containerWidth
    } = this.props;

    const mSessionStart = moment.utc(sessionStart),
      mSessionEnd = moment.utc(sessionEnd),
      mDayStart = moment.utc(dayStart),
      mDayEnd = moment.utc(dayEnd);

    const sessionLength = mSessionEnd.diff(mSessionStart, "minutes"),
      dayLength = mDayEnd.diff(mDayStart, "minutes"),
      daySessionStartDiff = mSessionStart.diff(mDayStart, "minutes");

    return {
      left: daySessionStartDiff / dayLength * containerWidth,
      width: sessionLength / dayLength * containerWidth
    };
  }

  render() {
    const { location, title, offset } = this.props;
    const { left, width } = this.calculateSize();
    let tintColor = location
      ? F8Colors.colorForLocation(location.toUpperCase())
      : F8Colors.blue;
    if (location.toUpperCase().indexOf("REGISTRATION") > -1) {
      tintColor = F8Colors.yellow;
    }

    return (
      <View style={[styles.container, { top: offset, marginLeft: left - 2.5 }]}>
        <Text numberOfLines={1} style={styles.label}>
          {title}
        </Text>
        <View style={[styles.barContainer, { width: width + 6 }]}>
          <View style={[styles.bar, { width: width - 8 }]} />
          <Image
            style={styles.barStartIcon}
            source={require("./img/gantt-bar-start.png")}
          />
          <Image
            style={styles.barEndIcon}
            source={require("./img/gantt-bar-end.png")}
          />
          <Image
            style={[styles.barColorIcon, { tintColor }]}
            source={require("./img/gantt-bar-color.png")}
          />
        </View>
      </View>
    );
  }
}

/* StyleSheet =============================================================== */
const styles = StyleSheet.create({
  container: {
    position: "absolute",
    left: 0,
    right: 0,
    height: ROW_HEIGHT,
    backgroundColor: "transparent"
  },
  label: {
    paddingLeft: 2,
    fontSize: 13,
    letterSpacing: -0.1,
    color: F8Colors.white
  },
  barContainer: {
    position: "absolute",
    left: 0,
    bottom: 0,
    height: 6
  },
  bar: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 2.5,
    height: 1,
    overflow: "hidden",
    backgroundColor: F8Colors.colorWithAlpha("iceberg", 0.6)
  },
  barStartIcon: {
    position: "absolute",
    left: 0,
    bottom: 0
  },
  barEndIcon: {
    position: "absolute",
    right: 9,
    bottom: 0
  },
  barColorIcon: {
    position: "absolute",
    right: 0,
    bottom: 0
  }
});
