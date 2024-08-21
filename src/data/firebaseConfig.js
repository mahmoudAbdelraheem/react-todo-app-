import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAn75WAE28MFG4ITuhszK0SHO57M46XAn8",
  authDomain: "todo-react-app-53770.firebaseapp.com",
  projectId: "todo-react-app-53770",
  storageBucket: "todo-react-app-53770.appspot.com",
  messagingSenderId: "1048257204111",
  appId: "1:1048257204111:web:97f2cc2a99df065421c5fa",
};
//? Initialize Firebase for my App
export const app = initializeApp(firebaseConfig);
//? Initialize Firebase Authentication
export const auth = getAuth(app);
//? Initialize Firestore
export const myDB  = getFirestore(app);