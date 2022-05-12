import Phaser from 'phaser';
import { ref, set } from 'firebase/database';
import { onAuthStateChanged } from 'firebase/auth';
import { sceneEvents } from 'Event';
import { auth, database } from '../Firebase/firebase';

export default class GameOverScene extends Phaser.Scene {
  private Score = 0;

  constructor() {
    super({ key: 'GameOver' });
  }

  create() {
    sceneEvents.on('submitScore', (score: number) => {
      this.Score = score;
    });

    const gameOverText = this.add.text(600, 200, 'Game Over', {
      fontSize: '70px',
      color: '#000000',
      backgroundColor: '#9c9c9c9e',
      fontFamily: '"Roboto", sans-serif',
      align: 'center',
    });
    gameOverText.setOrigin(0.5, 0.5);

    const submitScore = this.add.text(600, 300, 'Submit Score', {
      fontSize: '54px',
      color: '#000000',
      backgroundColor: '#9c9c9c9e',
      fontFamily: '"Roboto", sans-serif',
      fontStyle: 'bold',
      align: 'center',
    });
    submitScore.setOrigin(0.5, 0.5);
    submitScore.setInteractive();
    submitScore.on('pointerdown', () => {
      console.log('submit score');
      sceneEvents.on('submitScore', (score: number) => {
        this.Score = score;
      });
      // Firebase updates the score of the player
      onAuthStateChanged(auth, (user) => {
        if (user) {
          const playerId = user.uid;
          set(ref(database, `players/${playerId}`), {
            score: this.Score,
          });
        }
      });
    });

    const restartButton = this.add.text(600, 400, 'Restart', {
      fontSize: '54px',
      color: '#000000',
      backgroundColor: '#9c9c9c9e',
      fontFamily: '"Roboto", sans-serif',
      fontStyle: 'bold',
      align: 'center',
    });
    restartButton.setOrigin(0.5, 0.5);
    restartButton.setInteractive();

    // Restart the scene Game when the restart button is clicked
    restartButton.on('pointerdown', () => {
      this.scene.start('Preloader');
      sceneEvents.emit('resetScore');
    });
  }
}
