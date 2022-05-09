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

  private _health = 3;

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

    if (this._health < 1) {
      // TODO: die
      this.healthState = HealthState.DEAD;
      this.setImmovable(true);
      this.setVelocity(0, 0);
      this.setPushable(false);

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
