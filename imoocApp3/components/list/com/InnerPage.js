import React, {Component} from 'react'
import Video from 'react-native-video'
import {View, Text, Alert} from 'react-native'

export default class ListCom extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
      const row = this.props.row
      // console.error(row.video)
      return (
        <View style={{flex: 1}}>
          <Text style={{marginTop: 70}}>
            234{row.title}
          </Text>
          <Video
            ref='videoPlayer'
            source={{uri: row.video}}
          ></Video>
        </View>
      )
    }
}