import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyAoFbcJLm7o9ZSx-kN2J_EWf-kW0O1tdlc",
    authDomain: "instagram-clone-5c121.firebaseapp.com",
    databaseURL: "https://instagram-clone-5c121.firebaseio.com",
    projectId: "instagram-clone-5c121",
    storageBucket: "instagram-clone-5c121.appspot.com",
    messagingSenderId: "882244852568",
    appId: "1:882244852568:web:de485797166f3cc4a8a32d",
    measurementId: "G-6GM9H23LG4"
})

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage }