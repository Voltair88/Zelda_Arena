import { signInAnonymously } from 'firebase/auth';
import { auth } from './firebase';

export default function signIn() {
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
}
