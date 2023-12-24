import { auth, db } from "../config.js";
import {
  collection,
  getDocs,
  where,
  query,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const uid = localStorage.getItem("uid");
const blogs_container = document.querySelector(".blogs-container");
const userEmail = document.querySelector(".userEmail");
const username = document.querySelector(".username");
const userImage = document.querySelector(".userImage");
console.log(uid);

let blogs = [];

function renderBlog() {
  blogs_container.innerHTML = "";
  blogs.map((blog) => {
    blogs_container.innerHTML += `
    <div class="blog-cont">
            <div class="first">
                <img src="${blog.userObj.profileUrl}" height="70" width="100" id="profileImage" alt="User Image">
                <p class="title">${blog.title}</p>
            </div>
            <p>${blog.discription}</p>
        </div>
    `;
  });
}

async function renderBlogs(userId) {
  const q = query(collection(db, "blogs"), where("uid", "==", userId));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    blogs.push({ ...doc.data(), docId: doc.id });
    const userName = document.querySelector(".blogs");
    userName.textContent = `All from ${doc.data().userObj.firstName} ${doc.data().userObj.lastName}`;
    userEmail.textContent = `${doc.data().userObj.email}`;
    username.textContent = `${doc.data().userObj.firstName} ${doc.data().userObj.lastName}`;
    userImage.src = `${doc.data().userObj.profileUrl}`;
    console.log(blogs);
    console.log(doc.id, " => ", doc.data());
    renderBlog();
  });
}

renderBlogs(uid);
