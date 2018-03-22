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
import { connect } from "react-redux";

import {
  Dimensions,
  Image,
  View,
  TouchableOpacity,
  ScrollView
} from "react-native";

import { Text, Heading2, Heading4, Paragraph } from "../../common/F8Text";
import StyleSheet from "../../common/F8StyleSheet";
import F8Colors from "../../common/F8Colors";
import F8Button from "../../common/F8Button";
import ActionsOverlay from "../../common/ActionsOverlay";
import F8ScrollingHeader from "../../common/F8ScrollingHeader";
import MapView from "../../common/MapView";
import Carousel from "../../common/Carousel";

/* constants ================================================================ */

const WINDOW_WIDTH = Dimensions.get("window").width,
  HORIZONTAL_BREAKPOINT = WINDOW_WIDTH <= 320,
  CONTENT_PADDING_H = HORIZONTAL_BREAKPOINT ? 20 : 30;

/* =============================================================================
<F8DemoDetails />
============================================================================= */

const F8DemoDetails = React.createClass({
  getInitialState: function() {
    return {
      scrollTop: 0
    };
  },

  render: function() {
    const { demo, map } = this.props;
    const paddingBottom = demo.booking ? 110 : 30;

    return (
      <View style={[styles.container, this.props.style]}>
        <ScrollView
          contentContainerStyle={[styles.contentContainer, { paddingBottom }]}
          onScroll={({ nativeEvent }) =>
            this.setState({ scrollTop: nativeEvent.contentOffset.y })}
          scrollEventThrottle={100}
          showsVerticalScrollIndicator={false}
          automaticallyAdjustContentInsets={false}
        >
          {this.renderHeading(demo)}
          {this.renderDescription(demo.description)}
          {this.renderMap(map)}
          {this.renderLinksSection(demo.links)}
        </ScrollView>
        {this.renderActions(demo.booking)}
        {this.renderMiniHeader(demo.title)}
      </View>
    );
  },

  renderHeading({ title, logo, logoWidth, logoHeight }) {
    if (logo && logoWidth && logoHeight) {
      return (
        <Image
          style={[styles.logo, { width: logoWidth, height: logoHeight }]}
          source={{ uri: logo }}
        />
      );
    } else if (title) {
      return <Heading2 style={styles.title}>{title}</Heading2>;
    } else {
      return null;
    }
  },

  renderDescription(description) {
    if (description) {
      return <Paragraph>{description}</Paragraph>;
    } else {
      return null;
    }
  },

  renderMap(map) {
    if (map) {
      const mapWidth = Carousel.CardWidth - CONTENT_PADDING_H * 2;
      return <MapView width={mapWidth} style={styles.map} map={map} />;
    } else {
      return null;
    }
  },

  renderLinksSection(links) {
    if (!links || !links.length) {
      return null;
    }

    const content = links.map((link, idx) => {
      if (link.title && link.url) {
        return (
          <TouchableOpacity
            key={`${link.title}${idx}`}
            style={styles.link}
            onPress={_ =>
              this.props.navigator &&
              this.props.navigator.push({
                webview: link.url,
                backgroundColor: F8Colors.turquoise,
                titleColor: F8Colors.white,
                itemsColor: F8Colors.white
              })}
          >
            <Text numberOfLines={1} style={styles.linkText}>
              {link.title}
            </Text>
            <Image
              style={styles.linkArrow}
              source={require("../../common/img/pointer-right.png")}
            />
          </TouchableOpacity>
        );
      }
    });

    return <Section title="More Information">{content}</Section>;
  },

  // "Book Now" floating actions if necessary
  renderActions(bookingURL) {
    if (!bookingURL) {
      return null;
    }
    return (
      <ActionsOverlay
        gradientColors={["rgba(255,255,255,0)", "rgba(255,255,255,1)"]}
        buttonContainerStyles={{ paddingHorizontal: 15, paddingBottom: 12 }}
        style={styles.actions}
      >
        <F8Button
          style={{ flex: 1 }}
          caption="Book a Demo"
          onPress={_ => {
            this.props.navigator &&
              this.props.navigator.push({
                webview: bookingURL,
                backgroundColor: F8Colors.turquoise,
                titleColor: F8Colors.white,
                itemsColor: F8Colors.white
              });
          }}
        />
      </ActionsOverlay>
    );
  },

  // Small header that shows/hides at scroll y offset trigger
  renderMiniHeader(title) {
    return (
      <F8ScrollingHeader
        contentInset={CONTENT_PADDING_H}
        scrollTop={this.state.scrollTop}
        text={title}
      />
    );
  }
});

class Section extends React.Component {
  props: {
    title?: string,
    children?: any
  };

  render() {
    const { children } = this.props;
    if (React.Children.count(children) === 0) {
      return null;
    }
    let header;
    if (this.props.title) {
      header = (
        <Heading4 style={styles.sectionTitle}>
          {this.props.title.toUpperCase()}
        </Heading4>
      );
    }
    return (
      <View style={styles.section}>
        {header}
        {children}
      </View>
    );
  }
}

/* StyleSheet =============================================================== */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  },
  contentContainer: {
    paddingTop: 25,
    paddingHorizontal: CONTENT_PADDING_H
  },
  title: {
    color: F8Colors.blue,
    marginTop: 5,
    marginBottom: 20
  },
  logo: {
    marginTop: 5,
    marginBottom: 20
  },
  section: {
    marginTop: 30
  },
  sectionTitle: {
    marginBottom: 8
  },
  actions: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0
  },
  map: {
    marginTop: 32
  },

  link: {
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center"
  },
  linkText: {
    flex: 1,
    paddingRight: 10,
    alignSelf: "flex-start"
  },
  linkArrow: {
    flex: 0,
    alignSelf: "flex-end"
  }
});

/* data store =============================================================== */
function select(store, props) {
  const map = store.maps.find(({ name }) => name === props.demo.location);
  return {
    map
  };
}

/* exports ================================================================== */
module.exports = connect(select)(F8DemoDetails);
