import firebase from 'firebase/app';
import 'firebase/firestore';

var config = {
    apiKey: "AIzaSyDFUQgCmX-7N6ougd4d7kQ2kCQ2UOH6i4E",
    authDomain: "todo2-7949a.firebaseapp.com",
    databaseURL: "https://todo2-7949a.firebaseio.com",
    projectId: "todo2-7949a",
    storageBucket: "",
    messagingSenderId: "965187865884"
  }


var fire = firebase.initializeApp(config);

export const db =  fire.firestore();
export const FieldValue =  firebase.firestore.FieldValue;
