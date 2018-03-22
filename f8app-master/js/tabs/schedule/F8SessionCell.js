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
import formatDuration from "./formatDuration";
import formatTime from "./formatTime";
import { connect } from "react-redux";
import type { Session } from "../../reducers/sessions";

import F8Colors from "../../common/F8Colors";
import F8Fonts from "../../common/F8Fonts";
import { Text } from "../../common/F8Text";
import F8TimelineSegment from "../../common/F8TimelineSegment";
import { TouchableOpacity, View, Image, StyleSheet } from "react-native";

/* Constants
============================================================================= */

const CELL_PADDING_TOP = 8,
  CELL_PADDING_RIGHT = 20,
  CELL_PADDING_BOTTOM = 12,
  DURATION_FONT_SIZE = 14,
  CELL_LEFT = 95,
  TIMELINE_LEFT = CELL_LEFT - 18,
  TIMELINE_DOT_TOP = CELL_PADDING_TOP + 7;

/* =============================================================================
<F8SessionCell />
============================================================================= */

class F8SessionCell extends React.Component {
  props: {
    session: Session,
    isFavorite: boolean,
    showStartEndTime: boolean,
    onPress: ?() => void,
    style: any
  };

  static defaultProps = {
    firstRow: false,
    embedded: false
  };

  render() {
    const { embedded, isFavorite } = this.props;
    const embeddedStyles = embedded ? styles.cellEmbedded : null;

    return (
      <View style={[styles.cell, embeddedStyles, this.props.style]}>
        {!embedded ? this.renderTimeline() : null}
        {this.renderContent()}
        {isFavorite ? this.renderFavoritesIcon() : null}
      </View>
    );
  }

  renderTimeline() {
    const { firstRow } = this.props;
    if (firstRow) {
      return (
        <F8TimelineSegment
          left={TIMELINE_LEFT}
          lineOffsetTop={TIMELINE_DOT_TOP + 2}
          dotOffsetTop={TIMELINE_DOT_TOP}
        />
      );
    } else {
      return (
        <F8TimelineSegment
          left={TIMELINE_LEFT}
          dotOffsetTop={TIMELINE_DOT_TOP}
        />
      );
    }
  }

  renderContent() {
    if (this.props.onPress) {
      return (
        <TouchableOpacity activeOpacity={0.75} onPress={this.props.onPress}>
          {this.renderTitle()}
          {this.renderMeta()}
        </TouchableOpacity>
      );
    } else {
      return [this.renderTitle(), this.renderMeta()];
    }
  }

  renderTitle() {
    const { session } = this.props;
    const embedded = this.props.embedded ? styles.titleEmbedded : null;
    return (
      <View key={`${session.id}_title`} style={styles.titleSection}>
        <Text numberOfLines={3} style={[styles.titleText, embedded]}>
          {session.title}
        </Text>
      </View>
    );
  }

  renderMeta() {
    const { session } = this.props;
    return (
      <Text
        key={`${session.id}_meta`}
        numberOfLines={1}
        style={styles.duration}
      >
        <Text style={{ color: F8Colors.colorForLocation(session.location) }}>
          {session.location.toUpperCase()}
        </Text>
        {" - "}
        {this.getFormattedTime()}
      </Text>
    );
  }

  renderFavoritesIcon() {
    const { title } = this.props.session;
    let iconSource = require("./img/added.png");
    if (title && title.toLowerCase().indexOf("react") > -1) {
      iconSource = require("./img/added-react.png");
    }
    return (
      <View style={styles.added}>
        <Image style={{ tintColor: F8Colors.pink }} source={iconSource} />
      </View>
    );
  }

  getFormattedTime() {
    const { startTime, endTime } = this.props.session;
    if (this.props.showStartEndTime) {
      return formatTime(startTime, true) + "-" + formatTime(endTime);
    } else {
      return formatDuration(startTime, endTime);
    }
  }
}

/* StyleSheet
============================================================================= */

const styles = StyleSheet.create({
  cell: {
    paddingTop: CELL_PADDING_TOP,
    paddingBottom: CELL_PADDING_BOTTOM,
    paddingLeft: CELL_LEFT,
    paddingRight: CELL_PADDING_RIGHT,
    // backgroundColor: F8Colors.background,
    justifyContent: "center"
  },
  cellEmbedded: {
    paddingLeft: CELL_PADDING_RIGHT
  },
  titleSection: {
    paddingRight: 9,
    flexDirection: "row",
    alignItems: "center"
  },
  titleAndDuration: {
    justifyContent: "center"
  },
  titleText: {
    flex: 1,
    fontSize: F8Fonts.normalize(17),
    lineHeight: 22,
    color: F8Colors.tangaroa,
    marginBottom: 3,
    marginRight: 10
  },
  titleEmbedded: {
    fontFamily: F8Fonts.fontWithWeight("helvetica", "semibold")
  },
  duration: {
    fontSize: DURATION_FONT_SIZE,
    color: F8Colors.colorWithAlpha("tangaroa", 0.6)
  },
  added: {
    position: "absolute",
    backgroundColor: F8Colors.yellow,
    alignItems: "center",
    justifyContent: "center",
    width: 23,
    height: 21,
    right: 0,
    top: CELL_PADDING_TOP
  }
});

/* Redux
============================================================================= */
function select(store, props) {
  return {
    isFavorite: !!store.schedule[props.session.id]
  };
}

/* Export
============================================================================= */
module.exports = connect(select)(F8SessionCell);
