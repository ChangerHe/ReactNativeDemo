import React from 'react'
import {View, Text, Button} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'; //图标库

export default class Page4 extends React.Component {
    render() {
        const {navigation} = this.props;
        return (
            <View
                style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
            }}>

                <Text>
                    Bus
                </Text>
                <Ionicons
                    name={'ios-home'}
                    size={26}
                    style={{color:'red'}}
               />
                <Button title="Toggle Drawer" onPress={() => navigation.toggleDrawer()} //打开或关闭抽屉
                />
            </View>
        )
    }
}