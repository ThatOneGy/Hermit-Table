// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDAqAg7pNDeQfwN6ttudl7spQEoS0-teGg",
  authDomain: "hermit-table.firebaseapp.com",
  projectId: "hermit-table",
  storageBucket: "hermit-table.appspot.com",
  messagingSenderId: "773955109249",
  appId: "1:773955109249:web:55f7a1b96af45828d9e880",
};
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();

// List of Hermitcraft member nicknames
const hermitcraftAliases = [
  "xisuma", "bdubs", "grian", "etho", "scar", "tango", "false", "impulse", "karl", "mumbo"
];

// Function to generate a unique deck string
function generateUniqueDeckString() {
  let deckString = "";

  while (deckString === "" || deckStringExists(deckString)) {
    deckString = hermitcraftAliases[Math.floor(Math.random() * hermitcraftAliases.length)];
  }

  return deckString;
}

// Check if the deck string exists in the Firestore
async function deckStringExists(deckString) {
  const deckRef = db.collection("decks").doc(deckString);
  const doc = await deckRef.get();
  return doc.exists;
}

// Import Deck
document.getElementById('importDeckBtn').addEventListener('click', async () => {
  const deckString = document.getElementById('deckString').value;
  if (deckString === "") {
    alert("Please enter a deck string.");
    return;
  }

  const deckRef = db.collection("decks").doc(deckString);
  const doc = await deckRef.get();

  if (doc.exists) {
    console.log('Deck imported:', doc.data());
    // Add logic to use the imported deck
  } else {
    alert("Deck string does not exist. Please create a new deck.");
  }
});

// Create New Deck
document.getElementById('createDeckBtn').addEventListener('click', async () => {
  let deckString = generateUniqueDeckString();
  
  // Ensure the deck string is unique
  while (await deckStringExists(deckString)) {
    deckString = generateUniqueDeckString();
  }

  // Create a new deck in Firestore
  await db.collection("decks").doc(deckString).set({
    cards: [] // Initialize with an empty deck or default values
  });

  console.log('New deck created with string:', deckString);
  // Add logic to initialize the new deck
});
