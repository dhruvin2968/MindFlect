import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
import {getAuth, GoogleAuthProvider} from "firebase/auth";

const firebaseConfig = {
  apiKey:process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain:"mindflect-44666.firebaseapp.com",
  projectId:"mindflect-44666",
  storageBucket:"mindflect-44666.appspot.com",
  messagingSenderId: "503297235655",
  appId:"1:503297235655:web:6117a7e78d4d5cdce6bce2"
};


const app = initializeApp(firebaseConfig);


export const db=getFirestore(app);
export const auth=getAuth(app);
export const provider=new GoogleAuthProvider();