import React from 'react'
import {SafeAreaView} from 'react-native'
import Drawer from "./src/navigations/index";

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