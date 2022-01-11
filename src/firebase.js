import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

export const firebaseConfig = {
    apiKey: "AIzaSyDCdHTZonx79_GHyPRp9G072KetiMCimOc",
    authDomain: "react-stripe-d0177.firebaseapp.com",
    projectId: "react-stripe-d0177",
    storageBucket: "react-stripe-d0177.appspot.com",
    messagingSenderId: "627641145096",
    appId: "1:627641145096:web:79a4f80e168dc659a13ebd",
    measurementId: "G-SQ083N746K"
  };

  firebase.initializeApp(firebaseConfig);

  export const db = firebase.firestore();
  export const auth = firebase.auth();