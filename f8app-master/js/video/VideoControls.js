"use strict";

import React from "react";
import F8Colors from "../common/F8Colors";
import F8Button from "../common/F8Button";
import {
  TouchableWithoutFeedback,
  TouchableHighlight,
  Animated,
  StyleSheet,
  View,
  Image,
  Platform
} from "react-native";

/* =============================================================================
<VideoControls />
============================================================================= */

class VideoControls extends React.Component {
  // static defaultProps = {
  //   show: false,
  // };

  constructor(props) {
    super(props);

    this.onHitbox = this.onHitbox.bind(this);
    this.hitboxTimer;

    this.state = {
      show: false,
      revealAnimation: new Animated.Value(1)
    };
  }

  render() {
    return (
      <View style={[styles.container, this.props.style]}>
        <TouchableWithoutFeedback onPress={this.onHitbox}>
          <View style={styles.hitbox} />
        </TouchableWithoutFeedback>
        {this.renderActions()}
      </View>
    );
  }

  renderActions() {
    if (!this.state.show) {
      return null;
    }
    const {
      onPlayToggle,
      onSkipBack,
      onSkipForward,
      onFullscreen
    } = this.props;

    return (
      <Animated.View
        pointerEvents="box-none"
        style={[styles.showHide, { opacity: this.state.revealAnimation }]}
      >
        <View pointerEvents="box-none" style={styles.actions}>
          {onSkipBack && onSkipForward ? this.renderSkipButtons() : null}
          {onPlayToggle ? this.renderPlayButton() : null}
        </View>
        {onFullscreen ? this.renderFullscreenButton() : null}
      </Animated.View>
    );
  }

  renderSkipButtons() {
    return [
      <F8Button
        theme="white"
        type="round"
        icon={require("../common/img/buttons/icon-check.png")}
        onPress={_ => this.props.onSkipBack && this.props.onSkipBack()}
        style={styles.skipBack}
      />,
      <F8Button
        theme="white"
        type="round"
        icon={require("../common/img/buttons/icon-check.png")}
        onPress={_ => this.props.onSkipForward && this.props.onSkipForward()}
        style={styles.skipForward}
      />
    ];
  }

  renderPlayButton() {
    return (
      <PlayPauseButton
        value={this.props.isPlaying}
        onPress={_ => this.props.onPlayToggle && this.props.onPlayToggle()}
      />
    );
  }

  renderFullscreenButton() {
    if (Platform.OS === "ios") {
      return (
        <F8Button
          theme="white"
          type="round"
          icon={require("../common/img/buttons/icon-x.png")}
          onPress={_ => this.props.onFullscreen && this.props.onFullscreen()}
          style={styles.fullscreen}
        />
      );
    } else {
      return null;
    }
  }

  onHitbox() {
    clearTimeout(this.hitboxTimer);
    const show = !this.state.show;
    this.setState({ show });
    if (show) {
      this.hitboxTimer = setTimeout(_ => {
        this.setState({ show: false });
      }, 3000);
    }
  }
}

/* =============================================================================
<PlayPauseButton />
============================================================================= */

class PlayPauseButton extends React.Component {
  render() {
    const { onPress, value } = this.props;
    const playOpacity = value ? 0 : 1;
    const pauseOpacity = value ? 1 : 0;
    return (
      <TouchableHighlight
        underlayColor={F8Colors.colorWithAlpha("blue", 0.5)}
        style={styles.playPause}
        onPress={_ => onPress && onPress(!value)}
      >
        <View style={{ flex: 1 }}>
          <Image
            style={[styles.pauseIcon, { opacity: pauseOpacity }]}
            source={require("../common/img/buttons/icon-x.png")}
          />
          <Image
            style={[styles.playIcon, { opacity: playOpacity }]}
            source={require("../common/img/buttons/play-large.png")}
          />
        </View>
      </TouchableHighlight>
    );
  }
}

// StyleSheet ==================================================================

const styles = StyleSheet.create({
  container: {},
  hitbox: {
    position: "absolute",
    left: 0,
    top: 0,
    right: 0,
    bottom: 0
  },
  showHide: {
    backgroundColor: F8Colors.colorWithAlpha("black", 0.33),
    position: "absolute",
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden"
  },
  actions: {
    width: 160,
    alignItems: "center"
  },
  skipBack: {
    position: "absolute",
    left: 0,
    top: (76 - F8Button.height) / 2
  },
  skipForward: {
    position: "absolute",
    right: 0,
    top: (76 - F8Button.height) / 2
  },
  fullscreen: {
    position: "absolute",
    right: -10,
    bottom: -10
  },

  playPause: {
    width: 72,
    height: 72,
    borderRadius: 72 / 2
  },
  pauseIcon: {
    position: "absolute",
    left: 0,
    top: 0,
    width: 72,
    height: 72,
    tintColor: F8Colors.white,
    resizeMode: "center"
  },
  playIcon: {
    position: "absolute",
    left: 5,
    top: 0,
    width: 67,
    height: 72,
    tintColor: F8Colors.white,
    resizeMode: "center"
  }
});

// export ======================================================================

export default VideoControls;
