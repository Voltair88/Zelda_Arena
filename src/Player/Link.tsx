/* eslint-disable @typescript-eslint/no-namespace */
import Phaser from 'phaser';
import Player from '../Animations/Player';

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

    sprite.body.setSize(16, 16).setMass(1).setSize(16, 16).setOffset(4, 16);

    return sprite;
  }
);
