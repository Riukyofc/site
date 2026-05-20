import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC1WkVRT7q0GsDalUyhvQ3pgHbdLtthiWc",
  authDomain: "rkystudio-b8c89.firebaseapp.com",
  projectId: "rkystudio-b8c89",
  storageBucket: "rkystudio-b8c89.firebasestorage.app",
  messagingSenderId: "41582447919",
  appId: "1:41582447919:web:91b2e0600428b38191a5da",
  measurementId: "G-TWJ2SJ7FH0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore with the named database 'default'
export const db = getFirestore(app, "default");
