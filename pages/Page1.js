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
        title: '我的电影',
    };
    render() {
        const {state,goBack}=this.props.navigation;
        return (
            <View  style={styles.parent}>

                    <Text style={[styles.childfirst,styles.margin]}> View1 </Text>
                    <Text style={[styles.childsecond,styles.margin]}> View2 </Text>
                    <Text style={[styles.childthird,styles.margin]}> View3 </Text>
                    <Text style={styles.childthird}> View3 </Text>
                    <Text style={styles.childthird}> View3 </Text>
                    <Text style={styles.childthird}> View3 </Text>

            </View>
        );
    }
}

const styles = StyleSheet.create({

    parent:{
        flex:1,
        flexDirection:'row',
        opacity:0.4,

        flexWrap:'wrap',//换行
        justifyContent:'space-around',
    },
    childfirst:{
        backgroundColor:'#676677',
        width:100,
        height:100,
        fontSize:13,

    },
    childsecond:{
        backgroundColor:'#9fbb74',
        width:100,
        height:100,
        fontSize:13,

    },
    childthird:{
        backgroundColor:'#bb7478',
        width:100,
        height:100,
        fontSize:13,

    },
    margin:{

        marginBottom:10,
    }
});