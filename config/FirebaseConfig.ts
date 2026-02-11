// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCXa8o-7uyRNMv-VEu-yAOHMxF5xos9GHE",
  authDomain: "ai-pocket-agent-1ecbe.firebaseapp.com",
  projectId: "ai-pocket-agent-1ecbe",
  storageBucket: "ai-pocket-agent-1ecbe.firebasestorage.app",
  messagingSenderId: "313162074480",
  appId: "1:313162074480:web:3057635d77090ecb3a67b5",
  measurementId: "G-2QWE4WJTJS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firestoreDb = getFirestore(app)
export const storage = getStorage(app);