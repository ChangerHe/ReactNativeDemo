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
import StyleSheet from "../../common/F8StyleSheet";
import F8Header from "../../common/F8Header";
import { StatusBar, View, ScrollView } from "react-native";
import { Heading2, Paragraph } from "../../common/F8Text";
import F8VideoPlayer from "../../video/F8VideoPlayer";
import { connect } from "react-redux";
import { shareVideo } from "../../actions";

/* <F8VideoView />
============================================================================= */

class F8VideoView extends React.Component {
  render() {
    const { video } = this.props;

    let rightItem;
    if (video.shareURL) {
      rightItem = {
        title: "Share",
        layout: "icon",
        //$FlowFixMe
        icon: require("../../common/img/header/share.png"),
        onPress: this.share
      };
    }

    return (
      <View style={styles.view}>
        <StatusBar hidden={false} barStyle="light-content" animated={true} />
        <F8Header
          title="Video"
          backgroundColor={F8Colors.tangaroa}
          titleColor={F8Colors.pink}
          itemsColor={F8Colors.white}
          navItem={{
            title: "Back",
            layout: "icon",
            icon: require("../../common/img/header/back.png"),
            onPress: _ => this.props.navigator.pop()
          }}
          rightItem={rightItem}
        />
        <View style={styles.content}>
          <F8VideoPlayer
            id={video.id}
            source={video.source}
            backgroundImage={{ uri: video.image }}
          />
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={styles.textBlock}
          >
            {this.renderTitle()}
            {this.renderDescription()}
          </ScrollView>
        </View>
      </View>
    );
  }

  renderTitle() {
    const { video } = this.props;
    if (video.title) {
      return <Heading2 style={styles.title}>{video.title}</Heading2>;
    } else {
      return null;
    }
  }

  renderDescription() {
    const { video } = this.props;
    if (video.description) {
      return <Paragraph>{video.description}</Paragraph>;
    } else {
      return null;
    }
  }

  share = _ => {
    this.props.dispatch(shareVideo(this.props.video));
  };
}

/* StyleSheet =============================================================== */
const styles = StyleSheet.create({
  view: {
    backgroundColor: F8Colors.bianca,
    flex: 1
  },
  content: {
    flex: 1
  },

  textBlock: {
    paddingVertical: 23,
    paddingHorizontal: 32
  },
  title: {
    color: F8Colors.blue,
    marginBottom: 5
  }
});

/* exports ================================================================== */
module.exports = connect()(F8VideoView);
