import { auth, db } from "./config.js";
import {
  collection,
  addDoc,
  Timestamp,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import {
  signOut,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import {
    getDocs,
    where,
    query,
  } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const userName = document.querySelector('.userName');
const logout_btn = document.querySelector('.logout-btn');
const placeholer = document.getElementById("placeholder");
const textArea = document.getElementById("textArea");
const submit_btn = document.querySelector("#submit");

let userObj;

onAuthStateChanged(auth, async (user) => {
    if (user) {
      console.log(user.uid);
      const q = query(collection(db, "users"), where("uid", "==", user.uid));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.data().firstName + ' ' + doc.data().lastName);
        console.log(doc.id, " => ", doc.data());
        userObj = doc.data();
        render(doc)
      });
    } else {
      window.location = "login.html";
    }
  });
  

  function render(doc) {
    userName.innerHTML = `${doc.data().firstName} ${doc.data().lastName} `;
}

submit_btn.addEventListener("click", async (event) => {
  event.preventDefault();
  if (placeholer.value === "" || textArea.value === "") {
    alert("Enter the right value.");
  } else {
    try {
      const docRef = await addDoc(collection(db, "blogs"), {
        title: placeholer.value,
        discription: textArea.value,
        uid: auth.currentUser.uid,
        time: Timestamp.fromDate(new Date()),
        userObj,
      });
      console.log("Document written with ID: ", docRef.id);
      placeholer.value = "";
      textArea.value = "";
    } catch (error) {
      console.log(error);
    }
  }
});

logout_btn.addEventListener('click', () => {
    signOut(auth).then(() => {
        window.location = 'login.html'
    }).catch((error) => {
        console.log(error);
    });
})