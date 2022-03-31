import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDatabase } from "firebase/database";

const database = getDatabase();
const auth = getAuth();
onAuthStateChanged(auth, (user) => {
  if (user) {
        //You're logged in!
    const playerId = user.uid;
    const playerRef = database().ref(`players/${playerId}`);
    playerRef.onDisconnect().remove();
    console.log(user);
  } else {
    // User is signed out.
  }
});


