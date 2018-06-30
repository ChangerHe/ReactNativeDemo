import React from 'react'
import {View, Text, Button, TextInput, TouchableWithoutFeedback} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'

export default class SearchLine extends React.Component {
  render() {
    const {navigation} = this.props;
    return (
      <View style={{}}>
        <View
          style={{
          flexDirection: 'row',
          backgroundColor: '#fff'
        }}>
          <View
            style={{
            flex: 0,
            width: 40,
            height: 40,
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <Ionicons name='md-search' color='grey' size={28}/>
          </View>
          <View
            style={{
            flex: 1,
            height: 40,
            alignItems: 'center'
          }}>
            <TextInput
              style={{
              width: '100%'
            }}
              autoFocus={true}/>
          </View>
          <TouchableWithoutFeedback
            style={{
            flex: 0,
            width: 40,
            height: 40,
            justifyContent: 'center',
            alignItems: 'center'
          }}
            onPress={() => navigation.goBack()}>
            <Text style={{
              lineHeight: 40
            }}>取消</Text>
          </TouchableWithoutFeedback>
        </View>
        <TouchableWithoutFeedback
          style={{
          height: 60,
          width: '100%'
        }}
          onPress={() => navigation.navigate('AllLines')}>
          <View
            style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: '#fff',
            marginTop: 6,
            marginBottom: 6
          }}>
            <View
              style={{
              flex: 0,
              width: 60,
              height: 60,
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              <Ionicons name='ios-apps' size={26}/>
            </View>
            <Text
              style={{
              lineHeight: 60,
              flex: 1
            }}>所有线路</Text>
            <View
              style={{
              flex: 0,
              width: 60,
              height: 60,
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              <Ionicons name='ios-arrow-forward' size={26}/>
            </View>
          </View>

        </TouchableWithoutFeedback>
      </View>
    )
  }
}