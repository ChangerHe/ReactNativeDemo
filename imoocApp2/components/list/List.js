import React, {Component} from 'react'
import {View, Text, ListView, StyleSheet, TouchableHighlight, Image, Dimensions} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import Mock from 'mockjs'

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
        backgroundColor: '#900',
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
        width: width/2 - 0.5,
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
        color: '#333',
    },
    up: {
        fontSize: 22,
        color: '#333',
    },
    commentIcon: {
        fontSize: 22,
        color: '#333'
    }
}

export default class List extends Component {
    constructor(props) {
        super(props)
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows(),
            testData: '11111'
        };
    }

    componentDidMount() {
        this.getMockData()
    }

    // 获取页面的mock数据
    getMockData() {
        // console.error('11111')
        // console.warn('22222')
        fetch('http://rapapi.org/mockjs/32725/api/creations/?access_token=123')
            .then((response) => {
                // console.error(response, '1111')
                // this.setState({
                //     // 这里看到获取到的内容中实际是一个字符串, 需要使用JSON.parse对请求到的内容进行解析
                //     // 注意响应的对象的名称
                //     testData: response._bodyInit
                // })
                return JSON.parse(response._bodyInit)
            }).then((response) => {
                var data = Mock.mock(response)
                console.error(JSON.stringify(data))
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(data.data)
                })
            })
            .catch((error) => {
                console.error(error);
            });
    }

    renderRow(row) {
        return (
            <TouchableHighlight>
                <View style={styles.item}>
                    <Text style={styles.title}>{row.id}</Text>
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
                        <View style={styles.handleBox}>
                            <Icon
                                name='tint'
                                size={28}
                                style={styles.up}
                            />
                            <Text style={styles.handleText}>喜欢</Text>
                            <Text></Text>
                        </View>
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

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                   <Text style={styles.headerTitle}>list 页面</Text>
                    <Text>{this.state.testData}</Text>
                </View>
                {/* 列表视图 */}
                <ListView 
                    dataSource={this.state.dataSource}
                    renderRow={this.renderRow}
                    // enableEmptySections={true}
                />
            </View>
        )
    }
}

