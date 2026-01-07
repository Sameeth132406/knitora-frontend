import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCGmRuUh_7tfxNBndxXnFrax4U1H2xk",
  authDomain: "knitora-389f2.firebaseapp.com",
  projectId: "knitora-389f2",
  storageBucket: "knitora-389f2.firebasestorage.app",
  messagingSenderId: "1059947305472",
  appId: "1:1059947305472:web:04e53eec50ebbd8bfad6e5",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
