import React, {Component} from 'react'
import {View, Text, TouchableOpacity} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'

class HeaderTitle extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <View style={{
                flexDirection: 'row',
                height: 50,
                justifyCo5tent: 'space-between',
                backgroundColor: '#fff'
            }}>
                <TouchableOpacity 
                    style={{
                        width: 50,
                        height: 50,
                        flex: 0,
                        justifyContent: 'center',
                        alignItems: 'center',
                        zIndex: 1,
                    }}
                    onPress={() => {
                        return this.props.navigation.goBack()
                    }}
                >
                    <Ionicons name='ios-arrow-back' size={26}/>
                </TouchableOpacity>
                <View style={{
                    flexDirection: 'row',
                    flex: 1,
                    width: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginLeft: -50,
                    zIndex: 0,
                    textAlign: 'center'
                }}>
                    <Text>{this.props.title}</Text>
                </View>
            </View>
        )
    }

}

export default HeaderTitle