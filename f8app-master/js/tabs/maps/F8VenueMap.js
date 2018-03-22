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
import {
  ScrollView,
  Image,
  Dimensions,
  Platform,
  PixelRatio
} from "react-native";
import PhotoView from "react-native-photo-view";
import StyleSheet from "../../common/F8StyleSheet";
import F8Colors from "../../common/F8Colors";

/* Config
============================================================================= */

const SCREEN_WIDTH = Dimensions.get("window").width,
  SCREEN_HEIGHT = Dimensions.get("window").height;

/* =============================================================================
<F8VenueMap />
============================================================================= */

class F8VenueMap extends React.Component {
  static defaultProps = {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    maximumZoomScale: 2
  };

  render() {
    const { map } = this.props;
    if (!map) {
      return null;
    }
    const url = urlForMap(map);
    const { width, height } = map;

    return Platform.OS === "ios"
      ? this.renderIOS(url, width, height)
      : this.renderAndroid(url);
  }

  renderAndroid(url) {
    return (
      <PhotoView
        source={{ uri: url }}
        style={{ width: this.props.width, height: this.props.height }}
      />
    );
  }

  renderIOS(url, width, height) {
    const contentHeight = this.props.height,
      contentWidth = contentHeight * (width / height);
    // minScale = Math.min(SCREEN_WIDTH/contentWidth, 1);
    return (
      <ScrollView
        style={[
          styles.container,
          this.props.style,
          {
            width: this.props.width,
            height: this.props.height
          }
        ]}
        horizontal={true}
        directionalLockEnabled={false}
        scrollEventThrottle={100}
        // onScroll={this.onZoomChanged}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        // minimumZoomScale={ minScale }
        maximumZoomScale={this.props.maximumZoomScale}
      >
        <Image
          style={{ width: contentWidth, height: contentHeight }}
          source={{ uri: url }}
        />
      </ScrollView>
    );
  }
}

function urlForMap(map) {
  if (!map) {
    return "";
  }
  switch (PixelRatio.get()) {
    case 1:
      return map.x1url;
    case 2:
      return map.x2url;
    case 3:
      return map.x3url;
  }
  return map.x3url;
}

/* StyleSheet
============================================================================= */

const styles = StyleSheet.create({
  container: {
    backgroundColor: F8Colors.bianca
  }
});

/* Export
============================================================================= */
module.exports = F8VenueMap;
