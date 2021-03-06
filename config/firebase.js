import { getDatabase, ref, onValue, set } from "firebase/database";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  onAuthStateChanged,
  FacebookAuthProvider,
  signInWithCredential,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import * as CloudStorage from "firebase/storage";

//firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCp7xZUZv1XyFgxOf1aJcGV69x1dNblOTw",
  authDomain: "reshare-eb40c.firebaseapp.com",
  databaseURL: "https://reshare-eb40c-default-rtdb.firebaseio.com",
  projectId: "reshare-eb40c",
  storageBucket: "reshare-eb40c.appspot.com",
  messagingSenderId: "809565370520",
  appId: "1:809565370520:web:55d411b02ca82699cd78ed",
  measurementId: "G-9CWC6CCEQ9",
};

const firebase = initializeApp(firebaseConfig);
export default firebase;

//export firebase database and auth and storage
export const db = getDatabase();
export const auth = getAuth();
export const cloud = CloudStorage.getStorage();
