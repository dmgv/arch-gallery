import firebase from "firebase";
import "firebase/database";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyAcjipV2zes4leNTi2BAScXxPtvyQXpAPY",
  authDomain: "arch-gallery-frontend.firebaseapp.com",
  databaseURL: "https://arch-gallery-frontend.firebaseio.com",
  projectId: "arch-gallery-frontend",
  storageBucket: "arch-gallery-frontend.appspot.com",
  messagingSenderId: "891741189291",
};

firebase.initializeApp(config);

const database = firebase.database();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export { firebase, googleAuthProvider, database };
