Ã¯Â»Â¿// Import lib for making a component
import React, { Component } from "react";
import { View, Text } from "react-native-web";

// Make a component
class LoginForm extends Component {
    render() {
        return (
            <View>
                <Text>Default Text</Text>
            </View>
        );
    }
}

// Make the component available to other parts of the app
export default LoginForm;
