import React from 'react';
import { auth, database } from '../Firebase/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { ref, set } from 'firebase/database';

// function to change the name of the player

export default function Username() {
  const [name, setName] = React.useState<string>('');

  // handles the change of the name
  const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  // handles the submit of the name
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(name);

    // sets the name of the player in the database
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const playerId = user.uid;
        set(ref(database, 'players/' + playerId), {
          name: name,
        });
      }
    });
  };

  // renders the component
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type='text'
            name='name'
            value={name}
            maxLength={10}
            onChange={handleName}
          />
        </label>
        <input type='submit' value='Submit' />
      </form>
    </div>
  );
}
