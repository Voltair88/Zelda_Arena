/* eslint-disable no-prototype-builtins */
/* eslint-disable @typescript-eslint/no-empty-function */
import Phaser from 'phaser';
// import debugDraw from '../utils/debug';
import playerAnims from '../Animations/Player';
import greenSoldierAnims from '../Animations/green_soldier';
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
    this.load.atlas(
      'character',
      'Assets/character/character.png',
      'Assets/character/character.json'
    );
    this.load.atlas(
      'green_soldier',
      'Assets/enemies/green_soldier.png',
      'Assets/enemies/green_soldier.json'
    );
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  public create(): void {
    // load the map and tileset and make the map
    const map = this.make.tilemap({ key: 'bg-overworld-light' });
    const tileset = map.addTilesetImage('light_world', 'tiles', 8, 8, 0, 0);
    // load the diffrent layers from tiled
    map.createLayer('Floor', tileset);
    const wallsLayer = map.createLayer('Walls', tileset);
    map.createLayer('Floor_decoration', tileset);
    const obstaclesLayer = map.createLayer('obstacles', tileset);
    // create the player
    this.character = this.physics.add
      .sprite(60, 80, 'character')
      .setMass(1)
      .setSize(16, 16)
      .setOffset(4, 16)
      .setPushable(false);

    // create the enemy and load it in
    const enemy = this.physics.add
      .sprite(150, 150, 'green_soldier', 'green_soldier_down_1')
      .setMass(10)
      .setSize(16, 24)
      .setPushable(false);

    // Load player animations
    playerAnims(this.anims);
    this.character.anims.play('idle-down');

    // Load enemy animations
    greenSoldierAnims(this.anims);
    enemy.anims.play('green-down');

    // create collision
    wallsLayer.setCollisionByProperty({ collision: true });
    obstaclesLayer.setCollisionByProperty({ collision: true });

    // debug draw

    // debugDraw(wallsLayer, this);

    // Collision

    this.physics.add.collider(this.character, wallsLayer);
    this.physics.add.collider(this.character, obstaclesLayer);
    this.physics.add.collider(enemy, wallsLayer);
    this.physics.add.collider(enemy, obstaclesLayer);
    this.physics.add.collider(this.character, enemy);

    // Camera
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    this.cameras.main.startFollow(this.character);
    this.cameras.main.roundPixels = true;

    // create animated tiles
    // loop through every tile and check if its id is in the animated tile's array

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
