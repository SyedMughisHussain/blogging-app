import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyCKqIFPbRAgSW2LfC0oFWiA0W0836VZRL0",
  authDomain: "blogging-app-44cc2.firebaseapp.com",
  projectId: "blogging-app-44cc2",
  storageBucket: "blogging-app-44cc2.appspot.com",
  messagingSenderId: "907642684168",
  appId: "1:907642684168:web:c39b11c58427d0dd2ca2bd",
  measurementId: "G-1M9LQ6KH8J"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

