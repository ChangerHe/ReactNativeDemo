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
import F8Colors from "../../common/F8Colors";
import F8Fonts from "../../common/F8Fonts";
import { Platform, StyleSheet, View, Switch, Alert } from "react-native";
import { Text } from "../../common/F8Text";

const CONTAINER_HEIGHT = 46;

/* =============================================================================
<HideCompleted />
============================================================================= */

class HideCompleted extends React.Component {
  static defaultProps = {
    enabled: false,
    label: "Hide completed",
    backgroundColor: F8Colors.persianBlue,
    textColor: F8Colors.white,
    switchInactiveColor: F8Colors.colorWithAlpha("tangaroa", 0.8),
    switchActiveColor: F8Colors.blue,
    onChange: _ => {}
  };

  render() {
    const { label, backgroundColor, textColor } = this.props;
    return (
      <View style={[styles.container, { backgroundColor }, this.props.style]}>
        <Text numberOfLines={1} style={[styles.text, { color: textColor }]}>
          {label.toUpperCase()}
        </Text>
        {this.renderSwitch()}
      </View>
    );
  }

  renderSwitch() {
    const { enabled, onChange, switchInactiveColor } = this.props;
    if (Platform.OS === "ios") {
      return (
        <View style={styles.toggleSwitch}>
          <View
            style={[
              styles.toggleBackground,
              { backgroundColor: switchInactiveColor }
            ]}
          />
          <Switch
            value={enabled}
            tintColor={switchInactiveColor}
            onValueChange={onChange}
          />
        </View>
      );
    } else {
      return (
        <Switch
          value={enabled}
          tintColor={switchInactiveColor}
          onValueChange={onChange}
          style={styles.toggleSwitch}
        />
      );
    }
  }
}

/* StyleSheet =============================================================== */

const styles = StyleSheet.create({
  container: {
    height: CONTAINER_HEIGHT,
    paddingHorizontal: 18,
    flexDirection: "row",
    alignItems: "center"
  },
  text: {
    flex: 1,
    fontSize: 13,
    fontFamily: F8Fonts.helvetica
  },
  toggleSwitch: {
    flex: 0
  },
  toggleBackground: {
    position: "absolute",
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    borderRadius: 20
  }
});

/* playground cards ========================================================= */

const hideCompleted = HideCompleted;
hideCompleted.__cards__ = define => {
  define("Default", _ => <HideCompleted />);
  define("Customized", _ => (
    <HideCompleted
      onChange={val => Alert.alert(val)}
      label="Customized Example"
      enabled={false}
      backgroundColor={F8Colors.turquoise}
      textColor={F8Colors.tangaroa}
      switchInactiveColor={F8Colors.pink}
      switchActiveColor={F8Colors.yellow}
    />
  ));
};

/* exports ================================================================== */
module.exports = hideCompleted;
