import React from 'react';
import { auth, database } from '../Firebase/firebase';
import { updateProfile, onAuthStateChanged } from 'firebase/auth';
import { getDatabase, ref, set } from 'firebase/database';

export default function Username() {
  const [name, setName] = React.useState<string>('');

  const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    console.log(name);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    onAuthStateChanged(auth, (user) => {
      if (user) {
        const playerId = user.uid;
        set(ref(database, 'players/' + playerId), {
          name: name,
        });
      }
    });
  };

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
