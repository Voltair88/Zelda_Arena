import Phaser from 'phaser';

export default class Preloader extends Phaser.Scene {
  constructor() {
    super({ key: 'Preloader' });
  }

  preload() {
    this.load.image('tiles', 'Assets/tileset/dungeontileset.png');
    this.load.tilemapTiledJSON('dungeon', 'Assets/map/dungeon.json');

    this.load.atlas(
      'character',
      'Assets/character/Zelda.png',
      'Assets/character/Zelda.json'
    );
  }

  create() {
    this.add.image(0, 0, 'tiles');
    this.scene.start('Game');
  }
}
