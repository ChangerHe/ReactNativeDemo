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

import F8Colors from "../../common/F8Colors";
import F8SessionCell from "../schedule/F8SessionCell";
import React from "react";
import findSessionByURI from "./findSessionByURI";
import TouchableHighlight from "../../common/F8Touchable";
import moment from "moment";
import { connect } from "react-redux";

import { Dimensions, View, Image } from "react-native";
import { Text, Paragraph, Heading3 } from "../../common/F8Text";
import F8TimelineSegment from "../../common/F8TimelineSegment";
import F8Fonts from "../../common/F8Fonts";
import StyleSheet from "../../common/F8StyleSheet";
import F8Button from "../../common/F8Button";

/* constants ================================================================ */

const IMAGE_RATIO = 230 / 375,
  CELL_PADDING_VERTICAL = 14,
  CELL_PADDING_LEFT = 50,
  CELL_PADDING_RIGHT = 34,
  TIMELINE_LEFT = 24,
  TIMELINE_DOT_OFFSET_TOP = CELL_PADDING_VERTICAL, // + 3?
  IMG_MARGIN_TOP = 18,
  SCREEN_WIDTH = Dimensions.get("window").width;

const ICON_TYPES = {
  // matches names in getType()
  default: {
    defaultIcon: require("./img/timeline/triangle.png"),
    activeIcon: require("./img/timeline/triangle-active.png")
  },
  session: {
    defaultIcon: require("./img/timeline/circle.png"),
    activeIcon: require("./img/timeline/circle-active.png")
  },
  survey: {
    defaultIcon: require("./img/timeline/circle.png"),
    activeIcon: require("./img/timeline/circle-active.png")
  },
  image: {
    defaultIcon: require("./img/timeline/square.png"),
    activeIcon: require("./img/timeline/square-active.png")
  },
  link: {
    defaultIcon: require("./img/timeline/circle.png"),
    activeIcon: require("./img/timeline/circle-active.png")
  }
};

/* =============================================================================
<NotificationCell />
--------------------------------------------------------------------------------

Props:
  ! notification:object
  ! onPress:function

============================================================================= */

class NotificationCell extends React.Component {
  render() {
    const notificationType = this.getType();

    const content = (
      <View
        style={[
          styles.cell,
          this.props.firstRow ? styles.firstCell : null,
          this.props.style
        ]}
      >
        {this.renderTimelineSegment(notificationType)}
        {this.renderTimeAndText()}
        {this.renderAttachmentByType(notificationType)}
      </View>
    );

    return this.props.notification.url || this.props.notification.survey ? (
      <TouchableHighlight onPress={this.props.onPress}>
        {content}
      </TouchableHighlight>
    ) : (
      content
    );
  }

  renderTimelineSegment(type: string) {
    const { defaultIcon, activeIcon } = ICON_TYPES[type];
    const timelineTopOffset = this.props.firstRow ? TIMELINE_DOT_OFFSET_TOP : 0;

    return (
      <F8TimelineSegment
        left={TIMELINE_LEFT}
        lineOffsetTop={timelineTopOffset}
        dotSize={13}
        dotOffsetTop={TIMELINE_DOT_OFFSET_TOP}
        dotIconDefault={defaultIcon}
        dotIconActive={activeIcon}
        active={!this.props.isSeen}
      />
    );
  }

  renderTimeAndText() {
    const { notification } = this.props;
    return [
      <Text key={`${notification.id}_time`} style={styles.time}>
        {moment(notification.time)
          .fromNow()
          .toUpperCase()}
      </Text>,
      <Paragraph key={`${notification.id}_text`} style={styles.text}>
        {notification.text}
      </Paragraph>
    ];
  }

  renderAttachmentByType(type: string) {
    if (type === "image") {
      return this.renderImageAttachment();
    } else if (type === "session") {
      return this.renderSessionAttachment();
    } else if (type === "survey") {
      return this.renderSurveyAttachment();
    } else if (type === "link") {
      return this.renderLinkAttachment();
    } else {
      return null;
    }
  }

