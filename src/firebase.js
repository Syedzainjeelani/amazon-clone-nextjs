// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from 'firebase'

const firebaseConfig = {
    apiKey: `${process.env.FIREBASE_API_KEY}`,
    authDomain: `${process.env.AUTHDOMAIN}`,
    projectId: `${process.env.PROJECTID}`,
    storageBucket: `${process.env.STORAGEBUCKET}`,
    messagingSenderId: `${process.env.MESSAGINGSENDERID}`,
    appId: `${process.env.APPID}`,
    measurementId: `${process.env.MEASUREMENTID}`,
}

const firebaseApp = !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app()
// const firebaseApp = !firebase.apps.length ? firebase.initializeApp(process.env.FIREBASECONFIG) : firebase.app()

const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth }