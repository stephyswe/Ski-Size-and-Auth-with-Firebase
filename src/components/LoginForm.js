// Import lib for making a component
import React, { Component } from "react";
import { Text } from "react-native-web";
import firebase from "firebase";

//custom lib
import { Button, Card, CardSection, Input, Spinner } from "./common/Index";

// Make a component
class LoginForm extends Component {
  state = { email: "", password: "", error: "", loading: false };

  onButtonPress() {
    const { email, password } = this.state;

    this.setState({ error: "", loading: true });

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(this.onLoadingSuccess.bind(this))
      .catch(() => {
        firebase
          .auth()
          .createUserWithEmailAndPassword(email, password)
          .then(this.onLoadingSuccess.bind(this))
          .catch(this.onLoginFail.bind(this));
      });
  }

  onLoginFail() {
    this.setState({
      error: "Authentication failed.",
      loading: false
    });
  }

  onLoadingSuccess() {
    // Clear error messages on Screen
    // Reflect loading of False
    // Remove email and password
    this.setState({
      email: "",
      password: "",
      loading: false,
      error: ""
    });
  }

  renderButton() {
    if (this.state.loading) {
      return <Spinner size="small" />;
    }

    return <Button onPress={this.onButtonPress.bind(this)}>Log in</Button>;
  }

  render() {
    return (
      <Card>
        <CardSection>
          <Input
            placeholder="user@gmail.com"
            label="Email"
            value={this.state.email}
            onChangeText={email => this.setState({ email })}
          />
        </CardSection>
        <CardSection>
          <Input
            secureTextEntry
            placeholder="password"
            label="Password"
            value={this.state.password}
            onChangeText={password => this.setState({ password })}
          />
        </CardSection>

        <Text style={styles.errorTextStyle}>{this.state.error}</Text>

        <CardSection>{this.renderButton()}</CardSection>
      </Card>
    );
  }
}

const styles = {
  errorTextStyle: {
    fontSize: 20,
    alignSelf: "center",
    color: "red"
  }
};

// Make the component available to other parts of the app
export default LoginForm;
