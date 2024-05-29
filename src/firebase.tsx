// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAS5GqVVQnNCp_loN8NSs67zD1X5wH1KCM",
    authDomain: "persons-e799b.firebaseapp.com",
    databaseURL: "https://persons-e799b-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "persons-e799b",
    storageBucket: "persons-e799b.appspot.com",
    messagingSenderId: "850982685683",
    appId: "1:850982685683:web:5bbcdb7dfd75479f11e086"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;