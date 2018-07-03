import React from 'react'
import {SafeAreaView} from 'react-native'
import Drawer from "./src/navigations/index";


import { Initializer } from 'react-native-baidumap-sdk'
Initializer.init('iOS 开发密钥').catch(e => console.error(e))
class SafeAreaWrapper extends React.Component {
    render() {
        return (
            <SafeAreaView style={{
                flex: 1
            }}>
                <Drawer />
            </SafeAreaView>
        )
    }
}

export  default SafeAreaWrapper;