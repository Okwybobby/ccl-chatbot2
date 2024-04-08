import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBDMU-5g69qesJWDSb4d4u-thil0-45JAc",
  authDomain: "ccl-chatbot-2024.firebaseapp.com",
  projectId: "ccl-chatbot-2024",
  storageBucket: "ccl-chatbot-2024.appspot.com",
  messagingSenderId: "75556137078",
  appId: "1:75556137078:web:2dec2cec343a9b3ad99757"
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);;
const db = getFirestore(app);

export {db};