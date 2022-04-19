import firebaseConfig from './firebase.config';
import { getAuth } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref } from 'firebase/database';
import { createContext } from 'react';

// create a context provider for the current user
export const UserContext = createContext(null);

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
// communicate with the authentication service
const auth = getAuth(firebaseApp);
// communicate with the database
const database = getDatabase(firebaseApp);
// Create a reference to the players collection
const allPlayersRef = ref(database, 'players');
// Create a reference to the player's specific entry in the database

// get the player's id
const playerId = auth.currentUser ? auth.currentUser.uid : null;
// Create a reference to the player's specific entry in the database
const playerRef = ref(database, `players/${playerId}`);
// Get players name from the database
const playerName = ref(database, `players/${playerId}/name`);

export { auth, database, allPlayersRef, playerId, playerRef, playerName };
