// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from 'firebase'

const firebaseApp = !firebase.apps.length ? firebase.initializeApp(process.env.firebaseConfig) : firebase.app()
// const firebaseApp =  firebase.initializeApp(firebaseConfig) 

const db = firebaseApp.firestore();
// const db = firebase.initializeApp(firebaseConfig).firestore();
const auth = firebase.auth();

export { db, auth }