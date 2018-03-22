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
import F8Fonts from "../../common/F8Fonts";
import React from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "../../common/F8Text";

class SessionsSectionHeader extends React.Component {
  props: {
    title: string
  };

  render() {
    return (
      <View style={styles.header}>
        <Text style={styles.label}>{this.props.title}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    // position:'relative',
    left: 0,
    width: 56,
    marginBottom: -30,
    justifyContent: "center",
    height: 30
  },
  label: {
    paddingTop: 6,
    textAlign: "right",
    fontFamily: F8Fonts.helvetica,
    fontSize: 13,
    color: F8Colors.tangaroa
  }
});

module.exports = SessionsSectionHeader;
