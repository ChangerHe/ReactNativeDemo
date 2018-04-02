import React, {Component} from 'react'
import {View, Text} from 'react-native'

export default class ListCom extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return (
          <View style={{flex: 1}}>
            <Text style={{fontSize: 100, marginTop: 40}}>
              {/* {this.props.text} */}
              234
            </Text>
          </View>
        )
    }
}