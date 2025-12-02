// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyArP1fdWOu7E8cS59fcPWqA1bbvWQQjesk",
  authDomain: "dash3d-8b60d.firebaseapp.com",
  projectId: "dash3d-8b60d",
  storageBucket: "dash3d-8b60d.firebasestorage.app",
  messagingSenderId: "259289621606",
  appId: "1:259289621606:web:12821ae9d53d5ed96a39a7",
  measurementId: "G-B0F3WP6ZWT",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);


export { app, db, storage };
