import React from 'react';
import {
    NativeModules,
    LayoutAnimation,
    Text,
    TouchableOpacity,
    StyleSheet,
    View,
    Animated,
    ScrollView,
    Easing
} from 'react-native';

const { UIManager } = NativeModules;

UIManager.setLayoutAnimationEnabledExperimental &&
    UIManager.setLayoutAnimationEnabledExperimental(true);

export default class App extends React.Component {
    state = {
        w: 100,
        h: 100,
        currentAlpha: 1.0,//标志位，记录当前value
        fadeAnim: new Animated.Value(1.0),
        anim: new Animated.Value(0)
    };

    _onPress = () => {
        // Animate the update
        LayoutAnimation.spring();  // 全局动画 spring指弹性动画

        this.setState({ 
            w: this.state.w + 15,  
            h: this.state.h + 15,
            currentAlpha: 1.0,//标志位，记录当前value
            fadeAnim: new Animated.Value(1.0),
        })
        
    }

    componentDidMount() {
        Animated.timing(this.state.anim, { //要改变的动画对象
            toValue: 1, //动画结束值
            duration: 3000, //动画运行时间
            easing: Easing.linear, //动画过渡曲线函数
        }).start();
    }

    startAnimation() {
        this.state.currentAlpha = this.state.currentAlpha == 1.0 ? 0.0 : 1.0;
        Animated.timing(
            this.state.fadeAnim,
            { toValue: this.state.currentAlpha }
        ).start();
    }

    render() {
        return (
            <ScrollView>
                <View style={styles.container}>
                    <View style={[styles.box, { width: this.state.w, height: this.state.h }]} />
                    <TouchableOpacity onPress={this._onPress}>
                        <View style={styles.button}>
                            <Text style={styles.buttonText}>Press me!</Text>
                        </View>
                    </TouchableOpacity>
                    <Animated.Text style={{
                        opacity: this.state.fadeAnim, //透明度动画
                        transform: [//transform动画
                            {   
                                translateY: this.state.fadeAnim.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [60, 0] //线性插值，0对应60，0.6对应30，1对应0
                                }),
                            },
                            {
                                scale: this.state.fadeAnim
                            },
                        ],
                    }}>
                        Welcome to React Native!
                    </Animated.Text>
                    <TouchableOpacity onPress={() => this.startAnimation()} style={styles.button}>
                        <Text style={styles.buttonText}>Start Animation</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.box2}>
                    <Animated.Image source={require('../assets/beauty.jpeg')}
                        style={[styles.box2, {
                            opacity: this.state.anim,//组件的opacity样式属性
                            transform: [//组件的transform样式属性
                                {
                                    scale: this.state.anim.interpolate({//组件的scale样式属性，将[0,1]区间映射到[1,2]区间
                                        inputRange: [0, 1],//输入区间
                                        outputRange: [1, 0]//输出区间
                                    })
                                },
                                {
                                    rotate: this.state.anim.interpolate({//组件的rotate样式属性，将[0,1]区间映射到['0deg','360deg]区间
                                        inputRange: [0, 1],//输入区间
                                        outputRange: ['0deg', '180deg'],//输出区间
                                    })
                                },
                            ]
                        }]}
                    />
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 50
    },
    box: {
        width: 200,
        height: 200,
        backgroundColor: 'red',
    },
    box2: {
        width: 200,
        height: 200,
        backgroundColor: 'blue',
        marginTop: 20,
        // position: relative(from, to)
    },
    button: {
        backgroundColor: 'black',
        paddingHorizontal: 20,
        paddingVertical: 15,
        marginTop: 15,
        marginBottom: 30
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});