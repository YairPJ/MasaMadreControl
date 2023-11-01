// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBtpLkmw3eihJmWDhb5ME4drJpaImKPacM",
  authDomain: "masamadrecontroller.firebaseapp.com",
  databaseURL: "https://masamadrecontroller-default-rtdb.firebaseio.com",
  projectId: "masamadrecontroller",
  storageBucket: "masamadrecontroller.appspot.com",
  messagingSenderId: "550760032674",
  appId: "1:550760032674:web:e88f51c60c24c7bea16afb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);