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
import F8Fonts from "../../common/F8Fonts";
import F8Linking from "../../common/F8Linking";
import { StyleSheet, View, Text } from "react-native";
import { Heading4, Paragraph } from "../../common/F8Text";
import Hyperlink from "react-native-hyperlink";
import F8Colors from "../../common/F8Colors";

class CommonQuestions extends React.Component {
  render() {
    let content = this.props.faqs.map(({ question, answer }) => (
      <Row question={question} answer={answer} key={question} />
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
      return <Heading4>{this.props.title.toUpperCase()}</Heading4>;
    } else {
      return null;
    }
  }
}

class Row extends React.Component {
  render() {
    return (
      <View style={styles.row}>
        <Hyperlink
          linkStyle={styles.hyperlink}
          onPress={url =>
            F8Linking.canOpenURL(url).then(supported => {
              if (supported) {
                F8Linking.openURL(url);
              }
            })}
        >
          <Paragraph>
            <Text style={styles.question}>{this.props.question} </Text>
            <Text>{this.props.answer}</Text>
          </Paragraph>
        </Hyperlink>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  row: {
    marginVertical: 15
  },
  question: {
    fontFamily: F8Fonts.fontWithWeight("helvetica", "semibold")
  },
  hyperlink: {
    color: F8Colors.blue,
    textDecorationLine: "underline",
    textDecorationColor: F8Colors.blue
  }
});

module.exports = CommonQuestions;
