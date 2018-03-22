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
import F8Colors from "../common/F8Colors";
import F8Fonts from "../common/F8Fonts";
import { View } from "react-native";
import StyleSheet from "../common/F8StyleSheet";
import { Text } from "../common/F8Text";
import StarRating from "./StarRating";

/* StarRatings =============================================================== */

class StarRatings extends React.Component {
  static defaultProps = {
    rows: []
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextState !== this.state) {
      const { rows } = this.props;
      if (Object.keys(nextState).length === rows.length) {
        const answers = rows.map((_, ii) => nextState[ii]);
        this.props.onChange && this.props.onChange(answers);
      }
    }
  }

  render() {
    const { rows, labels } = this.props;
    if (!rows.length) {
      return null;
    }

    const content = rows.map((row, idx) => (
      <View key={`${row}${idx}`} style={styles.row}>
        <Text style={styles.heading}>{row.toUpperCase()}</Text>
        <StarRating
          labels={labels}
          rating={this.state[idx]}
          onChange={val => this.setState({ [idx]: val })}
        />
      </View>
    ));

    return <View style={styles.container}>{content}</View>;
  }
}

/* StyleSheet =============================================================== */

const styles = StyleSheet.create({
  row: {
    marginVertical: 15
  },
  heading: {
    fontFamily: F8Fonts.helvetica,
    fontSize: F8Fonts.normalize(15),
    textAlign: "center",
    color: F8Colors.blue,
    marginBottom: 17
  }
});

/* exports & Playground cards =============================================== */

module.exports = StarRatings;
module.exports.__cards = define => {
  define("Default", (state = null, update) => (
    <StarRatings
      rows={[]}
      labels={{ low: "Not at all", high: "Very likely" }}
      rating={state}
      onChange={update}
    />
  ));
};
