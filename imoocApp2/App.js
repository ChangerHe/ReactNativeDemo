import React, {Component} from 'react'
import {StyleSheet, TabBarIOS, Text, View} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';

import List from './components/list/List'
import Account from './components/account/Account'
import Edit from './components/edit/Edit'

let styles = StyleSheet.create({
  tabContent: {
    flex: 1,
    alignItems: 'center'
  },
  tabText: {
    color: 'white',
    margin: 50
  }
});

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedTab: 'blueTab',
      notifCount: 0,
      presses: 0,
      title: '<TabBarIOS>',
      description: 'Tab-based navigation.',
      displayName: 'TabBarExample'
    }
  }
  // _renderContent(color, pageText, num) {
  //   return (
  //     <View
  //       style={[
  //       styles.tabContent, {
  //         backgroundColor: color
  //       }
  //     ]}>
  //       <Text style={styles.tabText}>{pageText}</Text>
  //       <Text style={styles.tabText}>{num}
  //         re-renders of the {pageText}</Text>
  //         {/* <Icon name="rocket" size={30} color="#900" /> */}
  //         <Icon.Button name="camera-retro" backgroundColor="#3b5998" onPress={this.loginWithFacebook}>
  //           Login with Facebook
  //         </Icon.Button>
  //       {/* <Icon name='clock'></Icon> */}
  //     </View>
  //   );
  // }
  render() {
    return (
      <TabBarIOS
        unselectedTintColor="yellow"
        tintColor="white"
        barTintColor="darkslateblue">
        <TabBarIOS.Item
          // title="Blue Tab"
          systemIcon='top-rated'
          selected={this.state.selectedTab === 'blueTab'}
          onPress={() => {
          this.setState({selectedTab: 'blueTab'});
        }}>
          {/* {this._renderContent('#414A8C', 'Blue Tab')} */}
          <List/>
        </TabBarIOS.Item>
        <TabBarIOS.Item
          systemIcon="search"
          badge={this.state.notifCount > 0
          ? this.state.notifCount
          : undefined}
          selected={this.state.selectedTab === 'redTab'}
          onPress={() => {
          this.setState({
            selectedTab: 'redTab',
            notifCount: this.state.notifCount + 1
          });
        }}>
          {/* {this._renderContent('#783E33', 'Red Tab', this.state.notifCount)} */}
          <Edit/>
        </TabBarIOS.Item>
        <TabBarIOS.Item
          // icon={require('./flux.png')}
          // selectedIcon={require('./relay.png')}
          // renderAsOriginal
          systemIcon='recents'
          // title="More"
          selected={this.state.selectedTab === 'greenTab'}
          onPress={() => {
          this.setState({
            selectedTab: 'greenTab',
            presses: this.state.presses + 1
          });
        }}>
          {/* {this._renderContent('#21551C', 'Green Tab', this.state.presses)} */}
          <Account/>
        </TabBarIOS.Item>
      </TabBarIOS>
    )
  }
}