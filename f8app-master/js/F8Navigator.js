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
import Platform from "Platform";
import BackAndroid from "BackAndroid";
import F8TabsView from "./tabs/F8TabsView";
import FriendsScheduleView from "./tabs/schedule/FriendsScheduleView";
import FilterScreen from "./filter/FilterScreen";
import LoginModal from "./login/LoginModal";
import { Navigator } from "react-native-deprecated-custom-components";
import SessionsCarousel from "./tabs/schedule/SessionsCarousel";

import SharingSettingsScreen from "./tabs/schedule/SharingSettingsScreen";

import F8WebView from "./common/F8WebView";
import RatingScreen from "./rating/RatingScreen";
import { StyleSheet } from "react-native";
import { connect } from "react-redux";

import F8Colors from "./common/F8Colors";
import F8VideoView from "./tabs/videos/F8VideoView";
import { switchTab } from "./actions";
import F8MapView from "./tabs/maps/F8MapView";
import DemosCarousel from "./tabs/demos/DemosCarousel";

const F8Navigator = React.createClass({
  _handlers: ([]: Array<() => boolean>),

  componentDidMount: function() {
    BackAndroid.addEventListener("hardwareBackPress", this.handleBackButton);
  },

  componentWillUnmount: function() {
    BackAndroid.removeEventListener("hardwareBackPress", this.handleBackButton);
  },

  getChildContext() {
    return {
      addBackButtonListener: this.addBackButtonListener,
      removeBackButtonListener: this.removeBackButtonListener
    };
  },

  addBackButtonListener: function(listener) {
    this._handlers.push(listener);
  },

  removeBackButtonListener: function(listener) {
    this._handlers = this._handlers.filter(handler => handler !== listener);
  },

  handleBackButton: function() {
    for (let i = this._handlers.length - 1; i >= 0; i--) {
      if (this._handlers[i]()) {
        return true;
      }
    }

    const navigator = this._navigator;
    if (navigator && navigator.getCurrentRoutes().length > 1) {
      navigator.pop();
      return true;
    }

    if (this.props.tab !== "schedule") {
      this.props.dispatch(switchTab("schedule"));
      return true;
    }
    return false;
  },

  render: function() {
    return (
      <Navigator
        ref={c => (this._navigator = c)}
        style={styles.container}
        configureScene={route => {
          if (Platform.OS === "android") {
            return Navigator.SceneConfigs.FloatFromBottomAndroid;
          }
          // TODO: Proper scene support
          if (
            route.shareSettings ||
            route.friend ||
            route.webview ||
            route.video ||
            route.session ||
            route.allSession ||
            route.allDemos
          ) {
            return Navigator.SceneConfigs.PushFromRight;
          } else {
            return Navigator.SceneConfigs.FloatFromBottom;
          }
        }}
        initialRoute={{}}
        renderScene={this.renderScene}
      />
    );
  },

  renderScene: function(route, navigator) {
    if (route.allSessions) {
      return <SessionsCarousel {...route} navigator={navigator} />;
    } else if (route.session) {
      return <SessionsCarousel session={route.session} navigator={navigator} />;
    } else if (route.filter) {
      return <FilterScreen navigator={navigator} {...route} />;
    } else if (route.friend) {
      return (
        <FriendsScheduleView friend={route.friend} navigator={navigator} />
      );
    } else if (route.login) {
      return <LoginModal navigator={navigator} onLogin={route.callback} />;
    } else if (route.shareSettings) {
      // else if (route.share){ return <SharingSettingsModal navigator={navigator} />; }
      return <SharingSettingsScreen navigator={navigator} />;
    } else if (route.rate) {
      return <RatingScreen navigator={navigator} survey={route.survey} />;
    } else if (route.webview) {
      return <F8WebView {...route} url={route.webview} navigator={navigator} />;
    } else if (route.video) {
      return <F8VideoView video={route.video} navigator={navigator} />;
    } else if (route.maps) {
      return <F8MapView directions={false} navigator={navigator} />;
    } else if (route.allDemos) {
      return <DemosCarousel {...route} navigator={navigator} />;
    } else {
      return <F8TabsView navigator={navigator} />;
    }
  }
});

F8Navigator.childContextTypes = {
  addBackButtonListener: React.PropTypes.func,
  removeBackButtonListener: React.PropTypes.func
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: F8Colors.bianca
  }
});

function select(store) {
  return {
    tab: store.navigation.tab,
    isLoggedIn: store.user.isLoggedIn || store.user.hasSkippedLogin
  };
}

module.exports = connect(select)(F8Navigator);
