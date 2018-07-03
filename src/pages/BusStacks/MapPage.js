import {MapView, Location, Geocode} from 'react-native-baidumap-sdk'
import React, {Component} from 'react'
import {View, Text} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'

import lineMsg from '../../../mock/line'

// state = { location: null }

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

    // setTimeout(() => {   this     .mapView     .setStatus({       center: {
    // latitude: 22.540717,         longitude: 114.038504       }     }, 100) },
    // 1000);
  }
  onPress() {
    console.log(111222)
  }
  render() {
    return (
      <View style={{
        flex: 1
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
            <MapView.Callout>
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
                  <Text>深南香蜜立交</Text>
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
                  <View style={{
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

      </View>
    )
  }
}
