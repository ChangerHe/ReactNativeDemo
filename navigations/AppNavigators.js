import React from 'react';
import {
    createStackNavigator,
    createTabNavigator,
    createDrawerNavigator,
} from 'react-navigation';

import Ionicons from 'react-native-vector-icons/Ionicons';//图标库（参考小白计划二）
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';//图标库

import Home from '../pages/HomePage'

import  Page1 from '../pages/Page1';
import  Page2 from '../pages/Page2';
import  Page3 from '../pages/Page3';

import  Page4 from '../pages/Page4';
import  Page5 from '../pages/Page5';


//底部导航
 const AppTabNavigators =createTabNavigator({
    Page1: {
        screen:Page1,
        navigationOptions: {
            tabBarLabel: 'page1',
            tabBarIcon: (({tintColor, focused}) => (
               <Ionicons
                    name={focused?'ios-home':'ios-home-outline'}
                    size={26}
                    style={{color:tintColor}}
               />
            ))
        },

    },
    Page2:{
        screen:Page2,
        navigationOptions:{
            tabBarLabel: 'page2',
            tabBarIcon: (({tintColor, focused}) => (
                <Ionicons
                    name={focused?'ios-people':'ios-people-outline'}
                    size={26}
                    style={{color:tintColor}}
                />
            ))

        }
    },
    Page3:{
        screen:Page3,
        navigationOptions:{
            tabBarLabel: 'page3',
            tabBarIcon: (({tintColor, focused}) => (
                <Ionicons
                    name={focused?'ios-clock':'ios-clock-outline'}
                    size={26}
                    style={{color:tintColor}}
                />
            ))

        }
    }

},{
    tabBarPosition:'bottom',//位置
    tabBarOptions: {
        showIcon: true,//是否显示图标！！！！！！！
        style: {
            height: 45,//底部导航的宽度
            backgroundColor: '#211305',//底部导航的颜色
        },
        labelStyle: {
            fontSize: 12,//字体大小
            marginTop:-2,//字体距离图标大小
        },

    }

});


//抽屉导航
const Drawer= createDrawerNavigator({
    Page4:{
        screen:Page4,
        navigationOptions:{
            drawerLabel:'page4',
            drawerIcon: ({ tintColor }) => (
                <MaterialIcons
                    name="dns"
                    size={26}
                    style={{color:tintColor}}
                />
            ),
        }
    },
    Page5:{
        screen:Page5,
        navigationOptions:{
            drawerLabel:'page5',
            drawerIcon: ({ tintColor }) => (
                <MaterialIcons
                    name="dns"
                    size={26}
                    style={{color:tintColor}}
                />
            ),
        }
    }
},{
    initialRouteName:'Page5',//设置默认打开的页面
    contentOptions:{
        inactiveTintColor:'#4d3a34',//不被选中的颜色
        activeTintColor:'#ff7226',//改变选中之后的颜色
    }
});



//顶部导航，主入口（导出），要放在其他导航后面，（加载顺序）
export const AppStackNavigator=createStackNavigator({
    Home:{
        screen:Home,
        navigationOptions: {
            // title: "This is TabNav"
            header: null
        }
    },
    TabNav:{    //全部的底部导航
        screen:AppTabNavigators,
        navigationOptions:{
            title:"This is TabNav",
            header: null
        }
    },
    DrawerNav:{   //全部的抽屉导航
        screen:Drawer,
        navigationOptions:{
            title:"This is DrawerNav",
            header: null
        }
    }

} );