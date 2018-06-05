import React, { Component } from 'react';

import {
    StyleSheet,
    Text,
    View,
    Button,
		AsyncStorage,
		SafeAreaView
} from 'react-native';


export default class App extends Component {
    static navigationOptions = {
        title: '主页',

    };
		_signOutAsync = async () => {
			await AsyncStorage.clear();
			this.props.navigation.navigate('Auth');
		};
    render() {
        const {navigation} =this.props;
        return (
		      <SafeAreaView style={styles.container}>
					  <View style={styles.container}>
                <Button
                    title="go to TabNav"
                    onPress={()=>navigation.navigate('TabNav')}
                />

                <Text/>

                <Button
                    title="go to DrawerNav"
                    onPress={()=>navigation.navigate('DrawerNav')}
                />
                <Button
                    title="sign out"
                    onPress={()=>this._signOutAsync()}
                />
            </View>
					</SafeAreaView>			
          
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 0,
				width: '100%',
				height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#e5fffd',
    }
});