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
import { View, Image, TouchableOpacity } from "react-native";
import { Text } from "../../common/F8Text";
import StyleSheet from "../../common/F8StyleSheet";
import F8Colors from "../../common/F8Colors";

/* constants ================================================================ */

const CONTAINER_HEIGHT = 39;

/* <FilterHeader />
============================================================================= */

class FilterHeader extends React.Component {
  static defaultProps = {
    backgroundColor: F8Colors.tangaroa,
    textColor: F8Colors.white
  };

  render() {
    const topics = Object.keys(this.props.filter);
    if (topics.length === 0) {
      return null;
    }

    const { backgroundColor, textColor } = this.props;

    return (
      <View style={[styles.container, { backgroundColor }, this.props.style]}>
        <Text style={[styles.text, { color: textColor }]} numberOfLines={1}>
          {`Filter${topics.length > 1 ? "s" : ""}: ${topics.join(", ")}`}
        </Text>
        <TouchableOpacity
          accessibilityLabel="Clear filter"
          accessibilityTraits="button"
          style={styles.clear}
          onPress={this.props.onClear}
        >
          <Image source={require("./img/filters-x.png")} />
        </TouchableOpacity>
      </View>
    );
  }
}

/* StyleSheet =============================================================== */

const styles = StyleSheet.create({
  container: {
    height: CONTAINER_HEIGHT,
    flexDirection: "row",
    alignItems: "center",

    ios: {
      paddingLeft: 37
    },
    android: {
      paddingLeft: 12
    }
  },
  text: {
    flex: 1,
    fontSize: 12,

    ios: {
      textAlign: "center"
    }
  },
  clear: {
    paddingHorizontal: 12,
    alignSelf: "stretch",
    justifyContent: "center"
  }
});

/* exports ================================================================== */
module.exports = FilterHeader;
