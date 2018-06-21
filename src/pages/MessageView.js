import React from 'react'
import {WebView, Alert} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'; //图标库

export default class Page4 extends React.Component {
    
    constructor(props) {
        super(props)
        this.state = {
            title: '1',
            webViewArgs: {}
        }
    }
    componentDidMount(){  
        this.props.navigation.setParams({
            title:'自定义Header',
        })
    }  
    static navigationOptions = ({navigation}) => {
        return {
            title: navigation.state.params?navigation.state.params.title:null,
        }
    }
    render() {
        const {navigation} = this.props;
        return (<WebView
            onNavigationStateChange={(e) => {
                this.props.navigation.setParams({
                    title:e.title,
                })
            }}
            source={{
            uri: 'https://www.baidu.com'
        }}/>)
    }
}