import React from 'react'
import {
  View,
  Text,
  Animated,
  Easing,
  ScrollView,
  StyleSheet,
  TouchableHighlight,
  TouchableWithoutFeedback
} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'; //图标库
import FontAwesome from 'react-native-vector-icons/FontAwesome'; //图标库
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
      rideHistory: [
        1, 3
      ],
      onStation: '天安数码时代大厦',
      offStation: '车公庙(地铁站)',
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
  render() {
    const {navigation} = this.props;
    return (
      <View style={{}}>
        <View style={{
          flexDirection: 'row',
          marginTop: 6,
          marginBottom: 6,
          backgroundColor: '#fff',
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
          <TouchableWithoutFeedback
            onPress={() => {
            this.setState({onStation: this.state.offStation, offStation: this.state.onStation})
          }}
            style={{}}>
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
          </TouchableWithoutFeedback>
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
                <Text>{this.state.onStation}</Text>
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
              <TouchableHighlight
                onPress={() => {
                navigation.push('SearchLine')
              }}>
                <Text>{this.state.offStation}</Text>
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
        <ScrollView style={{
          marginTop: 10
        }}>
          <View style={{
            paddingBottom: 230
          }}>
            <View style={{
              backgroundColor: '#fff'
            }}>
              <View
                style={{
                width: 70,
                height: 20,
                backgroundColor: 'blue',
                borderBottomRightRadius: 10
              }}>
                <Text style={{
                  color: '#fff'
                }}>历史乘坐</Text>
              </View>
            </View>

            {this.state.rideHistory.length
              ? this
                .state
                .rideHistory
                .map((v) => {
                  return (
                    <TouchableWithoutFeedback
                      onPress={() => {
                        console.log(111)
                        navigation.push('MapPage', {
                          param: v
                        })
                    }}>
                      <View
                        style={{
                        flexDirection: 'row',
                        paddingTop: 10,
                        paddingBottom: 10,
                        backgroundColor: '#fff',
                        borderBottomColor: '#ccc',
                        borderBottomWidth: 1,
                        borderStyle: 'solid'
                      }}>
                        <View style={{
                          flex: 1
                        }}>
                          <View
                            style={{
                            flexDirection: 'row',
                            paddingLeft: 8,
                            paddingTop: 8
                          }}>
                            <Text
                              style={{
                              borderRightColor: '#ccc',
                              borderRightWidth: 1,
                              borderStyle: 'solid'
                            }}>F1</Text>
                            <Text>首站发车时间17:25/{v}</Text>
                          </View>
                          <View
                            style={{
                            paddingLeft: 8,
                            paddingTop: 8,
                            flexDirection: 'row'
                          }}>
                            <Ionicons
                              name='ios-arrow-dropup-circle'
                              size={20}
                              style={{
                              paddingRight: 6,
                              color: 'green'
                            }}/>
                            <Text>固戍地铁站</Text>
                          </View>
                          <View
                            style={{
                            paddingLeft: 8,
                            paddingTop: 8,
                            flexDirection: 'row'
                          }}>
                            <Ionicons
                              name='ios-arrow-dropdown-circle'
                              size={20}
                              style={{
                              paddingRight: 6,
                              color: 'red'
                            }}/>
                            <Text>深大北门</Text>
                          </View>
                        </View>
                        <View
                          style={{
                          flex: 0,
                          width: 100,
                          justifyContent: 'center',
                          alignItems: 'center'
                        }}>
                          <TouchableHighlight
                            onPress={() => {
                              navigation.push('BuyTicket', {
                                param: v
                              })
                            }}
                            style={{
                            width: 60,
                            height: 30,
                            backgroundColor: '#fff',
                            borderWidth: 1,
                            borderStyle: 'solid',
                            borderColor: 'blue'
                          }}>
                            <Text
                              style={{
                              textAlign: 'center',
                              lineHeight: 30
                            }}>$4 购票</Text>
                          </TouchableHighlight>
                        </View>
                      </View>
                    </TouchableWithoutFeedback>
                  )
                })
              : ''
}

          </View>

        </ScrollView>
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