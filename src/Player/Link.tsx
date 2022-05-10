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
    if (this.linkHealth <= 0) {
      this.healthState = HealthState.DEAD;
      return;
    }

    if (this.healthState === HealthState.DAMAGE) {
      return;
    }

    this.linkHealth -= 1;

    if (this.linkHealth < 1) {
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

  public shootArrowRight() {
    if (!this.arrows) {
      return;
    }
    const arrowRight = this.arrows.get(this.x, this.y, 'arrow-right', 0) as Phaser.Physics.Arcade.Image;

    if (!arrowRight) {
      return;
    }

    if (this.anims.currentAnim.key === 'idle-right') {
      arrowRight.setVelocity(200, 0);
      arrowRight.setSize(0, 8);
    }
  }

  public shootArrowLeft() {
    if (!this.arrows) {
      return;
    }
    const arrowLeft = this.arrows.get(this.x, this.y, 'arrow-left', 0) as Phaser.Physics.Arcade.Image;

    if (!arrowLeft) {
      return;
    }

    if (this.anims.currentAnim.key === 'idle-left') {
      arrowLeft.setVelocity(-200, 0);
      arrowLeft.setSize(0, 8);
    }
  }

  public shootArrowUp() {
    if (!this.arrows) {
      return;
    }
    const arrowUp = this.arrows.get(this.x, this.y, 'arrow-up', 0) as Phaser.Physics.Arcade.Image;

    if (!arrowUp) {
      return;
    }

    if (this.anims.currentAnim.key === 'idle-up') {
      arrowUp.setVelocity(0, -200);
      arrowUp.setSize(8, 0);
    }
  }

  public shootArrowDown() {
    if (!this.arrows) {
      return;
    }
    const arrowDown = this.arrows.get(this.x, this.y, 'arrow-down', 0) as Phaser.Physics.Arcade.Image;

    if (!arrowDown) {
      return;
    }

    if (this.anims.currentAnim.key === 'idle-down') {
      arrowDown.setVelocity(0, 200);
      arrowDown.setSize(8, 0);
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
