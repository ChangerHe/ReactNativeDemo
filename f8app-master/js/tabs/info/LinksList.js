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
import F8Colors from "../../common/F8Colors";
import F8Touchable from "../../common/F8Touchable";
import F8Linking from "../../common/F8Linking";
import { View, Image, StyleSheet } from "react-native";
import { Text, Heading4 } from "../../common/F8Text";

/* constants
============================================================================= */
const ICON_SIZE = 45;

/* <LinksList />
============================================================================= */

class LinksList extends React.Component {
  props: {
    title: string,
    links: Array<{
      logo?: ?string,
      title: string,
      url?: string,
      onPress?: () => void
    }>
  };

  constructor() {
    super();

    this.onSelectRow = this.onSelectRow.bind(this);
  }

  onSelectRow(url, title) {
    this.props.onSelect && this.props.onSelect(url, title);
  }

  render() {
    let content = this.props.links.map(link => (
      <Row onSelect={this.onSelectRow} link={link} key={link.title} />
    ));
    return (
      <View style={this.props.style}>
        {this.renderTitle()}
        {content}
      </View>
    );
  }

  renderTitle() {
    if (this.props.title) {
      return (
        <Heading4 style={styles.heading}>
          {this.props.title.toUpperCase()}
        </Heading4>
      );
    } else {
      return null;
    }
  }
}

class Row extends React.Component {
  props: {
    link: {
      logo: ?string,
      title: string,
      url?: string,
      onPress?: () => void
    }
  };

  render() {
    const { logo, title } = this.props.link;
    const image = logo && (
      <Image
        resizeMode="contain"
        style={styles.rowIcon}
        source={{ uri: logo }}
      />
    );
    const rowHeight = image ? styles.tallRow : undefined;

    return (
      <F8Touchable onPress={this.handlePress.bind(this)}>
        <View style={[styles.row, rowHeight]}>
          {image}
          <Text style={styles.rowTitle} numberOfLines={2}>
            {title}
          </Text>
          <Image source={require("../../common/img/pointer-right.png")} />
        </View>
      </F8Touchable>
    );
  }

  handlePress() {
    const { onSelect, link } = this.props;
    const { url, title } = link;
    // open in embedded web view
    if (onSelect) {
      onSelect(url, title);
    } else if (url) {
      F8Linking.openURL(url);
    }
  }
}

/* StyleSheet
============================================================================= */

const styles = StyleSheet.create({
  heading: {
    paddingHorizontal: 18,
    marginBottom: 20
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    // paddingVertical: 8,
    paddingRight: 16,
    marginLeft: 12,
    height: 54
  },
  tallRow: {
    height: 62 // could be 63
  },
  rowIcon: {
    width: ICON_SIZE,
    height: ICON_SIZE,
    marginRight: 15
  },
  rowTitle: {
    paddingLeft: 6,
    color: F8Colors.tangaroa,
    fontSize: 17,
    flex: 1
  },
  button: {
    padding: 10
  },
  like: {
    // letterSpacing: 1,
    // color: F8Colors.actionText,
    // fontSize: 12,
  }
});

/* Exports
============================================================================= */
module.exports = LinksList;
