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
import F8Colors from "../../common/F8Colors";
import { View, Image, StyleSheet, TouchableHighlight } from "react-native";
import { Text } from "../../common/F8Text";
import ProfilePicture from "../../common/ProfilePicture";

import type { FriendsSchedule } from "../../reducers/friendsSchedules";

class FriendCell extends React.Component {
  props: {
    friend: FriendsSchedule,
    onPress: ?() => void
  };

  render() {
    const { friend } = this.props;
    const hasSchedule =
      friend.schedule && Object.keys(friend.schedule).length > 0;
    const auxView = hasSchedule ? (
      <Image source={require("../../common/img/pointer-right.png")} />
    ) : (
      <Image
        style={{ tintColor: F8Colors.blueBayoux, width: 12, height: 15 }}
        source={require("../../common/img/privacy.png")}
      />
    );

    const cell = (
      <View style={styles.cell}>
        <ProfilePicture userID={friend.id} size={48} />
        <Text style={styles.name}>{friend.name}</Text>
        {auxView}
      </View>
    );

    if (!hasSchedule) {
      return cell;
    } else {
      return (
        <TouchableHighlight underlayColor="white" onPress={this.props.onPress}>
          {cell}
        </TouchableHighlight>
      );
    }
  }
}

const styles = StyleSheet.create({
  cell: {
    height: 68,
    paddingLeft: 11,
    paddingRight: 15,
    flexDirection: "row",
    backgroundColor: F8Colors.bianca,
    alignItems: "center"
  },
  name: {
    flex: 1,
    fontSize: 17,
    marginHorizontal: 13,
    color: F8Colors.tangaroa
  },
  private: {
    color: F8Colors.lightText
  }
});

module.exports = FriendCell;
