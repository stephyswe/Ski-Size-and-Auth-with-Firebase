import React from "react";
import { inject, observer } from "mobx-react";
import { compose } from "recompose";

import { PasswordForgetForm } from "../auth/PasswordForget";
import PasswordChangeForm from "../auth/PasswordChange";
import withAuthorization from "../auth/withAuthorization";

const AccountPage = ({ sessionStore }) => (
  <div class="bg bg-main">
    <div class="middleSignIn top">
      <h4>Account: {sessionStore.authUser.email}</h4>
      <h4>Forgot Password?</h4>
      <PasswordForgetForm />
      <h4>Reset Password?</h4>
      <PasswordChangeForm />
    </div>
  </div>
);

const authCondition = authUser => !!authUser;

export default compose(
  withAuthorization(authCondition),
  inject("sessionStore"),
  observer
)(AccountPage);
