import React, {Component} from 'react'
import {
    View,
    Text,
    ListView,
    StyleSheet,
    TouchableHighlight,
    Image,
    Dimensions,
    ActivityIndicator,
    RefreshControl
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import Mock from 'mockjs'

import request from '../common/request'
// import Item from './com/Item'

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


export default class List extends Component {
    constructor(props) {
        super(props)
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows([]),
            testData: '11111',
            // 是否正在加载
            isLoadingTail: false,
            nextPage: 2,
            items: [],
            total: 0,
            isRefreshing: false,
            up: false
        };
    }

    componentDidMount() {
        this._getMockData(0)
    }

    onLikePress() {
        // console.error(this.state.up)
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

    _renderRow(row) {
        return (
            // <Item row={row}/>
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
                                  style={!this.state.up ? styles.up: styles.upper }
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

    // 获取页面的mock数据
    _getMockData(page) {
        if(page !== 0) {
            this.setState({
                isLoadingTail: true
            })
        } else {
            this.setState({
                isRefreshing: true
            })
        }
        request.get('/api/creations',{
            access_token: 123,
            page
        }).then((response) => {

            if (response.success) {
                // console.error(response.total)
                // 加载太快看不到加载效果, 所以加一个延时
                let time = 0
                if(page !== 0) {
                    time = 2000
                }
                setTimeout(() => {
                    let data
                    if (page !== 0) {
                        data = this.state.items.concat(response.data)
                    } else {
                        data = response.data
                    }
                    this.setState({
                        items: data,
                        isLoadingTail: false,
                        isRefreshing: false,
                        total: response.total
                    }, () => {
                        this.setState({
                            dataSource: this.state.dataSource.cloneWithRows(this.state.items),
                        })
                    })
                }, time);
            }
        })
    }

    _fetchMoreData() {
        // 有更多数据, 且当前没有处于加载状态时
        if(!this._hasMore() || this.state.isLoadingTail) {
            return 
        }
        const page = this.state.nextPage
        // console.error(page)
        this._getMockData(page)
        // 因为是异步的, 下面这个不是稳妥的方案
        this.setState({
            nextPage: page + 1
        })
    }

    _onRefresh() {
        if (!this._hasMore() || this.state.isRefreshing) {
            return 
        }
        this._getMockData(0)
    }

    _hasMore() {
        if (this.state.total >= this.state.items.length) {
            return true
        } else {
            return false
        }
    }

    _renderFooter() {
        if(!this._hasMore()) {
            return (
                <View style={{textAlign: 'center'}}><Text>没有更多了~</Text></View>
            )
        } else if(this.state.total !== 0) {
            return <ActivityIndicator/>
        }
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
                    renderRow={this._renderRow.bind(this)}
                    // 触底之后的触发事件
                    onEndReached={this._fetchMoreData.bind(this)}
                    // 离底部多远开始刷新
                    onEndReachedThreshold={20}
                    // 允许空内容, 否则会出现警告
                    enableEmptySections={true}
                    // 底部的渲染样式
                    renderFooter={this._renderFooter.bind(this)}
                    // 设置不显示滚动条
                    showsVerticalScrollIndicator={false}
                    refreshControl={
                        <RefreshControl
                            // 是否在刷新的状态
                            refreshing={this.state.isRefreshing}
                            // 视图开始刷新时调用
                            onRefresh={this._onRefresh.bind(this)}
                            // 指定刷新指示器的颜色
                            tintColor="#ff0000"
                            // 指定刷新指示器下面显示的文字
                            title="Loading..."
                            // 指定刷新指示器的颜色
                            titleColor="#00ff00"
                            // 指定至少一种颜色用来绘制刷新指示器
                            colors={['#ff0000', '#00ff00', '#0000ff']}
                            // 指定刷新指示器的背景色
                            progressBackgroundColor="#ffff00"
                            // 指定刷新指示器的垂直起始位置
                            progressViewOffset={10}
                        />
                    }
                />
            </View>
        )
    }
}

