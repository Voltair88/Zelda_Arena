import Phaser from 'phaser';
import Player from '../Animations/Player';

enum Direction {
  UP,
  DOWN,
  LEFT,
  RIGHT,
}

export default class Link extends Phaser.Physics.Arcade.Sprite {
  private direction = Direction.DOWN;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    texture: string,
    frame: string
  ) {
    super(scene, x, y, texture, frame);
    this.anims.play('link-down', true);
  }
}
