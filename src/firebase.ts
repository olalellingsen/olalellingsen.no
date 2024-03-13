// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAfqq8w6z4g_dlPn0Eey2HHjpLOMlcgUK4",
  authDomain: "my-website-18197.firebaseapp.com",
  projectId: "my-website-18197",
  storageBucket: "my-website-18197.appspot.com",
  messagingSenderId: "14974736336",
  appId: "1:14974736336:web:7ffa8fc1520ca420654bd5",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
