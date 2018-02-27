import React, { Component } from 'react';
import { KeyboardAvoidingView, Text, Button, TextInput, StyleSheet, Alert } from 'react-native';

export default class ChatInput extends Component {

  constructor(props) {
      super(props);
      this.userId = props.userId;
      this.state = {
          message: ''
      }
  }
  
  handleSend = () => {
      if (this.state.message === '') {
          return false;
      }
      const chat = {
          userId: this.userId,
          message: this.state.message,
          createdAt: new Date().toISOString()
      }
      this.props.onSubmit(chat);
      this.setState({
          message: ''
      })
      this.textInput.clear();
  }

  render() {
    return (
    <KeyboardAvoidingView>
        <TextInput ref={input => { this.textInput = input }} placeholder="Message.." onChangeText={(message) => this.setState({message})} onSubmitEditing={this.handleSend} autoFocus={true} blurOnSubmit={false} returnKeyType="send"></TextInput>
        <Button title="Send" onPress={this.handleSend}></Button>
    </KeyboardAvoidingView>
    );
  }
}
