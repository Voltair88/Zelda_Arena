import Phaser from 'phaser';
import Preloader from '../Scenes/Preloader';
import Game from '../Scenes/Game';
import GameUI from '../Scenes/GameUI';

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 370,
  height: 200,
  parent: 'phaser-game',
  backgroundColor: '#282c34',
  pixelArt: true,
  roundPixels: true,
  antialiasGL: false,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  dom: {
    createContainer: false,
  },
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
      debug: false,
    },
  },
  scene: [Preloader, Game, GameUI],
};

export default new Phaser.Game(config);
