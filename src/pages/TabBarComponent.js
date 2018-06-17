import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'; //图标库
import {View, Text, Button, TouchableOpacity, TouchableWithoutFeedback} from 'react-native'
// import {BoxShadow} from 'react-native-shadow'

export default class Page4 extends React.Component {
    state = {
        activeStack: 'bus'
    }
    toBusStacks(e) {
        this.setState({
            activeStack: 'bus'
        })
        return this
            .props
            .navigation
            .navigate('BusStacks')
    }
    toTransitStacks() {
        this.setState({
            activeStack: 'transit'
        })
        return this
            .props
            .navigation
            .navigate('TransitStacks')
    }
    toHolidayStacks() {
        this.setState({
            activeStack: 'holiday'
        })
        return this
            .props
            .navigation
            .navigate('HolidayBusStacks')
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
                    <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
                        <View
                            style={{
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
                    <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
                        <View
                            style={{
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
                    <TouchableWithoutFeedback
                        onPress={this
                        .toBusStacks
                        .bind(this)}>
                        <View
                            style={{
                            paddingTop: 10
                        }}>

                            <Text
                                style={{
                                fontSize: 16, 
                                color: this.state.activeStack === 'bus'?'blue': '#ccc'
                            }}>定制巴士</Text>
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={this.toTransitStacks.bind(this)}>
                        <View
                            style={{
                            paddingTop: 10
                        }}>

                            <Text
                                style={{
                                fontSize: 16, 
                                color: this.state.activeStack === 'transit'?'blue': '#ccc'
                            }}>公交查询</Text>
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback
                        onPress={this.toHolidayStacks.bind(this)}>
                        <View
                            style={{
                            flexDirection: 'row',
                            paddingTop: 10
                        }}>
                            <Text
                                style={{
                                fontSize: 16, 
                                color: this.state.activeStack === 'holiday'?'blue': '#ccc'
                            }}>假日专线</Text>
                            <Ionicons name='md-bonfire' size={18} style={{
                                color: this.state.activeStack === 'holiday'?'blue': '#ccc'
                            }}/>
                        </View>
                    </TouchableWithoutFeedback>
                </View>

            </View>
        )
    }
}