  renderImageAttachment() {
    const { notification } = this.props;
    const imageW = SCREEN_WIDTH;
    const imageH = imageW * IMAGE_RATIO;

    let imageCTAButton;
    if (notification.urlTitle) {
      const watchIcon =
        notification.urlTitle.toLowerCase().indexOf("watch") > -1
          ? require("../../common/img/buttons/play-medium.png")
          : null;
      imageCTAButton = (
        <F8Button
          icon={watchIcon}
          theme="yellow"
          caption={notification.urlTitle}
        />
      );
    }

    return (
      <View style={[styles.image, { width: imageW, height: imageH }]}>
        <Image
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: imageW,
            height: imageH
          }}
          source={{ uri: notification.image }}
        />
        {imageCTAButton}
      </View>
    );
  }

  renderSessionAttachment() {
    return (
      <F8SessionCell
        style={[styles.embeddedCard, styles.embeddedSession]}
        embedded={true}
        session={this.props.session}
        showStartEndTime={true}
      />
    );
  }

  renderSurveyAttachment() {
    return (
      <View style={[styles.embeddedCard, styles.embeddedSurvey]}>
        <Heading3 style={{ flex: 1, marginRight: 30 }}>Leave a review</Heading3>
        <Image
          style={{ position: "absolute", right: 14, top: 11 }}
          source={require("./img/stars.png")}
        />
      </View>
    );
  }

  renderLinkAttachment() {
    const { notification } = this.props;
    const linkText = notification.url
      .replace("https://", "")
      .replace("http://", "");
    const linkTitle = notification.urlTitle ? (
      <Heading3>{notification.urlTitle}</Heading3>
    ) : null;

    return (
      <View style={[styles.embeddedCard, styles.embeddedLink]}>
        {linkTitle}
        <Text numberOfLines={1} style={styles.url}>
          {linkText}
        </Text>
      </View>
    );
  }

  getType() {
    const { notification, session } = this.props;
    if (session) {
      return "session";
    } else if (notification.survey) {
      return "survey";
    } else if (notification.image) {
      return "image";
    } else if (notification.url) {
      return "link";
    } else {
      return "default";
    }
  }
}

/* StyleSheet =============================================================== */

const styles = StyleSheet.create({
  cell: {
    paddingVertical: CELL_PADDING_VERTICAL,
    paddingLeft: CELL_PADDING_LEFT,
    paddingRight: CELL_PADDING_RIGHT
  },
  firstCell: {
    marginTop: 15
  },
  time: {
    fontFamily: F8Fonts.helvetica,
    color: F8Colors.colorWithAlpha("black", 0.5),
    fontSize: 13,
    marginBottom: 5
  },
  text: {
    lineHeight: 22
  },
  embeddedCard: {
    marginTop: 15,
    borderWidth: 1,
    borderRadius: 2,
    borderColor: F8Colors.tangaroa,
    backgroundColor: F8Colors.white
  },
  embeddedSession: {
    paddingTop: 12,
    paddingBottom: 14
  },
  embeddedLink: {
    padding: 18
  },
  embeddedSurvey: {
    paddingVertical: 15,
    paddingHorizontal: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  url: {
    // flex: 1,
    color: F8Colors.blue,
    fontSize: 13,
    marginTop: 3
    // marginBottom: 10,
  },
  image: {
    marginTop: IMG_MARGIN_TOP,
    marginLeft: -CELL_PADDING_LEFT,
    alignItems: "center",
    justifyContent: "center"
  }
});

/* data store =============================================================== */

function select(store, props) {
  return {
    session: findSessionByURI(store.sessions, props.notification.url),
    isSeen: store.notifications.seen[props.notification.id]
  };
}

/* exports ================================================================== */
module.exports = connect(select)(NotificationCell);
