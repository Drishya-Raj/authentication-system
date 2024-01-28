import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyC8QCjR-msHDXFtUv8iOmoHAI_nsLwWCZQ",
  authDomain: "aunthentication-system.firebaseapp.com",
  projectId: "aunthentication-system",
  storageBucket: "aunthentication-system.appspot.com",
  messagingSenderId: "880104655359",
  appId: "1:880104655359:web:6fa81619512d99db557fca",
  measurementId: "G-0102C8V540"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export {auth, provider};