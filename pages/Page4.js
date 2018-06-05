import React, { Component } from 'react';
import {

    StyleSheet,
    Text,
    View,
    Button,
} from 'react-native';

export default class Page4 extends Component {

    render() {
        const {navigation}=this.props;
        return (
            <View style={styles.container}>
                <Text>欢迎来到page4</Text>
                <Button
                    title="Open Drawer"
                    onPress={()=>navigation.openDrawer()}//打开抽屉
                />
                <Button
                    title="Toggle Drawer"
                    onPress={()=>navigation.toggleDrawer()}//打开或关闭抽屉
                />
                <Button
                    title="Go to Page5"
                    onPress={()=>navigation.navigate('Page5')}//跳转到page5
                />

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#c5ffe1',
    }
});