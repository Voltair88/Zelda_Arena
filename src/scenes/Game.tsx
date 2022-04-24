/* eslint-disable no-prototype-builtins */
/* eslint-disable @typescript-eslint/no-empty-function */
import Phaser from 'phaser';
// import debugDraw from '../utils/debug';
import playerAnims from '../Animations/Player';
import {
  AnimatedTile,
  TileAnimationData,
  TilesetTileData,
} from '../utils/AnimatedTile';

export default class Game extends Phaser.Scene {
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private character!: Phaser.Physics.Arcade.Sprite;
  private animatedTiles!: AnimatedTile[];

  constructor() {
    super({ key: 'Game' });
  }

  public init(): void {
    this.cursors = this.input.keyboard.createCursorKeys();
    this.animatedTiles = [];
  }

  public preload(): void {
    this.load.path = 'Assets/character/';
    this.load.atlas('character', 'character.png', 'character.json');
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  public create(): void {
    const map = this.make.tilemap({ key: 'bg-overworld-light' });
    const tileset = map.addTilesetImage(
      'bg-overworld-light',
      'bg-overworld-light'
    );
    map.createLayer('Layer1', tileset);

    /*     const map = this.make.tilemap({ key: 'dungeon' });
    const tileset = map.addTilesetImage('dungeon', 'tiles');
    map.createLayer('Floor', tileset);
    const wallsLayer = map.createLayer('Walls', tileset);
    map.createLayer('Walls_Over', tileset);
    map.createLayer('Decoration', tileset);
 */ // create the player
    this.character = this.physics.add.sprite(100, 100, 'character');
    this.character.body.setSize(16, 16);
    this.character.body.offset.y = 16;

    // Load player animations
    playerAnims(this.anims);

    this.character.anims.play('idle-down');

    // create collision
    // wallsLayer.setCollisionByProperty({ collision: true });

    // debug draw

    // debugDraw(wallsLayer, this);

    // this.physics.add.collider(this.character, wallsLayer);

    // set the camera
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    this.cameras.main.startFollow(this.character);
    this.cameras.main.roundPixels = true;

    // create animated tiles
    // loop through every tile and check if its id is animated tile's id

    const tileData = tileset.tileData as TilesetTileData;
    for (const tileid in tileData) {
      map.layers.forEach((layer) => {
        layer.data.forEach((tileRow) => {
          tileRow.forEach((tile) => {
            if (tile.index - tileset.firstgid === parseInt(tileid)) {
              this.animatedTiles.push(
                new AnimatedTile(
                  tile,
                  tileData[tileid].animation as TileAnimationData,
                  tileset.firstgid
                )
              );
            }
          });
        });
      });
    }
  }

  public update(time: number, delta: number): void {
    this.animatedTiles.forEach((tile) => tile.update(delta));

    if (this.input.keyboard) {
      if (this.input.keyboard.addKey('W').isDown || this.cursors.up.isDown) {
        this.character.anims.play('walk-up', true);
        this.character.setVelocity(0, -100);
      } else if (
        this.input.keyboard.addKey('S').isDown ||
        this.cursors.down.isDown
      ) {
        this.character.anims.play('walk-down', true);
        this.character.setVelocity(0, 100);
      } else if (
        this.input.keyboard.addKey('A').isDown ||
        this.cursors.left.isDown
      ) {
        this.character.anims.play('walk-left', true);
        this.character.setVelocity(-100, 0);
      } else if (
        this.input.keyboard.addKey('D').isDown ||
        this.cursors.right.isDown
      ) {
        this.character.anims.play('walk-right', true);
        this.character.setVelocity(100, 0);
      } else {
        // put the character in idle state
        if (this.character.anims.currentAnim.key === 'walk-down')
          this.character.anims.play('idle-down', true);
        else if (this.character.anims.currentAnim.key === 'walk-up')
          this.character.anims.play('idle-up', true);
        else if (this.character.anims.currentAnim.key === 'walk-left')
          this.character.anims.play('idle-left', true);
        else if (this.character.anims.currentAnim.key === 'walk-right')
          this.character.anims.play('idle-right', true);
        this.character.setVelocity(0, 0);
      }
    }
  }
}
