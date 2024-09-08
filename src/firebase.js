import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDxrMOFg0YI8C73W63vgIJjO_WeOJSc1gw",
  authDomain: "quiz-app-d1c92.firebaseapp.com",
  projectId: "quiz-app-d1c92",
  storageBucket: "quiz-app-d1c92.appspot.com",
  messagingSenderId: "492190030977",
  appId: "1:492190030977:web:e2b162f76dc1d6d3b6aa14",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();  // Initialize Google Provider

// Export Firebase modules
export { app, db, auth, googleProvider };  // Make sure googleProvider is exported
