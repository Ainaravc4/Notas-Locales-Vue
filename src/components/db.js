import firebase from 'firebase/app'
import 'firebase/firestore'

var firebaseConfig = {
    apiKey: "AIzaSyDytzIiuVb1B0rxFdj7Klq0qFhmX4Ic2Ek",
    authDomain: "ejemplofirebase-c93ec.firebaseapp.com",
    projectId: "ejemplofirebase-c93ec",
    storageBucket: "ejemplofirebase-c93ec.appspot.com",
    messagingSenderId: "254425932338",
    appId: "1:254425932338:web:e4dbac5ab0054c6f08122b"
  };

// Get a Firestore instance
export const db = firebase
  .initializeApp(firebaseConfig)
  .firestore()

// Export types that exists in Firestore
// This is not always necessary, but it's used in other examples
const { Timestamp, GeoPoint } = firebase.firestore
export { Timestamp, GeoPoint }

// if using Firebase JS SDK < 5.8.0
db.settings({ timestampsInSnapshots: true })