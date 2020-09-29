import firebase from "firebase";

// npm i firebase
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCSyh-6cXMCMHeTKSHzXu7O64cpD6r2yr0",
  authDomain: "slack-84f43.firebaseapp.com",
  databaseURL: "https://slack-84f43.firebaseio.com",
  projectId: "slack-84f43",
  storageBucket: "slack-84f43.appspot.com",
  messagingSenderId: "556166749678",
  appId: "1:556166749678:web:48b67217a7433089f9c2ff",
  measurementId: "G-359PMHWPPV",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
