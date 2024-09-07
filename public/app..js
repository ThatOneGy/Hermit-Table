import { auth, db } from './firebase.js';
import { setDoc, getDoc, doc } from "https://www.gstatic.com/firebasejs/9.12.0/firebase-firestore.js";

// Define the list of Hermitcraft member aliases
const aliases = [
  "Grian", "HermitCraft", "Xisuma", "MumboJumbo", "EthosLab",
  "TangoTek", "Docm77", "Scar", "Cubfan135", "BdoubleO100",
  "Keralis", "GoodTimesWithScar", "FalseSymmetry", "Welsknight", "ImpulseSV"
];

// Function to generate a unique deck string based on aliases
async function generateUniqueDeckString() {
  let length = 1; // Start with 1 alias
  let combination;

  while (true) {
    combination = generateCombination(length);
    const stringExists = await checkDeckStringExists(combination);

    if (!stringExists) {
      break; // Exit loop if the combination is unique
    }

    length++; // Increase length if the combination is not unique
  }

  return combination;
}

// Function to generate a combination of aliases with a given length
function generateCombination(numAliases) {
  let combination = [];

  for (let i = 0; i < numAliases; i++) {
    const randomIndex = Math.floor(Math.random() * aliases.length);
    combination.push(aliases[randomIndex]);
  }

  return combination.join('-');
}

// Function to check if a deck string already exists in Firestore
async function checkDeckStringExists(deckString) {
  const deckRef = doc(db, 'decks', deckString);
  const docSnap = await getDoc(deckRef);

  return docSnap.exists(); // Return true if the deck string already exists
}

// Event listener for the Create Deck button
document.getElementById('createDeckBtn').addEventListener('click', async () => {
  try {
    // Generate a unique string for the card deck
    const uniqueDeckString = await generateUniqueDeckString();

    // Save the deck string to Firestore
    const deckRef = doc(db, 'decks', uniqueDeckString);
    await setDoc(deckRef, { createdBy: auth.currentUser.uid });

    console.log('Deck string saved to Firestore:', uniqueDeckString);
    alert('Your unique deck string is: ' + uniqueDeckString);
  } catch (error) {
    console.error('Error generating unique deck string:', error.message);
  }
});

// Event listener for the Join Deck button
document.getElementById('joinDeckBtn').addEventListener('click', async () => {
  const inputDeckString = document.getElementById('inputDeckString').value;

  try {
    const deckRef = doc(db, 'decks', inputDeckString);
    const docSnap = await getDoc(deckRef);

    if (docSnap.exists()) {
      console.log('Deck joined successfully.');
      // Optionally, handle successful joining here (e.g., redirect to game)
    } else {
      console.log('Invalid deck string.');
      alert('Invalid deck string. Please try again.');
    }
  } catch (error) {
    console.error('Error joining deck:', error.message);
  }
});
