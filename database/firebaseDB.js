import * as firebase from 'firebase';
import firestore from 'firebase/firestore'
import "firebase/auth";

 var firebaseConfig = {
    apiKey: "AIzaSyA28IWubMGxVm7WrPiHEl76iUE5PNn5TEA",
    authDomain: "login-6b668.firebaseapp.com",
    databaseURL: "https://login-6b668.firebaseio.com",
    projectId: "login-6b668",
    storageBucket: "login-6b668.appspot.com",
    messagingSenderId: "338897758100",
    appId: "1:338897758100:web:3514ed1b1c3777b4aad181",
    measurementId: "G-HJE9XH076G"
};
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
firebase.firestore();

export default firebase;
