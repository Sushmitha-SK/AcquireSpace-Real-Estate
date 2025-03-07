import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const apiKey: string | undefined = process.env.REACT_APP_FIREBASE_API_KEY
const authDomain: string | undefined = process.env.REACT_APP_FIREBASE_AUTH_DOMAIN
const projectId: string | undefined = process.env.REACT_APP_FIREBASE_PROJECT_ID
const storageBucket: string | undefined = process.env.REACT_APP_FIREBASE_STORAGE_BUCKET
const messagingSenderId: string | undefined = process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID
const appId: string | undefined = process.env.REACT_APP_FIREBASE_APP_ID
const measurementId: string | undefined = process.env.REACT_APP_FIREBASE_MEASUREMENT_ID

const firebaseConfig = {
    apiKey: apiKey,
    authDomain: authDomain,
    projectId: projectId,
    storageBucket: storageBucket,
    messagingSenderId: messagingSenderId,
    appId: appId,
    measurementId: measurementId

};

export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);