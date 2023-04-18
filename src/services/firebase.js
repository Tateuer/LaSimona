// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE__API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE__AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE__PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE__STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE__MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE__APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firebaseApp = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export default firebaseApp;
