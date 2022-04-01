import firebaseConfig from './firebase.config';
import { getAuth, signInAnonymously, onAuthStateChanged } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set } from 'firebase/database';
import characterName from '../Components/characterName';

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
// communicate with the authentication service
const auth = getAuth(firebaseApp);
// communicate with the database
const database = getDatabase(firebaseApp);

// sign in anonymously
signInAnonymously(auth)
  .then(() => {
    console.log(auth.currentUser);
    // Signed in..
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // An error happened.
    console.log(errorCode, errorMessage);
  });

onAuthStateChanged(auth, (user) => {
  if (user) {
    //You're logged in!
    const playerId = user.uid;
    set(ref(database, 'players/' + playerId), {
      // the player gets a random name from the characterName array
      name: characterName,
    });
    console.log(playerId);
  } else {
    // User is signed out.
  }
});

export { auth, database };
