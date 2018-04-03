import React, {Component} from 'react'
import VideoPlayer from 'react-native-video-player'
import {View, Text, Alert} from 'react-native'

export default class ListCom extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
      // Alert.alert(this.props.title)
      const row = this.props.row
      console.error(row.video)
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
          <VideoPlayer video={row.video} />
        </View>
      )
    }
}