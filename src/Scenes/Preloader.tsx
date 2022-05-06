import Phaser from 'phaser';

export default class Preloader extends Phaser.Scene {
  constructor() {
    super({ key: 'Preloader' });
  }

  preload() {
    // Load the tileset
    this.load.image('tiles', 'Assets/tileset/light_world.png');
    this.load.tilemapTiledJSON(
      'bg-overworld-light',
      'Assets/map/bg-overworld-light.json'
    );

    // Load the players Link
    this.load.atlas('Link', 'Assets/Link/Link.png', 'Assets/Link/Link.json');
    this.load.atlas(
      'link_bow',
      'Assets/Link/link_bow.png',
      'Assets/Link/link_bow.json'
    );
    this.load.atlas('arrow', 'Assets/Link/arrow.png', 'Assets/Link/arrow.json');
    // Loadt the enemy
    this.load.atlas(
      'green_soldier',
      'Assets/enemies/green_soldier.png',
      'Assets/enemies/green_soldier.json'
    );
  }

  create() {
    this.add.image(0, 0, 'tiles');
    this.scene.start('Game');
  }
}
