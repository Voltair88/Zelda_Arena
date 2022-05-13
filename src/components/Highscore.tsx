import React from 'react';
import { onValue } from 'firebase/database';
import { allPlayersRef } from '../Firebase/firebase';

export function Highscore() {
  onValue(allPlayersRef, (snapshot) => {
    const allPlayers = snapshot.val();
    const allPlayersArray = Object.keys(allPlayers).map((key) => allPlayers[key]);
    const allPlayersSorted = allPlayersArray.sort((a, b) => b.score - a.score);
    const highScores = document.getElementById('Highscore') as HTMLElement;
    highScores.innerHTML = '';
    allPlayersSorted.forEach((player) => {
      const playerElement = document.createElement('div');
      playerElement.innerHTML = `${player.name}`;
      playerElement.innerHTML += ` ${player.score}`;
      highScores.appendChild(playerElement);
    });
  });

  return (
    <div>
      <h1>Highscore</h1>
      <div id="Highscore" />
    </div>
  );
}
