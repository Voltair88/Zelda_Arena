import { onValue, ref } from 'firebase/database';
import { database } from '../Firebase/firebase';

const allPlayersRef = ref(database, 'players');

export default function Highscore() {
  onValue(allPlayersRef, (snapshot) => {
    const allPlayers = snapshot.val();
    const allPlayersArray = Object.keys(allPlayers).map((key) => {
      return allPlayers[key];
    });
    const allPlayersSorted = allPlayersArray.sort((a, b) => {
      return b.score - a.score;
    });

    const highScores = document.getElementById('Highscore') as HTMLElement;
    highScores.innerHTML = '';
    allPlayersSorted.forEach((player) => {
      const playerElement = document.createElement('div');
      playerElement.innerHTML = `${player.name}`;
      highScores.appendChild(playerElement);
    });
  });

  return <div id='Highscore'></div>;
}
