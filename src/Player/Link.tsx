/* eslint-disable @typescript-eslint/no-namespace */
import Phaser from 'phaser';

declare global {
  namespace Phaser.GameObjects {
    interface GameObjectFactory {
      Link(
        x: number,
        y: number,
        texture: string,
        frame?: string | number
      ): Link;
    }
  }
}

enum HealthState {
  HEALTHY,
  DAMAGE,
  DEAD,
}

export default class Link extends Phaser.Physics.Arcade.Sprite {
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private healthState: HealthState = HealthState.HEALTHY;
  private damageTime = 0;

  private _health = 30;

  get health() {
    return this._health;
  }
  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    texture: string,
    frame?: string
  ) {
    super(scene, x, y, texture, frame);
  }
  handleDamage(dir: Phaser.Math.Vector2) {
    if (this._health <= 0) {
      this.healthState = HealthState.DEAD;

      return;
    }

    if (this.healthState === HealthState.DAMAGE) {
      return;
    }

    --this._health;

    if (this._health <= 0) {
      // TODO: die
      this.healthState = HealthState.DEAD;
      // add animation
      this.setVelocity(0, 0);
    } else {
      this.setVelocity(dir.x, dir.y);

      this.setTint(0xff0000);

      this.healthState = HealthState.DAMAGE;
      this.damageTime = 0;
    }
  }

  preUpdate(time: number, delta: number): void {
    super.preUpdate(time, delta);

    switch (this.healthState) {
      case HealthState.HEALTHY:
        break;
      case HealthState.DAMAGE:
        this.damageTime += delta;
        if (this.damageTime >= 250) {
          this.healthState = HealthState.HEALTHY;
          this.setTint(0xffffff);
          this.damageTime = 0;
        }
        break;
    }
  }

  public update(cursors: Phaser.Types.Input.Keyboard.CursorKeys) {
    const up = cursors.up?.isDown;
    const down = cursors.down?.isDown;
    const left = cursors.left?.isDown;
    const right = cursors.right?.isDown;
    const bow = cursors.space?.isDown;
    const speed = 100;

    if (up) {
      this.anims.play('walk-up', true);
      this.setVelocity(0, -speed);
    } else if (down) {
      this.anims.play('walk-down', true);
      this.setVelocity(0, speed);
    } else if (left) {
      this.anims.play('walk-left', true);
      this.setVelocity(-speed, 0);
    } else if (right) {
      this.anims.play('walk-right', true);
      this.setVelocity(speed, 0);
    } else {
      const parts = this.anims.currentAnim.key.split('-');
      if (parts[1] === 'up') {
        this.anims.play('idle-up', true);
      } else if (parts[1] === 'down') {
        this.anims.play('idle-down', true);
      } else if (parts[1] === 'left') {
        this.anims.play('idle-left', true);
      } else if (parts[1] === 'right') {
        this.anims.play('idle-right', true);
      }
      this.setVelocity(0, 0);
    }
    /*     if (bow) {
      if (
        this.anims.currentAnim.key === 'walk-down' ||
        this.anims.currentAnim.key === 'idle-down'
      ) {
        this.anims.play('bow-down', true).once('animationcomplete', () => {
          this.anims.play('idle-down', true);
        });
      } else if (
        this.anims.currentAnim.key === 'walk-up' ||
        this.anims.currentAnim.key === 'idle-up'
      ) {
        this.anims.play('bow-up', true).once('animationcomplete', () => {
          this.anims.play('idle-up', true);
        });
      } else if (
        this.anims.currentAnim.key === 'walk-left' ||
        this.anims.currentAnim.key === 'idle-left'
      ) {
        this.anims.play('bow-left', true).once('animationcomplete', () => {
          this.anims.play('idle-left', true);
        });
      } else if (
        this.anims.currentAnim.key === 'walk-right' ||
        this.anims.currentAnim.key === 'idle-right'
      ) {
        this.anims.play('bow-right', true).once('animationcomplete', () => {
          this.anims.play('idle-right', true);
        });
      }
    }
    if (
      this.anims.currentAnim.key === 'bow-down' ||
      this.anims.currentAnim.key === 'bow-up' ||
      this.anims.currentAnim.key === 'bow-left' ||
      this.anims.currentAnim.key === 'bow-right'
    ) {
      this.setOffset(8, 12);
    } else {
      this.setOffset(4, 16);
    }
 */
    if (
      this.healthState === HealthState.DAMAGE ||
      this.healthState === HealthState.DEAD
    ) {
      return;
    }

    if (!cursors) {
      return;
    }
  }
}

Phaser.GameObjects.GameObjectFactory.register(
  'Link',
  function (
    this: Phaser.GameObjects.GameObjectFactory,
    x: number,
    y: number,
    texture: string,
    frame: string
  ) {
    const sprite = new Link(this.scene, x, y, texture, frame);

    this.displayList.add(sprite);
    this.updateList.add(sprite);

    this.scene.physics.world.enableBody(
      sprite,
      Phaser.Physics.Arcade.DYNAMIC_BODY
    );

    sprite.body.setSize(16, 16).setMass(1).setOffset(4, 16);

    return sprite;
  }
);
