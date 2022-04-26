import Phaser from 'phaser';
import Preloader from './Preloader';
import Game from './Game';

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 370,
  height: 200,
  parent: 'phaser-container',
  backgroundColor: '#282c34',
  pixelArt: true,
  roundPixels: true,
  antialiasGL: false,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },

      debug: true,
    },
  },
  scene: [Preloader, Game],
};

export default new Phaser.Game(config);
