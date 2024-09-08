// firebase.js fayli

import { initializeApp } from "firebase/app"; // Firebase default emas, named export
import { getFirestore } from "firebase/firestore"; // Firestore moduli misol tariqasida

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

// Export qilayotgan modullar (masalan, Firestore)
const db = getFirestore(app);
export { app, db };
