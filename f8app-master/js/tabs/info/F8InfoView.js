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
import { connect } from "react-redux";
import ListContainer from "../../common/ListContainer";
import PureListView from "../../common/PureListView";
import F8AboutView from "./F8AboutView";
import F8Colors from "../../common/F8Colors";
import F8NotificationsView from "../notifications/F8NotificationsView";
import { Platform, ActionSheetIOS } from "react-native";
import unseenNotificationsCount from "../notifications/unseenNotificationsCount";
import { testMenuEnabled, version } from "../../env";
import { TEST_MENU } from "../../actions";

/* <F8InfoView />
============================================================================= */

class F8InfoView extends React.Component {
  render() {
    return (
      <ListContainer
        headerBackgroundColor={F8Colors.salmon}
        title="Information"
        leftItem={{
          title: "Map",
          layout: "icon",
          icon: require("../../common/img/header/map.png"),
          onPress: _ =>
            this.props.navigator && this.props.navigator.push({ maps: true })
        }}
        {...this.renderTestItems()}
      >
        <PureListView
          title="About"
          renderRow={_ => {}}
          renderEmptyList={_ => (
            <F8AboutView
              navigator={this.props.navigator}
              config={this.props.config}
              pages={this.props.pages}
              faqs={this.props.faqs}
              policies={this.props.policies}
            />
          )}
        />
        <F8NotificationsView
          title="Notifications"
          hasUpdates={this.props.notificationsBadge}
          navigator={this.props.navigator}
        />
      </ListContainer>
    );
  }

  renderTestItems() {
    if (!testMenuEnabled) {
      return {};
    }

    if (Platform.OS === "ios") {
      return {
        rightItem: {
          title: "Test",
          onPress: () => this.showTestMenu()
        }
      };
    }

    if (Platform.OS === "android") {
      return {
        extraItems: Object.keys(TEST_MENU).map(title => ({
          title,
          onPress: () => this.props.dispatch(TEST_MENU[title]())
        }))
      };
    }
  }

  showTestMenu() {
    const itemTitles = Object.keys(TEST_MENU);
    ActionSheetIOS.showActionSheetWithOptions(
      {
        title: "Testing F8 app v" + version,
        options: ["Cancel", ...itemTitles],
        cancelButtonIndex: 0
      },
      idx => {
        if (idx === 0) {
          return;
        }

        const action: any = TEST_MENU[itemTitles[idx - 1]];
        this.props.dispatch(action());
      }
    );
  }
}

/* redux store ============================================================== */

function select(store) {
  return {
    config: store.config,
    faqs: store.faqs,
    pages: store.pages,
    policies: store.policies,
    notificationsBadge: unseenNotificationsCount(store) + store.surveys.length
  };
}

/* exports ================================================================== */
module.exports = connect(select)(F8InfoView);
