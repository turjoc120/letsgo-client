import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import firebaseConfig from "./firebase.config";

const firebaseInitialize = () => {
    initializeApp(firebaseConfig);
    getAnalytics(initializeApp(firebaseConfig));
}


export default firebaseInitialize;