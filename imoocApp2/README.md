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

另外需要额外注意的是dataSource的用法

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