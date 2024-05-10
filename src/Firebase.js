import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = ({
  apiKey: "AIzaSyCXYlnauJaPMBPiYHen7rDEztDoIIrHuvA",
  authDomain: "video-sharing-app-18d98.firebaseapp.com",
  projectId: "video-sharing-app-18d98",
  storageBucket: "video-sharing-app-18d98.appspot.com",
  messagingSenderId: "506952400869",
  appId: "1:506952400869:web:f3268887289b2590fef90c",
  measurementId: "G-D7TJ7T87M3"
});

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);