import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-analytics.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js";

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
const db = getFirestore(app);

window.loginUser = async () => {
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user; // Logged in user
        const uid = user.uid; // UID

        // Fetch user type from Firestore
        const userDoc = await getDoc(doc(db, 'Students', uid)); // Adjust collection name as necessary
        if (userDoc.exists()) {
          console.log(userDoc.data());

            const userData = userDoc.data();
            const userType = userData.type.trim(); // Assuming 'type' field exists in user document
           console.log(userType);

           
            // Store the UID in local storage
            localStorage.setItem('userUID', uid);

            // Redirect based on user type
            if (userType === 'Admin') {
                window.location.href = 'Login Screen/A-dashbord/index.html'; // Update URL as needed
            } else if (userType === 'Student') {
                window.location.href = 'Login Screen/Dashboard/index.html'; // Update URL as needed
            } else {
                alert('Unknown user type. Please contact support.');
            }
        } else {
            alert('User document not found.');
        }
    } catch (error) {
        alert('Error: ' + error.message);
    }
};
