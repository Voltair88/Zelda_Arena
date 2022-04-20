/* eslint-disable @typescript-eslint/no-empty-function */
import Phaser from 'phaser';
import debugDraw from '../utils/debug';
import playerAnims from '../Anim/Player';
import controls from './controls';
export default class Game extends Phaser.Scene {
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private character!: Phaser.Physics.Arcade.Sprite;

  constructor() {
    super({ key: 'Game' });
  }

  init() {
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  preload() {
    this.load.path = 'character/';
    this.load.atlas('character', 'character.png', 'character.json');
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  create() {
    // create the map
    const map = this.make.tilemap({ key: 'dungeon' });
    const tileset = map.addTilesetImage('dungeon', 'tiles');
    const floorLayer = map.createLayer('Floor', tileset);
    const wallsLayer = map.createLayer('Walls', tileset);
    const decorationLayer = map.createLayer('Decoration', tileset);

    // create the player
    this.character = this.physics.add.sprite(100, 100, 'character');
    this.character.body.setSize(16, 22);

    // Load player animations
    playerAnims(this.anims);

    this.character.anims.play('idle-down');

    // create collision
    wallsLayer.setCollisionByProperty({ collision: true });

    // debug draw
    debugDraw(wallsLayer, this);

    this.physics.add.collider(this.character, wallsLayer);
    // set the camera
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    this.cameras.main.startFollow(this.character);
    this.cameras.main.roundPixels = true;
  }

  update(time: number, delta: number) {
    if (this.cursors) {
      if (this.cursors.up.isDown) {
        this.character.anims.play('walk-up', true);
        this.character.setVelocity(0, -100);
      } else if (this.cursors.down.isDown) {
        this.character.anims.play('walk-down', true);
        this.character.setVelocity(0, 100);
      } else if (this.cursors.left.isDown) {
        this.character.anims.play('walk-side', true);
        this.character.setVelocity(-100, 0);
        this.character.flipX = true;
      } else if (this.cursors.right.isDown) {
        this.character.anims.play('walk-side', true);
        this.character.setVelocity(100, 0);
        this.character.scaleX = 1;
        this.character.flipX = false;
      } else {
        // put the character in idle state
        if (this.character.anims.currentAnim.key === 'walk-down')
          this.character.anims.play('idle-down', true);
        else if (this.character.anims.currentAnim.key === 'walk-up')
          this.character.anims.play('idle-walk-up', true);
        else if (this.character.anims.currentAnim.key === 'walk-side')
          this.character.anims.play('idle-side', true);
        this.character.setVelocity(0, 0);
      }
    }
  }
}
