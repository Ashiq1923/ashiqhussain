
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import { getAuth, signOut } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js";



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
const auth = getAuth(app);



document.querySelector('#logout').addEventListener('click', async () => {
    try {
        await signOut(auth);
        localStorage.removeItem('userUID'); // User UID ko local storage se hata do
        alert('Successfully logged out!'); // Optional alert for user feedback
        window.location.href = '/Login Screen/index.html'; // Redirect to login page after logout
    } catch (error) {
        console.error("Error logging out: ", error.message);
        alert('Logout failed. Please try again.'); // Optional error feedback
    }
});