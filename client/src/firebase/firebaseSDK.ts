import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: 'AIzaSyBYpmfebhGcVuF6JwAvDIaAtL7FP7fWxZQ', //process.env.FIREBASE_AUTH_API_KEY,
    authDomain: "whisper-box-dadfd.firebaseapp.com",
    projectId: "whisper-box-dadfd",
    storageBucket: "whisper-box-dadfd.appspot.com",
    messagingSenderId: "666616383396",
    appId: "1:666616383396:web:5c5372edb3e773857e6331",
    measurementId: "G-3MVYYSGDWL"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);