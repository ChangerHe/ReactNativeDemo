import React, {Component} from 'react'
import Video from 'react-native-video'
import {View, Text, Alert} from 'react-native'

export default class ListCom extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
      // Alert.alert(this.props.title)
      const row = this.props.row
      return (
        <View style={{flex: 1}}>
          <Text style={{marginTop: 70}}>
            {/* {this.props.text} */}
            234{row.title}
          </Text>
          {/* <Video
            ref='videoPlayer'
            source={{uri: row.video}}
          ></Video> */}
        </View>
      )
    }
}