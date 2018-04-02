# 项目版本

因为react-native的项目对版本的要求很严格, 不同版本之间的兼容性可能会存在问题, 所以我们在这个项目中, 将版本锁定到@0.22.0版本

```
sudo npm i react-native@0.22.0 -g
```

同时需要注意的是, 在安装rn的过程中, 因为需要引入facebook的一些依赖包之类, 很有可能会遇到依赖安装特别久的问题, 直到安装不了, 这个时候需要我们手动下载依赖, 并把没法安装的依赖包替换掉

当然, 这个依赖需要在网上找一下别人通过翻墙拿到的依赖包

最好的办法还是搞个vpn, 自己翻墙, 就省去了很多依赖的问题, 这种问题在0.45后是非常凸显的

同时, 我们使用vpn的同学也需要注意一下, 因为vpn会在电脑上产生一个网络的代理, 但是因为有这种代理机制的存在, 会导致我们的react-native项目   没!!! 法!!! 运!!! 行!!!

解决办法就是, 全局安装rn的时候, 开启全局代理, 在安装完毕后, 再关掉即可解决此问题


# 项目所需的依赖

> react-native-vector-icons

用于引入页面中的icon图标

> rnpm

专门开发出来用于react-native的功能, 用于将引入到react-native中的类库进行加载

安装方法:

```
yarn add react-native-vector-icons
sudo npm i rnpm -g
```

使用rnpm来连接我们所安装的类库
```
rnpm link react-native-vector-icons
```

连接成功之后, 就可以正常使用这个类库了

需要注意的是我们使用expo的时候是没法直接使用link的, 所以对于link在expo中的用法还需研究

# 注意点

- 1.listView列表视图

当我们使用`ListView`(列表视图)的时候, 因为需要引入`dataSource`和`renderRow`分别作为数据源和渲染模板的时候, 此时就无法将state中的内容渲染到列表视图中了

另外需要额外注意的是`dataSource`的用法

```
// ds作为列表视图的数据对象, 控制列表的改变
const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
this.state = {
    dataSource: ds.cloneWithRows([
        {
            "id":"520000197903055285",
            "thumb":"http://dummyimage.com/600x300/acc669)",
            "video":"http://pcad.video.baidu.com/2c186861490224ba1bab125ee9657c91.mp4?_=1522150394539"
        }
        ,
        {
            "id":"320000198304143686",
            "thumb":"http://dummyimage.com/600x300/907bb5)",
            "video":"http://pcad.video.baidu.com/2c186861490224ba1bab125ee9657c91.mp4?_=1522150394539"
        }
        ,
        {
            "id":"320000201705039032",
            "thumb":"http://dummyimage.com/600x300/b35020)",
            "video":"http://pcad.video.baidu.com/2c186861490224ba1bab125ee9657c91.mp4?_=1522150394539"
        }
    ]),
};
```

##### 通过listView实现上拉加载更多

在listView上增加属性onEndReached,并定义一个相应的方法

onEndReached表示触底所对应发生的触底事件

我们定义在触底之后, 调用一个_fetchMoreData事件, 当有更多数据, 且数据不是在加载中状态时, 我们再次调用getMockData去请求更多的数据, 拼合到之前的数据列表中, 并实现渲染即可实现出类似于数据加载更多的效果

在真实生产环境中, 我们需要在请求中请求到每次的数据的size和page等数据, 在每次请求时, 将size和page也作为一个状态去进行管理, 每次多请求数据时, 内容对应的size和page根据需求进行增加, 并注意在数据每次返回时, 返回一个total的字段, 表示数据总量

数据总量的作用是, 当请求到的数据数组长度小于数据总量的时候, 表示仍然是有数据的, 此时才可再次请求, 否则应告知用户已经没有更多数据

也就是上面实现的_hasMore的方法的作用

```
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
```

另外需要注意下对于请求到的数据的处理, 这里我定义了一个items的空数组对请求到的数据进行保存, 渲染内容以items这个state的状态数据为准

```
f (response.success) {
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
```

注意这个items的处理, 当page不等于0, 也就是不是第一次加载的时候, 才对page进行concat, 因为考虑到上拉刷新的情况, 刷新是数据是覆盖的,setState是一个异步的处理过程, 我们将items setState之后, 就可以在回调中去使用这个保存好的items的值了

另外一点的优化是, 目前我们加载的时候是没有任何的额外提示的, 这样其实给到用户的感知其实是不好的, 我们可以使用renderFooter来对页面的底部进行渲染

```
_renderFooter() {
    if(!this._hasMore()) {
        return (
            <View style={{textAlign: 'center'}}><Text>没有更多了~</Text></View>
        )
    } else if(this.state.total !== 0) {
        return <ActivityIndicator/>
    }
}
```

当已经没有更多数据时, 显示的是没有更多的提示

当还有数据在加载的时候显示ActivityIndicator这个组件, 这个组件用于显示一个圆形的loading提示符号, 提示用户正在加载中

相关参数 

> onEndReachedThreshold  传入数字, 表示触底的范围

> showsVerticalScrollIndicator 传入布尔值, 表示垂直滚动条是否显示

##### 通过listView实现下拉刷新

在listView上我们可以调用refreshControl方法, 表示下拉刷新的控制, 同步配合RefreshControl这个组件, 来实现刷新时的显示效果

RefreshControl这一组件可以用在ScrollView和ListView上, 用于为其添加下拉刷新功能

```
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
```



- 2.fetch请求

通过fetch请求到的东西, 实际得到的是一个字符串的结果, 因此我们不需要将请求到的内容进行字符串化🌹

同时, 不知道是不是因为请求接口特殊的原因, 使用mockjs的接口请求到的内容其实最终是处在`_bodyInit`这个对象里面, 且是一个字符串.

简单实例:

```
getMockData() {
    fetch('http://rapapi.org/mockjs/32725/api/creations/?access_token=123')
        .then((response) => {
            this.setState({
                // 这里看到获取到的内容中实际是一个字符串, 需要使用JSON.parse对请求到的内容进行解析
                // 注意响应的对象的名称
                testData: response._bodyInit
            })
        })
        .catch((error) => {
            console.error(error);
        });
}
```

- 引入mockjs

在初期项目中因为用不到后台的请求这些, 所以我们引入mockjs来处理请求到的没有经过解析的mockjs形式的结果

所以在这里我们需要将请求到的字符串对象结果进行mock解析, 然后再设置到state中的dataSource中

```
var data = Mock.mock(response)
this.setState({
    dataSource: this.state.dataSource.cloneWithRows(data.data)
})
```

这里需要注意的是需要使用原版的dataSource调用cloneWithRows来进行判定渲染, 否则会出现问题