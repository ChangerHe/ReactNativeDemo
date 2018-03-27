import React, {Component} from 'react'
import {View, Text, ListView, StyleSheet} from 'react-native'

const styles = {
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#090'
    },
    header: {
        paddingTop: 25,
        paddingBottom: 12,
        width: '100%',
        backgroundColor: '#900',
    }
}

export default class List extends Component {
    constructor(props) {
        super(props)
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
        dataSource: ds.cloneWithRows(['row 1', 'row 2']),
        };
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                   <Text style={styles.headerTitle}>list 页面</Text>
                </View>
                <ListView 
                    dataSource={this.state.dataSource}
                    renderRow={(rowData) => <Text>{rowData}</Text>}
                    // enableEmptySections={true}
                />
            </View>
        )
    }
}

