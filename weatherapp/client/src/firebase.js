// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBCbYdhBN4ILPlB-6bsXHMyxJHY47WuExQ",
  authDomain: "itmd444final.firebaseapp.com",
  projectId: "itmd444final",
  storageBucket: "itmd444final.appspot.com",
  messagingSenderId: "582606392835",
  appId: "1:582606392835:web:b78222890a219bf920c836",
  measurementId: "G-TGZ7N3DB4M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);