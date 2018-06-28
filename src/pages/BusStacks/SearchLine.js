import React from 'react'
import {View, Text, Button} from 'react-native'

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
                    search line
                </Text>
                <Button title="Toggle Drawer" onPress={() => navigation.toggleDrawer()} //打开或关闭抽屉
                />
                <Button title="Toggle login" onPress={() => navigation.navigate('LoginForm')}/>
            </View>
        )
    }
}