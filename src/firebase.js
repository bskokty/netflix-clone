import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  getDoc,
  doc,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAHmDDetZQyTNpszhSFAtkoOnJ0LwFgep8",
  authDomain: "netflix-clone-ab199.firebaseapp.com",
  projectId: "netflix-clone-ab199",
  storageBucket: "netflix-clone-ab199.appspot.com",
  messagingSenderId: "688152292805",
  appId: "1:688152292805:web:191722c818c2340ac32fac",
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

export { auth, collection, getDocs, getDoc, addDoc, db, doc };
export default db;
