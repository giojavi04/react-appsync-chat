import React, { Component } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView } from 'react-native';
import LoginForm from './LoginForm';

export default class LoginPage extends Component {
  static navigationOptions = {
      title: 'Sign In'
  }

  constructor(props) {
      super(props);
  }

  render() {
    return (
      <KeyboardAvoidingView style={styles.container}>
          <LoginForm {...this.props}></LoginForm>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});