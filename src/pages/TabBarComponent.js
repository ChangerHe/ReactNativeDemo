import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'; //图标库
import {View, Text, Button, TouchableOpacity, TouchableWithoutFeedback} from 'react-native'
// import {BoxShadow} from 'react-native-shadow'

export default class Page4 extends React.Component {
    render() {
        const {navigation} = this.props;
        return (
            <View
                style={{
                height: 90,
                backgroundColor: '#fff',
                justifyContent: 'center',
                alignItems: 'center',
                shadowOffset: {
                    width: 0,
                    height: 3
                },
                shadowOpacity: 0.2,
                shadowRadius: 5,
                shadowColor: '#000'
            }}>
                <View
                    style={{
                    width: '100%',
                    flexDirection: 'row',
                    justifyContent: 'space-between'
                }}>
                    <TouchableOpacity
                        onPress={() => navigation.toggleDrawer()}
                        style={{
                        paddingLeft: 20
                    }}>
                        <Ionicons name='md-contact' size={26}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.toggleDrawer()} style={{}}>
                        <View
                            style={{
                            flexDirection: 'row',
                            alignItems: 'center'
                        }}>
                            <Ionicons name='logo-chrome' size={26}/>
                            <Text>深圳</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => navigation.toggleDrawer()}
                        style={{
                        paddingRight: 20
                    }}>
                        <Ionicons name='ios-chatbubbles' size={26}/>
                    </TouchableOpacity>
                </View>
                <View
                    style={{
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    width: '100%',
                    paddingTop: 20
                }}>
                    <TouchableWithoutFeedback onPress={() => navigation.navigate('BusStacks')}>
                        <Text>定制巴士</Text>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={() => navigation.navigate('TransitStacks')}>
                        <Text>公交查询</Text>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback
                        onPress={() => navigation.navigate('HolidayBusStacks')}>
                        <Text>假日专线</Text>
                    </TouchableWithoutFeedback>
                </View>

            </View>
        )
    }
}