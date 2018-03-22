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

import F8SessionCell from "./F8SessionCell";
import FilterSessions from "./filterSessions";
import { Navigator } from "react-native-deprecated-custom-components";
import React from "react";
import SessionsSectionHeader from "./SessionsSectionHeader";
import PureListView from "../../common/PureListView";
import groupSessions from "./groupSessions";

import type { Session } from "../../reducers/sessions";
import type { SessionsListData } from "./groupSessions";

type Props = {
  day: number,
  sessions: Array<Session>,
  navigator: Navigator,
  renderEmptyList?: (day: number) => ReactElement
};

type State = {
  todaySessions: SessionsListData
};

class ScheduleListView extends React.Component {
  props: Props;
  state: State;
  _innerRef: ?PureListView;

  constructor(props: Props) {
    super(props);
    this.state = {
      todaySessions: groupSessions(
        FilterSessions.byDay(props.sessions, props.day)
      )
    };

    this._innerRef = null;

    (this: any).renderSectionHeader = this.renderSectionHeader.bind(this);
    (this: any).renderRow = this.renderRow.bind(this);
    (this: any).renderEmptyList = this.renderEmptyList.bind(this);
    (this: any).storeInnerRef = this.storeInnerRef.bind(this);
  }

  componentWillReceiveProps(nextProps: Props) {
    if (
      nextProps.sessions !== this.props.sessions ||
      nextProps.day !== this.props.day
    ) {
      this.setState({
        todaySessions: groupSessions(
          FilterSessions.byDay(nextProps.sessions, nextProps.day)
        )
      });
    }
  }

  render() {
    return (
      <PureListView
        ref={this.storeInnerRef}
        data={this.state.todaySessions}
        renderRow={this.renderRow}
        renderSectionHeader={this.renderSectionHeader}
        {...(this.props: any) /* flow can't guarantee the shape of props */}
        renderEmptyList={this.renderEmptyList}
      />
    );
  }

  renderSectionHeader(sectionData: any, sectionID: string) {
    let formatted =
      sectionID
        .toLowerCase()
        .replace("am", "")
        .replace("pm", "") || sectionID;
    return <SessionsSectionHeader title={formatted} />;
  }

  renderRow(session: Session, day: number) {
    return (
      <F8SessionCell
        onPress={_ => this.openSession(session, day)}
        session={session}
        firstRow={this.isFirstSessionCell(session.id)}
      />
    );
  }

  renderEmptyList(containerHeight: number): ?ReactElement {
    // if listview onLayout hasn't updated container height, don't bother
    if (containerHeight === 0) {
      return null;
    } // TODO: different fix
    // otherwise render fallback cta with a valid and centerable height
    const { renderEmptyList } = this.props;
    return renderEmptyList && renderEmptyList(this.props.day, containerHeight);
  }

  openSession(session: Session, day: number) {
    let allSessions = { ...this.state.todaySessions };
    this.props.navigator.push({
      day,
      session,
      allSessions
    });
  }

  storeInnerRef(ref: ?PureListView) {
    this._innerRef = ref;
  }

  scrollTo(...args: Array<any>) {
    this._innerRef && this._innerRef.scrollTo(...args);
  }

  getScrollResponder(): any {
    return this._innerRef && this._innerRef.getScrollResponder();
  }

  isFirstSessionCell(id) {
    const keys = Object.keys(this.state.todaySessions);
    const innerKeys = Object.keys(this.state.todaySessions[keys[0]]);
    return id === innerKeys[0];
  }
}

module.exports = ScheduleListView;
