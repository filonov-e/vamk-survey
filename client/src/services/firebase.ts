import * as firebase from 'firebase/app';
import "firebase/firestore";
import "firebase/functions";

console.log(process.env.REACT_APP_FIREBASE_PROJECT_ID);
const firebaseProjectId = process.env.REACT_APP_FIREBASE_PROJECT_ID || "";

const firebaseConfig = {
	apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
	authDomain: `${firebaseProjectId}.firebaseapp.com`,
	databaseURL: `https://${firebaseProjectId}.firebaseio.com`,
	projectId: firebaseProjectId,
	storageBucket: `${firebaseProjectId}.appspot.com`,
};

const firebaseApp = !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

export const db = firebase.firestore();
export const functions = firebase.functions();

export default firebaseApp;