import Phaser from 'phaser';

export default class Preloader extends Phaser.Scene {
  constructor() {
    super({ key: 'Preloader' });
  }

  preload() {
    // Load the tileset
    this.load.image('tiles', 'Assets/tileset/light_world.png');
    this.load.tilemapTiledJSON('bg-overworld-light', 'Assets/map/bg-overworld-light.json');

    // Load the players Link
    this.load.atlas('Link', 'Assets/Link/Link.png', 'Assets/Link/Link.json');
    this.load.atlas('link_bow', 'Assets/Link/link_bow.png', 'Assets/Link/link_bow.json');
    this.load.atlas('link_dying', 'Assets/Link/link_dying.png', 'Assets/Link/link_dying.json');
    this.load.image('arrow-up', 'Assets/Link/arrows/arrow-up.png');
    this.load.image('arrow-down', 'Assets/Link/arrows/arrow-down.png');
    this.load.image('arrow-left', 'Assets/Link/arrows/arrow-left.png');
    this.load.image('arrow-right', 'Assets/Link/arrows/arrow-right.png');

    // Load the enemy
    this.load.atlas('green_soldier', 'Assets/enemies/green_soldier.png', 'Assets/enemies/green_soldier.json');
    this.load.atlas('enemyKilled', 'Assets/enemies/enemyKilled.png', 'Assets/enemies/enemyKilled.json');
    // Load the UI
    this.load.image('ui-heart-empty', 'Assets/ui/ui_heart_empty.png');
    this.load.image('ui-heart-full', 'Assets/ui/ui_heart_full.png');
    this.load.image('ui-heart-half', 'Assets/ui/ui_heart_half.png');
    // Load the sounds
    this.load.audio('link_death', 'Assets/sound/hero_dying.ogg');
    this.load.audio('link_hurt', 'Assets/sound/hero_hurt.ogg');
    this.load.audio('bow', 'Assets/sound/bow.ogg');
    this.load.audio('titleScreenMusic', 'Assets/music/title_screen.ogg');
    this.load.audio('gameOver', 'Assets/music/game_over.ogg');
    this.load.audio('castle', 'Assets/music/castle.ogg');
  }

  create() {
    this.add.image(0, 0, 'tiles');
    this.scene.start('Game');
  }
}
