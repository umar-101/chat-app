import firebase from "firebase/app";
import "firebase/auth";

export const auth = firebase
  .initializeApp({
    apiKey: "AIzaSyCnHadT30bv7ziwhEuvC0FQCMm-sIhEZ50",
    authDomain: "chatty-8893f.firebaseapp.com",
    projectId: "chatty-8893f",
    storageBucket: "chatty-8893f.appspot.com",
    messagingSenderId: "532987801979",
    appId: "1:532987801979:web:38254a3c967369392e8dde",
  })
  .auth();
