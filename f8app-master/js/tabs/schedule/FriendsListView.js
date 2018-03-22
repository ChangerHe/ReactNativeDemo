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

import EmptySchedule from "./EmptySchedule";

import React from "react";

import InviteFriendsButton from "./InviteFriendsButton";
import PureListView from "../../common/PureListView";
import FriendCell from "./FriendCell";

import { View } from "react-native";
import { Navigator } from "react-native-deprecated-custom-components";
import LoginButton from "../../common/LoginButton";

type Friend = any;

type Props = {
  friends: Array<Friend>,
  navigator: Navigator
};

class FriendsListView extends React.Component {
  props: Props;
  _innerRef: ?PureListView;

  constructor(props: Props) {
    super(props);

    this._innerRef = null;

    (this: any).renderRow = this.renderRow.bind(this);
    (this: any).renderFooter = this.renderFooter.bind(this);
    (this: any).renderEmptyList = this.renderEmptyList.bind(this);
    (this: any).storeInnerRef = this.storeInnerRef.bind(this);
  }

  render() {
    return (
      <PureListView
        ref={this.storeInnerRef}
        data={this.props.friends}
        renderRow={this.renderRow}
        renderEmptyList={this.renderEmptyList}
        renderFooter={this.renderFooter}
        {...(this.props: any) /* flow can't guarantee the shape of props */}
      />
    );
  }

  renderRow(friend: Friend) {
    return (
      <FriendCell
        friend={friend}
        onPress={() => this.openFriendsSchedule(friend)}
      />
    );
  }

  renderEmptyList(containerHeight: number): ?ReactElement {
    if (containerHeight === 0) {
      return null;
    }
    if (!this.props.loggedIn) {
      return (
        <EmptySchedule
          style={{ height: containerHeight }}
          key="login"
          title="Log in to see your friends at F8."
          text="You’ll be able to view each other’s custom schedules."
        >
          <LoginButton source="My F8" />
        </EmptySchedule>
      );
    }
    return (
      <EmptySchedule
        style={{ height: containerHeight }}
        image={require("./img/no-friends-found.png")}
        text={"Friends using the F8 app\nwill appear here."}
      >
        <InviteFriendsButton />
      </EmptySchedule>
    );
  }

  renderFooter() {
    return (
      <View style={{ paddingHorizontal: 20, paddingVertical: 15 }}>
        <InviteFriendsButton />
      </View>
    );
  }

  openFriendsSchedule(friend: Friend) {
    this.props.navigator.push({ friend });
  }

  storeInnerRef(ref: ?PureListView) {
    this._innerRef = ref;
  }

  scrollTo(...args: Array<any>) {
    this._innerRef && this._innerRef.scrollTo(...args);
  }

  getScrollResponder(): any {
    return this._innerRef && this._innerRef.getScrollResponder();
  }
}

module.exports = FriendsListView;
