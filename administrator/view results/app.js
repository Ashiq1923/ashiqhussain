

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import { 
  getFirestore ,
  getDocs,
  collection,
  deleteDoc,
  doc,
} from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";



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

const db = getFirestore(app)

const notify = document.querySelector('.notify');

//   Get Data from Fire store

// Get Data from Firestore
async function GetData() {
  try {
      const getDataQuery = await getDocs(collection(db, "Student-Results"));
      let html = "";

      getDataQuery.forEach((doc) => {
          const data = doc.data();

          html += `
              <tr>
                  <td>${data.course}</td>
                  <td>${data.studentId}</td>
                  <td>${data.marks}</td>
                  <td>${data.totalmarks}</td>
                  <td>${data.grade}</td>
                  <td><button class="del_btn" onclick="deleteData('${doc.id}')"><i class="fa-solid fa-trash"></i></button></td>
              </tr>
          `;
      });

      // Append the generated rows to the tbody
      document.querySelector('tbody').innerHTML = html;

  } catch (err) {
      console.log(err);
  }
}


GetData()
//  deleteData

window.deleteData =  async function(id){
  
        try{
           await deleteDoc(doc(db, "Student-Results", id))
           notify.innerHTML = "data Deleted";
            setTimeout(()=>{
              window.location.reload();
               notify.innerHTML = ""
            },2000)

           getDocs()

        }catch(err){
                  console.log(err);
        }
}

// relod page 

window.reloadPage=()=>{
  window.location.reload();
}