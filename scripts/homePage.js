import { auth, db } from "../config.js";
import {
  collection,
  getDocs,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const blogs_container = document.querySelector(".blogs-container");

let blogs = [];

function renderBlog() {
  blogs_container.innerHTML = "";
  blogs.map((blog) => {
    let date = blog.time.toDate();
	  let mm = date.getMonth() + 1;
	  let dd = date.getDate();
	  let yyyy = date.getFullYear();
	  date = mm + ' ' + dd + 'th, ' + yyyy;
    blogs_container.innerHTML += `
      <div class="blog-cont">
              <div class="first">
                  <img src="${blog.userObj.profileUrl}" height="70" width="80" id="profileImage" alt="User Image">
                  <div class="title-date">
                    <div>
                    <span class="title">${blog.title}</span>
                    </div>
                    <div>
                    <span class="time">${blog.userObj.firstName + " " + blog.userObj.lastName} ${date}</span>
                    </div>
                  </div>
              </div>
              <p>${blog.discription}</p>
              <button class="seeAll">See all from this user</button>
          </div>
      `;
  });

  const btn_seeAll = document.querySelectorAll(".seeAll");
  btn_seeAll.forEach((button, index) => {
    button.addEventListener("click", () => {
      console.log(blogs[index].userObj.uid);
      localStorage.setItem("uid", blogs[index].userObj.uid);
      window.location = "seeAllBlogs.html";
    });
  });
}

async function renderBlogs() {
  const querySnapshot = await getDocs(collection(db, "blogs"));
  querySnapshot.forEach((doc) => {
    blogs.push({ ...doc.data(), docId: doc.id });
    console.log(blogs);
    console.log(doc.id, " => ", doc.data());
    renderBlog();
  });
}

renderBlogs();
