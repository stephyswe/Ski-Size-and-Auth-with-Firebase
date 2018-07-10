import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { View } from "react-native-web";

import LandingPage from "./sites/Landing";
import SignUpPage from "./auth/SignUp";
import SignInPage from "./auth/SignIn";
import PasswordForgetPage from "./auth/PasswordForget";
import HomePage from "./sites/Home";
import AccountPage from "./sites/Account";

//Common lib
import { Header, Button, Spinner } from "./components/common/Index";
import MenuAppBar from "./components/common/MenuAppBar";
import SimpleBottomNavigation from "./components/common/SimpleBottomNavigation";

import * as routes from "./constants/routes";
import withAuthentication from "./auth/withAuthentication";

const footerStyle = {
  position: "fixed",
  left: "0",
  bottom: "0",
  width: "100%"
};

const phantomStyle = {
  display: "block",
  height: "60px",
  width: "100%"
};

function Footer({ children }) {
  return (
    <View>
      <View style={phantomStyle} />
      <View style={footerStyle}>{children}</View>
    </View>
  );
}
/* <Navigation />
      <hr /> */

const App = () => (
  <Router>
    <div>
      <MenuAppBar />
      <Route exact path={routes.LANDING} component={() => <LandingPage />} />
      <Route exact path={routes.SIGN_UP} component={() => <SignUpPage />} />
      <Route exact path={routes.SIGN_IN} component={() => <SignInPage />} />
      <Route
        exact
        path={routes.PASSWORD_FORGET}
        component={() => <PasswordForgetPage />}
      />
      <Route exact path={routes.HOME} component={() => <HomePage />} />
      <Route exact path={routes.ACCOUNT} component={() => <AccountPage />} />
      <Footer>
        <SimpleBottomNavigation />
      </Footer>
    </div>
  </Router>
);

export default withAuthentication(App);
