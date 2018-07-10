import * as firebase from 'firebase';

const config = {
  apiKey: "xxx",
  authDomain: "skiduthyrning-9d492.firebaseapp.com",
  databaseURL: "https://skiduthyrning-9d492.firebaseio.com",
  projectId: "skiduthyrning-9d492",
  storageBucket: "",
  messagingSenderId: "221289421902"
};
firebase.initializeApp(config);

const db = firebase.database();
const auth = firebase.auth();

export {
  db,
  auth,
};
