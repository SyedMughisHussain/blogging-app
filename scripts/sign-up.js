import { auth, db , storage} from "../config.js";
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { ref, getDownloadURL, uploadBytes } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";

const first_name = document.querySelector("#firstName");
const last_name = document.querySelector("#lastName");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const repeat_password = document.querySelector("#repeatPassword");
const file = document.querySelector("#file");
const form = document.querySelector("form");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  if(password.value === repeat_password.value) {
    const image = file.files[0];
    const storageRef = ref(storage , email.value);  
    uploadBytes(storageRef , image).then(()=>{
      getDownloadURL(storageRef).then((url)=>{
        createUserWithEmailAndPassword(auth, email.value, password.value)
        .then( async (userCredential) => {
          const user = userCredential.user;
             try {
                    const docRef = await addDoc(collection(db, "users"), {
                        firstName: first_name.value,
                        lastName: last_name.value,
                        email: email.value,
                        uid: user.uid,
                        profileUrl: url,
                    });
                    console.log("Document written with ID: ", docRef.id);
                    window.location = './login.html'
                
          } catch (error) {
            console.log(error);
          }
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorMessage);
        });
      })
    })
  }else{
    alert('Enter the same password value in both fields.');
  }
});