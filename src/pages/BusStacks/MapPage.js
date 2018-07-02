import React, {Component, PropTypes} from 'react';

import {MapView, MapTypes, Geolocation} from 'react-native-baidu-map';

import {
  Button,
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight
} from 'react-native';

import Dimensions from 'Dimensions';

export default class BaiduMapDemo extends Component {

  constructor() {
    super();

    this.state = {
      mayType: MapTypes.NORMAL,
      zoom: 15,
      center: {
        longitude: 113.981718,
        latitude: 22.542449
      },
      trafficEnabled: false,
      baiduHeatMapEnabled: false,
      markers: [
        {
          longitude: 113.981718,
          latitude: 22.542449,
          title: "Window of the world"
        }, {
          longitude: 113.995516,
          latitude: 22.537642,
          title: '123'
        }
      ]
    };
  }

  componentDidMount() {}

  render() {
    return (
      <View style={styles.container}>
        <View>

        </View>
        <MapView
          trafficEnabled={this.state.trafficEnabled}  // 是否开启交通图
          baiduHeatMapEnabled={this.state.baiduHeatMapEnabled}  // 是否开启热力图
          zoom={this.state.zoom}  // 缩放比例, 默认10
          mapType={1}  // 0 none 1 normal 2 地理地图
          center={this.state.center}  // 中心点, 对象{latitude: 0, longitude: 0}
          marker={this.state.marker}  // 标记点 {latitude: 0, longitude: 0, title: ''}
          markers={this.state.markers} // 	[marker, maker]
          style={styles.map}  // 
          onMarkerClick={(e) => {
          console.warn(JSON.stringify(e));
        }}
          onMapClick={(e) => {
            console.warn(JSON.stringify(e), 'mapclick');
          }}></MapView>

        <View style={styles.row}>
          <Button
            style={styles.btn}
            title="Locate"
            onPress={() => {
            console.warn('center', this.state.center);
            Geolocation
              .getCurrentPosition()
              .then(data => {
                console.warn(JSON.stringify(data));
                this.setState({
                  zoom: 15,
                  marker: {
                    latitude: data.latitude,
                    longitude: data.longitude,
                    title: 'Your location'
                  },
                  center: {
                    latitude: data.latitude,
                    longitude: data.longitude,
                    rand: Math.random()
                  }
                });
              })
              .catch(e => {
                console.warn(e, 'error');
              })
          }}/>
        </View>

        <View style={styles.row}>
          <Button
            title="Zoom+"
            onPress={() => {
            this.setState({
              zoom: this.state.zoom + 1
            });
          }}/>
          <Button
            title="Zoom-"
            onPress={() => {
            if (this.state.zoom > 0) {
              this.setState({
                zoom: this.state.zoom - 1
              });
            }
          }}/>
        </View>

        <View style={styles.row}>
          <Button
            title="Traffic"
            onPress={() => {
            this.setState({
              trafficEnabled: !this.state.trafficEnabled
            });
          }}/>

          <Button
            title="Baidu HeatMap"
            onPress={() => {
            this.setState({
              baiduHeatMapEnabled: !this.state.baiduHeatMapEnabled
            });
          }}/>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  row: {
    // flexDirection: 'row',
    marginTop: -200,
    height: 40
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  map: {
    width: Dimensions
      .get('window')
      .width,
    height: Dimensions
      .get('window')
      .height,
    marginBottom: 16
  }
});