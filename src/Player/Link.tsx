import Phaser from 'phaser';

declare global {
  namespace Phaser.GameObjects {
    interface GameObjectFactory {
      Link(x: number, y: number, texture: string, frame?: string | number): Link;
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
  private linkHealth = 3;
  private arrows?: Phaser.Physics.Arcade.Group;
  get health() {
    return this.linkHealth;
  }

  setArrows(arrows: Phaser.Physics.Arcade.Group) {
    this.arrows = arrows;
  }

  handleDamage(dir: Phaser.Math.Vector2) {
    this.linkHealth -= 1;

    if (this.linkHealth <= 0) {
      this.healthState = HealthState.DEAD;
      return;
    }

    if (this.healthState === HealthState.DAMAGE) {
      return;
    }

    if (this.linkHealth < 1) {
      this.healthState = HealthState.DEAD;
      this.setImmovable(true);
      this.setVelocity(0, 0);
      this.setPushable(false);
      this.setVelocity(0, 0);
    } else {
      this.setVelocity(dir.x, dir.y);
      this.setTint(0xff0000);
      this.healthState = HealthState.DAMAGE;
      this.damageTime = 0;
    }
  }

  public shootArrow() {
    if (!this.arrows) {
      return;
    }
    const moving =
      this.anims.currentAnim.key === 'idle-down' ||
      this.anims.currentAnim.key === 'idle-up' ||
      this.anims.currentAnim.key === 'idle-left' ||
      this.anims.currentAnim.key === 'idle-right';
    if (moving) {
      if (this.anims.currentAnim.key === 'idle-right') {
        const arrowRight = this.arrows.get(this.x + 10, this.y + 6, 'arrow-right', 0) as Phaser.Physics.Arcade.Image;
        arrowRight.setVelocity(200, 0);
        arrowRight.setSize(0, 8);
      } else if (this.anims.currentAnim.key === 'idle-left') {
        const arrowLeft = this.arrows.get(this.x - 10, this.y + 6, 'arrow-left', 0) as Phaser.Physics.Arcade.Image;
        arrowLeft.setVelocity(-200, 0);
        arrowLeft.setSize(0, 8);
      } else if (this.anims.currentAnim.key === 'idle-up') {
        const arrowUp = this.arrows.get(this.x, this.y - 4, 'arrow-up', 0) as Phaser.Physics.Arcade.Image;
        arrowUp.setVelocity(0, -200);
        arrowUp.setSize(8, 0);
      } else if (this.anims.currentAnim.key === 'idle-down') {
        const arrowDown = this.arrows.get(this.x, this.y + 20, 'arrow-down', 0) as Phaser.Physics.Arcade.Image;
        arrowDown.setVelocity(0, 200);
        arrowDown.setSize(8, 0);
      }
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
      case HealthState.DEAD:
        break;
      default:
    }
  }

  public update(cursors: Phaser.Types.Input.Keyboard.CursorKeys) {
    if (this.healthState === HealthState.DAMAGE || this.healthState === HealthState.DEAD) {
      return;
    }
    if (!cursors) {
      return;
    }
  }
}
Phaser.GameObjects.GameObjectFactory.register(
  'Link',
  function linkSprite(
    this: Phaser.GameObjects.GameObjectFactory,
    x: number,
    y: number,
    texture: string,
    frame: string
  ) {
    const sprite = new Link(this.scene, x, y, texture, frame);

    this.displayList.add(sprite);
    this.updateList.add(sprite);

    this.scene.physics.world.enableBody(sprite, Phaser.Physics.Arcade.DYNAMIC_BODY);

    sprite.body.setSize(16, 16).setMass(1).setOffset(4, 16);

    return sprite;
  }
);
