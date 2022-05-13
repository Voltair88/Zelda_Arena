import Phaser from 'phaser';
import { sceneEvents } from 'Event';
import { ref, set } from 'firebase/database';
import { auth, database } from '../Firebase/firebase';
import characterName from '../components/characterName';

export default class TitleScene extends Phaser.Scene {
  private Score = 0;
  constructor() {
    super({ key: 'TitleScene' });
  }
  create() {
    this.add.text(this.game.renderer.width / 2.3 - 100, this.game.renderer.height / 2 - 200, 'Zelda Arena', {
      fontSize: '64px',
      color: '#0b0b0b',
      backgroundColor: '#ffffff58',
    });
    const startButton = this.add.text(this.game.renderer.width / 2.3, this.game.renderer.height / 2, 'Start', {
      fontSize: '64px',
      color: '#0b0b0b',
      backgroundColor: '#ffffff58',
    });

    startButton.setInteractive();
    startButton.on('pointerdown', () => {
      this.scene.start('Preloader');
      sceneEvents.emit('resetScore');
    });
  }
}
