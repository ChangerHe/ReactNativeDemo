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
import F8Button from "../../common/F8Button";
import F8Colors from "../../common/F8Colors";
import { Dimensions, View, Image, StyleSheet } from "react-native";
import { Heading2, Paragraph } from "../../common/F8Text";
import F8BackgroundRepeat from "../../common/F8BackgroundRepeat";
import F8Modal from "../../common/F8Modal";

/* constants ================================================================ */

const WINDOW_WIDTH = Dimensions.get("window").width,
  MODAL_PADDING_H = 10,
  MODAL_WIDTH = WINDOW_WIDTH - MODAL_PADDING_H * 2;

/* <PushNUXModal />
============================================================================= */

class PushNUXModal extends React.Component {
  props: {
    onTurnOnNotifications: () => void,
    onSkipNotifications: () => void
  };

  render() {
    return <F8Modal renderContent={this.renderContent} {...this.props} />;
  }

  renderContent = _ => {
    return (
      <View>
        <View>
          <F8BackgroundRepeat
            width={MODAL_WIDTH}
            height={124}
            source={require("../../common/img/pattern-dots.png")}
            style={styles.headerBackground}
          />
          <Image
            style={styles.headerIllustration}
            source={require("./img/nux-header.png")}
          />
        </View>
        <View style={styles.content}>
          <Heading2>Dont miss out!</Heading2>
          <Paragraph style={styles.text}>
            Turn on push notifications to see what’s happening at F8. You can
            always see in-app updates on this tab.
          </Paragraph>
          <F8Button
            style={styles.button}
            type="primary"
            caption="Turn on push notifications"
            onPress={this.props.onTurnOnNotifications}
          />
          <F8Button
            style={styles.button}
            theme="bordered"
            opacity={0.5}
            caption="Maybe later"
            onPress={this.props.onSkipNotifications}
          />
        </View>
      </View>
    );
  };
}

/* StyleSheet =============================================================== */

const styles = StyleSheet.create({
  headerBackground: {
    position: "absolute",
    left: 0,
    top: 0
  },
  headerIllustration: {
    alignSelf: "center"
  },
  content: {
    paddingTop: 32,
    paddingHorizontal: 20,
    paddingBottom: 45,
    alignItems: "center"
  },
  text: {
    textAlign: "center",
    paddingTop: 6,
    paddingHorizontal: 10,
    paddingBottom: 35,
    fontSize: 15,
    lineHeight: 24,
    color: F8Colors.colorWithAlpha("tangaroa", 0.7)
  },
  button: {
    marginTop: 9,
    alignSelf: "stretch"
  }
});

/* exports ================================================================== */
module.exports = PushNUXModal;
