import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { compose } from "recompose";

import withAuthorization from "../auth/withAuthorization";
import { db } from "../firebase";
import Skiduthyrning from "../components/Skiduthyrning";
import SignOutButton from "../auth/SignOut";

class HomePage extends Component {
  componentDidMount() {
    const { userStore } = this.props;

    db.onceGetUsers().then(snapshot => userStore.setUsers(snapshot.val()));
  }

  /* {!!users && <UserList users={users} />}*/

  render() {
    const { users } = this.props.userStore;

    return (
      <div className="bg bg-main">
        <SignOutButton />
        <Skiduthyrning />
      </div>
    );
  }
}

const UserList = ({ users }) => (
  <div>
    <h2>List of Usernames of Users</h2>
    <p>(Saved on Sign Up in Firebase Database)</p>

    {Object.keys(users).map(key => <div key={key}>{users[key].username}</div>)}
  </div>
);

const authCondition = authUser => !!authUser;

export default compose(
  withAuthorization(authCondition),
  inject("userStore"),
  observer
)(HomePage);
