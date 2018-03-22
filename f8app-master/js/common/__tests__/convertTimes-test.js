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

jest.autoMockOff();
import {
  parseTimeToUTC,
  sessionsHappeningNow,
  sessionsHappeningToday
} from "../convertTimes";

// This corrects for times in Parse being inputted as local pacific time
// but the timestamp being provided as a unix time epoch
describe("parseTimeToUTC", () => {
  const pacificDiffMs = 1000 * 60 * 60 * 7;
  const random = 1491352767750;
  const day1StartUTC = 1492473600000;
  const day2StartUTC = 1492560000000;

  it("corrects Parse time from UTC to local pacific time", () => {
    expect(parseTimeToUTC(random)).toEqual(random + pacificDiffMs);
    expect(parseTimeToUTC(day1StartUTC)).toEqual(day1StartUTC + pacificDiffMs);
    expect(parseTimeToUTC(day2StartUTC)).toEqual(day2StartUTC + pacificDiffMs);
  });
});

// Whether the provided timestamp is within the range of session start and
// end times
describe("sessionsHappeningNow", () => {
  const random = 1491352767750;
  const mockSessionsBasic = [
    { startTime: 1491352767600, endTime: 1491352767601 },
    { startTime: 1491352767800, endTime: 1491352767801 }
  ];
  const mockSessionsReversed = [
    { startTime: 1491352767800, endTime: 1491352767801 },
    { startTime: 1491352767600, endTime: 1491352767601 }
  ];
  const mockSessionsWrong = [
    { startTime: 1491252767800, endTime: 1491252767801 },
    { startTime: 1491252767600, endTime: 1491252767601 }
  ];

  it("returns false for empty sessions", () => {
    expect(sessionsHappeningNow(random, [])).toEqual(false);
  });

  it("returns true if time is within range", () => {
    expect(sessionsHappeningNow(random, mockSessionsBasic)).toEqual(true);
    expect(sessionsHappeningNow(random, mockSessionsReversed)).toEqual(true);
  });

  it("returns false if time is outside of range", () => {
    expect(sessionsHappeningNow(random, mockSessionsWrong)).toEqual(false);
  });
});

// For a given timestamp return a boolean if that time is within either day 1
// or day 2 of the conference (for time-based functionality like hide completed)
describe("sessionsHappeningToday", () => {
  const day0Start = "Mon Apr 17 2017 00:00:00 GMT-0700 (PDT)", // 1492412400000
    day0End = "Mon Apr 17 2017 23:59:59 GMT-0700 (PDT)", // 1492498799000
    day1Start = "Tue Apr 18 2017 00:00:00 GMT-0700 (PDT)", // 1492498800000
    day1Middle = "Tue Apr 18 2017 12:00:00 GMT-0700 (PDT)", // 1492542000000
    day1End = "Tue Apr 18 2017 23:59:59 GMT-0700 (PDT)", // 1492585199000
    day2Start = "Wed Apr 19 2017 00:00:00 GMT-0700 (PDT)", // 1492585200000
    day2Middle = "Wed Apr 19 2017 12:00:00 GMT-0700 (PDT)", // 1492628400000
    day2End = "Wed Apr 19 2017 23:59:59 GMT-0700 (PDT)", // 1492671599000
    day3Start = "Thu Apr 20 2017 00:00:00 GMT-0700 (PDT)", // 1492671600000
    day3End = "Thu Apr 20 2017 23:59:59 GMT-0700 (PDT)"; // 1492757999000

  it("returns false before the conference", () => {
    // the day before
    expect(sessionsHappeningToday(new Date(day0Start).getTime())).toEqual(
      false
    );
    expect(sessionsHappeningToday(new Date(day0End).getTime())).toEqual(false);
  });

  it("returns true during the conference", () => {
    // during (day 1)
    expect(sessionsHappeningToday(new Date(day1Start).getTime())).toEqual(true);
    expect(sessionsHappeningToday(new Date(day1Middle).getTime())).toEqual(
      true
    );
    expect(sessionsHappeningToday(new Date(day1End).getTime())).toEqual(true);
    // during (day 2)
    expect(sessionsHappeningToday(new Date(day2Start).getTime())).toEqual(true);
    expect(sessionsHappeningToday(new Date(day2Middle).getTime())).toEqual(
      true
    );
    expect(sessionsHappeningToday(new Date(day2End).getTime())).toEqual(true);
  });

  it("returns false after the conference", () => {
    // the day after
    expect(sessionsHappeningToday(new Date(day3Start).getTime())).toEqual(
      false
    );
    expect(sessionsHappeningToday(new Date(day3End).getTime())).toEqual(false);
  });
});
