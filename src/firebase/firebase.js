// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// Import the functions you need from the SDKs you need
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC2yvcs9UsraRIocuqy7I1WQEfKL-YZDM0",
  authDomain: "phone-book-71c24.firebaseapp.com",
  databaseURL: "https://phone-book-71c24-default-rtdb.firebaseio.com",
  projectId: "phone-book-71c24",
  storageBucket: "phone-book-71c24.appspot.com",
  messagingSenderId: "298912763667",
  appId: "1:298912763667:web:72977929f143965af494e6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);
const storage = getStorage(app);

export { auth, db, storage };