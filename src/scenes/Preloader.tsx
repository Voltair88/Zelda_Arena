import Phaser from 'phaser';

export default class Preloader extends Phaser.Scene {
  constructor() {
    super({ key: 'Preloader' });
  }

  preload() {
    this.load.image('tiles', 'tileset/dungeontileset.png');
    this.load.tilemapTiledJSON('dungeon', 'map/dungeon.json');
  }

  create() {
    this.add.image(0, 0, 'tiles');
    this.scene.start('Game');
  }
}
