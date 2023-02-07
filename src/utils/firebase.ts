import { getApp, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBHfHU2cl1T_Xqodb2g3f2T3Tvs8zQf3wM",
  authDomain: "mvsf-305717.firebaseapp.com",
  databaseURL: "https://mvsf-305717-default-rtdb.firebaseio.com",
  projectId: "mvsf-305717",
  storageBucket: "mvsf-305717.appspot.com",
  messagingSenderId: "258556793412",
  appId: "1:258556793412:web:f5a85c8b9d0dfff0822211",
  measurementId: "G-PY6DDNPJZQ"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore();
 export const firebaseApp = getApp();

