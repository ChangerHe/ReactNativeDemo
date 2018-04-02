import React, {Component} from 'react'
import {StyleSheet, TabBarIOS, Text, View, NavigatorIOS} from 'react-native'
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
  render() {
    return (
      <TabBarIOS
        unselectedTintColor="yellow"
        tintColor="white"
        barTintColor="darkslateblue">
        <TabBarIOS.Item
          systemIcon='top-rated'
          selected={this.state.selectedTab === 'blueTab'}
          onPress={() => {
          this.setState({selectedTab: 'blueTab'});
        }}>
          <NavigatorIOS
            style={{flex: 1}}
            initialRoute={{
              title: 'list',
              component: List,
              navigationBarHidden: true,
              // passProps: {onExampleExit},
            }}
            tintColor="#008888"
          />
          {/* <List/> */}
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
          <Edit/>
        </TabBarIOS.Item>
        <TabBarIOS.Item
          systemIcon='recents'
          selected={this.state.selectedTab === 'greenTab'}
          onPress={() => {
          this.setState({
            selectedTab: 'greenTab',
            presses: this.state.presses + 1
          });
        }}>
          <Account/>
        </TabBarIOS.Item>
      </TabBarIOS>
    )
  }
}