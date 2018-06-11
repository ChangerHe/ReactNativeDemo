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
			this.props.navigation.navigate(userToken ? 'App' : 'Auth');
			
		}, 1000);
  };

  // Render any loading content that you like here
  render() {
    return (
      <SafeAreaView style={styles.container}>
				<View style={{'flex': 1}}>
					<ActivityIndicator />
					<StatusBar barStyle="light-content" />
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