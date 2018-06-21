import React from 'react'
import {View, Text, TouchableOpacity, Button} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'

export default class LoginForm extends React.Component {
    render() {
        return (
            <View
                style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <Text style={{
                    fontSize: 30
                }}>This is a modal!</Text>
                <Button onPress={() => this.props.navigation.goBack()} title="Dismiss"/>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Drawer')}>
                    <View>
                        <Ionicons name='md-close' size={30}/>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}