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
import { QueryRenderer, graphql } from "react-relay";
import idx from "idx";
import { connect } from "react-redux";
import ListContainer from "../../common/ListContainer";
import PureListView from "../../common/PureListView";
import F8Colors from "../../common/F8Colors";
import StyleSheet from "../../common/F8StyleSheet";
import { Dimensions, View, Image, TouchableOpacity } from "react-native";
import F8Button from "../../common/F8Button";
import { Heading2, Heading5, Text } from "../../common/F8Text";
import F8BackgroundRepeat from "../../common/F8BackgroundRepeat";
import environment from "../../relay-environment";

/* constants ================================================================ */

const WINDOW_WIDTH = Dimensions.get("window").width,
  PADDING_HORIZONTAL = 12,
  ILLUSTRATION_HEIGHT = 505,
  ILLUSTRATION_VISIBLE = 36,
  ILLUSTRATION_OFFSET = ILLUSTRATION_HEIGHT - ILLUSTRATION_VISIBLE,
  PATTERN_VISIBLE = 12,
  PATTERN_HEIGHT = ILLUSTRATION_HEIGHT - 25,
  PATTERN_OFFSET = PATTERN_HEIGHT - PATTERN_VISIBLE;

/**
* ==============================================================================
* <F8DemosView />
* ------------------------------------------------------------------------------
* @param {Array.<Demo>} demos Parse Demo class
* @param {Config} config Parse config vars
* @param {F8Navigator} navigator Navigation methods
* @return {ReactElement}
* ==============================================================================
*/

class F8DemosView extends React.Component {
  constructor(props) {
    super(props);

    this.renderView = this.renderView.bind(this);
    this.onRowSelect = this.onRowSelect.bind(this);
  }

  render() {
    return (
      <QueryRenderer
        environment={environment}
        query={graphql`
          query F8DemosViewQuery {
            demos {
              title
              description
              booking
              location
              links {
                title
                url
              }
              logo
              logoHeight
              logoWidth
              devGarage
            }
          }
        `}
        render={({ error, props }) => {
          const sortedDemos = sortDemos(idx(props, _ => _.demos));
          const demos = sortedDemos.filter(d => !d.devGarage);
          const garages = sortedDemos.filter(d => d.devGarage);
          const hasBookables = !!sortedDemos.find(d => d.booking);
          return (
            <ListContainer
              headerBackgroundColor={F8Colors.turquoise}
              headerTitleColor={F8Colors.sapphire}
              title="Demos"
              leftItem={{
                title: "Map",
                layout: "icon",
                icon: require("../../common/img/header/map.png"),
                onPress: _ =>
                  this.props.navigator &&
                  this.props.navigator.push({ maps: true })
              }}
            >
              <PureListView
                renderRow={_ => {}}
                renderEmptyList={() =>
                  this.renderView(demos, garages, hasBookables)}
              />
            </ListContainer>
          );
        }}
      />
    );
  }

