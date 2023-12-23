import { auth, db } from "./config.js";
import {
    collection,
    getDocs,
    where, 
    query,
  } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const uid =  localStorage.getItem('uid');

const userName = document.querySelector('.blogs');
userName.textContent = 'All Blogs from';





console.log(uid);