import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'; //图标库
import {View, Text, Button, TouchableOpacity, TouchableWithoutFeedback} from 'react-native'
// import {BoxShadow} from 'react-native-shadow'

export default class Page4 extends React.Component {
    toBusStacks(e) {
        console.log(arguments, e.target)
        return this.props.navigation.navigate('BusStacks')
    }
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
                        >
                        <View style={{
                        paddingLeft: 20,
                        paddingTop: 20
                    }}>

                        <Ionicons name='md-contact' size={26}/>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.toggleDrawer()} style={{}}>
                        <View
                            style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            paddingTop: 20
                        }}>
                            <Ionicons name='logo-chrome' size={26}/>
                            <Text>深圳</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => navigation.toggleDrawer()}
                        >
                    <View style={{
                        paddingRight: 20,
                        paddingTop: 20
                    }}>

                        <Ionicons name='ios-chatbubbles' size={26}/>
                    </View>
                    </TouchableOpacity>
                </View>
                <View
                    style={{
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    width: '100%'
                }}>
                    <TouchableWithoutFeedback onPress={this.toBusStacks.bind(this)}>
                        <View
                            style={{
                            paddingTop: 10
                        }}>

                            <Text>定制巴士</Text>
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={() => navigation.navigate('TransitStacks')}>
                        <View
                            style={{
                            paddingTop: 10
                        }}>

                            <Text>公交查询</Text>
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback
                        onPress={() => navigation.navigate('HolidayBusStacks')}>
                        <View
                            style={{
                            flexDirection: 'row',
                            paddingTop: 10
                        }}>
                            <Text>假日专线</Text>
                            <Ionicons name='md-bonfire' size={14}/>
                        </View>
                    </TouchableWithoutFeedback>
                </View>

            </View>
        )
    }
}