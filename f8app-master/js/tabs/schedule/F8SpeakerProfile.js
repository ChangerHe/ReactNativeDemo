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
import React from "react";
import { Heading3, Text } from "../../common/F8Text";
import { StyleSheet, View } from "react-native";

const F8SpeakerProfile = React.createClass({
  render: function() {
    const speaker = this.props.speaker;
    return (
      <View style={[styles.row, this.props.style]}>
        <Heading3 style={styles.name}>{speaker.name}</Heading3>
        {speaker.title ? (
          <Text style={styles.title}>{speaker.title}</Text>
        ) : null}
      </View>
    );
  }
});

const styles = StyleSheet.create({
  row: {
    paddingBottom: 14
  },
  name: {
    color: F8Colors.blue
  },
  title: {
    fontSize: 13,
    lineHeight: 16,
    color: F8Colors.tangaroa
  }
});

module.exports = F8SpeakerProfile;
