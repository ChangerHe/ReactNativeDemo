// FadeInView.js
// 淡入组件, 可传入组件的样式及组件的子组件内容
import React, { Component } from 'react';
import {
    Animated,
    Easing
} from 'react-native';

export default class FadeInView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fadeAnim: new Animated.Value(1),          // 透明度初始值设为0
        };
    }
    componentDidMount() {
        Animated.timing(                            // 随时间变化而执行的动画类型
            this.state.fadeAnim,                      // 动画中的变量值
            {
                toValue: 0,                             // 透明度最终变为1，即完全不透明
                // easing: Easing.back,
                duration: 3000
            }
        ).start();                                  // 开始执行动画
    }
    render() {
        return (
            <Animated.View                            // 可动画化的视图组件
                style={{
                    ...this.props.style,
                    opacity: this.state.fadeAnim,          // 将透明度指定为动画变量值
                }}
            >
                {this.props.children}
            </Animated.View>
        );
    }
}