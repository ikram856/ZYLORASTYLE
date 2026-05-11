import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAT-hBVr6CuED0OjxRoJQHkAhQB6ebSeJs",
  authDomain: "zylorastyle-55997.firebaseapp.com",
  projectId: "zylorastyle-55997",
  storageBucket: "zylorastyle-55997.firebasestorage.app",
  messagingSenderId: "697565512446",
  appId: "1:697565512446:web:cb81c8748c26fdd8c65baf",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
