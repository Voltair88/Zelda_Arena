import { getAuth, signInAnonymously } from "firebase/auth";

const auth = getAuth();
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