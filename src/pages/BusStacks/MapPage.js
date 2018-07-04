import {MapView, Location, Geocode} from 'react-native-baidumap-sdk'
import React, {Component} from 'react'
import {View, Text, TouchableWithoutFeedback, Platform, Linking} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'

import lineMsg from '../../../mock/line'

export default class MapBaiduPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      location: {
        latitude: 22.540717,
        longitude: 114.038504
      },
      points: [
        {
          latitude: 22.540717,
          longitude: 114.038504
        }, {
          latitude: 22.540717,
          longitude: 114.038504
        }
      ]
    }
  }
  async componentWillMount() {
    this.setState({points: lineMsg.data.routeList})
    await Location.init()
    Location.addLocationListener(location => {
      console.log(location, 'location')
      this.setState({location})
    })
    Location.start()
  }
  onPress() {
  }
  onCalloutPress() {
    if (Platform.OS === 'ios') {
      
    } else {
      Linking.canOpenURL('baidumap://map/show').then(supported => {
        if (supported) {
          Linking.openURL(`baidumap://map/direction?origin=${this.state.location.latitude},${this.state.location.longitude}&destination=深南香蜜立交①&zoom=16&traffic=off&mode=walking&sy=0`);
        } else {
          Linking.canOpenURL('amapuri://route/plan').then(supported => {
            if (supported) {
              Linking.openURL(`amapuri://route/plan/?dname=深南香蜜立交1(公交站)&t=2`)
            }
          })
        }
      });
    }
  }
  render() {
    const {navigation} = this.props;
    return (
      <View style={{
        flex: 1,
        position: 'relative',
        width: '100%',
      }}>
        <MapView
          zoomLevel={14}
          overlookDisabled={true}
          locationMode='follow'
          minZoomLevel={18}
          maxZoomLevel={10}
          point={{
          x: 1,
          y: 2
        }}
          ref={ref => this.mapView = ref}
          style={{
          flex: 1,
          width: '100%',
          height: '100%'
        }}
          center={this.state.location}
          onLoad={() => console.warn('onLoad')}
          onClick={point => console.warn(point)}
          onStatusChange={status => console.warn(status)}>
          <MapView.Marker
            selected={true}
            title="This is a image marker"
            style={{
            width: 100,
            height: 30
          }}
            coordinate={this.state.location}>
            <MapView.Callout
              onPress={this.onCalloutPress.bind(this)}
            >
              <View
                style={{
                width: 200,
                height: 100,
                backgroundColor: '#fff'
              }}>
                <View
                  style={{
                  flexDirection: 'row',
                  backgroundColor: '#fff',
                  height: 40,
                  borderBottomColor: '#ccc',
                  borderBottomWidth: 1,
                  borderStyle: 'solid',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}>
                  <Text>深南香蜜立交①</Text>
                  <Text style={{
                    paddingLeft: 10
                  }}>预计18:21</Text>
                </View>
                <View
                  style={{
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  alignItems: 'center',
                  height: 50,
                  backgroundColor: '#fff'
                }}>
                  <View style={{
                    flexDirection: 'row'
                  }}>
                    <Ionicons
                      name='md-eye'
                      size={20}
                      style={{
                      color: 'blue'
                    }}/>
                    <Text style={{
                      color: 'blue'
                    }}>上车买票</Text>
                  </View>
                  <View>
                    <View
                      style={{
                      flexDirection: 'row'
                    }}>
                      <Ionicons
                        name='ios-walk'
                        size={20}
                        style={{
                        color: 'blue'
                      }}/>
                      <Text style={{
                        color: 'blue'
                      }}>去这里</Text>
                    </View>

                  </View>
                </View>
              </View>
            </MapView.Callout>
          </MapView.Marker>
          <MapView.Polyline points={this.state.points} width={4} color="#3391e8"/>
          <MapView.Circle
            center={this.state.location}
            radius={1000}
            strokeWidth={2}
            strokeColor="rgba(0,0,255, 0)"
            fillColor="rgba(0,0,255, .3)"/>
        </MapView>
        <View style={{
          position: 'absolute',
          bottom: 20,
          width: '100%',
          alignItems: 'center',
        }}>
          <TouchableWithoutFeedback
            onPress={() => {
              navigation.navigate('BuyTicket')
            }}
          >
            <View style={{
              width: '80%',
              height: 38,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#3391e8',
              borderRadius: 4
            }}>
              <Text style={{
                color: '#fff'
              }}>购票</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
    )
  }
}
