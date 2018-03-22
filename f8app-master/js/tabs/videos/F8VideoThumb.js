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
import { Dimensions, View, Image, TouchableOpacity } from "react-native";
import { Text } from "../../common/F8Text";
import StyleSheet from "../../common/F8StyleSheet";
import F8Fonts from "../../common/F8Fonts";

/* constants ================================================================ */

const WINDOW_WIDTH = Dimensions.get("window").width,
  CONTAINER_PADDING_H = 15,
  GUTTER = 8,
  ROW_SPACING = 40,
  WIDTH_LARGE = WINDOW_WIDTH - CONTAINER_PADDING_H * 2,
  WIDTH_SMALL = (WINDOW_WIDTH - CONTAINER_PADDING_H * 2 - GUTTER) / 2,
  IMAGE_ASPECT_RATIO_SMALL = 99 / 169,
  IMAGE_ASPECT_RATIO_LARGE = 202 / 344,
  NUMLINES_SMALL = 3,
  NUMLINES_LARGE = 2;

/**
* ==============================================================================
* <F8VideoThumb />
* ------------------------------------------------------------------------------
* @param {?String} type Layout style (default "small")
* @param {?String} title Video title
* @param {?String} length Video length
* @param {?String} image Thumbnail image source
* @param {?Boolean} watched Has video already been watched by user
* @param {?Number} activeOpacity On-tap opacity value (default 0.75)
* @return {ReactElement}
* ==============================================================================
*/

class F8VideoThumb extends React.Component {
  static defaultProps = {
    type: "small",
    activeOpacity: 0.75
  };

  render() {
    const {
      id,
      type,
      onPress,
      image,
      title,
      activeOpacity,
      length,
      watched
    } = this.props;
    const { imageWidth, imageHeight } = this.getImageSize(type);

    return (
      <TouchableOpacity
        activeOpacity={activeOpacity}
        style={type === "large" ? styles.containerLarge : styles.containerSmall}
        onPress={_ => onPress && onPress(id)}
      >
        <View style={styles.thumb}>
          {this.renderImage(image, imageWidth, imageHeight)}
          {this.renderLength(type, length, watched)}
        </View>
        {this.renderTitle(type, title)}
      </TouchableOpacity>
    );
  }

  renderImage(src, width, height) {
    if (src) {
      return (
        <Image
          style={[styles.image, { width, height }]}
          source={{ uri: src }}
        />
      );
    } else {
      return <View style={[styles.image, { width, height }]} />;
    }
  }

  renderLength(type, length, watched) {
    const timeDifferences =
      type === "large" ? styles.timeLarge : styles.timeSmall;
    if (length) {
      return <Text style={[styles.time, timeDifferences]}>{length}</Text>;
    } else {
      return null;
    }
  }

  renderTitle(type, title) {
    const titleLineLimit = type === "large" ? NUMLINES_LARGE : NUMLINES_SMALL;
    const titleDifferences =
      type === "large" ? styles.titleLarge : styles.titleSmall;
    if (title) {
      return (
        <Text
          numberOfLines={titleLineLimit}
          style={[styles.title, titleDifferences]}
        >
          {title}
        </Text>
      );
    } else {
      return null;
    }
  }

  getImageSize(type) {
    return type === "large"
      ? {
          imageWidth: WIDTH_LARGE,
          imageHeight: WIDTH_LARGE * IMAGE_ASPECT_RATIO_LARGE
        }
      : {
          imageWidth: WIDTH_SMALL,
          imageHeight: WIDTH_SMALL * IMAGE_ASPECT_RATIO_SMALL
        };
  }
}

/* StyleSheet =============================================================== */
const styles = StyleSheet.create({
  containerLarge: {
    marginVertical: ROW_SPACING / 2,
    width: WIDTH_LARGE,
    paddingHorizontal: GUTTER / 2
  },
  containerSmall: {
    marginVertical: ROW_SPACING / 2,
    width: WIDTH_SMALL + GUTTER,
    paddingHorizontal: GUTTER / 2
  },

  image: {
    backgroundColor: F8Colors.tangaroa,
    resizeMode: "cover"
  },

  time: {
    position: "absolute",
    right: 0,
    bottom: 0,
    backgroundColor: F8Colors.colorWithAlpha("tangaroa", 0.8),
    fontFamily: F8Fonts.helvetica,
    color: "white"
  },
  timeSmall: {
    fontSize: 11,
    paddingVertical: 2,
    paddingHorizontal: 3
  },
  timeLarge: {
    fontSize: 13,
    paddingVertical: 3,
    paddingHorizontal: 5
  },

  title: {
    color: F8Colors.black
  },
  titleSmall: {
    marginTop: 9,
    fontSize: 13,
    lineHeight: F8Fonts.lineHeight(17)
  },
  titleLarge: {
    marginTop: 12,
    fontSize: 17,
    lineHeight: F8Fonts.lineHeight(22)
  }
});

/* export =================================================================== */
export default F8VideoThumb;
