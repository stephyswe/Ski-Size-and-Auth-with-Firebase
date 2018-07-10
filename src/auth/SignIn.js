import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";

import { SignUpLink } from "./SignUp";
import { PasswordForgetLink } from "./PasswordForget";
import { auth } from "../firebase";
import * as routes from "../constants/routes";

import logo from "../img/signin-logo.png";

const SignInPage = ({ history }) => (
  <div className="bg bg-sign">
    <img src={logo} alt="logo" class="center" />
    <div class="middleSignIn">
      <SignInForm history={history} />
      <PasswordForgetLink />
      <SignUpLink />
    </div>
  </div>
);

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value
});

const INITIAL_STATE = {
  email: "",
  password: "",
  error: null
};

class SignInForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { email, password } = this.state;

    const { history } = this.props;

    auth
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState(() => ({ ...INITIAL_STATE }));
        history.push(routes.HOME);
      })
      .catch(error => {
        this.setState(byPropKey("error", error));
      });

    event.preventDefault();
  };

  render() {
    const { email, password, error } = this.state;

    const isInvalid = password === "" || email === "";

    return (
      <form onSubmit={this.onSubmit}>
        <div class="inputWithIcon">
          <input
            className="input-sign"
            value={email}
            onChange={event =>
              this.setState(byPropKey("email", event.target.value))
            }
            type="text"
            placeholder="Email Address"
          />
          <i class="far fa-envelope fa-lg fa-fw" aria-hidden="true" />
        </div>
        <div class="inputWithIcon">
          <input
            className="input-sign"
            value={password}
            onChange={event =>
              this.setState(byPropKey("password", event.target.value))
            }
            type="password"
            placeholder="Password"
          />
          <i class="fas fa-unlock-alt fa-lg fa-fw" aria-hidden="true" />
        </div>

        <button class="sign-button" disabled={isInvalid} type="submit">
          Sign In
        </button>

        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

const SignInLink = () => (
  <p className="signUp">
    <Link to={routes.SIGN_IN}>Back</Link>
  </p>
);

export default withRouter(SignInPage);

export { SignInForm, SignInLink };
