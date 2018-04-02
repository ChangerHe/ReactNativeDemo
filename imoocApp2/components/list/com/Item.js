import React, {Component} from 'react'
import {View, Text, TouchableHighlight, Image, Dimensions, Alert} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

// 获取当前可视区的宽度
const {height, width} = Dimensions.get('window')

const styles = {
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#090'
    },
    header: {
        paddingTop: 25,
        paddingBottom: 12,
        width,
        backgroundColor: '#900'
    },
    headerTitle: {
        color: '#fff',
        fontSize: 16,
        textAlign: 'center',
        fontWeight: '600'
    },
    item: {
        width,
        marginBottom: 10,
        backgroundColor: '#fff'
    },
    thumb: {
        width,
        height: width * 0.5,
        resizeMode: 'cover'
    },
    title: {
        padding: 10,
        fontSize: 16,
        color: '#333'
    },
    itemFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#eee'
    },
    handleBox: {
        padding: 10,
        flexDirection: 'row',
        width: width / 2 - 0.5,
        justifyContent: 'center',
        backgroundColor: '#fff'
    },
    play: {
        position: 'absolute',
        bottom: 54,
        right: 14,
        width: 46,
        height: 46,
        paddingTop: 9,
        paddingLeft: 18,
        backgroundColor: 'transparent',
        borderColor: '#fff',
        borderWidth: 1,
        color: '#ed7b66'
    },
    handleText: {
        paddingLeft: 12,
        fontSize: 18,
        color: '#333'
    },
    up: {
        fontSize: 22,
        color: '#333'
    },
    upper: {
        fontSize: 22,
        color: '#900'
    },
    commentIcon: {
        fontSize: 22,
        color: '#333'
    }
}

class EmptyPage extends React.Component {
  render() {
    return (
      <View>
        <Text>
          {/* {this.props.text} */}
          234
        </Text>
      </View>
    );
  }
}

export default class Item extends Component {
    constructor(props) {
        super(props)
        this.state = {
            up: false
        }
    }

    onLikePress() {
        if (this.state.up) {
            this.setState({
                up: false
            })
        } else {
            this.setState({
                up: true
            })
        }
    }

    onItemNavigate() {
      this.props.navigator.push({
        title: '222',
        component: EmptyPage,
        backButtonTitle: 'Custom Back',
        // passProps: {depth: this.props.depth ? this.props.depth + 1 : 1},
      });
    }

    render() {
        const row = this.props.row
        return (
            <TouchableHighlight
              onPress={this.onItemNavigate.bind(this)}
            >
                <View style={styles.item}>
                    <Text style={styles.title}>{row.title}</Text>
                    <Image
                        source={{uri: row.thumb}}
                        style={styles.thumb}
                    />
                    <Icon
                        name='caret-right'
                        size={28}
                        style={styles.play}
                    />
                    <View style={styles.itemFooter}>
                        <TouchableHighlight onPress={this.onLikePress.bind(this)}>
                            <View style={styles.handleBox}>
                                <Icon
                                    name='tint'
                                    size={28}
                                    style={!this.state.up? styles.up: styles.upper }
                                />
                                <Text style={styles.handleText}>喜欢</Text>
                                <Text></Text>
                            </View>
                        </TouchableHighlight>
                        
                        <View style={styles.handleBox}>
                            <Icon
                                name='comments'
                                size={28}
                                style={styles.up}
                            />
                            <Text style={styles.commentIcon}>评论</Text>
                            <Text></Text>
                        </View>
                    </View>
                </View>
            </TouchableHighlight>
        )
    }
}