import { auth, db } from "../config.js";
import {
  signOut,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import {
  collection,
  getDocs,
  where,
  query,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const userName = document.querySelector(".userName");
const Container = document.querySelector('.container');
const logout_btn = document.querySelector('.logout-btn');

onAuthStateChanged(auth, async (user) => {
  if (user) {
    console.log(user.uid);
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.data().firstName + ' ' + doc.data().lastName);
      console.log(doc.id, " => ", doc.data());
      render(doc);
    });
  } else {
    window.location = "login.html";
  }
});

function render(doc) {
    userName.innerHTML = `${doc.data().firstName} ${doc.data().lastName} `;
    Container.innerHTML = `
    <img src="${doc.data().profileUrl}" id="image" alt="hello">
        <p>${doc.data().firstName} ${doc.data().lastName}</p>
        <p><strong>Password</strong></p>
        <input type="password" id="password" placeholder="Old Password">
        <br>
        <input type="password" id="newPassword" placeholder="New Password">
        <br>
        <input type="password" id="repeatPassword" placeholder="Repeat Password">
        <br>
        <button id="update-btn">Update Password</button>
    `;
}


logout_btn.addEventListener('click', () => {
    signOut(auth).then(() => {
        window.location = 'homePage.html'
    }).catch((error) => {
        console.log(error);
    });
})