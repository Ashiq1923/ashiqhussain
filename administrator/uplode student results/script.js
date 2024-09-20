import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getFirestore, setDoc, doc } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyATV4YQPthxvG_wNYIujGUPDC4Oj3yJe4w",
    authDomain: "mini-hycathon.firebaseapp.com",
    projectId: "mini-hycathon",
    storageBucket: "mini-hycathon.appspot.com",
    messagingSenderId: "814089641314",
    appId: "1:814089641314:web:1e6f80813736947bab603b",
    measurementId: "G-6J990CG5GP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const notificationBar = document.querySelector('.notify')
const addresult = document.querySelector('#addresult');

// Get CNIC from URL
const urlParams = new URLSearchParams(window.location.search);
const cnic = urlParams.get('cnic');  

addresult.addEventListener('click', async () => {
    const course = document.querySelector('#course').value;
    const studentId = document.querySelector('#studentid').value;
    const marks = document.querySelector('#marks').value;
    const totalmarks = document.querySelector('#totalmarks').value;
    const grade = document.querySelector('#grade').value;

    // Check for empty fields
    if (!course || !studentId || !marks || !totalmarks || !grade) {
        notificationBar.innerHTML = 'Please fill in all fields.';
        setTimeout(() => {
            notificationBar.innerHTML = '';
        }, 3000);
        return;
    }

    let obj = {
        course: course,
        studentId: studentId,
        marks: marks,
        totalmarks: totalmarks,
        grade: grade,
        cnic: cnic // CNIC will be included in the document data
    };

    try {
        // Set data in Firestore using CNIC as document ID
        await setDoc(doc(db, 'Student-Results', cnic), obj);
                
        // Clear input fields
        document.querySelector('#course').value = '';
        document.querySelector('#studentid').value = '';
        document.querySelector('#marks').value = '';
        document.querySelector('#totalmarks').value = '';
        document.querySelector('#grade').value = '';

       
        notificationBar.innerHTML = 'Result added successfully!';
       
        setTimeout(() => {
            notificationBar.innerHTML = '';
            window.location.href = 'Login Screen/administrator/view results/index.html';
        }, 3000);

    } catch (error) {
      
        notificationBar.innerHTML = 'Please confirm your data.';
       
        setTimeout(() => {
            notificationBar.innerHTML = '';
        }, 3000);
    }
});
