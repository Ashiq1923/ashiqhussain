import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";
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
const analytics = getAnalytics(app);
const auth = getAuth();
const db = getFirestore();

const notificationBar = document.querySelector('.notify');
const signup = document.querySelector('#signup');

signup.addEventListener('click', async () => {
    const firstName = document.querySelector('#firstName').value;
    const lastName = document.querySelector('#lastName').value;
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;
    const cnic = document.querySelector('#cnic').value;
    const type = document.querySelector('#type').value;

    // Check for empty fields
    if (!firstName || !lastName || !email || !password || !cnic || !type) {
        notificationBar.innerHTML = 'Please fill in all fields.';
        setTimeout(() => {
            notificationBar.innerHTML = '';
        }, 3000);
        return;
    }

    try {
        // Create user in Firebase Auth
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Create user document in Firestore with UID
        await setDoc(doc(db, 'Students', user.uid), {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password:password,
            cnic: cnic,
            type: type
        });

        // Clear input fields
        document.querySelector('#firstName').value = '';
        document.querySelector('#lastName').value = '';
        document.querySelector('#email').value = '';
        document.querySelector('#password').value = '';
        document.querySelector('#cnic').value = '';
        document.querySelector('#type').value = '';

        notificationBar.innerHTML = 'User created successfully!';
        setTimeout(() => {
            notificationBar.innerHTML = '';
        }, 3000);

    } catch (error) {
        console.error("Error during signup:", error.message);
        notificationBar.innerHTML = 'Please confirm your data.';
        setTimeout(() => {
            notificationBar.innerHTML = '';
        }, 3000);
    }
});
