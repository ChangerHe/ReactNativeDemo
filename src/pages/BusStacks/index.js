import React from 'react'
import {
  View,
  Text,
  Animated,
  Easing,
  ScrollView,
  StyleSheet,
  TouchableHighlight
} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'; //图标库
import {Button, Checkbox, List, WhiteSpace} from 'antd-mobile-rn';

import Marquee from './components/Marquee'
import Marquee2 from './components/Marquee2'

// import Pagination from '../../components/Pagination'

const AgreeItem = Checkbox.AgreeItem;
const CheckboxItem = Checkbox.CheckboxItem;

export default class Page4 extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      animationTransformX: new Animated.Value(0),
      text: '我是滚动轮播~~~~~我是滚动轮播~~~~~我是滚动轮播~~~~~我是滚动轮播~~~~~我是滚动轮播~~~~~我是滚动轮播~~~~~',
      textWidth: 0,
      bgViewWidth: 0,
      // animation: null,
    }
  }
  componentDidUpdate() {
    this
      .state
      .animationTransformX
      .setValue(this.state.textWidth);
    Animated
      .timing(this.state.animationTransformX, {
      toValue: this.state.textWidth,
      duration: 3000,
      useNativeDriver: true,
      easing: Easing.linear
    })
      .start()
  }

  textOnLayout(e) {
    console.log(e.nativeEvent, 'e1')
    this.setState({textWidth: e.nativeEvent.layout.width});
  }
  bgViewOnLayout(e) {
    console.log(e.nativeEvent, 'e2')
    this.setState({bgViewWidth: e.nativeEvent.layout.width});
  }
  render() {
    const {navigation} = this.props;
    return (
      <View style={{}} onLayout={(event) => this.bgViewOnLayout(event)}>
        <View style={{
          flexDirection: 'row'
        }}>
          <Ionicons
            name={'ios-volume-up'}
            size={26}
            style={{
            color: 'red'
          }}/>
          <Marquee2
            speed={80}
            text={this.state.text}
            textContainerHeight={20}
            textHeight={20}
            textStyle={{
            fontSize: 13,
            color: 'red',
            lineHeight: 20
          }}/>
        </View>
        <View
          style={{
          height: 140,
          backgroundColor: '#fff',
          flexDirection: 'row'
        }}>
          <View
            style={{
            justifyContent: 'center',
            alignItems: 'center',
            flex: 0,
            width: 50
          }}>
            <Ionicons
              name={'ios-repeat-outline'}
              size={26}
              style={{
              color: 'grey'
            }}/>
          </View>
          <View style={{
            flex: 1,
            paddingLeft: 20
          }}>
            <View
              style={{
              flexDirection: 'row',
              flex: 1,
              alignItems: 'center'
            }}>
              <Ionicons
                name='ios-radio-button-on-outline'
                size={20}
                style={{
                color: 'blue'
              }}/>
              <TouchableHighlight
                onPress={() => {
                navigation.push('SearchLine')
              }}>
                <Text>当前位置(天安数码时代大厦)</Text>
              </TouchableHighlight>
            </View>
            <View
              style={{
              flexDirection: 'row',
              flex: 1,
              alignItems: 'center'
            }}>
              <Ionicons
                name='ios-radio-button-on-outline'
                size={20}
                style={{
                color: 'red'
              }}/>
              <TouchableHighlight onPress={() => {
                navigation.push('SearchLine')
              }}>
                <Text>天安数码时代大厦</Text>
              </TouchableHighlight>
            </View>
          </View>
          <View
            style={{
            flex: 0,
            width: 80,
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <View
              style={{
              width: 60,
              height: 60,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'blue',
              borderRadius: 30
            }}>
              <Ionicons
                name={'md-search'}
                size={26}
                style={{
                color: 'white'
              }}/>
            </View>

          </View>
        </View>
        {/* <View
          style={{
          height: 30,
          backgroundColor: '#909',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-start',
          overflow: 'scroll'
        }}>
          <Animated.Text
            style={{
            lineHeight: 30,
            transform: [
              {
                translateX: this.state.animationTransformX
              }
            ]
          }}>
            {this.state.text}
          </Animated.Text>
        </View>
        <Text onLayout={(event) => this.textOnLayout(event)}>{this.state.text}</Text>

        <Button size='large'>test</Button>
        <View style={{
          padding: 10
        }}>
          <Checkbox
            checked={this.state.checkBox1}
            style={{
            tintColor: '#f00'
          }}
            onChange={(event) => {
            this.setState({checkBox1: event.target.checked});
          }}/>
          <WhiteSpace/>
          <Checkbox>Checkbox</Checkbox>
          <WhiteSpace/>
          <Checkbox checked disabled/>
          <WhiteSpace/>
          <Checkbox disabled/>
        </View>

        <WhiteSpace/>
        <AgreeItem>
          Agree agreement agreement agreement agreement agreement agreement agreement
        </AgreeItem>
        <WhiteSpace/>
        <AgreeItem
          checked={this.state.agreeItem1}
          checkboxStyle={{
          tintColor: '#f00'
        }}
          onChange={(event) => {
          this.setState({agreeItem1: event.target.checked});
        }}>
          Agree agreement
        </AgreeItem>
        <WhiteSpace/>
        <AgreeItem disabled>Not selected. Not editable</AgreeItem>
        <WhiteSpace/>
        <AgreeItem checked disabled>
          Force selected. Not editable
        </AgreeItem>

        <List style={{
          marginTop: 12
        }}>
          <Text style={{
            marginTop: 12
          }}>Multiple options</Text>
          <CheckboxItem
            checked={this.state.checkboxItem1}
            onChange={(event) => {
            this.setState({checkboxItem1: event.target.checked});
          }}>
            Option 1
          </CheckboxItem>
          <CheckboxItem>Option 2</CheckboxItem>
          <CheckboxItem disabled>Option 3</CheckboxItem>
          <CheckboxItem disabled checked>
            Option 4
          </CheckboxItem>
        </List> */}
      </View>
    )
  }
}

const styles = {}