import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import { getAuth, signOut } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js";
import { getFirestore, doc, getDoc, collection, getDocs,  query,
    where, } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";



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
const db = getFirestore(app)

const notify = document.querySelector('.notify');
// Get Student Data
async function GetData() {
    try {
        const uid = localStorage.getItem('userUID'); // Local storage se UID lete hain
        if (!uid) {
            console.log("No user UID found. Please log in.");
            return;
        }
  
        // Fetch Student Data using the UID
        const studentDoc = await getDoc(doc(db, "Students", uid)); // UID se student document lete hain
        if (!studentDoc.exists()) {
            console.log("Student document not found.");
            return;
        }
        
        const studentData = studentDoc.data(); // Student data mil gaya
  
        // Set Student Data in HTML
        const fullname = `${studentData.firstName} ${studentData.lastName}`;
        document.querySelector(".navbar-left").textContent = fullname;
        document.getElementById('first-name').textContent = studentData.firstName;
        document.getElementById('last-name').textContent = studentData.lastName;
        document.getElementById('email').textContent = studentData.email;
        document.getElementById('password').textContent = studentData.password;
        document.getElementById('cnic').textContent = studentData.cnic;
  
    } catch (err) {
        console.log(err);
    }
  }
  
  // Call GetData Function
  GetData();
  
// Fetch Results by CNIC
document.getElementById('fetch-results-btn').addEventListener('click', async () => {
    const cnic = document.getElementById('cnic-input').value;

    if (!cnic) {
        alert("Please enter a CNIC number.");
        return;
    }

    try {
        const resultsRef = collection(db, "Student-Results");
        const q = query(resultsRef, where("cnic", "==", cnic));
        const querySnapshot = await getDocs(q);
        
        const resultsContainer = document.getElementById('results-container');
        resultsContainer.innerHTML = ''; // Clear previous results

        if (querySnapshot.empty) {
            resultsContainer.innerHTML = 'No results found for this CNIC.';
            return;
        }

        querySnapshot.forEach((doc) => {
            const result = doc.data();
            resultsContainer.innerHTML += `
                <div class='result'>
                    <h4>Course: ${result.course}</h4>
                    <p>Student ID: ${result.studentId}</p>
                    <p>Marks: ${result.marks}</p>
                    <p>Total Marks: ${result.totalmarks}</p>
                    <p>Grade: ${result.grade}</p>
                </div>
            `;
        });

    } catch (err) {
        console.error("Error fetching results:", err);
    }
});

// logout

document.querySelector('.logout-btn').addEventListener('click', async () => {
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

