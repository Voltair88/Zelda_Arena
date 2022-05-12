import Phaser from 'phaser';
import { ref, set, onValue } from 'firebase/database';
import { onAuthStateChanged } from 'firebase/auth';
import { sceneEvents } from 'Event';
import { allPlayersRef, auth, database } from '../Firebase/firebase';

export default class GameOverScene extends Phaser.Scene {
  private Score = 0;

  constructor() {
    super({ key: 'GameOver' });
  }

  create() {
    const gamescene = this.scene.get('Game');

    // Highscore

    const HighScoreContainer = this.add.rectangle(
      gamescene.cameras.main.width / 10,
      gamescene.cameras.main.height / 2,
      350,
      600,
      0xf3f3f3
    );
    // TODO: Needs testing
    onValue(allPlayersRef, (snapshot) => {
      const allPlayers = snapshot.val();
      const allPlayersArray = Object.keys(allPlayers).map((key) => allPlayers[key]);
      const allPlayersSorted = allPlayersArray.sort((a, b) => b.score - a.score);
      const highscore = allPlayersSorted[0].score;
      const highscoreLabel = this.add.text(
        gamescene.cameras.main.width / 2 - 900,
        gamescene.cameras.main.height / 4,
        `Highscore: ${highscore}`,
        {
          fontFamily: '"Roboto", sans-serif',
          fontSize: '56px',
          stroke: '#0b0b0b',
          strokeThickness: 2,
          color: '#000000',
          backgroundColor: '#66666626',
        }
      );
      highscoreLabel.setScale(0.5);
      highscoreLabel.setDepth(1);
    });

    // Game over scene
    this.add.rectangle(gamescene.cameras.main.width / 2, gamescene.cameras.main.height / 2.3, 800, 600, 0xf3f3f3, 0.5);

    // Game over text
    const gameOverText = this.add.text(
      gamescene.cameras.main.width / 2,
      gamescene.cameras.main.height / 3.4,
      'Game Over',
      {
        fontSize: '140px',
        color: '#000000',
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
      submitScore.text = 'Score submitted!';
      submitScore.setInteractive(false);
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
