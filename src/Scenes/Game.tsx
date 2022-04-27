/* eslint-disable no-prototype-builtins */
/* eslint-disable @typescript-eslint/no-empty-function */
import Phaser from 'phaser';
// import debugDraw from '../utils/debug';
import playerAnims from '../Animations/Player';
import Link from '../Player/Link';
import '../Player/Link';
import link_bow_anims from '../Animations/link_bow_anims';
import greenSoldierAnims from '../Animations/green_soldier';
import {
  AnimatedTile,
  TileAnimationData,
  TilesetTileData,
} from '../utils/AnimatedTile';
import GreenSoldier from '../enemies/greenSoldier';

export default class Game extends Phaser.Scene {
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private Link!: Link;
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
    this.Link = this.add.Link(120, 100, 'Link');

    // load in greenSoldier
    greenSoldierAnims(this.anims);
    const greenSoldiers = this.physics.add.group({
      classType: GreenSoldier,
    });

    greenSoldiers.get(150, 150, 'green_soldier').setPushable(false).setMass(10);
    greenSoldiers.get(150, 250, 'green_soldier').setPushable(false).setMass(10);

    // Load player animations
    playerAnims(this.anims);
    link_bow_anims(this.anims);
    this.Link.anims.play('idle-down');

    // create collision
    wallsLayer.setCollisionByProperty({ collision: true });
    obstaclesLayer.setCollisionByProperty({ collision: true });

    // debug draw

    // debugDraw(wallsLayer, this);

    // Camera
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    this.cameras.main.startFollow(this.Link);
    this.cameras.main.roundPixels = true;

    // Collision

    this.physics.add.collider(this.Link, wallsLayer);
    this.physics.add.collider(this.Link, obstaclesLayer);
    this.physics.add.collider(greenSoldiers, wallsLayer);
    this.physics.add.collider(greenSoldiers, obstaclesLayer);
    this.physics.add.collider(
      this.Link,
      greenSoldiers,
      this.handlePlayerEnemyCollision,
      undefined,
      this
    );

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
  private handlePlayerEnemyCollision(
    obj1: Phaser.GameObjects.GameObject,
    obj2: Phaser.GameObjects.GameObject
  ) {
    const GreenSoldier = obj2 as GreenSoldier;

    const dx = this.Link.x - GreenSoldier.x;
    const dy = this.Link.y - GreenSoldier.y;

    const dir = new Phaser.Math.Vector2(dx, dy).normalize().scale(100);

    this.Link.setVelocity(dir.x, dir.y);
  }

  // create animated tiles
  // loop through every tile and check if its id is in the animated tile's array

  public update(time: number, delta: number): void {
    this.animatedTiles.forEach((tile) => tile.update(delta));

    if (this.input.keyboard) {
      if (this.input.keyboard.addKey('W').isDown || this.cursors.up.isDown) {
        this.Link.anims.play('walk-up', true);
        this.Link.setVelocity(0, -100);
      } else if (
        this.input.keyboard.addKey('S').isDown ||
        this.cursors.down.isDown
      ) {
        this.Link.anims.play('walk-down', true);
        this.Link.setVelocity(0, 100);
      } else if (
        this.input.keyboard.addKey('A').isDown ||
        this.cursors.left.isDown
      ) {
        this.Link.anims.play('walk-left', true);
        this.Link.setVelocity(-100, 0);
      } else if (
        this.input.keyboard.addKey('D').isDown ||
        this.cursors.right.isDown
      ) {
        this.Link.anims.play('walk-right', true);
        this.Link.setVelocity(100, 0);
      } else {
        // put the Link in idle state
        if (this.Link.anims.currentAnim.key === 'walk-down')
          this.Link.anims.play('idle-down', true);
        else if (this.Link.anims.currentAnim.key === 'walk-up')
          this.Link.anims.play('idle-up', true);
        else if (this.Link.anims.currentAnim.key === 'walk-left')
          this.Link.anims.play('idle-left', true);
        else if (this.Link.anims.currentAnim.key === 'walk-right')
          this.Link.anims.play('idle-right', true);
        this.Link.setVelocity(0, 0);
      }
      // when pressing E load the bow anims depending on the direction the player is facing
      if (
        this.input.keyboard.addKey('E').isDown &&
        this.Link.anims.currentAnim.key === 'idle-down'
      ) {
        this.Link.anims.play('bow-down', true);
      } else if (
        this.input.keyboard.addKey('E').isDown &&
        this.Link.anims.currentAnim.key === 'idle-up'
      ) {
        this.Link.anims.play('bow-up', true);
      } else if (
        this.input.keyboard.addKey('E').isDown &&
        this.Link.anims.currentAnim.key === 'idle-left'
      ) {
        this.Link.anims.play('bow-left', true);
      } else if (
        this.input.keyboard.addKey('E').isDown &&
        this.Link.anims.currentAnim.key === 'idle-right'
      ) {
        this.Link.anims.play('bow-right', true);
      }
    }
  }
}
