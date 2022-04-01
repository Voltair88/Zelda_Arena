import firebaseConfig from './firebase.config';
import { getAuth, signInAnonymously, onAuthStateChanged } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set } from 'firebase/database';
import characterName from '../Components/characterName';

const firebaseApp = initializeApp(firebaseConfig);

export const auth: any = getAuth(firebaseApp);
export const database = getDatabase(firebaseApp);

signInAnonymously(auth)
  .then(() => {
    console.log(auth.currentUser);
    // Signed in..
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ...
    console.log(errorCode, errorMessage);
  });

onAuthStateChanged(auth, (user) => {
  if (user) {
    //You're logged in!
    const playerId = user.uid;
    set(ref(database, 'players/' + playerId), {
      name: characterName,
    });

    console.log(playerId);
  } else {
    // User is signed out.
  }
});
