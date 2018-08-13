## react-native预研demo

目标技术栈:
- [x] 框架: react-native
- [x] 导航: react-navigation(v2)
- [ ] 状态管理: redux
- [ ] 异步状态: redux-saga
- [x] 字体图标: react-native-vector-icons
- [x] Baidu地图: react-native-baidumap-sdk
- [x] 轮播图: react-native-swiper

## TodoList

- [x] 安卓的页面shadow问题
- [ ] 安卓页面的跳转右向左动画问题
- [x] animation实现
- [ ] BMap与app内效果功能一致
- [ ] 项目打包发布

## Doing


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

4. 引入swiper依赖后, 当开启localhost debug的时候会抛出`cannot read property 'x' of undefined`错误, 这是因为`reac-native-swiper`的依赖引入问题, 我们需要修改部分此依赖的源码

```
// react-native-swiper src/index  396行
updateIndex = (offset, dir, cb) => {
    if(offset === undefined || this.internals.offset === undefined){  // 增加一段
      return;
    }
    const state = this.state
    let index = state.index
    const diff = offset[dir] - this.internals.offset[dir]
    // 省略...
}
```

5. 打包android时, 有可能会碰到`Original is here. Theversion qualifier may be implied.`的问题, 此时需要在`node_modules/react-native/react.gradle`中, 加入如下内容

```
def currentBundleTask = tasks.create(
    name: bundleJsAndAssetsTaskName,
    type: Exec) {
    // ...
    doLast {
        def moveFunc = { resSuffix ->
            File originalDir = file("${resourcesDir}/drawable-${resSuffix}")
            if (originalDir.exists()) {
                File destDir = file("${resourcesDir}/drawable-${resSuffix}-v4")
                ant.move(file: originalDir, tofile: destDir)
            }
        }
        moveFunc.curry("ldpi").call()
        moveFunc.curry("mdpi").call()
        moveFunc.curry("hdpi").call()
        moveFunc.curry("xhdpi").call()
        moveFunc.curry("xxhdpi").call()
        moveFunc.curry("xxxhdpi").call()
    }
}
```

## 目前未实现的地方

1. 地图页view的动画

2. 地图路线的方向箭头

3. 地图位置poi搜索(模糊搜索)

4. 地图的tooltip上为不同位置的view绑定不同的事件

## 打包

### android


生成秘钥

```
keytool -genkey -v -keystore my-release-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000
```

#### 设置gradle变量

把my-release-key.keystore文件放到你工程中的android/app文件夹下。


2.编辑~/.gradle/gradle. properties或../android/gradle.properties(一个是全局gradle.properties，一个是项目中的gradle.properties，大家可以根据需要进行修改) ，加入如下代码：

```
MYAPP_RELEASE_STORE_FILE=your keystore filename  
MYAPP_RELEASE_KEY_ALIAS=your keystore alias  
MYAPP_RELEASE_STORE_PASSWORD=*****    
MYAPP_RELEASE_KEY_PASSWORD=*****
```

提示：用正确的证书密码、alias以及key密码替换掉 *。

#### 在gradle配置文件中添加签名配置

编辑 android/app/build.gradle文件添加如下代码：

```
android {  
        ...  
        defaultConfig { ... }  
        signingConfigs {  
            release {  
            storeFile file(MYAPP_RELEASE_STORE_FILE)  
            storePassword MYAPP_RELEASE_STORE_PASSWORD  
            keyAlias MYAPP_RELEASE_KEY_ALIAS  
            keyPassword MYAPP_RELEASE_KEY_PASSWORD  
            }  
        }  
        buildTypes {  
            release {  
             ...  
             signingConfig signingConfigs.release  
                }  
            }  
}  
```

主要点在于`signConfigs`的配置

#### 通过rn命令生成bundle文件

```
React-native bundle --entry-file index.Android.js --bundle-output ./android/app/src/main/assets/index.android.jsbundle --platform android --assets-dest ./android/app/src/main/res/ --dev false
```

#### 编译apk

```
cd android && ./gradlew assembleRelease
```