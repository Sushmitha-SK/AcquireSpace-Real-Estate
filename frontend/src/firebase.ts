import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyCwtwYuWJrc6j5edLJB8Kc6Fd9a7n6jQ_U",
    authDomain: "acquirespace-e4098.firebaseapp.com",
    projectId: "acquirespace-e4098",
    storageBucket: "acquirespace-e4098.appspot.com",
    messagingSenderId: "295345911166",
    appId: "1:295345911166:web:b3f01bc1df6cf9ed3e6f2f",
    measurementId: "G-EK9E72LREP"
};

export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);