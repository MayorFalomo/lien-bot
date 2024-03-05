// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDNZWEwgxWUzpek4YGjsgEXoSo_D1RdLgY",
  authDomain: "chatgpt-ceecb.firebaseapp.com",
  projectId: "chatgpt-ceecb",
  storageBucket: "chatgpt-ceecb.appspot.com",
  messagingSenderId: "43836422146",
  appId: "1:43836422146:web:d8bbdbdf721b70cdf60f1b",
  measurementId: "G-LFM0RT4KTY",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
