import Phaser from 'phaser';
import { player, linkBow, greenSoldier, linkDying, enemyKilled } from 'Animations';
import { sceneEvents } from 'Event';
import GreenSoldierKilled from 'enemies/greenSoldierKilled';
import Link from '../Player/Link';
import '../Player/Link';
import GreenSoldier from '../enemies/greenSoldier';
import '../enemies/greenSoldierKilled';

export default class Game extends Phaser.Scene {
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private Link!: Link;
  private greenSoldiers!: Phaser.Physics.Arcade.Group;
  private PlayerEnemysCollision?: Phaser.Physics.Arcade.Collider;
  private arrows!: Phaser.Physics.Arcade.Group;
  private hit = 0;
  private Score = 0;

  linkDeathSound?: Phaser.Sound.BaseSound;
  linkHurtSound?: Phaser.Sound.BaseSound;
  linkWalkingSound?: Phaser.Sound.BaseSound;
  linkBowSound?: Phaser.Sound.BaseSound;
  castle?: Phaser.Sound.BaseSound;
  enemykilled?: Phaser.Sound.BaseSound;

  constructor() {
    super({ key: 'Game' });
  }

  public init(): void {}

  public preload(): void {
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  public create(): void {
    // load Game UI
    this.scene.run('GameUI');
    // load the map and tileset and make the map
    const map = this.make.tilemap({ key: 'bg-overworld-light' });
    const tileset = map.addTilesetImage('light_world', 'tiles', 8, 8, 0, 0);

    // load the diffrent layers from tiled
    map.createLayer('Floor', tileset);
    const wallsLayer = map.createLayer('Walls', tileset);
    map.createLayer('Floor_decoration', tileset);
    const obstaclesLayer = map.createLayer('obstacles', tileset);

    // load sound effects
    this.linkDeathSound = this.sound.add('link_death');
    this.linkHurtSound = this.sound.add('link_hurt');
    this.linkBowSound = this.sound.add('bow');
    this.enemykilled = this.sound.add('enemykilled');

    // load Music and play it
    this.castle = this.sound.add('castle', { volume: 0.5, loop: true });
    this.castle.play();

    // create the player
    this.Link = this.add.Link(400, 100, 'Link');

    // load in greenSoldier
    greenSoldier(this.anims);
    this.greenSoldiers = this.physics.add.group({
      classType: GreenSoldier,
    });
    this.greenSoldiers.get(150, 150, 'green_soldier');
    this.greenSoldiers.get(450, 270, 'green_soldier');
    this.greenSoldiers.get(250, 350, 'green_soldier');
    this.greenSoldiers.get(350, 350, 'green_soldier');
    this.greenSoldiers.get(650, 250, 'green_soldier');
    this.greenSoldiers.get(150, 300, 'green_soldier');

    // create arrows
    this.arrows = this.physics.add.group({
      classType: Phaser.Physics.Arcade.Image,
    });

    // Load player animations
    player(this.anims);
    linkBow(this.anims);
    linkDying(this.anims);
    enemyKilled(this.anims);
    this.Link.anims.play('idle-down');
    this.Link.setArrows(this.arrows);

    // create collision
    wallsLayer.setCollisionByProperty({ collision: true });
    obstaclesLayer.setCollisionByProperty({ collision: true });

    // debug draw

    // debugDraw(wallsLayer, this);
    // debugDraw(obstaclesLayer, this);

    // Camera
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    this.cameras.main.startFollow(this.Link);
    this.cameras.main.setRoundPixels(true);
    this.cameras.main.setZoom(3);

    // Collision

    this.physics.add.collider(this.Link, wallsLayer);
    this.physics.add.collider(this.Link, obstaclesLayer);
    this.physics.add.collider(this.greenSoldiers, wallsLayer);
    this.physics.add.collider(this.greenSoldiers, obstaclesLayer);

    this.physics.add.collider(this.arrows, this.greenSoldiers, this.handleArrowsEnemyCollision, undefined, this);
    this.physics.add.collider(this.arrows, wallsLayer, this.handleArrowWallCollision, undefined, this);
    this.physics.add.collider(this.arrows, obstaclesLayer, this.handleArrowObstacleCollision, undefined, this);

    this.PlayerEnemysCollision = this.physics.add.collider(
      this.Link,
      this.greenSoldiers,
      this.handlePlayerEnemyCollision,
      undefined,
      this
    );

    sceneEvents.on('resetScore', (score: number) => {
      this.Score = 0;
    });
  }
  private handleArrowsEnemyCollision(obj1: Phaser.GameObjects.GameObject, obj2: Phaser.GameObjects.GameObject): void {
    const arrow = obj1 as Phaser.Physics.Arcade.Image;
    const enemy = obj2 as GreenSoldier;
    arrow.destroy();
    enemy.destroy();
    const killed = this.add.GreenSoldierKilled(enemy.x, enemy.y, 'enemyKilled');
    this.enemykilled?.play();
    killed.anims.play('enemyKilled').once('animationcomplete', () => {
      killed.destroy();
      const spawnEnemy = this.greenSoldiers.get(
        Phaser.Math.Between(120, 600),
        Phaser.Math.Between(80, 320),
        'green_soldier'
      );
    });
    this.Score += 1;
    sceneEvents.emit('scoreChanged', this.Score);
    sceneEvents.emit('submitScore', this.Score);
  }

  public handleArrowWallCollision(obj1: Phaser.GameObjects.GameObject, obj2: Phaser.GameObjects.GameObject): void {
    obj1.destroy();
  }

  public handleArrowObstacleCollision(obj1: Phaser.GameObjects.GameObject, obj2: Phaser.GameObjects.GameObject): void {
    obj1.destroy();
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
      this.Link.setVelocity(0, 0);
      this.linkDeathSound?.play();
      this.Link.anims.play('link-dying').once('animationcomplete', () => {
        this.scene.run('GameOver');
        this.castle?.stop();
      });
    }
    sceneEvents.emit('player-health-changed', this.Link.health);
  }
  public update(): void {
    const up = this.cursors.up.isDown;
    const down = this.cursors.down.isDown;
    const left = this.cursors.left.isDown;
    const right = this.cursors.right.isDown;
    const bow = this.cursors.space.isDown;
    const walkingDown = this.Link.anims.currentAnim.key === 'walk-down';
    const walkingUp = this.Link.anims.currentAnim.key === 'walk-up';
    const walkingLeft = this.Link.anims.currentAnim.key === 'walk-left';
    const walkingRight = this.Link.anims.currentAnim.key === 'walk-right';
    const idleDown = this.Link.anims.currentAnim.key === 'idle-down';
    const idleUp = this.Link.anims.currentAnim.key === 'idle-up';
    const idleLeft = this.Link.anims.currentAnim.key === 'idle-left';
    const idleRight = this.Link.anims.currentAnim.key === 'idle-right';
    const isShooting =
      this.Link.anims.currentAnim.key === 'bow-down' ||
      this.Link.anims.currentAnim.key === 'bow-up' ||
      this.Link.anims.currentAnim.key === 'bow-left' ||
      this.Link.anims.currentAnim.key === 'bow-right';

    if (this.hit > 0) {
      this.hit += 1;
      if (this.hit > 30) {
        this.hit = 0;
      }
      return;
    }

    if (this.input.keyboard && this.Link.health >= 1) {
      if (up && !isShooting) {
        this.Link.anims.play('walk-up', true);
        this.Link.setVelocity(0, -100);
      } else if (down && !isShooting) {
        this.Link.anims.play('walk-down', true);
        this.Link.setVelocity(0, 100);
      } else if (left && !isShooting) {
        this.Link.anims.play('walk-left', true);
        this.Link.setVelocity(-100, 0);
      } else if (right && !isShooting) {
        this.Link.anims.play('walk-right', true);
        this.Link.setVelocity(100, 0);
      } else {
        // put the Link in idle animation
        if (walkingDown) {
          this.Link.anims.play('idle-down', true);
        } else if (walkingUp) {
          this.Link.anims.play('idle-up', true);
        } else if (walkingLeft) {
          this.Link.anims.play('idle-left', true);
        } else if (walkingRight) {
          this.Link.anims.play('idle-right', true);
        }
        this.Link.setVelocity(0, 0);
      }
      // when pressing E or SPACE load the bow anims depending on the direction the player is facing
      if (bow) {
        if (idleDown) {
          this.Link.anims.play('bow-down', true).once('animationcomplete', () => {
            this.Link.anims.play('idle-down', true).once('animationcomplete', () => {
              this.Link.shootArrow();
              this.linkBowSound?.play();
            });
          });
        } else if (idleUp) {
          this.Link.anims.play('bow-up', true).once('animationcomplete', () => {
            this.Link.anims.play('idle-up', true).once('animationcomplete', () => {
              this.Link.shootArrow();
              this.linkBowSound?.play();
            });
          });
        } else if (idleLeft) {
          this.Link.anims.play('bow-left', true).once('animationcomplete', () => {
            this.Link.anims.play('idle-left', true).once('animationcomplete', () => {
              this.Link.shootArrow();
              this.linkBowSound?.play();
            });
          });
        } else if (idleRight) {
          this.Link.anims.play('bow-right', true).once('animationcomplete', () => {
            this.Link.anims.play('idle-right', true).once('animationcomplete', () => {
              this.Link.shootArrow();
              this.linkBowSound?.play();
            });
          });
        }
      }
      if (isShooting) {
        this.Link.setVelocity(0, 0);
        this.Link.setOffset(8, 12);
      } else {
        this.Link.setOffset(4, 16);
      }
    }
  }
}
