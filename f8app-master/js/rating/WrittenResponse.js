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
import { Platform, View, TextInput, Alert } from "react-native";
import StyleSheet from "../common/F8StyleSheet";

/* <WrittenResponse />
============================================================================= */

class WrittenResponse extends React.Component {
  static defaultProps = {
    multiline: true,
    maxLength: 500,
    inputColor: F8Colors.coolGray,
    textColor: F8Colors.tangaroa,
    onChange: _ => {}
  };

  render() {
    const {
      onChange,
      multiline,
      maxLength,
      placeholder,
      inputColor,
      textColor
    } = this.props;

    let platformStyles;
    if (Platform.OS === "ios") {
      platformStyles = { borderColor: inputColor, color: textColor };
    } else {
      platformStyles = { color: textColor };
    }

    return (
      <View style={[styles.container, this.props.style]}>
        <TextInput
          style={[styles.input, platformStyles]}
          multiline={multiline}
          maxLength={maxLength}
          placeholder={placeholder}
          placeholderTextColor={inputColor}
          underlineColorAndroid={inputColor}
          onEndEditing={event => onChange(event.nativeEvent.text)}
        />
      </View>
    );
  }
}

/* StyleSheet =============================================================== */

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: "center",
    paddingVertical: 15
  },
  input: {
    fontFamily: F8Fonts.default,
    fontSize: F8Fonts.normalize(17),
    color: F8Colors.tangaroa,
    height: 100,

    ios: {
      borderRadius: 5,
      borderWidth: 1,
      borderColor: F8Colors.coolGray,
      paddingVertical: 15,
      paddingHorizontal: 20
    }
  }
});

/* exports & Playground cards =============================================== */

module.exports = WrittenResponse;
module.exports.__cards = define => {
  define("Written", _ => (
    <WrittenResponse onChange={value => Alert.alert(value)} />
  ));
};
