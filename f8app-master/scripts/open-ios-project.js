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

const fs = require("fs");
const { exec } = require("child_process");
const xcode = require("xcode");

const projectPath =
  "node_modules/react-native-native-video-player/ios/RNVideoPlayer.xcodeproj/project.pbxproj";
const project = xcode.project(projectPath);
project.parse(function() {
  // Make sure F82017 is in the RNVideoPlayer header search paths, otherwise
  // there will be a build error.
  if (!project.writeSync().includes("F82017")) {
    project.addToHeaderSearchPaths('"$(SRCROOT)/../../../ios/F82017"');
    fs.writeFileSync(projectPath, project.writeSync());
  }
  console.log("iOS dependencies configured successfully");

  console.log("Opening ./ios/F82017.xcodeproj...");
  exec("open ./ios/F82017.xcodeproj");
});
