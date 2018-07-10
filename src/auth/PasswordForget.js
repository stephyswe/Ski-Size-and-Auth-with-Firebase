import React, { Component } from "react";
import { Link } from "react-router-dom";
import { auth } from "../firebase";

import logo from "../img/signin-logo.png";
import { SignInLink } from "./SignIn";

const PasswordForgetPage = () => (
  <div className="bg bg-sign">
    <img src={logo} alt="logo" class="center" />
    <div class="middleSignIn">
      <h1>Reset your Password</h1>
      <PasswordForgetForm />
      <SignInLink />
    </div>
  </div>
);

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value
});

const INITIAL_STATE = {
  email: "",
  error: null
};

class PasswordForgetForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { email } = this.state;

    auth
      .doPasswordReset(email)
      .then(() => {
        this.setState(() => ({ ...INITIAL_STATE }));
      })
      .catch(error => {
        this.setState(byPropKey("error", error));
      });

    event.preventDefault();
  };

  render() {
    const { email, error } = this.state;

    const isInvalid = email === "";

    return (
      <form onSubmit={this.onSubmit}>
        <input
          className="input-sign"
          value={this.state.email}
          onChange={event =>
            this.setState(byPropKey("email", event.target.value))
          }
          type="text"
          placeholder="Email Address"
        />
        <button class="sign-button" disabled={isInvalid} type="submit">
          Go!
        </button>

        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

const PasswordForgetLink = () => (
  <p>
    <Link to="/pw-forget">Forgot Password?</Link>
  </p>
);

export default PasswordForgetPage;

export { PasswordForgetForm, PasswordForgetLink };