  renderView(demos, garages, hasBookables) {
    const hasBothTables = demos.length && garages.length;

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <F8BackgroundRepeat
            width={WINDOW_WIDTH}
            height={PATTERN_HEIGHT}
            source={require("../../common/img/pattern-dots.png")}
            style={styles.headerBackground}
          />
          <Image
            style={styles.headerIllustration}
            source={require("./img/header.png")}
          />
        </View>
        <View style={styles.contentContainer}>
          <Heading2 style={styles.mainHeading}>
            {"Here are the demos\nyou’ll find at F8."}
          </Heading2>
          {this.renderTable(demos, hasBothTables ? "Demos" : undefined)}
          {this.renderTable(
            this.props.garages,
            hasBothTables ? "Developer Garage" : undefined
          )}
          {this.renderManageReservationsButton(hasBookables)}
        </View>
      </View>
    );
  }

  renderTable(rows: Array<mixed> = [], groupTitle: ?string) {
    if (rows.length) {
      const tableHeading = groupTitle ? (
        <Heading5 style={styles.tableHeading}>
          {groupTitle.toUpperCase()}
        </Heading5>
      ) : null;
      return (
        <View style={styles.section}>
          {tableHeading}
          <View style={styles.table}>
            {rows.map((cell, index) => {
              const isFirst = index === 0;
              const { title, booking } = cell;
              let bookableFlag;
              if (booking) {
                bookableFlag = (
                  <Image
                    style={styles.bookable}
                    source={require("./img/bookable-flag.png")}
                  />
                );
              }
              const dividerStyles = isFirst ? null : styles.tableRowDivider;
              return (
                <View style={[styles.tableRow, dividerStyles]} key={title}>
                  {bookableFlag}
                  <TouchableOpacity
                    style={{
                      flex: 1,
                      alignItems: "center",
                      justifyContent: "center",
                      paddingHorizontal: 20
                    }}
                    onPress={_ => this.onRowSelect(index, rows, groupTitle)}
                  >
                    <Text style={styles.tableRowLabel}>{title}</Text>
                  </TouchableOpacity>
                </View>
              );
            })}
          </View>
        </View>
      );
    } else {
      return null;
    }
  }

  renderManageReservationsButton(hasBookables) {
    if (hasBookables && this.props.config.manageBookingsURL) {
      return (
        <F8Button
          opacity={0.5}
          theme="bordered"
          caption="Manage Reservations"
          onPress={_ =>
            this.props.navigator &&
            this.props.navigator.push({
              webview: this.props.config.manageBookingsURL,
              backgroundColor: F8Colors.turquoise,
              titleColor: F8Colors.white,
              itemsColor: F8Colors.white
            })}
        />
      );
    } else {
      return null;
    }
  }

  onRowSelect(selectedIndex: number, rows: Array<mixed>, title: ?string) {
    this.props.navigator &&
      this.props.navigator.push({
        allDemos: rows,
        selectedIndex,
        title
      });
  }
}

/* StyleSheet =============================================================== */

const styles = StyleSheet.create({
  container: {},
  contentContainer: {
    paddingTop: 11,
    paddingHorizontal: PADDING_HORIZONTAL,
    paddingBottom: 30
  },
  header: {
    alignItems: "center"
  },
  headerBackground: {
    position: "absolute",
    left: 0,
    top: -PATTERN_OFFSET,
    right: 0
  },
  headerIllustration: {
    marginTop: -ILLUSTRATION_OFFSET
  },
  mainHeading: {
    textAlign: "center",
    color: F8Colors.blue,
    marginTop: 10,
    marginBottom: 13
  },
  section: {
    marginTop: 10,
    marginBottom: 19
  },
  tableHeading: {
    textAlign: "center",
    color: F8Colors.pink
  },
  table: {
    marginTop: 10,
    borderRadius: 2,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.15)",
    backgroundColor: F8Colors.white
  },
  tableRow: {
    height: 60
  },
  tableRowDivider: {
    borderTopWidth: 1,
    borderColor: F8Colors.colorWithAlpha("black", 0.15)
  },
  tableRowLabel: {
    fontSize: 17,
    textAlign: "center",
    color: F8Colors.tangaroa,
    backgroundColor: "transparent",

    android: {
      paddingBottom: 5
    }
  },
  bookable: {
    position: "absolute",
    right: 0,
    top: 0,
    width: 86,
    height: 56
  }
});

/* redux select ============================================================= */

function sortDemos(demos = []) {
  const other = [],
    pinned = [];
  (demos || []).map(demo => {
    if (demo.booking) {
      pinned.push(demo);
    } else {
      other.push(demo);
    }
  });
  return [...pinned, ...other];
}

function select(store) {
  return {
    config: store.config
  };
}

/* exports ================================================================== */
module.exports = connect(select)(F8DemosView);
