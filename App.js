import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StackNavigator } from 'react-navigation';

import LoginPage from './Components/LoginPage';
import ChatPage from './Components/ChatPage';


import AWSAppSyncClient from "aws-appsync";
import { Rehydrated } from 'aws-appsync-react';
import { AUTH_TYPE } from "aws-appsync/lib/link/auth-link";
import { graphql, ApolloProvider, compose } from 'react-apollo';
import * as AWS from 'aws-sdk';
import AppSync from './AppSync.js';

const client = new AWSAppSyncClient({
  url: AppSync.graphqlEndpoint,
  region: AppSync.region,
  auth: {type: AUTH_TYPE.API_KEY, apiKey: AppSync.apiKey}
});


const RootStack = StackNavigator({
  LoginPage: {
    screen: LoginPage,
  },
  ChatPage: {
    screen: ChatPage
  }
}, {
  initialRouteNam: 'LoginPage' 
}) 


export default class App extends React.Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Rehydrated>
            <RootStack />
        </Rehydrated>
    </ApolloProvider>
    );
  }
}
