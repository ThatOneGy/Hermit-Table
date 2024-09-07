import { initializeApp } from "https://www.gstatic.com/firebasejs/9.12.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.12.0/firebase-auth.js";
import { getFirestore, collection, addDoc, onSnapshot } from "https://www.gstatic.com/firebasejs/9.12.0/firebase-firestore.js";


const firebaseConfig = {
    apiKey: "AIzaSyDAqAg7pNDeQfwN6ttudl7spQEoS0-teGg",
    authDomain: "hermit-table.firebaseapp.com",
    projectId: "hermit-table",
    storageBucket: "hermit-table.appspot.com",
    messagingSenderId: "773955109249",
    appId: "1:773955109249:web:55f7a1b96af45828d9e880",
  };
  

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Handle Sign-Up
document.getElementById('signUpBtn').addEventListener('click', () => {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log('User signed up:', userCredential.user);
    })
    .catch((error) => {
      console.error('Error signing up:', error.message);
    });
});

// Handle Login
document.getElementById('loginBtn').addEventListener('click', () => {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log('User logged in:', userCredential.user);
    })
    .catch((error) => {
      console.error('Error logging in:', error.message);
    });
});
