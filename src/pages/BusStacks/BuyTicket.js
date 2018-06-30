import React from 'react'
import {View, Text, Button} from 'react-native'

export default class BuyTicket extends React.Component {
    render() {
        const {navigation} = this.props;
        return (
            <View
                style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
            }}>

                <Text>
                    buy ticket
                </Text>
            </View>
        )
    }
}