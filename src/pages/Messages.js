import React from 'react'
import {View, Text, Button, ScrollView, Image, TouchableWithoutFeedback} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'

import HeaderTitle from '../publicComponents/HeaderTitle'

export default class Messages extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            viewList: [1,1,1,1,1,1]
        }
    }
    addRandomKey() {
        return Math.floor(Math.random() * 10000000000)
    }
    render() {
        const {navigation} = this.props;
        return (
            <View>
                {/* <HeaderTitle navigation={navigation} title={'消息'}/> */}
                <ScrollView style={{
                    // marginBottom: 70
                }}><View style={{marginBottom: 20}}>
                    {
                        this.state.viewList.length ? this.state.viewList.map((v) => {
                            return (
                            <TouchableWithoutFeedback 
                                    key={this.addRandomKey()}
                                    onPress={() => {
                                        // Alert.alert('111')
                                        navigation.navigate('MessageView', {
                                            uri: 'https://www.baidu.com'
                                        })
                                    }}>
                                    <View style={{
                                    height: 310,
                                    width: '94%',
                                    marginLeft: 'auto',
                                    marginRight: 'auto',
                                    // marginBottom: 10,
                                    marginTop: 12,
                                    backgroundColor: '#fff'
                                    }}>
                                <Text style={{
                                    paddingTop: 16,
                                    paddingLeft: 10,
                                    fontSize: 20,
                                    color: '#1f1f1f',
                                }}>邀请有礼, 一荐双赢</Text>
                                <Text style={{
                                    marginBottom: 8,
                                    paddingLeft: 10,
                                    fontSize: 12,
                                    color: '#ccc',
                                }}>2018.06.19</Text>
                                <Image style={{width: '100%', height: 200}} source={require('../assets/invitation_banner.png')} />
                                <View style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    height: 40,
                                    paddingLeft: 10,
                                    marginRight: 20,
                                }}>
                                    <Text style={{
                                    fontSize: 16,
                                    color: '#ccc',}}>查看详情</Text>
                                    <Ionicons name='ios-arrow-forward' size={26}/>
                                </View>
                                    </View>
                            </TouchableWithoutFeedback>)
                        }): ''
                    }</View>
                    
                </ScrollView>
                <Button title="Toggle login" onPress={() => navigation.navigate('LoginForm')}/>
            </View>
        )
    }
}