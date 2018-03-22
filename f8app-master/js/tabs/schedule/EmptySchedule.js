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
import { Paragraph, Heading3 } from "../../common/F8Text";
import StyleSheet from "../../common/F8StyleSheet";
import { View, Image } from "react-native";
import F8Colors from "../../common/F8Colors";

class EmptySchedule extends React.Component {
  props: {
    style?: any,
    title?: string,
    titleStyles?: any,
    image?: number,
    text: string,
    textStyles?: any,
    children?: any
  };

  render() {
    const image = this.props.image && (
      <Image style={styles.image} source={this.props.image} />
    );
    const title = this.props.title && (
      <Heading3 style={[styles.title, this.props.titleStyles]}>
        {this.props.title}
      </Heading3>
    );

    return (
      <View style={[styles.container, this.props.style]}>
        <View style={styles.content}>
          {image}
          {title}
          <Paragraph style={[styles.text, this.props.textStyles]}>
            {this.props.text}
          </Paragraph>
          {this.props.children}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center"
  },
  content: {
    padding: 30,
    alignItems: "center"
  },
  image: {
    marginBottom: 20
  },
  title: {
    color: F8Colors.blue,
    textAlign: "center",
    marginBottom: 10
  },
  text: {
    textAlign: "center",
    marginBottom: 35
  }
});

module.exports = EmptySchedule;
