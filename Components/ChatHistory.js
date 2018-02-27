import React, { Component } from 'react';
import { View, Text, Button, FlatList, StyleSheet, Alert } from 'react-native';
import ChatView from './ChatView';

export default class ChatHistory extends Component {


  constructor(props) {
      super(props);
  }

  componentWillMount() {
    this.props.subscribeToChats()
}

  render() {
    return (
      <View style={styles.container}>
          <Text>ChatHistory</Text>
          <FlatList data={[].concat(this.props.chats).sort((a, b) => a.createdAt.localeCompare(b.createdAt))} 
            keyExtractor={(item, index) => index}
            renderItem={({item}) => <ChatView chat={item}/>}
            ref={ref => this.flatList = ref}
            onContentSizeChange={() => this.flatList.scrollToEnd({animated: true})}
            onLayout={() => this.flatList.scrollToEnd({animated: true})} />
      </View>
    );
  }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20
    }
});