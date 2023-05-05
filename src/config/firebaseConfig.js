import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDb05pIwuTMlbjE3s4BT25KFAzLNpxSiuM",
  authDomain: "todoapp-6f9cd.firebaseapp.com",
  projectId: "todoapp-6f9cd",
  storageBucket: "todoapp-6f9cd.appspot.com",
  messagingSenderId: "404661725015",
  appId: "1:404661725015:web:14101bb2966afe94b68012",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
export { db, auth };
