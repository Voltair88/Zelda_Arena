import { onChildAdded } from 'firebase/database';
import { allPlayersRef, playerId } from './firebase';

// Create a new player
export default function createPlayer() {
  onChildAdded(allPlayersRef, (snapshot) => {
    const addedPlayer = snapshot.val();
    const characterElement = document.createElement('div');
    characterElement.classList.add('character', 'grid-cell');
    if (addedPlayer.id === playerId) {
      characterElement.classList.add('you');
    }
    characterElement.innerHTML = `
            <div class="Character_shadow grid-cell"></div>
            <div class="Character_sprite grid-cell"></div>
            <div class="Character_name-container">
              <span class="Character_name"></span>
            </div>
            <div class="Character_you-arrow"></div>
          `;
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    characterElement.querySelector('.Character_name')!.innerHTML =
      addedPlayer.name;
  });
}
