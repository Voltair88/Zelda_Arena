import Phaser from 'phaser';
import { sceneEvents } from 'Event';

export default class TitleScene extends Phaser.Scene {
  titleScreenMusic?: Phaser.Sound.BaseSound;
  constructor() {
    super({ key: 'TitleScene' });
  }

  preload() {
    this.load.audio('titleScreenMusic', 'Assets/music/title_screen.ogg');
  }
  create() {
    this.titleScreenMusic = this.sound.add('titleScreenMusic', { volume: 0.5, loop: true });
    this.titleScreenMusic.play();
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
      this.titleScreenMusic?.stop();
    });
  }
}
