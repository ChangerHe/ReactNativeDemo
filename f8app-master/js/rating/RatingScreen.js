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
import { View, ToastAndroid, Platform } from "react-native";
import StyleSheet from "../common/F8StyleSheet";
import F8Header from "../common/F8Header";
import { connect } from "react-redux";
import { submitSurveyAnswers } from "../actions";

import type { Survey } from "../reducers/surveys";
import type { Session } from "../reducers/sessions";
import type { Dispatch } from "../actions/types";

import RatingQuestion from "./RatingQuestion";
import { Heading2, Paragraph } from "../common/F8Text";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import F8Colors from "../common/F8Colors";
import F8Button from "../common/F8Button";
import F8Toast from "../common/F8Toast";

type Props = {
  sessions: Array<Session>,
  surveys: Array<Survey>,
  navigator: any,
  dispatch: Dispatch
};

class RatingScreen extends React.Component {
  props: Props;
  state: {
    selectedIndex: number
  };

  static defaultProps = {
    type: "Session",
    successMessage: "Rating sent!"
  };

  constructor(props: Props) {
    super(props);

    let defaultValues = {};
    (props.survey.questions || []).map((q, idx) => {
      if (q.optional) {
        defaultValues[idx] = "";
      }
    });
    this.state = { ...defaultValues };
  }

  render() {
    let rightItem;
    if (Platform.OS === "ios" && this.isValid()) {
      rightItem = {
        title: "Submit",
        icon: require("../common/img/header/confirm.png"),
        onPress: this.submit
      };
    }

    return (
      <View style={styles.container}>
        <F8Header
          backgroundColor={F8Colors.salmon}
          title={`Review ${this.props.type}`}
          leftItem={{
            title: "Cancel",
            icon: require("../common/img/header/x.png"),
            onPress: _ => this.props.navigator.pop()
          }}
          rightItem={rightItem}
        />
        {this.renderForm()}
      </View>
    );
  }

  renderForm() {
    const { sessions, survey, successMessage } = this.props;
    const session = sessions.find(s => s.id === survey.sessionId);

    const questions = survey.questions.map((question, ii) => (
      <RatingQuestion
        key={ii}
        style={styles.question}
        question={question}
        rating={this.state[ii]}
        onChange={rating => this.setState({ [ii]: rating })}
      />
    ));

    return (
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
        {this.renderHeader(session.title, survey.description)}
        {questions}
        {Platform.OS === "android" ? this.renderSubmitButton() : null}
        {this.state.iosSuccessMessage ? (
          <F8Toast onComplete={this.dismiss} text={successMessage} />
        ) : null}
      </KeyboardAwareScrollView>
    );
  }

  renderHeader(title, description) {
    return (
      <View style={styles.header}>
        {title ? <Heading2 style={styles.heading}>{title}</Heading2> : null}
        {description ? (
          <Paragraph style={styles.description}>{description}</Paragraph>
        ) : null}
      </View>
    );
  }

  renderSubmitButton() {
    let btn;
    if (this.isValid()) {
      btn = <F8Button caption="Submit Rating" onPress={this.submit} />;
    } else {
      btn = <F8Button theme="disabled" caption="Submit Rating" />;
    }

    return <View style={styles.footer}>{btn}</View>;
  }

  submit = () => {
    const { survey } = this.props;
    const answers = survey.questions.map((_, ii) => this.state[ii]);
    this.props.dispatch(submitSurveyAnswers(survey.id, answers)).then(() => {
      if (Platform.OS === "ios") {
        this.setState({ iosSuccessMessage: true });
      } else {
        this.dismiss();
      }
    });
  };

  dismiss = _ => {
    this.props.navigator.pop();
    if (Platform.OS === "android") {
      ToastAndroid.show(this.props.successMessage, ToastAndroid.SHORT);
    }
  };

  isValid() {
    const { questions } = this.props.survey;
    return Object.keys(this.state).length === questions.length;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: F8Colors.white
  },

  header: {
    alignItems: "center",
    paddingVertical: 30,
    paddingHorizontal: 22
  },
  // subheading:{
  //   fontFamily: F8Fonts.helvetica,
  //   fontSize: 15,
  //   color: F8Colors.blue,
  //   marginBottom: 15
  // },
  heading: {
    textAlign: "center",
    color: F8Colors.blue
    // marginBottom: 15,
  },

  description: {
    textAlign: "center",
    marginTop: 12
  },

  question: {
    paddingHorizontal: 22, // was:30
    marginBottom: 30
  },

  footer: {
    paddingHorizontal: 22,
    paddingBottom: 30
  }
});

function select(store) {
  return {
    sessions: store.sessions
  };
}

module.exports = connect(select)(RatingScreen);
