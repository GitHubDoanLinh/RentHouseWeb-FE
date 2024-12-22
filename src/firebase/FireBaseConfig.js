import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "AIzaSyC6tV0ZHL5DQ-nVIZj8C8XhDh1fIIz8eB0",
  authDomain: "projectrenthouse.firebaseapp.com",
  projectId: "projectrenthouse",
  storageBucket: "projectrenthouse.appspot.com",
  messagingSenderId: "184707421404",
  appId: "1:184707421404:web:271dd8fde388ec90279019",
  measurementId: "G-GDX93VE496",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const storage = getStorage(app);
