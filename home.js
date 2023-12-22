import { auth, db } from "./config.js";
import {
  collection,
  addDoc,
  Timestamp,
  getDocs,
  where,
  query,
  doc,
  deleteDoc,
  updateDoc,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import {
  signOut,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

let blogs = [];

const userName = document.querySelector(".userName");
const logout_btn = document.querySelector(".logout-btn");
const placeholer = document.getElementById("placeholder");
const textArea = document.getElementById("textArea");
const submit_btn = document.querySelector("#submit");
const blogs_container = document.querySelector(".blogs-container");

let userObj;

onAuthStateChanged(auth, async (user) => {
  if (user) {
    console.log(user.uid);
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      userObj = doc.data();
      render(doc);
    });
    renderBlogs(user.uid);
  } else {
    window.location = "index.html";
  }
});

function render(doc) {
  userName.innerHTML = `${doc.data().firstName} ${doc.data().lastName} `;
}

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
            <button id="edit-btn">Edit</button>
            <button id="delete-btn">Delete</button>
        </div>
    `;
  });

  const edit_btn = document.querySelectorAll("#edit-btn");
  const delete_btn = document.querySelectorAll("#delete-btn");

  delete_btn.forEach((item, index) => {
    item.addEventListener("click", async () => {
      await deleteDoc(doc(db, "blogs", blogs[index].docId));
      blogs.splice(index, 1);
      renderBlog();
      console.log(item, blogs[index].docId);
    });
  });

  edit_btn.forEach((item, index) => {
    item.addEventListener("click", async () => {
      const newTitle = prompt("Enter the new title.");
      const newDiscription = prompt("Enter the new Discription.");
      await updateDoc(doc(db, "blogs", blogs[index].docId), {
        title: newTitle,
        discription: newDiscription,
      });
      (blogs[index].title = newTitle),
        (blogs[index].discription = newDiscription),
        renderBlog();
      console.log(item, blogs[index].docId);
    });
  });
}

submit_btn.addEventListener("click", async (event) => {
  event.preventDefault();
  if (placeholer.value === "" || textArea.value === "") {
    alert("Enter the right value.");
  } else {
    try {
      const blog = {
        title: placeholer.value,
        discription: textArea.value,
        uid: auth.currentUser.uid,
        time: Timestamp.fromDate(new Date()),
        userObj,
      };
      const docRef = await addDoc(collection(db, "blogs"), blog);
      blogs.unshift({
        title: placeholer.value,
        discription: textArea.value,
        uid: auth.currentUser.uid,
        time: Timestamp.fromDate(new Date()),
        userObj,
        docId: docRef.id,
      });
      // blogs.push({blog , docId: docRef.id});
      console.log("Document written with ID: ", docRef.id);
      placeholer.value = "";
      textArea.value = "";
      renderBlog();
    } catch (error) {
      console.log(error);
    }
  }
});

async function renderBlogs(userId) {
  const q = query(collection(db, "blogs"), where("uid", "==", userId));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    blogs.push({ ...doc.data(), docId: doc.id });
    console.log(blogs);
    console.log(doc.id, " => ", doc.data());
    renderBlog();
  });
}

logout_btn.addEventListener("click", () => {
  signOut(auth)
    .then(() => {
      window.location = "login.html";
    })
    .catch((error) => {
      console.log(error);
    });
});
