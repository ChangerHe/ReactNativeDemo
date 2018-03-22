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
import { Dimensions, StyleSheet, View, Image } from "react-native";
import { Navigator } from "react-native-deprecated-custom-components";
import F8Colors from "../../common/F8Colors";
import F8Button from "../../common/F8Button";
import { Heading2, Paragraph } from "../../common/F8Text";
import F8BackgroundRepeat from "../../common/F8BackgroundRepeat";
import ProfilePicture from "../../common/ProfilePicture";
import FriendsUsingApp from "./FriendsUsingApp";
import { setSharingEnabled } from "../../actions";
import { connect } from "react-redux";
import F8Modal from "../../common/F8Modal";

/* constants ================================================================ */

const WINDOW_WIDTH = Dimensions.get("window").width,
  WINDOW_HEIGHT = Dimensions.get("window").height,
  VERTICAL_BREAKPOINT = WINDOW_HEIGHT <= 600,
  CONTENT_SPACING_SCALE = VERTICAL_BREAKPOINT ? 0.5 : 1,
  MODAL_PADDING_H = 10,
  MODAL_WIDTH = WINDOW_WIDTH - MODAL_PADDING_H * 2,
  HEADER_HEIGHT = 177,
  PROFILE_PICTURE_SIZE = 70;

/* <SharingSettingsModal />
============================================================================= */

class SharingSettingsModal extends React.Component {
  props: {
    navigator: Navigator,
    dispatch: () => void
  };

  render() {
    return (
      <F8Modal
        renderContent={this.renderContent}
        renderFooter={this.renderFooter}
        bottomGradient={[
          F8Colors.colorWithAlpha("tangaroa", 0),
          F8Colors.colorWithAlpha("tangaroa", 1)
        ]}
        {...this.props}
      />
    );
  }

  renderContent = _ => {
    return (
      <View>
        <View style={styles.header}>
          <F8BackgroundRepeat
            width={MODAL_WIDTH}
            height={HEADER_HEIGHT - 33}
            source={require("../../common/img/pattern-dots.png")}
            style={styles.headerBackground}
          />
          <View style={styles.headerIllustration}>
            <Image source={require("./img/sharing-nux.png")} />
            <View style={styles.profilePicture}>
              <ProfilePicture
                userID={this.props.user.id}
                size={PROFILE_PICTURE_SIZE}
              />
            </View>
          </View>
        </View>

        <View style={styles.content}>
          <Heading2 style={styles.h2}>
            {"Let friends view your\nschedule in the F8 app?"}
          </Heading2>
          <Paragraph style={styles.p}>
            Friends using the F8 app will be able to view your custom schedule.
          </Paragraph>
          <F8Button
            style={styles.button}
            caption="OK"
            onPress={() => this.handleSetSharing(true)}
          />
          <F8Button
            theme="transparent"
            opacity={0.5}
            caption="Maybe later"
            onPress={() => this.handleSetSharing(false)}
          />
        </View>
      </View>
    );
  };

  renderFooter = _ => {
    return (
      <FriendsUsingApp
        style={{ marginBottom: 20 }}
        photoBorderColor={F8Colors.colorWithAlpha("tangaroa", 0.8)}
        textColor={F8Colors.colorWithAlpha("white", 0.5)}
      />
    );
  };

  handleSetSharing(enabled: boolean) {
    this.props.dispatch(setSharingEnabled(enabled));
    this.props.onSetSharing && this.props.onSetSharing(enabled);
    // this.props.navigator.pop();
  }
}

/* StyleSheet =============================================================== */

const styles = StyleSheet.create({
  header: {
    alignSelf: "stretch"
  },
  headerBackground: {
    position: "absolute",
    left: 0,
    top: 0
  },
  headerIllustration: {
    alignSelf: "center",
    width: 275,
    height: HEADER_HEIGHT
  },
  profilePicture: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: "center"
  },

  content: {
    paddingVertical: 26 * CONTENT_SPACING_SCALE,
    paddingHorizontal: 30
  },

  h2: {
    color: F8Colors.blue,
    textAlign: "center",
    marginBottom: 10
  },
  p: {
    textAlign: "center",
    marginBottom: 15
  },

  button: {
    marginTop: 20 * CONTENT_SPACING_SCALE,
    marginBottom: 10 * CONTENT_SPACING_SCALE,
    alignSelf: "stretch"
  }
});

/* redux select ============================================================= */

function select(store) {
  return {
    user: store.user
  };
}

/* exports ================================================================== */
module.exports = connect(select)(SharingSettingsModal);
