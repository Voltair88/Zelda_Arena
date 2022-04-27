import Phaser from 'phaser';
import greenSoldierAnims from '../Animations/green_soldier';

enum Direction {
  UP,
  DOWN,
  LEFT,
  RIGHT,
}

export default class GreenSoldier extends Phaser.Physics.Arcade.Sprite {
  private direction = Direction.DOWN;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    texture: string,
    frame: string
  ) {
    super(scene, x, y, texture, frame);
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
        this.anims.play('green_up', true);
        break;
      case Direction.DOWN:
        this.anims.play('green_down', true);
        break;
      case Direction.LEFT:
        this.anims.play('green_left', true);
        break;
      case Direction.RIGHT:
        this.anims.play('green_right', true);
        this.setVelocity(0, -speed);
        break;
    }
  }
}
