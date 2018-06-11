import { createSwitchNavigator, createStackNavigator } from 'react-navigation';
import { AppStackNavigator } from './AppNavigators'
import AuthLoadingScreen from './AuthLoadingScreen'
import AuthStack from './AuthStack'

export default createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: AppStackNavigator,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'App',
  }
);