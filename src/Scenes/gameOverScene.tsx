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
    const gamescene = this.scene.get('Game');
    // Game over text
    const gameOverText = this.add.text(
      gamescene.cameras.main.width / 2,
      gamescene.cameras.main.height / 3.4,
      'Game Over',
      {
        fontSize: '140px',
        color: '#000000',
        backgroundColor: '#9c9c9c9e',
        fontFamily: '"Roboto", sans-serif',
        align: 'center',
      }
    );
    gameOverText.setOrigin(0.5, 0.5);

    // Submit score to firebase
    const submitScore = this.add.text(
      gamescene.cameras.main.width / 2,
      gamescene.cameras.main.height / 2.1,
      'Submit Score',
      {
        fontSize: '54px',
        color: '#000000',
        backgroundColor: '#9c9c9c9e',
        fontFamily: '"Roboto", sans-serif',
        fontStyle: 'bold',
        align: 'center',
      }
    );
    submitScore.setOrigin(0.5, 0.5);
    submitScore.setInteractive();
    submitScore.on('pointerdown', () => {
      console.log(this.Score, 'score');
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

    // Restart the game
    const restartButton = this.add.text(
      gamescene.cameras.main.width / 2,
      gamescene.cameras.main.height / 1.8,

      'Restart',

      {
        fontSize: '54px',
        color: '#000000',
        backgroundColor: '#9c9c9c9e',
        fontFamily: '"Roboto", sans-serif',
        fontStyle: 'bold',
        align: 'center',
      }
    );
    restartButton.setOrigin(0.5, 0.5);
    restartButton.setInteractive();

    restartButton.on('pointerdown', () => {
      this.scene.start('Preloader');
      sceneEvents.emit('resetScore');
    });
  }
}
