// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const {initializeApp} = require("firebase/app");
const {getAuth} = require("firebase/auth");

// const firebaseConfig = {
//     apiKey: "AIzaSyAalAjOW-GarzGQ68xNAsopzUTpXwOnlS0",
//     authDomain: "sil-sport-zone.firebaseapp.com",
//     projectId: "sil-sport-zone",
//     storageBucket: "sil-sport-zone.appspot.com",
//     messagingSenderId: "105124115586",
//     appId: "1:105124115586:web:f79a09d083053f3685309b",
//     measurementId: "G-BZ33T1JBCE"
//   }

  const firebaseConfig = {
    apiKey: "AIzaSyAalAjOW-GarzGQ68xNAsopzUTpXwOnlS0",
    authDomain: "sil-sport-zone.firebaseapp.com",
    projectId: "sil-sport-zone",
    storageBucket: "sil-sport-zone.appspot.com",
    messagingSenderId: "105124115586",
    appId: "1:105124115586:web:5bbe7848a554803785309b",
    measurementId: "G-1XGL9XL3GR"
  };


// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);