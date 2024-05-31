// Import the functions you need from the SDKs you need
import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import { collection, getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB4hwGsn_BJLp5Qx0wbz4nRGE1zAYzCEFg",
    authDomain: "fir-chat-ff879.firebaseapp.com",
    projectId: "fir-chat-ff879",
    storageBucket: "fir-chat-ff879.appspot.com",
    messagingSenderId: "143929204227",
    appId: "1:143929204227:web:9bfef58570d420a1783836"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, { persistence: getReactNativePersistence(AsyncStorage) })
export const db = getFirestore(app)
export const usersRef = collection(db, "users")
export const roomRef = collection(db, "rooms")