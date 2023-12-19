import { auth, db } from "./config.js"; 
import { collection, addDoc, Timestamp} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
 
const placeholer = document.getElementById('placeholder');
const textArea = document.getElementById('textArea');
const submit_btn = document.querySelector('#submit');


submit_btn.addEventListener('click', async (event)=> {
    event.preventDefault();
    if (placeholer.value === '' || textArea.value === '') {
        alert("Enter the right value.");
    } else {
        try {
            const docRef = await addDoc(collection(db, "blogs") , {
                title: placeholer.value,
                discription: textArea.value,
                uid: auth.currentUser.uid,
                time: Timestamp.fromDate(new Date()),
            });
            console.log("Document written with ID: ", docRef.id);
            placeholer.value = '';
            textArea.value = '';
        } catch (error) {
            console.log(error);  
        }
    }
    
});


