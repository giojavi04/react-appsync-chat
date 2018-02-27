import React, { Component } from 'react';
import { View, Text, Button, StyleSheet, Alert, KeyboardAvoidingView } from 'react-native';
import ChatHistory from './ChatHistory';
import ChatInput from './ChatInput';
import { graphql, compose } from 'react-apollo';
import ListChat from '../Queries/ListChat';
import Post from '../Queries/Post';
import SubscribeToChats from '../Queries/SubscribeToChats';

export default class ChatPage extends Component {

    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Chat',
            headerLeft: (
                <Button title="Back" onPress={() => navigation.goBack()}/>
            )
        }
    }

  constructor(props) {
      super(props);
      this.userId = props.navigation.state.params.userId;
  }

  handleBack = () => {
    this.props.navigation.goBack()
  }

  render() {
    return (
      <View style={styles.container} behavior="padding">
          <ChatHistoryData></ChatHistoryData>
          <ChatInputData userId={this.userId}></ChatInputData>
      </View>
    );
  }
}

const ChatHistoryData = compose(
    graphql(ListChat, {
        options: {
            fetchPolicy: 'network-only'
        },
        props: (props) => ({
            chats: props.data.listChats ? props.data.listChats.items : [],
            subscribeToChats: () => props.data.subscribeToMore({
                document: SubscribeToChats,
                updateQuery: (prev, {subscriptionData}) => {
                    if (!subscriptionData.data) {
                        return prev;
                    }
                    const newChat = subscriptionData.data.subscribeToChats;
                    if (prev.listChats.items.findIndex(o => {
                        return o.userId === newChat.userId && o.createdAt === newChat.createdAt;
                    }) > -1) {
                        return prev;
                    }

                    return Object.assign({}, prev, {
                        listChats: {
                            items: [...prev.listChats.items, newChat],
                            nextToken: null,
                            __typename: "ChatConnection"
                        }
                    });
                    }
                }
            )
        })
    })
)(ChatHistory);

const ChatInputData = compose(
    graphql(Post, {
        options: {
            fetchPolicy: 'no-cache'
        },
        props: (props) => ({
            onSubmit: chat => {
                props.mutate({
                    variables: chat,
                    optimisticResponse: {
                        __typename: 'Mutation',
                        post: {
                            __typename: ChatHistory,
                            id: chat.createdAt,
                            userId: chat.userId,
                            message: chat.message,
                            createdAt: chat.createdAt
                        }
                    },
                    update: (proxy, {data: {post}}) => {
                        const data = proxy.readQuery({ query: ListChat });
                        data.listChats.items.push(Object.assign({}, post));
                        proxy.writeData({query: ListChat, data});
                    }
                })
            }
        })
    })
)(ChatInput)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20
    }
});