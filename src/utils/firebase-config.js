import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyAzHaAcDGYXQwdEwlp3pu8tKNY7foeUKTo",
  authDomain: "react-netflix-clone-15b18.firebaseapp.com",
  projectId: "react-netflix-clone-15b18",
  storageBucket: "react-netflix-clone-15b18.appspot.com",
  messagingSenderId: "816812045178",
  appId: "1:816812045178:web:9cd5cea6a3b1e6c270dcc3",
  measurementId: "G-M0NLX91L9Y"
};

const app = initializeApp(firebaseConfig);

export const firebaseAuth = getAuth(app)