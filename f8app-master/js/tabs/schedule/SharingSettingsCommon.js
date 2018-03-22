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
import { View, StyleSheet } from "react-native";
import F8Colors from "../../common/F8Colors";
import PrivacyIcon from "./PrivacyIcon";
import { Heading2, Paragraph } from "../../common/F8Text";
import ProfilePicture from "../../common/ProfilePicture";
import { connect } from "react-redux";
import type { State as User } from "../../reducers/user";

class SharingSettingsCommon extends React.Component {
  props: {
    user: User,
    style: any
  };

  static defaultProps = {
    pictureSize: 158
  };

  render() {
    const { user, pictureSize } = this.props;
    const isPrivate = user && !user.sharedSchedule;

    return (
      <View style={[styles.container, this.props.style]}>
        <View style={{ paddingBottom: 6 }}>
          <ProfilePicture userID={user.id} size={pictureSize} />
          {isPrivate ? <PrivacyIcon style={styles.privacy} /> : null}
        </View>

        <View style={styles.content}>
          <Heading2 style={styles.h2}>
            {"Let friends view your\nschedule in the F8 app?"}
          </Heading2>
          <Paragraph style={styles.p}>
            Friends using the F8 app will be able to view your schedule. This
            won’t post to Facebook.
          </Paragraph>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center"
  },
  image: {
    alignSelf: "center"
  },
  privacy: {
    position: "absolute",
    right: 0,
    bottom: 0
  },
  content: {
    padding: 18,
    alignItems: "center"
  },
  h2: {
    color: F8Colors.blue,
    textAlign: "center"
  },
  p: {
    marginTop: 10,
    textAlign: "center"
  },
  title: {
    marginTop: 40,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "transparent"
  },
  name: {
    fontSize: 12,
    color: "white",
    marginLeft: 10,
    fontWeight: "bold"
  }
});

function select(store) {
  return {
    user: store.user
  };
}

module.exports = connect(select)(SharingSettingsCommon);
