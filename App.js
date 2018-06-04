import React from 'react';
import { View, Text, Button, Image} from 'react-native';
import {createStackNavigator, createBottomTabNavigator} from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';

class LogoTitle extends React.Component {
  render() {
    return (<View
      style={{
        width: '100%',
        height: 30,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <Image
        source={require('./assets/delete.png')}
        style={{
        width: 30,
        height: 30,
        flex: 0,
        justifyContent: 'center',
        alignItems: 'center'
      }}/>
      <Text>
        我是标题
      </Text>
    </View>);
  }
}

class HomeScreen extends React.Component {
  static navigationOptions = {
    headerTitle: <LogoTitle />,
    // 同样的, 对标题左侧和右侧, 也是一样可以进行设置的
    headerRight: (
      <Button
        onPress={() => alert('This is a button!')}
        title="Info"
        color="#000"
      />
    ),
    headerLeft: (
      <Button
        onPress={() => alert('This is a button!')}
        title="Info"
        color="#000"
      />
    ),
  }
  render() {
    return (
      <View
        style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <Text>Home Screen</Text>
        <Button
          title = "Go to Details"
          onPress = {
            () => this.props.navigation.navigate('Details', {
              itemId: 86,
              otherParam: 'anything you want here',
            })
        }
        />
      </View>
    );
  }
}

class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: 'a default title',
  }
  render() {
    console.log(1112222)
    return (
      <View
        style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <Text>我是setting</Text>
      </View>
    )
  }
}

class DetailsScreen extends React.Component {
  static navigationOptions = ({navigation}) => {
    return {
      title: navigation.getParam('otherParam', 'a default title'),
      // headerStyle: {
      //   backgroundColor: '#f4511e',
      // },
      // headerTintColor: '#fff',
      // headerTitleStyle: {
      //   fontWeight: 'bold',
      // },
    }
  }
  // constructor() {
  //   super(props)
  // }
  render() {
    const {navigation} = this.props;
    const itemId = navigation.getParam('itemId', 'NO-ID');
    const otherParam = navigation.getParam('otherParam', 'some default value');
    return (
      <View
        style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <Text>Details Screen</Text>
        <Text>{itemId}</Text>
        <Text>{otherParam}</Text>
        <Button
          title="Go to Details... again"
          onPress={() => this.props.navigation.push('Details')}
        />  
        <Button
          title="Go to Home"
          onPress={() => this.props.navigation.navigate('Home')}
        />
        <Button
          title="Go back"
          onPress={() => this.props.navigation.goBack()}
        />
        <Button
          title="Go top"
          onPress={() => this.props.navigation.popToTop()}
        />
        <Button
          title="set title"
          onPress={() => this.props.navigation.setParams({otherParam: 'changed'})}
        />
      </View>
    );
  }
}

const RootStack = createStackNavigator({
  Home: HomeScreen,  // 通过createStackNavigator来进行页面的路由配置
  Details: DetailsScreen
}, {
  initialRouteName: 'Home',  // 初始默认的路由
  navigationOptions: {
    headerStyle: {
      backgroundColor: '#f4511e',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  },
});

const TabStack = createBottomTabNavigator({
  Home: HomeScreen,
  Settings: SettingsScreen
}, {
  navigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ focused, tintColor }) => {
      const { routeName } = navigation.state;
      let iconName;
      console.log(navigation, 'navigation')
      if (routeName === 'Home') {
        iconName = `ios-information-circle${focused ? '' : '-outline'}`;
      } else if (routeName === 'Settings') {
        iconName = `ios-options${focused ? '' : '-outline'}`;
      }

      // You can return any component that you like here! We usually use an
      // icon component from react-native-vector-icons
      return <Ionicons name={iconName} size={25} color={tintColor} />;
    },
  }),
  tabBarOptions: {
    activeTintColor: 'red',
    inactiveTintColor: 'gray',
  },
})

export default class App extends React.Component {
  render() {
    return <TabStack/>;
  }
}