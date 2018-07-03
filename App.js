import React from 'react'
import {SafeAreaView} from 'react-native'
import Drawer from "./src/navigations/index";


import { Initializer } from 'react-native-baidumap-sdk'
Initializer.init('uuwHEtK0libEx0aYdpkG2qUhQ138Vb2c').catch(e => console.error(e))
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