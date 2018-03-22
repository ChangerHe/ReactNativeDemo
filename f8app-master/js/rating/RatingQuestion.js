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
import { Paragraph } from "../common/F8Text";

import StarRating from "./StarRating";
import RadioButtons from "./RadioButtons";
import WrittenResponse from "./WrittenResponse";
import StarRatings from "./StarRatings";

/* <RatingQuestion />
============================================================================= */

export default class RatingQuestion extends React.Component {
  render() {
    const type = this.getQuestionType();

    return (
      <View style={this.props.style}>
        {this.renderQuestionText(type)}
        {this.renderQuestionByType(type)}
      </View>
    );
  }

  getQuestionType() {
    const { question } = this.props;
    if (question.written) {
      return "written";
    } else if (question.feedback) {
      return "feedback";
    } else if (question.radios) {
      return "radios";
    } else if (question.ratings) {
      return "ratings";
    } else if (question.rating) {
      return "rating";
    } else {
      return null;
    }
  }

  renderQuestionByType(type) {
    const { question, rating, onChange } = this.props;

    if (type === "written") {
      const { placeholder, maxLength } = question.written;
      return (
        <WrittenResponse
          placeholder={placeholder}
          maxLength={maxLength}
          onChange={onChange}
        />
      );
    } else if (type === "feedback") {
      return (
        <WrittenResponse placeholder={question.text} onChange={onChange} />
      );
    } else if (type === "radios") {
      return (
        <RadioButtons
          options={question.radios}
          selectedIndex={rating}
          onChange={onChange}
        />
      );
    } else if (type === "rating") {
      return (
        <View style={{ marginTop: 15 }}>
          <StarRating
            labels={question.rating}
            rating={rating}
            onChange={onChange}
          />
        </View>
      );
    } else if (type === "ratings") {
      const { rows, labels } = question.ratings;
      return (
        <StarRatings
          rows={rows}
          labels={labels}
          rating={rating}
          onChange={onChange}
        />
      );
    } else {
      return null;
    }
  }

  renderQuestionText(type) {
    if (type === "feedback") {
      return null;
    } else {
      return (
        <Paragraph style={styles.questionText}>
          {this.props.question.text}
        </Paragraph>
      );
    }
  }
}

/* StyleSheet =============================================================== */

const styles = StyleSheet.create({
  questionText: {
    fontFamily: F8Fonts.fontWithWeight("helvetica", "semibold"),
    color: F8Colors.tangaroa,
    fontSize: F8Fonts.normalize(17),
    textAlign: "center",
    marginBottom: 10
  }
});
