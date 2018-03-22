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

import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import F8Fonts from "../../common/F8Fonts";
import F8Colors from "../../common/F8Colors";
import { Text } from "../../common/F8Text";

type Props = {
  numberOfSessions: number,
  onPress: () => void
};

/* <RateSessionsCell />
============================================================================= */

function RateSessionsCell({ numberOfSessions, onPress }: Props) {
  const label = `Rate the session${numberOfSessions === 1
    ? ""
    : "s"} you attended`;
  return (
    <TouchableOpacity
      style={styles.cell}
      accessibilityTraits="button"
      onPress={onPress}
    >
      <Text style={styles.text}>{label.toUpperCase()}</Text>
    </TouchableOpacity>
  );
}

/* StyleSheet
============================================================================= */

const styles = StyleSheet.create({
  cell: {
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
    backgroundColor: F8Colors.yellow
  },
  text: {
    fontSize: 13,
    fontFamily: F8Fonts.helvetica,
    color: F8Colors.pink
  }
});

/* exports
============================================================================= */
module.exports = RateSessionsCell;
