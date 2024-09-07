import { auth, db } from './firebase.js';

// Define a list of words for generating usernames
const words = ["Grian", "Etho", "Doc", "Pearl", "Gem", "False", "Ren", "Hypno"];

// Function to generate a combination of words with a given length
function generateCombination(numWords) {
  let combination = [];

  for (let i = 0; i < numWords; i++) {
    const randomIndex = Math.floor(Math.random() * words.length);
    combination.push(words[randomIndex]);
  }

  return combination.join('-');
}

// Function to generate a unique username
async function generateUniqueUsername() {
  let length = 3; // Start with 3 words
  let combination;

  while (true) {
    combination = generateCombination(length);
    const usernameExists = await checkUsernameExists(combination);

    if (!usernameExists) {
      break; // Exit loop if the combination is unique
    }

    length++; // Increase length if the combination is not unique
  }

  return combination;
}

// Function to check if a username already exists in Firestore
async function checkUsernameExists(username) {
  const usernameRef = doc(db, 'usernames', username);
  const docSnap = await getDoc(usernameRef);

  return docSnap.exists(); // Return true if the username already exists
}

// Event listener for the Sign Up button
document.getElementById('signUpBtn').addEventListener('click', async () => {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  try {
    // Create a new user with email and password
    const userCredential = await auth.createUserWithEmailAndPassword(email, password);
    const user = userCredential.user;

    // Generate a unique username for the new user
    const username = await generateUniqueUsername();

    // Update the user's profile with the username
    await user.updateProfile({
      displayName: username
    });

    console.log('User profile updated with username:', username);

    // Save the username to Firestore
    const usernameRef = doc(db, 'usernames', username);
    await setDoc(usernameRef, { uid: user.uid });

    console.log('Username saved to Firestore.');

  } catch (error) {
    console.error('Error signing up:', error.message);
  }
});

// Event listener for the Login button
document.getElementById('loginBtn').addEventListener('click', async () => {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  try {
    // Sign in the user with email and password
    const userCredential = await auth.signInWithEmailAndPassword(email, password);
    const user = userCredential.user;

    console.log('User logged in:', user);

  } catch (error) {
    console.error('Error logging in:', error.message);
  }
});
