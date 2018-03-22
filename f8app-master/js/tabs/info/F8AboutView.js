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
import { View, Image, Dimensions } from "react-native";
import { HorizontalRule } from "../../common/F8Text";
import LinksList from "./LinksList";
import CommonQuestions from "./CommonQuestions";
import WiFiDetails from "./WiFiDetails";
import AboutLocation from "./AboutLocation";

/* constants ================================================================ */

const PADDING_HORIZONTAL = 18,
  WINDOW_WIDTH = Dimensions.get("window").width;

/* <F8AboutView />
props: navigator (for webview), pages, policies, faqs, config
============================================================================= */

class F8AboutView extends React.Component {
  constructor() {
    super();

    this.webview = this.webview.bind(this);
  }

  webview(url) {
    this.props.navigator && this.props.navigator.push({ webview: url });
  }

  render() {
    const imageW = WINDOW_WIDTH - PADDING_HORIZONTAL * 2;
    const imageH = imageW / (375 / 115);

    return (
      <View style={{ paddingBottom: 80 }}>
        <Image
          key={"AV_HeaderImage"}
          source={require("./img/hello-world.png")}
          style={{
            width: imageW,
            height: imageH,
            marginTop: 30,
            marginBottom: 50,
            marginHorizontal: PADDING_HORIZONTAL,
            resizeMode: "contain"
          }}
        />

        <AboutLocation
          key={"AV_AboutLocation"}
          style={{ paddingHorizontal: PADDING_HORIZONTAL }}
          title="Facebook Developer Conference"
          date="April 18 + 19, 2017"
          venue="San Jose Convention Center"
          address={"150 West San Carlos Street\nSan Jose, CA 95113"}
        />

        {this.renderWiFiDetailsSection()}
        {this.renderFAQSection()}
        {this.renderPagesSection()}
        {this.renderPoliciesSection()}
        {this.renderThirdPartyNoticesSection()}
      </View>
    );
  }

  renderWiFiDetailsSection() {
    const { config } = this.props;
    if (config && config.wifiNetwork && config.wifiPassword) {
      return [
        <HorizontalRule
          key={"AV_HR_WiFI"}
          style={{
            marginVertical: 30,
            marginHorizontal: PADDING_HORIZONTAL
          }}
        />,
        <WiFiDetails
          key={"AV_WiFI"}
          network={config.wifiNetwork}
          password={config.wifiPassword}
        />
      ];
    } else {
      return null;
    }
  }

  renderFAQSection() {
    const { faqs } = this.props;

    if (faqs && faqs.length) {
      return [
        <HorizontalRule
          key={"AV_HR_CommonQs"}
          style={{
            marginVertical: 30,
            marginHorizontal: PADDING_HORIZONTAL
          }}
        />,
        <CommonQuestions
          key={"AV_CommonQs"}
          title="Frequently Asked Questions"
          faqs={this.props.faqs}
          style={{
            paddingHorizontal: PADDING_HORIZONTAL
          }}
        />
      ];
    } else {
      return null;
    }
  }

  renderPagesSection() {
    const { pages } = this.props;

    if (pages && pages.length) {
      return [
        <HorizontalRule
          key={"AV_HR_Pages"}
          style={{
            marginVertical: 30,
            marginHorizontal: PADDING_HORIZONTAL
          }}
        />,
        <LinksList
          key={"AV_Pages"}
          title="Facebook pages"
          links={this.props.pages}
          onSelect={this.webview}
        />
      ];
    } else {
      return null;
    }
  }

  renderPoliciesSection() {
    const { policies } = this.props;

    if (policies && policies.length) {
      return [
        <HorizontalRule
          key={"AV_HR_Policies"}
          style={{
            marginVertical: 30,
            marginHorizontal: PADDING_HORIZONTAL
          }}
        />,
        <LinksList
          key={"AV_Policies"}
          title="Policies & Notices"
          links={this.props.policies}
          onSelect={this.webview}
        />
      ];
    } else {
      return null;
    }
  }

  renderThirdPartyNoticesSection() {
    const { config } = this.props;
    const title = "Third Party Notices";
    if (config && config.thirdPartyNotices) {
      return [
        <HorizontalRule
          key={"AV_HR_TPN"}
          style={{
            marginVertical: 30,
            marginHorizontal: PADDING_HORIZONTAL
          }}
        />,
        <LinksList
          key={"AV_TPN"}
          title={title}
          onSelect={this.webview}
          links={[{ title, url: config.thirdPartyNotices }]}
        />
      ];
    } else {
      return null;
    }
  }
}

/* export =================================================================== */
export default F8AboutView;
