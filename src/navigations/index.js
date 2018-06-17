import React from 'react';
import {Easing, Animated} from 'react-native'
import {createStackNavigator, createTabNavigator, createMaterialTopTabNavigator, createDrawerNavigator} from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons'; //图标库
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'; //图标库

import BusStacks from '../pages/BusStacks/index'
import HolidayBusStacks from '../pages/HolidayBusStacks/index'
import TransitStacks from '../pages/TransitStacks/index'
import DrawerComponent from '../pages/DrawerComponent'
import TabBarComponent from '../pages/TabBarComponent'
import LoginForm from '../pages/LoginForm'

const TabsStack = createMaterialTopTabNavigator({
    BusStacks: {
        screen: BusStacks,
        navigationOptions: {
            tabBarLabel: '定制班车'
        }
    },
    HolidayBusStacks: {
        screen: HolidayBusStacks,
        navigationOptions: {
            tabBarLabel: '公交查询'
        }
    },
    TransitStacks: {
        screen: TransitStacks,
        navigationOptions: {
            tabBarLabel: '假日专线'
        }
    }
}, {
    tabBarComponent: TabBarComponent,
    initialRouteName: 'BusStacks',
    swipeEnabled: true,
    animationEnabled: true,
    order: [
        'BusStacks', 'TransitStacks', 'HolidayBusStacks'
    ],
    activeTintColor: 'blue',
    inactiveTintColor: 'gray'
})


const Drawer = createDrawerNavigator({
    TabsStack
}, {
    initialRouteName: 'TabsStack', //设置默认打开的页面
    drawerPosition: 'left',
    contentComponent: DrawerComponent,
    contentOptions: {
        inactiveTintColor: '#4d3a34', //不被选中的颜色
        activeTintColor: '#ff7226', //改变选中之后的颜色
    }
})

const StackNavigate = createStackNavigator({
    LoginForm: {
        screen: LoginForm,
    },
    Drawer: {
        screen: Drawer
    }
}, {
    initialRouteName: 'Drawer',
    headerMode: 'none',
    mode: 'modal',
    navigationOptions: {
      gesturesEnabled: false,
    },
    transitionConfig: () => ({
      transitionSpec: {
        duration: 300,
        easing: Easing.out(Easing.poly(4)),
        timing: Animated.timing,
      },
      screenInterpolator: sceneProps => {
        const { layout, position, scene } = sceneProps;
        const { index } = scene;

        const height = layout.initHeight;
        const translateY = position.interpolate({
          inputRange: [index - 1, index, index + 1],
          outputRange: [height, 0, 0],
        });

        const opacity = position.interpolate({
          inputRange: [index - 1, index - 0.99, index],
          outputRange: [0, 1, 1],
        });

        return { opacity, transform: [{ translateY }] };
      },
    }),
})

export default StackNavigate