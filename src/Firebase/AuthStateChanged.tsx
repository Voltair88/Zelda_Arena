import { onAuthStateChanged } from 'firebase/auth';
import { ref, set, onDisconnect } from 'firebase/database';
import characterName from '../components/characterName';
import { auth, database } from './firebase';

export default function AuthStateChanged() {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // You're logged in!
      const playerId = user.uid;
      const playerRef = ref(database, `players/${playerId}`);
      set(playerRef, {
        name: characterName,
        id: playerId,
      });
      // Remove the player from the database when they disconnect (e.g. close the app)
      onDisconnect(playerRef).remove();
    } else {
      // User is signed out.
    }
  });
}
