import React from 'react';
import './App.css';
import { getAuth, signInAnonymously } from 'firebase/auth';
import { firebaseConfig } from './firebase';
import { initializeApp } from 'firebase/app';

initializeApp(firebaseConfig);

const auth = getAuth();
signInAnonymously(auth)
  .then(() => {
    console.log(auth.currentUser);
    // Signed in.. test 2
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ...
    console.log(errorCode, errorMessage);
  });

function App() {
  return (
    <div className='App'>
      <p>Welcome to React!</p>
    </div>
  );
}

export default App;
