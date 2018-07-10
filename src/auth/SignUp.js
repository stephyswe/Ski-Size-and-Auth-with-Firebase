import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";

import { auth, db } from "../firebase";
import * as routes from "../constants/routes";
import logo from "../img/signin-logo.png";
import { SignInLink } from "./SignIn";

const SignUpPage = ({ history }) => (
  <div class="bg bg-sign">
    <h1>SIGN UP</h1>
    <img src={logo} alt="logo" class="center" />
    <div class="middleSignIn">
      <SignUpForm history={history} />
      <SignInLink />
    </div>
  </div>
);

const INITIAL_STATE = {
  username: "",
  email: "",
  passwordOne: "",
  passwordTwo: "",
  error: null
};

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value
});

class SignUpForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { username, email, passwordOne } = this.state;

    const { history } = this.props;

    auth
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        // Create a user in your own accessible Firebase Database too
        db
          .doCreateUser(authUser.uid, username, email)
          .then(() => {
            this.setState(() => ({ ...INITIAL_STATE }));
            history.push(routes.HOME);
          })
          .catch(error => {
            this.setState(byPropKey("error", error));
          });
      })
      .catch(error => {
        this.setState(byPropKey("error", error));
      });

    event.preventDefault();
  };

  render() {
    const { username, email, passwordOne, passwordTwo, error } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === "" ||
      email === "" ||
      username === "";

    return (
      <form onSubmit={this.onSubmit}>
        <input
          className="input-sign"
          value={username}
          onChange={event =>
            this.setState(byPropKey("username", event.target.value))
          }
          type="text"
          placeholder="Full Name"
        />
        <input
          className="input-sign"
          value={email}
          onChange={event =>
            this.setState(byPropKey("email", event.target.value))
          }
          type="text"
          placeholder="Email Address"
        />
        <input
          className="input-sign"
          value={passwordOne}
          onChange={event =>
            this.setState(byPropKey("passwordOne", event.target.value))
          }
          type="password"
          placeholder="Password"
        />
        <input
          className="input-sign"
          value={passwordTwo}
          onChange={event =>
            this.setState(byPropKey("passwordTwo", event.target.value))
          }
          type="password"
          placeholder="Confirm Password"
        />
        <button class="sign-button" disabled={isInvalid} type="submit">
          Sign Up
        </button>
        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

const SignUpLink = () => (
  <p className="signUp">
    New member? <Link to={routes.SIGN_UP}>Sign Up</Link>
  </p>
);

export default withRouter(SignUpPage);

export { SignUpForm, SignUpLink };
