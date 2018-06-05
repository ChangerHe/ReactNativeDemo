import React, { Component } from 'react';

import {
    StyleSheet,
    Text,
    View,
    FlatList,
    RefreshControl,
    ActivityIndicator,
} from 'react-native';

const CITY_NAMES = ['北京', '上海', '广州','杭州', '苏州'];
export default class FlatListDemo extends Component {
    static navigationOptions = {
        title: 'FlatListDemo',
    };
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,//初始化的状态，此时加载状态为不加载
            dataArray: CITY_NAMES//初始数据
        }
    }

    loadData=(refreshing)=>{//根据传入数据判断是上拉还是下拉
        if (refreshing) {
            this.setState({
                isLoading: true//设置state为正在加载
            });
        }
        setTimeout(() => {
            let dataArray = [];
            if (refreshing) { //如果是下拉，把城市名反转
                for (let i = this.state.dataArray.length - 1; i >= 0; i--) {
                    dataArray.push(this.state.dataArray[i]);
                }
            } else {    //如果上拉，添加数据
                dataArray = this.state.dataArray.concat("我是底部新加的");
            }

            this.setState({
                dataArray: dataArray,//把数据重置为最新
                isLoading: false,//把加载状态设置为不加载（即加载结束）
            })
        }, 2000);
    };

    _renderItem= (data)=> {//自定义的渲染组件
        return <View style={styles.item}>
            <Text syle={styles.text}>{data.item}</Text>
        </View>
    };

    genIndicator= ()=>{ //底部加载(一个圆圈)
        return <View style={styles.indicatorContainer}>
            <ActivityIndicator
                style={styles.indicator}
                size={'large'}
                color={'red'}
                animating={true}
            />
            <Text>正在加载更多</Text>
        </View>
    };

    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    //1:数据的获取和渲染
                    data={this.state.dataArray}
                    renderItem={(data) => this._renderItem(data)}//将List中的renderRow中的内容抽出来单独放成一个组件来渲染
                    // refreshing={this.state.isLoading}
                    // onRefresh={() => {
                    //     this.loadData();
                    // }}
                    //2:自定义的下拉刷新
                    refreshControl={        //为控制listView下拉刷新的属性  用于自定义下拉图标设置
                        <RefreshControl         //这一组件可以用在ScrollView或ListView内部，为其添加下拉刷新的功能。
                            title={'Loading'}
                            colors={['red']}//android的刷新图标颜色
                            tintColor={'orange'}//ios的刷新图标颜色
                            titleColor={'red'}//标题的颜色
                            refreshing={this.state.isLoading}//判断是否正在刷新
                            onRefresh={() => {                  //触动刷新的方法
                                this.loadData(true)//加载数据(带参数)
                            }}
                        />
                    }

                    //3:自定义的上拉加载数据
                    ListFooterComponent={() => this.genIndicator()}//上拉加载更多的时候调用自定义的加载图标，一般为一个loading的圆圈（ActivityIndicator）
                    onEndReached={() => {//当所有的数据都已经渲染过，并且列表被滚动到距离最底部时调用
                        this.loadData()//加载数据（不带参数）
                    }}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    item: {
        backgroundColor: '#c5ecff',
        height: 150,
        marginRight: 15,
        marginLeft: 15,
        marginBottom: 15,
        alignItems: 'center',
        justifyContent: 'center',
        elevation:5,//漂浮的效果
        borderRadius:5,//圆角
    },
    text: {
        color: 'white',
        fontSize: 20,
    },
    indicatorContainer: {
        alignItems: 'center'
    },
    indicator: {
        color: 'red',
        margin: 10
    }
})