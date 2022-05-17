import Phaser from 'phaser';
import { sceneEvents } from 'Event';

export default class TitleScene extends Phaser.Scene {
  titleScreenMusic?: Phaser.Sound.BaseSound;
  constructor() {
    super({ key: 'TitleScene' });
  }

  preload() {
    this.load.audio('titleScreenMusic', 'Assets/music/title_screen.ogg');
    this.load.image('background', 'Assets/ui/titlescreen.png');
    this.load.image('titletext', 'Assets/ui/titletext.png');
  }
  create() {
    this.titleScreenMusic = this.sound.add('titleScreenMusic', { volume: 0.5, loop: true });
    this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'background');
    this.titleScreenMusic.play();
    const text = this.add.image(this.cameras.main.width / 2.2, this.cameras.main.height / 2 - 200, 'titletext');
    text.setScale(0.35);
    this.add.text(this.game.renderer.width / 2 - 250, this.game.renderer.height / 2 - 50, 'Arena', {
      fontFamily: 'Zelda',
      fontSize: '90px',
      color: '#e71837',
      stroke: '#000000',
      strokeThickness: 5,
    });
    const startButton = this.add.text(this.game.renderer.width / 2.3, this.game.renderer.height / 2 + 200, 'Start', {
      fontFamily: 'Zelda',
      fontSize: '90px',
      fixedHeight: 100,
      fixedWidth: 200,
      color: '#ffe449',
      stroke: '#000000',
      strokeThickness: 5,
    });

    startButton.setInteractive();
    startButton.on('pointerdown', () => {
      this.scene.start('Preloader');
      sceneEvents.emit('resetScore');
      this.titleScreenMusic?.stop();
    });

    this.tweens.add({
      targets: startButton,
      duration: 700,
      ease: 'Cubin.easeInOut',
      alpha: 0,
      repeat: -1,
      yoyo: true,
    });
  }
}
