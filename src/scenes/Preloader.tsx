import Phaser from 'phaser';

export default class Preloader extends Phaser.Scene {
  constructor() {
    super({ key: 'Preloader' });
  }

  preload() {
    this.load.image('tiles', 'map/gamemap.png');
    this.load.tilemapTiledJSON('map', 'tileset/gamemap.json');
  }

  create() {
    this.add.image(400, 960, 'tiles');
    this.scene.start('Game');
  }
}
