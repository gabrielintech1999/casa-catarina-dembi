import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBX7zBG3o-u8U5ClcNRzYlbO7HGiN5-kNA",
  authDomain: "store-caa6d.firebaseapp.com",
  projectId: "store-caa6d",
  storageBucket: "store-caa6d.firebasestorage.app",
  messagingSenderId: "402821731690",
  appId: "1:402821731690:web:4b3c46c22071f9ca330113",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const auth = getAuth(app);

export { db, auth };
