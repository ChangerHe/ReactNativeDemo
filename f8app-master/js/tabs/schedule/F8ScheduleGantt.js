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

import moment from "moment-timezone";
import React from "react";
import { View, StyleSheet } from "react-native";

import F8GanttGrid from "./F8GanttGrid";
import F8GanttNowMarker from "./F8GanttNowMarker";
import F8GanttRow from "./F8GanttRow";

/* constants ================================================================ */
const ROW_HEIGHT = 26,
  ROW_GUTTERS = 10,
  GRID_PADDING = 10,
  LABELS_HEIGHT = 22;

/* =============================================================================
<F8ScheduleGantt />
--------------------------------------------------------------------------------
Props:
  ! sessions:array
  ! now:number
============================================================================= */

export default class F8ScheduleGantt extends React.Component {
  constructor(props) {
    super(props);

    const { filtered, earliest, latest } = this.filterSessions(props.sessions);
    this.state = {
      now: props.now,
      filteredSessions: filtered,
      dayStart: earliest,
      dayEnd: latest
    };
  }

  componentWillReceiveProps(nextProps) {
    const newState = {};
    if (nextProps.now !== this.props.now) {
      newState.now = nextProps.now;
    }
    if (nextProps.sessions !== this.props.sessions) {
      const { filtered, earliest, latest } = this.filterSessions(
        nextProps.sessions
      );
      newState.filteredSessions = filtered;
      newState.dayStart = earliest;
      newState.dayEnd = latest;
    }
    if (Object.keys(newState).length) {
      this.setState({ ...newState });
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps !== this.props || nextState !== this.state;
  }

  filterSessions(all) {
    let grouped = this.groupSessionsIntoRows(all);
    let filtered = [];
    let earliest = null,
      latest = null;

    (Object.keys(grouped) || []).map(title => {
      let session = { title, startTime: null, endTime: null, times: [] };
      (grouped[title] || []).map(each => {
        // find the earliest and latest start/end times
        if (!earliest || each.startTime < earliest) {
          earliest = each.startTime;
        }
        if (!latest || each.endTime > latest) {
          latest = each.endTime;
        }
        // update grouped session start/end times (if necessary)
        if (!session.startTime || each.startTime < session.startTime) {
          session.startTime = each.startTime;
        }
        if (!session.endTime || each.endTime > session.endTime) {
          session.endTime = each.endTime;
        }
        // pass through multiple times, deprecated
        if (title !== "Sessions" && each.times && each.times.length) {
          session.times = [...session.times, ...each.times];
        }
        // set the location (if necessary)
        if (!session.location) {
          session.location = each.location;
        }
      });
      filtered.push(session);
    });

    const roundedDownStart = moment
        .utc(earliest)
        .startOf("hour")
        .valueOf(),
      endMoment = moment.utc(latest),
      roundedUpEnd =
        endMoment.minute() || endMoment.second() || endMoment.millisecond()
          ? endMoment.add(1, "hour").startOf("hour")
          : endMoment.startOf("hour");

    return {
      filtered,
      earliest: roundedDownStart,
      latest: roundedUpEnd
    };
  }

  groupSessionsIntoRows(all) {
    let grouped = {};
    (all || []).map(session => {
      if (session.day !== this.props.day) {
        return;
      }
      if (!session.hasDetails && !grouped[session.title]) {
        grouped[session.title] = [session]; // start sessions array as its a new entry
      } else if (!session.hasDetails && grouped[session.title]) {
        grouped[session.title].push(session); // start sessions array as its a new entry
      } else if (
        session.hasDetails &&
        session.title.indexOf("Keynote") > -1 &&
        !grouped[session.title]
      ) {
        grouped[session.title] = [session];
      } else if (session.hasDetails && !grouped.Sessions) {
        grouped.Sessions = [session];
      } else if (session.hasDetails && grouped.Sessions) {
        grouped.Sessions.push(session);
      }
    });
    return grouped;
  }

  render() {
    const { filteredSessions } = this.state;
    if (filteredSessions.length < 1) {
      return null;
    }
    const rows = filteredSessions.map((session, index) =>
      this.renderRow(session, index)
    );
    const gutters = rows.length > 1 ? ROW_GUTTERS * (rows.length - 1) : 0;
    const height =
      ROW_HEIGHT * rows.length + gutters + GRID_PADDING * 2 + LABELS_HEIGHT;
    const grid = this.renderGrid(
      height,
      this.state.dayStart,
      this.state.dayEnd
    );
    let now;
    if (
      this.state.now >= this.state.dayStart &&
      this.state.now <= this.state.dayEnd
    ) {
      now = this.renderNow(
        this.state.now,
        this.state.dayStart,
        this.state.dayEnd
      );
    }
    return (
      <View style={this.props.style}>
        <View style={[styles.container, { height }]}>
          {grid}
          <View style={{ marginTop: GRID_PADDING }}>{rows}</View>
          {now}
        </View>
      </View>
    );
  }

  renderRow(session, i) {
    const offset = ROW_HEIGHT * i + ROW_GUTTERS * i;

    return (
      <F8GanttRow
        containerWidth={this.props.width}
        dayStart={this.state.dayStart}
        dayEnd={this.state.dayEnd}
        sessionStart={session.startTime}
        sessionEnd={session.endTime}
        sessionTimes={session.times}
        location={session.location}
        title={session.title}
        offset={offset}
        key={`GanttRow_${i}`}
      />
    );
  }

  renderGrid(height, start, end) {
    return (
      <F8GanttGrid
        containerWidth={this.props.width}
        contentHeight={height}
        startTime={start}
        endTime={end}
      />
    );
  }

  renderNow(now, start, end) {
    return (
      <F8GanttNowMarker
        containerWidth={this.props.width}
        nowTime={now}
        startTime={start}
        endTime={end}
      />
    );
  }
}

/* StyleSheet =============================================================== */
const styles = StyleSheet.create({
  container: {}
});
