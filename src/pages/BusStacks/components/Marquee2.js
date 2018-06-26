import React, { Component } from 'react';
import { View, Animated, Easing, Text } from 'react-native';

export default class MarqueeLabel extends Component {
  state = {
    textWidth: 0,
    textHeight: 0,
    bgViewWidth: 0,
    duration: 0,
    text: '',
    animation: null,
  };

  componentWillMount() {
      // 初始状态, 将内容设置为当前状态下的text值
    this.setState({
      text: this.props.text || this.props.children || '',
    });
    // 初始状态下先去清除掉当前的animation对象
    this.animation = null;
    // 动画初始化
    this.animatedTransformX = new Animated.Value(0);
  }

  componentWillUnmount() {
    if (this.state.animation !== null) {
        // 动画停止
      this.state.animation.stop();
    }
  }

  componentWillReceiveProps(nextProps) {
    let newText = nextProps.text || nextProps.children || '';
    let oldText = this.props.text || this.props.children || '';
    // 一旦传输的文字内容改变, 则清除掉动画, 重新进行新的动画
    if (newText !== oldText) {
      this.state.animation.stop();
      this.setState({
        text: newText,
        textWidth: 0,
        textHeight: 0,
        duration: 0,
        animation: null,
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    let { textWidth, bgViewWidth, duration, animation } = this.state;

    if (duration === 0) {
      if (textWidth === 0 || bgViewWidth === 0) { return }

      const { duration, speed } = this.props;
      if (duration !== undefined) {
        this.setState({
          duration: duration,
        });
      } else if (speed !== undefined) {
        this.setState({
          duration: ((bgViewWidth + textWidth) / speed) * 1000,
        });
      }
    } else {
      if (animation === null) {
        this.animatedTransformX.setValue(bgViewWidth);
        this.setState({
          animation: Animated.timing(this.animatedTransformX, {
            toValue: -textWidth,
              duration: duration,
              useNativeDriver: true,
              easing: Easing.linear,
          }),
        }, () => {
          this.state.animation.start(() => {
            this.setState({
              animation: null,
            });
          });
        });
      }
    }
  }

  textOnLayout(e) {
    this.setState({
      textWidth: e.nativeEvent.layout.width,
      textHeight: e.nativeEvent.layout.height,
    });
  }

  bgViewOnLayout(e) {
    this.setState({
      bgViewWidth: e.nativeEvent.layout.width,
    });
  }

  render() {
    const { 
      bgViewStyle,
      textStyle,
      textContainerWidth = 1000, 
      textContainerHeight = 100,
      textContainerStyle, 
    } = this.props;

    const { textWidth, textHeight, text, animation } = this.state;

    return (
      <View 
        style={{ ...styles.bgViewStyle, ...bgViewStyle }}
        onLayout={(event) => this.bgViewOnLayout(event)}
      >
        <View
          style={{
            ...styles.textContainerStyle,
            width: textContainerWidth,
            height: textContainerHeight,
            opacity: animation === null ? 0 : 1, 
            ...textContainerStyle,
          }}
        >
          <Animated.Text 
            style={{
              fontSize: 20,
              transform: [{ translateX: this.animatedTransformX }],
              width: textWidth,
              height: textHeight,
              ...textStyle,
            }}
          >
            {text}
          </Animated.Text>
        </View>
        <Text
          style={{
            ...styles.textSizeMeasuringViewStyle,
            ...textStyle,
          }}
          onLayout={(event) => this.textOnLayout(event)}  // 当挂载或布局变化之后调用
        >
          {text}
        </Text>
      </View>
    );
  }
}

const styles = {
  bgViewStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    overflow: 'scroll',
  },
  textContainerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  textSizeMeasuringViewStyle: {
    opacity: 0,
    fontSize: 20,
  },
};