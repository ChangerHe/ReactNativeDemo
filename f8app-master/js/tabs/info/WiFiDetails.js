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
import StyleSheet from "../../common/F8StyleSheet";

/* Config
============================================================================= */

type Props = {
  network: string,
  password: string
};

type State = {};

/* =============================================================================
<WiFiDetails />
============================================================================= */

class WiFiDetails extends React.Component {
  props: Props;
  state: State = {};

  render() {
    const { network, password } = this.props;

    return (
      <View style={styles.container}>
        <Column
          style={styles.colNetwork}
          label="Wi-Fi Network"
          value={network}
        />
        <Column style={styles.colPassword} label="Password" value={password} />
      </View>
    );
  }
}

class Column extends React.Component {
  props: {
    label: string,
    value: string
    // style
  };

  render() {
    return (
      <View style={this.props.style}>
        <Heading4 style={styles.label}>
          {this.props.label.toUpperCase()}
        </Heading4>
        <Paragraph style={styles.value}>{this.props.value}</Paragraph>
      </View>
    );
  }
}

/* Styles
============================================================================= */

const styles = StyleSheet.create({
  container: {
    paddingTop: 0,
    flexDirection: "row"
  },
  colNetwork: {
    paddingHorizontal: 18
  },
  colPassword: {
    paddingHorizontal: 18
  }
});

/* Export
============================================================================= */
module.exports = WiFiDetails;
