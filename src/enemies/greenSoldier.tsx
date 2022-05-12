import Phaser from 'phaser';
import { greenSoldier } from '../Animations';

enum Direction {
  UP,
  DOWN,
  LEFT,
  RIGHT,
}

const randomDirection = (exclude: Direction) => {
  let newDirection = Phaser.Math.Between(0, 3);
  while (newDirection === exclude) {
    newDirection = Phaser.Math.Between(0, 3);
  }

  return newDirection;
};

export default class GreenSoldier extends Phaser.Physics.Arcade.Sprite {
  private direction = Phaser.Math.Between(0, 3);
  private moveEvent: Phaser.Time.TimerEvent;

  constructor(scene: Phaser.Scene, x: number, y: number, texture: string, frame: string) {
    super(scene, x, y, texture, frame);
    scene.physics.world.on(Phaser.Physics.Arcade.Events.TILE_COLLIDE, this.handleTileCollision, this);
    this.moveEvent = scene.time.addEvent({
      delay: Phaser.Math.Between(1000, 2000),
      callback: () => {
        this.direction = randomDirection(this.direction);
      },
      loop: true,
    });
  }
  destroy(fromScene?: boolean) {
    this.moveEvent.destroy();

    super.destroy(fromScene);
  }
  private handleTileCollision(go: Phaser.GameObjects.GameObject) {
    if (go !== this) {
      return;
    }

    this.direction = randomDirection(this.direction);
  }

  protected preUpdate(time: number, delta: number): void {
    super.preUpdate(time, delta);
    this.body.setSize(24, 32);

    if (this.direction === Direction.LEFT) {
      this.setOffset(10, 0);
    } else {
      this.setOffset(0, 0);
    }
    const speed = 35;
    switch (this.direction) {
      case Direction.UP:
        this.anims.play('green-up', true);
        this.setVelocity(0, -speed);

        break;
      case Direction.DOWN:
        this.anims.play('green-down', true);
        this.setVelocity(0, speed);
        break;
      case Direction.LEFT:
        this.anims.play('green-side', true);
        this.setFlipX(false);
        this.setVelocity(-speed, 0);

        break;
      case Direction.RIGHT:
        this.anims.play('green-side', true);
        this.setFlipX(true);
        this.setVelocity(speed, 0);
        break;

      default:
    }
  }
  public create(): void {
    greenSoldier(this.scene.anims);
  }
}
