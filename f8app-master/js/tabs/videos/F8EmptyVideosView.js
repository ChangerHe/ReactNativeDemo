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

/* Dependencies
============================================================================= */

import React from "react";
import F8Colors from "../../common/F8Colors";
import { Dimensions, View, Image } from "react-native";
import { Text } from "../../common/F8Text";
import StyleSheet from "../../common/F8StyleSheet";
import F8Button from "../../common/F8Button";

const HEADER_IMAGE_RATIO = 257 / 375,
  WIN_WIDTH = Dimensions.get("window").width,
  HEADER_IMAGE_WIDTH = WIN_WIDTH,
  HEADER_IMAGE_HEIGHT = HEADER_IMAGE_WIDTH * HEADER_IMAGE_RATIO;

/* <F8EmptyVideosView />
============================================================================= */

class F8EmptyVideosView extends React.Component {
  static defaultProps = {
    onPress: _ => {}
  };

  render() {
    return (
      <View style={styles.container}>
        <Image
          source={require("./img/empty-header.png")}
          style={[
            styles.header,
            { width: HEADER_IMAGE_WIDTH, height: HEADER_IMAGE_HEIGHT }
          ]}
        />
        <View style={styles.content}>
          <Text style={styles.text}>
            F8 2017 videos will be added here on the evening of Day 1.
          </Text>
          <F8Button
            theme="bordered"
            opacity={0.5}
            caption="Watch F8 2016 Videos"
            onPress={this.props.onPress}
          />
        </View>
      </View>
    );
  }
}

/* StyleSheet
============================================================================= */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20
  },
  content: {
    paddingHorizontal: 46
  },
  text: {
    marginTop: 22,
    marginBottom: 48,
    fontSize: 17,
    lineHeight: 27,
    color: F8Colors.tangaroa,
    textAlign: "center"
  }
});

/* Exports
============================================================================= */
export default F8EmptyVideosView;
