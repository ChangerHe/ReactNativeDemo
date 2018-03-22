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
import { View, Image, TouchableOpacity, Alert } from "react-native";
import StyleSheet from "../../common/F8StyleSheet";

/* Config
============================================================================= */

type Props = {
  network: string,
  password: string
};

type State = {};

const DEFAULT_SIZE = 48,
  DEFAULT_BGCOLOR = "#374B71",
  ICON_COLOR = "white",
  ICON_WIDTH = 20,
  ICON_HEIGHT = 25,
  ICON_WIDTH_RATIO = ICON_WIDTH / DEFAULT_SIZE,
  ICON_HEIGHT_RATIO = ICON_HEIGHT / DEFAULT_SIZE;

/* =============================================================================
<PrivacyIcon />
--------------------------------------------------------------------------------

Props:
 ? size:number             -> Icon size
 ? backgroundColor:string  -> WiFi network password
 ? onPress:function        -> Callback
 ? style                   -> Pass-through container styles

============================================================================= */

class PrivacyIcon extends React.Component {
  props: Props;
  state: State = {};

  static defaultProps = {
    size: DEFAULT_SIZE,
    backgroundColor: DEFAULT_BGCOLOR,
    iconColor: ICON_COLOR
  };

  render() {
    const { onPress, backgroundColor, size, iconColor } = this.props;
    const iconWidth = size * ICON_WIDTH_RATIO;
    const iconHeight = size * ICON_HEIGHT_RATIO;

    const containerStyles = [
      styles.container,
      { backgroundColor, width: size, height: size, borderRadius: size / 2 },
      this.props.style
    ];

    if (onPress) {
      return (
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={onPress}
          style={containerStyles}
        >
          {this.renderIconImage(iconWidth, iconHeight, iconColor)}
        </TouchableOpacity>
      );
    } else {
      return (
        <View style={containerStyles}>
          {this.renderIconImage(iconWidth, iconHeight, iconColor)}
        </View>
      );
    }
  }

  renderIconImage(width, height, tintColor) {
    return (
      <Image
        style={{ width, height, tintColor }}
        source={require("../../common/img/privacy.png")}
      />
    );
  }
}

/* Styles
============================================================================= */

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center"
  }
});

/* Playground Cards
============================================================================= */

const privacyIcon = PrivacyIcon;
privacyIcon.__cards__ = define => {
  define("Default", () => <PrivacyIcon />);
  define("Touchable", () => (
    <PrivacyIcon onPress={() => Alert.alert("<PrivacyIcon /> pressed!")} />
  ));

  define("Customized", () => (
    <PrivacyIcon
      size={20}
      backgroundColor="yellow"
      iconColor="black"
      onPress={() => Alert.alert("<PrivacyIcon /> pressed!")}
    />
  ));
};

/* Export
============================================================================= */
module.exports = privacyIcon;
