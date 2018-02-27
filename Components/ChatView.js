import React, { Component } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';

export default class ChatView extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        const chat = this.props.chat;

        return (
            <Text>{chat.userId + ': ' + chat.message}</Text>
        );
    }
}