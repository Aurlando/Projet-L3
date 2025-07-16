// firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyA846hAbgp_6zMGmjMc3TxYCY9TX91DoRM",
  authDomain: "my-app-ca2e9.firebaseapp.com",
  projectId: "my-app-ca2e9",
  storageBucket: "my-app-ca2e9.firebasestorage.app",
  messagingSenderId: "379688117369",
  appId: "1:379688117369:web:6477ecaa0d900336e660a8",
  measurementId: "G-662VWQ176M"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);


//or-v1-c0425123d5aba286c9fb58064d24c54f7524a1b6cd3c655f096d8ff24a168d28