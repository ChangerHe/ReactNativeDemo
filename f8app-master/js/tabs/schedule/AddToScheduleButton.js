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
import { Animated } from "react-native";
import F8Button from "../../common/F8Button";

type Props = {
  isAdded: boolean,
  onPress: () => void,
  addedImageSource?: ?string,
  style?: any
};

type State = {
  anim: Animated.Value
};

const SAVED_LABEL = "Added to my F8";
const ADD_LABEL = "Add to my F8";

class AddToScheduleButton extends React.Component {
  props: Props;
  state: State;

  constructor(props: Props) {
    super(props);
    this.state = {
      anim: new Animated.Value(props.isAdded ? 1 : 0)
    };
  }

  render() {
    const { isAdded, addedImageSource, style } = this.props;
    const buttonTheme = isAdded ? "yellow" : "pink";
    const caption = isAdded ? SAVED_LABEL : ADD_LABEL;
    const icon =
      isAdded && addedImageSource
        ? addedImageSource
        : require("./img/added.png");

    return (
      <F8Button
        style={style}
        icon={icon}
        caption={caption}
        theme={buttonTheme}
        onPress={this.props.onPress}
      />
    );
  }

  componentWillReceiveProps(nextProps: Props) {
    if (this.props.isAdded !== nextProps.isAdded) {
      const toValue = nextProps.isAdded ? 1 : 0;
      Animated.spring(this.state.anim, { toValue }).start();
    }
  }
}

module.exports = AddToScheduleButton;
// $FlowFixMe
module.exports.__cards__ = define => {
  let f;
  setInterval(() => f && f(), 1000);

  define("Inactive", (state, update) => (
    <AddToScheduleButton isAdded={false} onPress={() => update(!state)} />
  ));

  define("Active", (state, update) => (
    <AddToScheduleButton isAdded={true} onPress={() => update(!state)} />
  ));

  define("Animated", (state = false, update) => {
    f = () => update(!state);
    return <AddToScheduleButton isAdded={state} onPress={() => {}} />;
  });
};
