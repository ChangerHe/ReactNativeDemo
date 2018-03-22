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
import { AppState, StyleSheet, StatusBar, View } from "react-native";
import LoginScreen from "./login/LoginScreen";
import PushNotificationsController from "./PushNotificationsController";
import F8Navigator from "./F8Navigator";
import {
  loadConfig,
  loadMaps,
  loadNotifications,
  loadSessions,
  loadFAQs,
  loadPages,
  loadFriendsSchedules,
  loadSurveys,
  loadVideos,
  loadPolicies,
  restoreSchedule
} from "./actions";
import { updateInstallation } from "./actions/installation";
import { connect } from "react-redux";
import { version } from "./env.js";

class F8App extends React.Component {
  componentDidMount() {
    AppState.addEventListener("change", this.handleAppStateChange);

    // TODO: Make this list smaller, we basically download the whole internet
    this.props.dispatch(loadSessions());
    this.props.dispatch(loadConfig());
    this.props.dispatch(loadNotifications());
    this.props.dispatch(loadVideos());
    this.props.dispatch(loadMaps());
    this.props.dispatch(loadFAQs());
    this.props.dispatch(loadPages());
    this.props.dispatch(loadPolicies());

    if (this.props.isLoggedIn) {
      this.props.dispatch(restoreSchedule());
      this.props.dispatch(loadSurveys());
      this.props.dispatch(loadFriendsSchedules());
    }

    updateInstallation({ version });
  }

  componentWillUnmount() {
    AppState.removeEventListener("change", this.handleAppStateChange);
  }

  handleAppStateChange = appState => {
    if (appState === "active") {
      this.props.dispatch(loadSessions());
      this.props.dispatch(loadVideos());
      this.props.dispatch(loadNotifications());

      if (this.props.isLoggedIn) {
        this.props.dispatch(restoreSchedule());
        this.props.dispatch(loadSurveys());
      }
    }
  };

  render() {
    if (!this.props.skipWelcomeScreen) {
      return <LoginScreen />;
    }
    return (
      <View style={styles.container}>
        <StatusBar
          hidden={false}
          translucent={true}
          backgroundColor="rgba(0, 0, 0, 0)"
          barStyle="light-content"
        />
        <F8Navigator />
        <PushNotificationsController />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

function select(store) {
  return {
    isLoggedIn: store.user.isLoggedIn,
    skipWelcomeScreen: store.user.isLoggedIn || store.user.hasSkippedLogin
  };
}

module.exports = connect(select)(F8App);
