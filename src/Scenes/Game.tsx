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
  private greenSoldiers!: Phaser.Physics.Arcade.Group;
  private animatedTiles!: AnimatedTile[];
  private PlayerEnemysCollision?: Phaser.Physics.Arcade.Collider;
  private hit = 0;

  constructor() {
    super({ key: 'Game' });
  }

  public init(): void {
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
    this.greenSoldiers = this.physics.add.group({
      classType: GreenSoldier,
      maxSize: 10,
      runChildUpdate: true,
      createCallback: (go) => {
        const greenGo = go as GreenSoldier;
        greenGo.body.onCollide = true;
      },
    });

    this.greenSoldiers.get(150, 150, 'green_soldier').setMass(10);
    this.greenSoldiers.get(150, 250, 'green_soldier').setMass(10);

    /*       const greenSoldierLayer = map.getObjectLayer('greenSoldier');
      greenSoldierLayer.objects.forEach((obj) => {
        this.greenSoldiers.get(obj.x, obj.y, 'green_soldier');
      }); */

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
    this.physics.add.collider(this.greenSoldiers, wallsLayer);
    this.physics.add.collider(this.greenSoldiers, obstaclesLayer);
    this.PlayerEnemysCollision = this.physics.add.collider(
      this.Link,
      this.greenSoldiers,
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
    const link = obj1 as Link;
    const GreenSoldier = obj2 as GreenSoldier;

    console.log('collision');

    const dx = link.x - GreenSoldier.x;
    const dy = link.y - GreenSoldier.y;

    const dir = new Phaser.Math.Vector2(dx, dy).normalize().scale(200);

    this.Link.setVelocity(dir.x, dir.y);

    this.hit += 1;
  }

  // create animated tiles
  // loop through every tile and check if its id is in the animated tile's array

  update(time: number, delta: number): void {
    this.animatedTiles.forEach((tile) => tile.update(delta));

    if (this.hit > 0) {
      ++this.hit;
      if (this.hit > 10) {
        this.hit = 0;
      }
      return;
    }

    if (this.Link) {
      this.Link.update(this.cursors);
    }
  }
}
