// Import the functions you need from the SDKs you need
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDY44AfN-rajqxhMKTk0S14t2VnRtSx7og",
  authDomain: "aquarium-c0c7f.firebaseapp.com",
  projectId: "aquarium-c0c7f",
  storageBucket: "aquarium-c0c7f.appspot.com",
  messagingSenderId: "183547354253",
  appId: "1:183547354253:web:3297e024b7f00a671b16c4",
  measurementId: "G-MFM4KS3471",
};

// Initialize Firebase

export const APP = initializeApp(firebaseConfig);
// export const AUTH = getAuth(APP);
export const AUTH = initializeAuth(APP, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
export const DB = getFirestore(APP);
export const STORAGE = getStorage(APP);

// const analytics = getAnalytics(FIREBASE_APP);
