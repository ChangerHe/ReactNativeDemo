import React from 'react';
import {Easing, Animated} from 'react-native'
import {createStackNavigator, createTabNavigator, createMaterialTopTabNavigator, createDrawerNavigator} from 'react-navigation';
import {FluidNavigator} from 'react-navigation-fluid-transitions'
import Ionicons from 'react-native-vector-icons/Ionicons'; //图标库
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'; //图标库
import {forHorizontal} from 'react-navigation/src/views/StackView/StackViewStyleInterpolator'

import BusStacks from '../pages/BusStacks/index'
import HolidayBusStacks from '../pages/HolidayBusStacks/index'
import TransitStacks from '../pages/TransitStacks/index'
import DrawerComponent from '../pages/DrawerComponent'
import TabBarComponent from '../pages/TabBarComponent'
import LoginForm from '../pages/LoginForm'
import Messages from '../pages/Messages'
import MessageView from '../pages/MessageView'

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

// const MainPageStack = FluidNavigator({     Drawer: {         screen: Drawer
//   },     Messages: {         screen: Messages     } }, {     mode: 'card',
// });

const MainPageStack = createStackNavigator({
    Drawer: {
        screen: Drawer,
        navigationOptions: {
            header: null
        }
    },
    Messages: {
        screen: Messages,
        navigationOptions: {
            headerTitle: '消息'
        }
    },
    MessageView: {
        screen: MessageView,
    }
}, {
    initialRouteName: 'Drawer',
    mode: 'card',
    initialRouteParams: {
    },
    // headerMode: 'none',
    // headerTransitionPreset: 'uikit',
    // transitionConfig:()=>({
    //     screenInterpolator: forHorizontal,
    // }),
})

const StackNavigate = createStackNavigator({
    LoginForm,
    MainPageStack
}, {
    initialRouteName: 'MainPageStack',
    headerMode: 'none',
    mode: 'modal'
})

export default StackNavigate