/* eslint-disable no-prototype-builtins */
/* eslint-disable @typescript-eslint/no-empty-function */
import Phaser from 'phaser';
import debugDraw from '../utils/debug';
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
    const map = this.make.tilemap({ key: 'dungeon' });
    const tileset = map.addTilesetImage('dungeon', 'tiles');
    map.createLayer('Floor', tileset);
    const wallsLayer = map.createLayer('Walls', tileset);
    map.createLayer('Walls_Over', tileset);
    map.createLayer('Decoration', tileset);

    // create the player
    this.character = this.physics.add.sprite(100, 100, 'character');
    this.character.body.setSize(16, 22);

    // Load player animations
    playerAnims(this.anims);

    this.character.anims.play('idle-down');

    // create collision
    wallsLayer.setCollisionByProperty({ collision: true });

    // debug draw
    // debugDraw(wallsLayer, this);

    this.physics.add.collider(this.character, wallsLayer);
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
            // Typically `firstgid` is 1, which means tileid starts from 1.
            // Tiled's tileid starts from 0.
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
