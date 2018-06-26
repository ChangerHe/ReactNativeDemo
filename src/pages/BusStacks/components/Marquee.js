import React, { Component } from 'react';
import {
StyleSheet,
Animated,
Easing,
View,
Text,
} from 'react-native';
import Dimensions from 'Dimensions';


export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      translateY: new Animated.Value(0),
    };


  }


  componentDidMount() {console.log('componentDidMount')
    this.showHeadBar(0, 5);         //从第0条开始，轮播5条数据
  }


  showHeadBar(index, count) {console.log('start')
    index++;
    Animated.timing(this.state.translateY, {
      toValue: -40 * index,             //40为文本View的高度
      duration: 300,                        //动画时间
      Easing: Easing.linear,
      delay: 1500                            //文字停留时间
    }).start(() => {                          //每一个动画结束后的回调 
      if(index >= count) {
        index = 0;
        this.state.translateY.setValue(0);
      }
      this.showHeadBar(index, count);  //循环动画
    })
  }


 
  render() {
    return(
      <View style={styles.container}>
      <Animated.View
        style={[styles.wrapper, {
          transform: [{
            translateY: this.state.translateY
          }]
        }
        ]}
      >
        <View style={styles.bar}>
          <Text style={styles.barText}>1111</Text>
        </View>
        <View style={styles.bar}>
          <Text style={styles.barText}>2222</Text>
        </View>
        <View style={styles.bar}>
          <Text style={styles.barText}>3333</Text>
        </View>
        <View style={styles.bar}>
          <Text style={styles.barText}>4444</Text>
        </View>
        <View style={styles.bar}>
          <Text style={styles.barText}>5555</Text>
        </View>
        <View style={styles.bar}>
          <Text style={styles.barText}>1111</Text>
        </View>
      </Animated.View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    marginTop: 5,
    height: 40,
    overflow: 'hidden',


    backgroundColor: '#fff6ca',
    borderRadius: 14,
  },
  wrapper: {
    marginHorizontal: 5,
  },


  bar: {
    height: 40,
    justifyContent: 'center',
  },


  barText: {
    width: Dimensions.get('window').width - 30 - 16,
    marginLeft: 5,
    color: '#ff7e00',
    fontSize: 14,
  },
});