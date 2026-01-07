import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCDGmRuuh_7tfxNBndxXnxFraxe4U1H2xk",
  authDomain: "knitora-389f2.firebaseapp.com",
  projectId: "knitora-389f2",
  storageBucket: "knitora-389f2.appspot.com",
  messagingSenderId: "1059947305472",
  appId: "1:1059947305472:web:04e53eec50ebbd8bfad6e5",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
