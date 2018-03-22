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
import { connect } from "react-redux";
import { View, Image, StyleSheet } from "react-native";
import F8Colors from "../../common/F8Colors";
import { Text } from "../../common/F8Text";

const PROFILE_PICTURE_SIZE = 30;

class FriendsUsingApp extends React.Component {
  props: {
    friends: Array<{ id: string, name: string }>
  };

  static defaultProps = {
    multiline: false,
    photoBorderColor: F8Colors.bianca,
    textColor: F8Colors.colorWithAlpha("tangaroa", 0.6)
  };

  render() {
    const { friends } = this.props;
    if (friends.length === 0) {
      return null;
    } else {
      return this.props.multiline
        ? this.renderMultiline()
        : this.renderSingleRow();
    }
  }

  renderSingleRow() {
    const { friends, photoBorderColor, textColor } = this.props;
    const pictures = friends
      .slice(0, 2)
      .map(friend => (
        <Image
          key={friend.id}
          source={{ uri: `https://graph.facebook.com/${friend.id}/picture` }}
          style={[
            styles.profilePic,
            { borderColor: photoBorderColor, marginRight: -7, borderWidth: 1 }
          ]}
        />
      ));
    let text = `${friends.length} friends are using the F8 app.`;
    if (friends.length === 1) {
      text = `${friends[0].name.split(" ")[0]} is using the F8 app.`;
    }
    return (
      <View
        style={[styles.container, { flexDirection: "row" }, this.props.style]}
      >
        <View style={{ flexDirection: "row-reverse" }}>{pictures}</View>
        <Text style={[styles.text, { color: textColor, marginLeft: 21 }]}>
          {text}
        </Text>
      </View>
    );
  }

  renderMultiline() {
    const { friends, textColor } = this.props;
    let names = [];
    let pictures = [];
    const showFriendsDetailsCount = 2;
    friends.slice(0, showFriendsDetailsCount).map((friend, idx) => {
      names.push(friend.name);
      pictures.push(
        <Image
          key={friend.id}
          source={{ uri: `https://graph.facebook.com/${friend.id}/picture` }}
          style={[styles.profilePic, { marginHorizontal: 1 }]}
        />
      );
    });
    const text = this.getLabelWithFriendNames(names, friends);
    return (
      <View style={[styles.container, this.props.style]}>
        <View style={{ marginBottom: 18, flexDirection: "row" }}>
          {pictures}
        </View>
        <Text style={[styles.text, { color: textColor, textAlign: "center" }]}>
          {text}
        </Text>
      </View>
    );
  }

  getLabelWithFriendNames(names = [], friends = []) {
    if (friends.length === 1) {
      return `${friends[0].name} is using the F8 app.`;
    }
    if (names.length - friends.length === 0) {
      return `${friends.length} friends are using the F8 app.`;
    }
    const othersNumber = friends.length - names.length;
    const pluralizeOthers =
      othersNumber > 1
        ? `${othersNumber} others are`
        : `${othersNumber} other friend are`;
    return `${names.join(", ")} and ${pluralizeOthers} using the F8 app.`;
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center"
  },
  profilePic: {
    width: PROFILE_PICTURE_SIZE,
    height: PROFILE_PICTURE_SIZE,
    borderRadius: PROFILE_PICTURE_SIZE / 2
  },
  text: {
    fontSize: 13
  }
});

function select(store) {
  return {
    friends: store.friendsSchedules
  };
}

module.exports = connect(select)(FriendsUsingApp);
