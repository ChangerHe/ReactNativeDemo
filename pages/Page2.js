import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    Image,
    View,
    FlatList,
    TouchableOpacity
} from 'react-native';



export default class Cinemas extends Component {
    static navigationOptions = {
        title: '影院',
    };
    render() {
        const {state,goBack}=this.props.navigation;
        return (
            <View  style={styles.parent}>
                <Text style={styles.view1}>我的影院1</Text>
                <Text style={styles.view2}>我的影院2</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    parent:{
        flex:1,
    },
    view1:{
        backgroundColor:'#676677',
        height:100,
        margin:10,
        borderRadius:10,

        elevation:5,//漂浮的效果
        shadowColor:'red',

    },
    view2:{
        backgroundColor:'#9fbb74',
        height:100,
        marginRight:10,
        marginLeft:10,
        borderRadius:10,

        elevation:5,

    }


});