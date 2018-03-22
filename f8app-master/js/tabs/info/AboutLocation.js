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
import { View } from "react-native";
import { Paragraph, Heading4 } from "../../common/F8Text";
import F8Colors from "../../common/F8Colors";
import DirectionsLink from "./DirectionsLink";

type Props = {
  title: string,
  date: string,
  venue: string,
  address: string
};

type State = {};

/**
* ==============================================================================
* <AboutLocation />
* ------------------------------------------------------------------------------
* @param {?string} title Section title
* @param {?string} date Formatted date text
* @param {?string} venue Venue name
* @param {string} address Address used for opening maps
* @return {ReactElement}
* ==============================================================================
*/

export default class AboutLocation extends React.Component {
  props: Props;
  state: State = {};

  render() {
    return (
      <View style={this.props.style}>
        {this.renderTitle()}
        {this.renderDate()}
        {this.renderVenue()}
        {this.renderAddress()}
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

  renderDate() {
    if (this.props.date) {
      return <Paragraph>{this.props.date}</Paragraph>;
    } else {
      return null;
    }
  }

  renderVenue() {
    if (this.props.venue) {
      return <Paragraph>{this.props.venue}</Paragraph>;
    } else {
      return null;
    }
  }

  renderAddress() {
    if (this.props.address) {
      return (
        <DirectionsLink address={this.props.address.replace("\n", " ")}>
          <Paragraph
            style={{ color: F8Colors.blue, textDecorationLine: "underline" }}
          >
            {this.props.address}
          </Paragraph>
        </DirectionsLink>
      );
    } else {
      return null;
    }
  }
}
