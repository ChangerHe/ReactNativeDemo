## react-native预研demo

- 目标技术栈:
-    框架: react-native
-    导航: react-navigation
-    状态管理: redux
-    异步状态: redux-saga
-    字体图标: react-native-vector-icons
-    Baidu地图: react-native-baidu-map
-    轮播图: react-native-swiper

## TodoList

- [x] 安卓的页面shadow问题
- [x] 安卓页面的跳转右向左动画问题
- [x] animation实现
- [x] BMap引入, 与原生一致
- [x] native端集成, 与native端的跳转
- [x] 项目打包发布

## Doing

## Done

- [x] 页面Router系统
- [x] native端与webview的通信

## warning

1. Baidu地图的依赖因为版本较老, 所以我们需要修改Baidu地图的源码: 

```
// react-native-baidu-map /android/build.grandle   下面为对应的修改内容
apply plugin: 'com.android.library'

buildscript {
    repositories {
        jcenter()
    }
    dependencies {
        classpath 'com.android.tools.build:gradle:2.3.2'   // gradle版本升级为2.3.2

        // NOTE: Do not place your application dependencies here; they belong
        // in the individual module build.gradle files
    }
}

android {
    compileSdkVersion 25  // sdk版本进行了升级
    buildToolsVersion "25.0.1"  // sdk版本进行了升级

    defaultConfig {
        minSdkVersion 16
        targetSdkVersion 25  // sdk版本进行了升级
        versionCode 1
        versionName "1.0"
    }
    buildTypes {
        release {
            minifyEnabled false
            proguardFiles getDefaultProguardFile('proguard-android.txt'), 'proguard-rules.pro'
        }
    }
}

dependencies {
    compile 'com.facebook.react:react-native:+'
    compile files('libs/BaiduLBS_Android.jar')
}
```

2. 因新版的react将prop-types抽取出来成为独立的依赖, 因此我们需要额外将依赖重新引入

```
// react-native-baidu-map中的js文件
import React, {
  Component,
  // PropTypes
} from 'react';
import PropTypes from 'prop-types';
```

3. 注释掉`src/main/java..../BaiduMapPackage.java`中最后一个`@override`这一行