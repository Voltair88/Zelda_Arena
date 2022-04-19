import firebaseConfig from './firebase.config';
import { getAuth } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref } from 'firebase/database';

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
// communicate with the authentication service
const auth = getAuth(firebaseApp);
// communicate with the database
const database = getDatabase(firebaseApp);
// Create a reference to the players collection
const allPlayersRef = ref(database, 'players');
// Create a reference to the player's specific entry in the database
const playerId = ref(database, 'playerId');

export { auth, database, allPlayersRef, playerId };
