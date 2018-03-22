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
import F8Colors from "../common/F8Colors";
import TopicItem from "./TopicItem";
import ItemsWithSeparator from "../common/ItemsWithSeparator";
import {
  Animated,
  View,
  ScrollView,
  Modal,
  TouchableOpacity
} from "react-native";
import StyleSheet from "../common/F8StyleSheet";
import Hitbox from "../common/Hitbox";
import { HeaderTitle, Heading4 } from "../common/F8Text";
import { connect } from "react-redux";

const DRAWER_WIDTH = 300;

class FilterScreen extends React.Component {
  props: {
    isLoggedIn: boolean,
    topics: Array<string>,
    selectedTopics: { [id: string]: boolean },
    dispatch: (action: any) => void,
    navigator: any,
    onClose: ?() => void
  };
  state: {
    selectedTopics: { [id: string]: boolean },
    anim: Animated.Value
  };

  constructor(props) {
    super(props);
    this.state = {
      selectedTopics: { ...this.props.selectedTopics },
      anim: new Animated.Value(0)
    };

    (this: any).clearFilter = this.clearFilter.bind(this);
    (this: any).close = this.close.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.selectedTopics !== nextProps.selectedTopics) {
      this.setState({ selectedTopics: { ...nextProps.selectedTopics } });
    }
  }

  componentWillUpdate(nextProps, nextState) {
    if (this.props.visble !== nextProps.visible && nextProps.visible) {
      setTimeout(_ => {
        this.showDrawer(true);
      }, 250);
    }
  }

  render() {
    return (
      <Modal visible={this.props.visible} transparent={true}>
        <Hitbox
          onPress={this.close}
          style={{ backgroundColor: F8Colors.colorWithAlpha("tangaroa", 0.5) }}
        />
        <View style={styles.contentWrapper}>
          <Animated.View
            style={[
              styles.contentDrawer,
              {
                transform: [
                  {
                    translateX: this.state.anim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, DRAWER_WIDTH]
                    })
                  }
                ]
              }
            ]}
          >
            {this.renderHeader()}
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.scrollview}
            >
              {this.renderTopics()}
            </ScrollView>
          </Animated.View>
        </View>
      </Modal>
    );
  }

  renderHeader() {
    let clearButton;
    if (this.hasSelectedTopics()) {
      clearButton = (
        <TouchableOpacity style={{ flex: 0 }} onPress={this.clearFilter}>
          <Heading4 style={{ color: "rgba(106,148,230,1)" }}>CLEAR</Heading4>
        </TouchableOpacity>
      );
    }

    return (
      <View style={styles.header}>
        <HeaderTitle style={{ color: F8Colors.pink, flex: 1 }}>
          Filter
        </HeaderTitle>
        {clearButton}
      </View>
    );
  }

  renderTopics() {
    const topics = this.props.topics.map((topic, idx) => {
      return (
        <TopicItem
          key={topic}
          topic={topic}
          icon={idx}
          isChecked={this.state.selectedTopics[topic]}
          onToggle={this.toggleTopic.bind(this, topic)}
        />
      );
    });
    return (
      <ItemsWithSeparator separatorStyle={styles.separator}>
        {topics}
      </ItemsWithSeparator>
    );
  }

  toggleTopic(topic) {
    const selectedTopics = { ...this.state.selectedTopics };
    let value = !selectedTopics[topic];
    if (value) {
      selectedTopics[topic] = true;
    } else {
      delete selectedTopics[topic];
    }
    this.applyFilter(selectedTopics);
  }

  applyFilter(selectedTopics) {
    this.setState({ selectedTopics });
    this.props.onApply && this.props.onApply(selectedTopics);
  }

  close() {
    this.showDrawer(false);
    setTimeout(_ => {
      this.props.onClose && this.props.onClose();
    }, 250);
  }

  clearFilter() {
    this.applyFilter({});
  }

  hasSelectedTopics() {
    return this.props.topics.some(topic => this.state.selectedTopics[topic]);
  }

  showDrawer(visible) {
    const toValue = visible ? 0 : 1;
    const duration = visible ? 250 : 250;
    Animated.timing(this.state.anim, { toValue, duration }).start();
  }
}

const styles = StyleSheet.create({
  contentWrapper: {
    flex: 1,
    alignItems: "flex-end"
  },
  header: {
    height: 65,
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 23
  },
  contentDrawer: {
    flex: 1,
    width: DRAWER_WIDTH,
    backgroundColor: F8Colors.tangaroa
  },
  scrollview: {},
  separator: {
    backgroundColor: "rgba(20, 38, 74, 1)"
  }
});

module.exports = connect()(FilterScreen);
