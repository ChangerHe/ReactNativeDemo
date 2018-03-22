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
import F8Colors from "../common/F8Colors";
import F8Fonts from "../common/F8Fonts";
import { View, TouchableOpacity, Image } from "react-native";
import StyleSheet from "../common/F8StyleSheet";
import { Text } from "../common/F8Text";

/* <RadioButtons /> ========================================================= */

class RadioButtons extends React.Component {
  static defaultProps = {
    options: []
  };

  render() {
    return (
      <View style={this.props.style}>
        {this.props.options.map((text, idx) => this.renderAnswer(text, idx))}
      </View>
    );
  }

  onPress = (value, idx) => {
    this.props.onChange && this.props.onChange(idx);
  };

  renderAnswer(text, idx) {
    const isActive = this.props.selectedIndex === idx;
    const source = isActive
      ? require("./img/radio-active.png")
      : require("./img/radio-default.png");
    const accessibilityTraits = ["button"];
    if (isActive) {
      accessibilityTraits.push("selected");
    }

    return (
      <TouchableOpacity
        key={`${idx}${text}`}
        accessibilityLabel={text}
        accessibilityTraits={accessibilityTraits}
        activeOpacity={0.8}
        style={styles.container}
        onPress={_ => this.onPress(text, idx)}
      >
        <Image style={styles.icon} source={source} />
        <Text style={styles.text}>{text}</Text>
      </TouchableOpacity>
    );
  }
}

/* StyleSheet =============================================================== */

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center"
  },
  text: {
    paddingLeft: 16,
    fontSize: F8Fonts.normalize(17),
    color: F8Colors.tangaroa,
    flex: 1
  }
});

/* exports & Playground cards =============================================== */

module.exports = RadioButtons;
module.exports.__cards = define => {
  const MOCK_RADIO_BUTTONS = ["First option", "Second option", "Third option"];

  define("Default", (state = null, update) => (
    <RadioButtons
      options={MOCK_RADIO_BUTTONS}
      selectedIndex={state}
      onChange={update}
    />
  ));

  define("Selected: First", (state = 0, update) => (
    <RadioButtons
      options={MOCK_RADIO_BUTTONS}
      selectedIndex={state}
      onChange={update}
    />
  ));
};
