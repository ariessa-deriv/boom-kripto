import firebase from "firebase";

try {
  firebase.initializeApp({
    databaseURL: "dfgdfg",
  });
} catch (err) {
  // we skip the "already exists" message which is
  // not an actual error when we're hot-reloading
  if (!/already exists/.test(err.message)) {
    console.error("Firebase initialization error", err.stack);
  }
}

const fire = firebase;
export default fire;

// import firebase from "firebase";

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyDm9WBHcX6-XGoEHO4Ums4lxYWY-WzddzM",
//   authDomain: "login-53ee3.firebaseapp.com",
//   projectId: "login-53ee3",
//   storageBucket: "login-53ee3.appspot.com",
//   messagingSenderId: "718401265133",
//   appId: "1:718401265133:web:5dcb09ec158dad0e7ddbe4",
// };

// // Initialize Firebase
// const app = firebase.initializeApp(firebaseConfig);

// export default app;
