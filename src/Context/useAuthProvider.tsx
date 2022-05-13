import React, { createContext, useState } from 'react';
import { signInAnonymously } from 'firebase/auth';
import { auth } from '../Firebase/firebase';

interface Props {
  children: React.ReactNode;
}

export default function AuthProvider({ children }: Props) {
  const [user, setUser] = useState(null);
  // sign in anonymously
  signInAnonymously(auth)
    .then(() => {
      // Signed in..
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // An error happened.
    });

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}

// create a context provider for the current user
export const UserContext = createContext(null);
