// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDNSkKNqZO7isjcCZCLn9NOwoTW1KOnKqY",
  authDomain: "glory-785ab.firebaseapp.com",
  projectId: "glory-785ab",
  storageBucket: "glory-785ab.firebasestorage.app",
  messagingSenderId: "338327282103",
  appId: "1:338327282103:web:deaa6bec874c314116c832"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);