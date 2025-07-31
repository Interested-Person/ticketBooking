import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA_XRK3MICWET-D5KTt6I2ai_RVar42j0Q",
  authDomain: "bookeasy-7609b.firebaseapp.com",
  projectId: "bookeasy-7609b",
  storageBucket: "bookeasy-7609b.firebasestorage.app",
  messagingSenderId: "751963755718",
  appId: "1:751963755718:web:cda3bd5c2388b0b3f973c7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app); 