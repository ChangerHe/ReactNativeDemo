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
import { Platform, TouchableOpacity, ActionSheetIOS } from "react-native";
import { Text } from "../../common/F8Text";
import F8Linking from "../../common/F8Linking";

/**
* ==============================================================================
* <DirectionsLink />
* ------------------------------------------------------------------------------
* @param {string} address Full address to open with selected maps app
* @return {ReactElement}
* ==============================================================================
*/

class DirectionsLink extends React.Component {
  static defaultProps = {
    address: ""
  };

  render() {
    return (
      <TouchableOpacity onPress={this.onPress}>
        {this.props.children}
      </TouchableOpacity>
    );
  }

  onPress = _ => {
    if (Platform.OS === "ios") {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          title: this.props.address,
          options: ["Open in Apple Maps", "Open in Google Maps", "Cancel"],
          destructiveButtonIndex: -1,
          cancelButtonIndex: 2
        },
        this.openMaps
      );
    } else {
      // android
      let address = encodeURIComponent(this.props.address);
      F8Linking.openURL("https://maps.google.com/maps?&q=" + address);
    }
  };

  openMaps = option => {
    const address = encodeURIComponent(this.props.address);
    switch (option) {
      case 0:
        F8Linking.openURL("https://maps.apple.com/?q=" + address);
        break;

      case 1:
        const nativeGoogleUrl =
          "comgooglemaps-x-callback://?q=" +
          address +
          "&x-success=f8://&x-source=F8";
        F8Linking.canOpenURL(nativeGoogleUrl).then(supported => {
          const url = supported
            ? nativeGoogleUrl
            : "https://maps.google.com/?q=" + address;
          F8Linking.openURL(url);
        });
        break;
    }
  };
}

/* playground cards ========================================================= */

const directionsLink = DirectionsLink;
directionsLink.__cards__ = define => {
  define("Large Blue/Green", _ => (
    <DirectionsLink address="150 West San Carlos Street San Jose, CA 95113">
      <Text>{"150 West San Carlos Street\nSan Jose, CA 95113"}</Text>
    </DirectionsLink>
  ));
};

/* exports ================================================================== */
module.exports = directionsLink;
