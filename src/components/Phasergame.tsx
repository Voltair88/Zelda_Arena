import Phaser from 'phaser';
import GameOverScene from 'Scenes/gameOverScene';
import Preloader from '../Scenes/Preloader';
import Game from '../Scenes/Game';
import GameUI from '../Scenes/GameUI';
import TitleScene from '../Scenes/TitleScene';

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 1920,
  height: 1080,
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
  scene: [TitleScene, Preloader, Game, GameUI, GameOverScene],
};

export default new Phaser.Game(config);
