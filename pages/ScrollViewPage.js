import React from 'react'
import {
    Animated,
    ScrollView,
    Image,
    Dimensions,
    View,
    StyleSheet
} from 'react-native'


var deviceHeight = Dimensions.get('window').height;
var deviceWidth = Dimensions.get('window').width;
export default class ScrollViewPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            xOffset: new Animated.Value(1.0)
        };
    }
    render() {
        return (
            <View style={styles.container}>
                <ScrollView horizontal={true} //水平滑动
                    showsHorizontalScrollIndicator={false}
                    style={{ width: deviceWidth, height: deviceHeight }}//设置大小
                    onScroll={Animated.event(
                        [{ nativeEvent: { contentOffset: { x: this.state.xOffset } } }]//把contentOffset.x绑定给this.state.xOffset
                    )}
                    scrollEventThrottle={100}//onScroll回调间隔
                >
                    <Animated.Image source={require('../assets/delete.png')}
                        style={{
                            height: deviceHeight,
                            width: deviceWidth,
                            opacity: this.state.xOffset.interpolate({//映射到0.0,1.0之间
                                inputRange: [0, 375],
                                outputRange: [1.0, 0.0]
                            }),
                        }}
                        resizeMode="cover"
                    />
                    <Image source={require('../assets/delete.png')} style={{ height: deviceHeight, width: deviceWidth }} resizeMode="cover" />
                    <Image source={require('../assets/delete.png')} style={{ height: deviceHeight, width: deviceWidth }} resizeMode="cover" />
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 0,
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#e5fffd',
    },
});