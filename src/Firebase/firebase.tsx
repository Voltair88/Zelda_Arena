import firebaseConfig from './firebase.config';
import { getAuth, signInAnonymously, onAuthStateChanged } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import {
  getDatabase,
  ref,
  set,
  onDisconnect,
  onValue,
  onChildAdded,
} from 'firebase/database';
import characterName from '../Components/characterName';

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
// communicate with the authentication service
const auth = getAuth(firebaseApp);
// communicate with the database
const database = getDatabase(firebaseApp);

(function () {
  let playerId: any;
  let playerRef: any;
  const players = {} as any;
  const playerElements = {} as { [key: string]: HTMLElement };

  const gameContainer = document.querySelector('.Game') as HTMLElement;

  function initGame() {
    const allPlayersRef = ref(database, 'players');

    // create a listener for allPlayerRef to listen for changes

    onValue(allPlayersRef, (snapshot) => {
      const allPlayers = snapshot.val();
      const allPlayersArray = Object.keys(allPlayers).map((key) => {
        return allPlayers[key];
      });
      const allPlayersSorted = allPlayersArray.sort((a, b) => {
        return b.score - a.score;
      });

      const highScores = document.getElementById('Highscore') as HTMLElement;
      highScores.innerHTML = '';
      allPlayersSorted.forEach((player) => {
        const playerElement = document.createElement('div');
        playerElement.innerHTML = `${player.name}`;
        highScores.appendChild(playerElement);
      });
    });

    // Create a new player
    onChildAdded(allPlayersRef, (snapshot) => {
      const addedPlayer = snapshot.val();
      const characterElement = document.createElement('div');
      characterElement.classList.add('character', 'grid-cell');
      if (addedPlayer.id === playerId) {
        characterElement.classList.add('you');
      }
      characterElement.innerHTML = `
          <div class="Character_shadow grid-cell"></div>
          <div class="Character_sprite grid-cell"></div>
          <div class="Character_name-container">
            <span class="Character_name"></span>
          </div>
          <div class="Character_you-arrow"></div>
        `;
      playerElements[addedPlayer.id] = characterElement as HTMLElement;

      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      characterElement.querySelector('.Character_name')!.innerHTML =
        addedPlayer.name;
    });
  }

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
      const playerRef = ref(database, `players/${playerId}`);
      set(playerRef, {
        name: characterName,
        id: playerId,
      });
      //Remove the player from the database when they disconnect (e.g. close the app)
      onDisconnect(playerRef).remove();

      initGame();
    } else {
      // User is signed out.
    }
  });
})();

export { auth, database };
