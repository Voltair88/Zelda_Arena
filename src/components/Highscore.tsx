import React from 'react';
import { onValue } from 'firebase/database';
import { allPlayersRef } from '../Firebase/firebase';

export default function Highscore() {
  onValue(allPlayersRef, (snapshot) => {
    const allPlayers = snapshot.val();
    const allPlayersArray = Object.keys(allPlayers).map((key) => allPlayers[key]);
    const allPlayersSorted = allPlayersArray.sort((a, b) => b.score - a.score);
    const highScores = document.getElementById('Highscore') as HTMLElement;
    highScores.innerHTML = '';
    allPlayersSorted.forEach((player) => {
      const playerElement = document.createElement('div');
      playerElement.innerHTML = `${player.name}`;
      highScores.appendChild(playerElement);
    });
  });

  return <div id="Highscore" />;
}
