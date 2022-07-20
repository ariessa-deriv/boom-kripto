import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDzhbBrA6oYlSLWQrkIKNbjzKoCbcYQj3M",
  authDomain: "boom-kripto.firebaseapp.com",
  projectId: "boom-kripto",
  storageBucket: "boom-kripto.appspot.com",
  messagingSenderId: "980066839594",
  appId: "1:980066839594:web:2c4ed35e2f23fd80826753",
  measurementId: "G-PZ374FK9FQ",
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const firestoreDatabase = getFirestore(firebaseApp);

export { auth, firestoreDatabase };
