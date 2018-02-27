import React, { Component } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';

export default class LoginForm extends Component {

    constructor(props) {
        super(props);
        this.state = {userId: ''};
    }

    handleSubmit = () => {
        if (this.state.userId === '') {
            Alert.alert('Hello', 'need nickName');
            return false;
        }
        this.props.navigation.navigate('ChatPage', {userId: this.state.userId});
    }

    render() {
        return (
            <View>
                <TextInput placeholder="nick name.." onChangeText={(userId) => this.setState({userId})} onSubmitEditing={this.handleSubmit}></TextInput>
                <Text>{this.state.text}</Text>
                <Button
                    onPress={this.handleSubmit}
                    title="SignIn"
                    color="#841584"
                    accessibilityLabel="sign in button"
/>
            </View>
        );
    }
}