// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { Auth, GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDIU3hF6Ef7sllY_ui_fOQs0W4ZoCKM8gM",
  authDomain: "formini-so.firebaseapp.com",
  projectId: "formini-so",
  storageBucket: "formini-so.appspot.com",
  messagingSenderId: "919693199622",
  appId: "1:919693199622:web:6fc9ee69215e031850b687",
  measurementId: "G-6CZGW1FPQF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth: Auth = getAuth(app);

export default app;