import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  View,
	Button,
  SafeAreaView,
} from 'react-native';
import { createStackNavigator } from 'react-navigation';

class SignInScreen extends React.Component {
  static navigationOptions = {
    title: 'Please sign in',
  };

  render() {
    return (
      <SafeAreaView>
        <View style={{'flex': 1}}>
          <Button title="Sign in!" onPress={this._signInAsync} />
          <Button title="loading!" onPress={() => {
            this.props.navigation.navigate('AuthLoading')
          }} />
          <Button title="home!" onPress={() => {
            this.props.navigation.navigate('Auth')
          }} />
        </View>
      </SafeAreaView>
      
    );
  }

  _signInAsync = async () => {
    await AsyncStorage.setItem('userToken', 'abc');
    this.props.navigation.navigate('App');
  };
}

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Welcome to the app!',
  };

  render() {
    return (
      <SafeAreaView>
        <View style={{'flex': 1}}>
          <Button title="Show me more of the app" onPress={this._showMoreApp} />
          <Button title="Actually, sign me out :)" onPress={this._signOutAsync} />
        </View>
      </SafeAreaView>
    );
  }

  _showMoreApp = () => {
    this.props.navigation.navigate('Other');
  };

  _signOutAsync = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('SignIn');
  };
}




export default createStackNavigator({ SignIn: SignInScreen, Home: HomeScreen }, {initialRouteName: 'Home'});