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
    // scene.add.existing(this);
    this.anims.play('green-down', true);
    this.moveEvent = scene.time.addEvent({
      delay: 2000,
      callback: () => {
        this.direction = randomDirection(this.direction);
      },
      loop: true,
    });
  }

  preload(): void {
    this.scene.load.atlas(
      'green_soldier',
      'Assets/enemies/green_soldier.png',
      'Assets/enemies/green_soldier.json'
    );
  }

  protected preUpdate(time: number, delta: number): void {
    super.preUpdate(time, delta);

    const speed = 50;
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
