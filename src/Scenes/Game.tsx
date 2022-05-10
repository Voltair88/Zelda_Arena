import Phaser from 'phaser';
// import debugDraw from '../utils/debug';
import { arrow, player, linkBow, greenSoldier, linkDying } from 'Animations';
import { sceneEvents } from 'Event';
import Link from '../Player/Link';
import '../Player/Link';

/* import { AnimatedTile, TileAnimationData, TilesetTileData } from '../utils/AnimatedTile'; */
import GreenSoldier from '../enemies/greenSoldier';

export default class Game extends Phaser.Scene {
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private Link!: Link;
  private greenSoldiers!: Phaser.Physics.Arcade.Group;
  /* private animatedTiles!: AnimatedTile[]; */
  private PlayerEnemysCollision?: Phaser.Physics.Arcade.Collider;
  private hit = 0;
  linkDeathSound?: Phaser.Sound.BaseSound;
  linkHurtSound?: Phaser.Sound.BaseSound;
  linkWalkingSound?: Phaser.Sound.BaseSound;

  constructor() {
    super({ key: 'Game' });
  }

  public init(): void {
    this.cursors = this.input.keyboard.createCursorKeys();

    /* this.animatedTiles = []; */
  }

  public preload(): void {
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  public create(): void {
    this.linkDeathSound = this.sound.add('link_death');
    this.linkHurtSound = this.sound.add('link_hurt');
    this.linkWalkingSound = this.sound.add('walking');
    this.scene.run('GameUI');
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
    greenSoldier(this.anims);
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

    /* const greenSoldierLayer = map.getObjectLayer('greenSoldier');
      greenSoldierLayer.objects.forEach((obj) => {
        this.greenSoldiers.get(obj.x, obj.y, 'green_soldier');
      }); */

    // Load player animations
    player(this.anims);
    linkBow(this.anims);
    arrow(this.anims);
    linkDying(this.anims);
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

    /* const tileData = tileset.tileData as TilesetTileData;
    for (const tileid in tileData) {
      map.layers.forEach((layer) => {
        layer.data.forEach((tileRow) => {
          tileRow.forEach((tile) => {
            if (tile.index - tileset.firstgid === parseInt(tileid)) {
              this.animatedTiles.push(
                new AnimatedTile(tile, tileData[tileid].animation as TileAnimationData, tileset.firstgid)
              );
            }
          });
        });
      });
    } */
  }
  private handlePlayerEnemyCollision(obj1: Phaser.GameObjects.GameObject, obj2: Phaser.GameObjects.GameObject) {
    const enemySprite = obj2 as GreenSoldier;
    const playerSprite = obj1 as Link;

    const dx = playerSprite.x - enemySprite.x;
    const dy = playerSprite.y - enemySprite.y;

    const dir = new Phaser.Math.Vector2(dx, dy).normalize().scale(200);
    if (this.Link.health > 0) {
      this.Link.setVelocity(dir.x, dir.y);
      this.Link.handleDamage(dir);
      this.hit += 1;
    }
    if (this.Link.health >= 1) {
      this.linkHurtSound?.play();
    } else if (this.Link.health < 1) {
      this.PlayerEnemysCollision?.destroy();
      this.Link.anims.play('link-dying');
      this.linkDeathSound?.play();
      this.Link.setVelocity(0, 0);
    }

    sceneEvents.emit('player-health-changed', this.Link.health);
  }

  // create animated tiles
  // loop through every tile and check if its id is in the animated tile's array

  public update(): void {
    const up = this.input.keyboard.addKey('W').isDown || this.cursors.up.isDown;
    const down = this.input.keyboard.addKey('S').isDown || this.cursors.down.isDown;
    const left = this.input.keyboard.addKey('A').isDown || this.cursors.left.isDown;
    const right = this.input.keyboard.addKey('D').isDown || this.cursors.right.isDown;
    const bow = this.input.keyboard.addKey('E').isDown || this.cursors.space.isDown;
    let moving = false;
    let shoting = false;

    /*  this.animatedTiles.forEach((tile) => tile.update(delta)); */

    if (this.hit > 0) {
      this.hit += 1;
      if (this.hit > 30) {
        this.hit = 0;
      }
      return;
    }
    if (this.input.keyboard && this.Link.health >= 1) {
      if (up) {
        this.Link.anims.play('walk-up', true);
        this.Link.setVelocity(0, -100);
        moving = true;
      } else if (down) {
        this.Link.anims.play('walk-down', true);
        this.Link.setVelocity(0, 100);
        moving = true;
      } else if (left) {
        this.Link.anims.play('walk-left', true);
        this.Link.setVelocity(-100, 0);
        moving = true;
      } else if (right) {
        this.Link.anims.play('walk-right', true);
        this.Link.setVelocity(100, 0);
        moving = true;
      } else {
        // put the Link in idle animation
        if (this.Link.anims.currentAnim.key === 'walk-down') {
          this.Link.anims.play('idle-down', true);
          moving = false;
        } else if (this.Link.anims.currentAnim.key === 'walk-up') {
          this.Link.anims.play('idle-up', true);
          moving = false;
        } else if (this.Link.anims.currentAnim.key === 'walk-left') {
          this.Link.anims.play('idle-left', true);
          moving = false;
        } else if (this.Link.anims.currentAnim.key === 'walk-right') {
          this.Link.anims.play('idle-right', true);
          moving = false;
        }
        this.Link.setVelocity(0, 0);
      }
      // when pressing E load the bow anims depending on the direction the player is facing
      if (bow && !moving && !shoting) {
        this.Link.anims.stopAfterRepeat();
        if (this.Link.anims.currentAnim.key === 'walk-down' || this.Link.anims.currentAnim.key === 'idle-down') {
          shoting = true;
          this.Link.anims.play('bow-down', true).once('animationcomplete', () => {
            this.Link.anims.play('idle-down', true);
          });
          shoting = false;
        } else if (this.Link.anims.currentAnim.key === 'walk-up' || this.Link.anims.currentAnim.key === 'idle-up') {
          this.Link.anims.play('bow-up', true).once('animationcomplete', () => {
            this.Link.anims.play('idle-up', true);
          });
          shoting = false;
        } else if (this.Link.anims.currentAnim.key === 'walk-left' || this.Link.anims.currentAnim.key === 'idle-left') {
          this.Link.anims.play('bow-left', true).once('animationcomplete', () => {
            this.Link.anims.play('idle-left', true);
          });
          shoting = false;
        } else if (
          this.Link.anims.currentAnim.key === 'walk-right' ||
          this.Link.anims.currentAnim.key === 'idle-right'
        ) {
          this.Link.anims.play('bow-right', true).once('animationcomplete', () => {
            this.Link.anims.play('idle-right', true);
          });
        }
      }
      if (
        this.Link.anims.currentAnim.key === 'bow-down' ||
        this.Link.anims.currentAnim.key === 'bow-up' ||
        this.Link.anims.currentAnim.key === 'bow-left' ||
        this.Link.anims.currentAnim.key === 'bow-right'
      ) {
        this.Link.setVelocity(0, 0);
        this.Link.setOffset(8, 12);
      } else {
        this.Link.setOffset(4, 16);
      }
    }
  }
}
