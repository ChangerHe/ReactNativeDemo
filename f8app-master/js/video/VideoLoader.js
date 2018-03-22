"use strict";

import React from "react";
import F8Colors from "../../common/F8Colors";
import { Animated, StyleSheet, View } from "react-native";

function loopingAnimation(animations = []) {
  if (!animations.length) {
    return;
  }
  Animated.sequence(animations).start(event => {
    if (event.finished) {
      loopingAnimation(animations);
    }
  });
}

/* =============================================================================
<VideoLoader />
============================================================================= */

class VideoLoader extends React.Component {
  static defaultProps = {
    width: 100
  };

  constructor(props) {
    super(props);

    this.state = {
      pulseAnimation: new Animated.Value(0)
    };
  }

  render() {
    return (
      <View style={[styles.container, this.props.style]}>
        <Animated.View
          style={[styles.loader, { opacity: this.state.pulseAnimation }]}
        />
      </View>
    );
  }

  componentDidMount() {
    loopingAnimation([
      Animated.timing(this.state.pulseAnimation, {
        toValue: 1,
        duration: 400,
        delay: 300
      }),
      Animated.timing(this.state.pulseAnimation, {
        toValue: 0,
        duration: 400,
        delay: 300
      })
    ]);
  }
}

// StyleSheet ==================================================================

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  loader: {
    backgroundColor: F8Colors.blue,
    width: 80,
    height: 80
  }
});

// export ======================================================================

export default VideoLoader;
