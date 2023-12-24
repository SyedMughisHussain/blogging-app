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
      blogs_container.innerHTML += `
      <div class="blog-cont">
              <div class="first">
                  <img src="${blog.userObj.profileUrl}" height="100" width="150" id="profileImage" alt="User Image">
                  <p class="title">${blog.title}</p>
              </div>
              <p>${blog.discription}</p>
              <button class="seeAll">See all from this user</button>
          </div>
      `;
    });

    const btn_seeAll = document.querySelectorAll('.seeAll');
    btn_seeAll.forEach((button, index)=>{
      button.addEventListener('click', ()=> {
        console.log(blogs[index].userObj.uid);
        localStorage.setItem('uid', blogs[index].userObj.uid);
        window.location = 'seeAllBlogs.html';
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
  


