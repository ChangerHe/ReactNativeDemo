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

import React from "react";
import { View, TouchableOpacity, Image } from "react-native";
import StyleSheet from "../common/F8StyleSheet";
import { Text } from "../common/F8Text";

/* <StarRating />
============================================================================= */

function StarRating({ labels, rating, onChange }) {
  const stars = [1, 2, 3, 4, 5].map(value => (
    <Star
      key={value}
      value={value}
      isFull={rating && value <= rating}
      onPress={_ => onChange(value)}
    />
  ));

  let labelSection;
  if (labels && labels.low && labels.high) {
    labelSection = (
      <View style={styles.labels}>
        <Text style={styles.label}>{labels.low}</Text>
        <Text style={styles.label}>{labels.high}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.stars}>{stars}</View>
      {labelSection}
    </View>
  );
}

/* <Star />
============================================================================= */

function Star({ isFull, value, onPress }) {
  const source = isFull
    ? require("./img/star-active.png")
    : require("./img/star-default.png");

  const accessibilityTraits = ["button"];
  if (isFull) {
    accessibilityTraits.push("selected");
  }

  return (
    <TouchableOpacity
      accessibilityLabel={`${value} stars`}
      accessibilityTraits={accessibilityTraits}
      style={styles.star}
      activeOpacity={0.8}
      onPress={onPress}
    >
      <Image source={source} />
    </TouchableOpacity>
  );
}

/* StyleSheet =============================================================== */

const styles = StyleSheet.create({
  container: {
    alignSelf: "center",
    width: 298
  },
  stars: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 260,
    // backgroundColor: 'yellow',
    alignSelf: "center"
  },
  star: {
    flex: 1,
    alignItems: "center"
  },
  labels: {
    // paddingHorizontal: 14,
    paddingTop: 20,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  label: {
    fontSize: 11,
    width: 90,
    color: "rgba(3,34,80,1)",
    textAlign: "center"
    // backgroundColor: 'red'
  }
});

/* exports & Playground cards =============================================== */

module.exports = StarRating;
module.exports.__cards = define => {
  define("Default", (state = null, update) => (
    <StarRating
      labels={{ low: "Not at all", high: "Very likely" }}
      rating={state}
      onChange={update}
    />
  ));
};
