// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAcvNvCj3iPCJ_zD-_qbe2Ts2dw3mjhUlQ",
  authDomain: "deusweap.firebaseapp.com",
  projectId: "deusweap",
  storageBucket: "deusweap.appspot.com",
  messagingSenderId: "72369093689",
  appId: "1:72369093689:web:e06dfdc344cbbcd4d461e8",
  measurementId: "G-597200XMSZ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { app, analytics }; // Ajoutez d'autres instances que vous souhaitez exporter.
