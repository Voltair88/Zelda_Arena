import Phaser from 'phaser';
import greenSoldierAnims from '../Animations/green_soldier';

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
  private direction = Direction.DOWN;
  private moveEvent: Phaser.Time.TimerEvent;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    texture: string,
    frame: string
  ) {
    super(scene, x, y, texture, frame);
    this.anims.play('green-down', true);
    scene.physics.world.on(
      Phaser.Physics.Arcade.Events.TILE_COLLIDE,
      this.handleTileCollision,
      this
    );
    this.moveEvent = scene.time.addEvent({
      delay: 2000,
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
    }
  }
  public create(): void {
    greenSoldierAnims(this.scene.anims);
  }
}
