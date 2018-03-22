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

import EmptySchedule from "../schedule/EmptySchedule";
import PushNUXModal from "./PushNUXModal";
import PureListView from "../../common/PureListView";
import React from "react";
import NotificationCell from "./NotificationCell";
import allNotifications from "./allNotifications";
import findSessionByURI from "./findSessionByURI";
import { connect } from "react-redux";
import { turnOnPushNotifications, skipPushNotifications } from "../../actions";
import { createSelector } from "reselect";

import { View } from "react-native";
import F8TimelineBackground from "../../common/F8TimelineBackground";
import F8Linking from "../../common/F8Linking";

/* <F8NotificationsView />
============================================================================= */

class F8NotificationsView extends React.Component {
  constructor(props) {
    super(props);

    (this: any).renderRow = this.renderRow.bind(this);
    (this: any).renderEmptyList = this.renderEmptyList.bind(this);
    (this: any).openNotification = this.openNotification.bind(this);
    (this: any).openReview = this.openReview.bind(this);
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <PureListView
          data={this.props.notifications}
          renderEmptyList={this.renderEmptyList}
          renderRow={this.renderRow}
          renderFooter={_ => <F8TimelineBackground height={80} left={24} />}
          showsVerticalScrollIndicator={false}
        />
        <PushNUXModal
          visible={this.props.nux}
          animationType="fade"
          transparent={true}
          onTurnOnNotifications={this.props.onTurnOnNotifications}
          onSkipNotifications={this.props.onSkipNotifications}
        />
      </View>
    );
  }

  renderRow(notification, sid, rid) {
    return (
      <NotificationCell
        key={notification.id}
        notification={notification}
        onPress={() => this.openNotification(notification)}
        firstRow={rid === 0 || rid === "0"}
      />
    );
  }

  renderEmptyList(containerHeight) {
    if (containerHeight === 0) {
      return null;
    }
    return (
      <EmptySchedule
        style={{ height: containerHeight }}
        title="Stay tuned!"
        text="Important updates and announcements will appear here"
      />
    );
  }

  openNotification(notification) {
    if (notification.url) {
      const session = findSessionByURI(this.props.sessions, notification.url);
      if (session) {
        this.props.navigator.push({ session });
      } else {
        F8Linking.openURL(notification.url);
        // this.props.navigator.push({ webview: notification.url }); // uses default theme
      }
    } else if (notification.survey) {
      this.props.navigator.push({
        rate: 1,
        survey: notification.survey
      });
    }
  }

  openReview() {
    this.props.navigator.push({
      rate: 1,
      surveys: this.props.surveys
    });
  }
}

/* redux ==================================================================== */

const data = createSelector(
  allNotifications,
  store => store.surveys,
  store => store.notifications.enabled,
  store => store.sessions,
  (notifications, surveys, enabled, sessions) => {
    const updatedSurveys = surveys.map(survey => {
      const surveySession = sessions.find(s => s.id === survey.sessionId);
      return {
        text: `How was "${surveySession.title}"?`,
        time: survey.time,
        survey
      };
    });
    return [...updatedSurveys, ...notifications].sort(function(a, b) {
      return b.time - a.time;
    });
  }
);

function select(state) {
  return {
    nux: state.notifications.enabled === null,
    notifications: data(state),
    sessions: state.sessions
  };
}

function actions(dispatch) {
  return {
    onTurnOnNotifications: () => dispatch(turnOnPushNotifications()),
    onSkipNotifications: () => dispatch(skipPushNotifications()),
    dispatch
  };
}

/* exports ================================================================== */
module.exports = connect(select, actions)(F8NotificationsView);
