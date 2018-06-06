import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    Image,
    View,
    FlatList,
    TouchableOpacity,
    SafeAreaView,
    Alert,
    TouchableNativeFeedback
} from 'react-native';

export default class Cinemas extends Component {
    static navigationOptions = {
        title: '我的电影'
    };
    render() {
        const {state, goBack} = this.props.navigation;
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.parent}>

                    <Text style={[styles.childfirst, styles.margin]}>
                        View1
                    </Text>
                    <Text style={[styles.childsecond, styles.margin]}>
                        View2
                    </Text>
                    <Text style={[styles.childthird, styles.margin]}>
                        View3
                    </Text>
                    <Text style={styles.childthird}>
                        View3
                    </Text>
                    <Text style={styles.childthird}>
                        View3
                    </Text>
                    <Text style={styles.childthird}>
                        View3
                    </Text>
                    <TouchableOpacity
                        onPress={() => {
                            Alert.alert('TouchableOpacity')
                        }}
                    >
                        <Text>
                            touchable view
                        </Text>
                    </TouchableOpacity>
                    {/* 点击涟漪效果ios不支持 */}
                    <TouchableNativeFeedback
                        background={TouchableNativeFeedback.SelectableBackground()}>
                        <View style={{ width: 150, height: 100, backgroundColor: 'red' }}>
                            <Text style={{ margin: 30 }}>点我有涟漪</Text>
                        </View>
                    </TouchableNativeFeedback>
                </View>

            </SafeAreaView>
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
        backgroundColor: '#e5fffd'
    },
    parent: {
        flex: 1,
        flexDirection: 'row',
        opacity: 0.4,
        padding: 30,
        flexWrap: 'wrap', //换行
        justifyContent: 'space-around'
    },
    childfirst: {
        backgroundColor: '#676677',
        width: 100,
        height: 100,
        fontSize: 13
    },
    childsecond: {
        backgroundColor: '#9fbb74',
        width: 100,
        height: 100,
        fontSize: 13
    },
    childthird: {
        backgroundColor: '#bb7478',
        width: 100,
        height: 100,
        fontSize: 13
    },
    blocktest: {
        width: 300,
        height: 300,
        color: '#ccc'
    },
    margin: {

        marginBottom: 10
    }
});