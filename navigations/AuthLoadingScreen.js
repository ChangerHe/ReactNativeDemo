import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  View,
	Button,
	SafeAreaView
} from 'react-native';

export default class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    this._bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
		setTimeout(async () => {
			const userToken = await AsyncStorage.getItem('userToken');

			// This will switch to the App screen or Auth screen and this loading
			// screen will be unmounted and thrown away.
			this.props.navigation.navigate(userToken ? 'Auth' : 'App');
			
		}, 1000);
  };

  // Render any loading content that you like here
  render() {
    return (
      <SafeAreaView>
				<View style={{'flex': 1}}>
					<ActivityIndicator />
					<StatusBar barStyle="light-content" />
				</View>
			</SafeAreaView>			
    );
  }
}