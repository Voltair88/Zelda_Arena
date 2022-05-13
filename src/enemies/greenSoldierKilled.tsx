import Phaser from 'phaser';

declare global {
  namespace Phaser.GameObjects {
    interface GameObjectFactory {
      GreenSoldierKilled(x: number, y: number, texture: string, frame?: string | number): GreenSoldierKilled;
    }
  }
}

export default class GreenSoldierKilled extends Phaser.Physics.Arcade.Sprite {}
Phaser.GameObjects.GameObjectFactory.register(
  'GreenSoldierKilled',
  function GreenSoldierSprite(
    this: Phaser.GameObjects.GameObjectFactory,
    x: number,
    y: number,
    texture: string,
    frame: string
  ) {
    const sprite = new GreenSoldierKilled(this.scene, x, y, texture, frame);

    this.displayList.add(sprite);
    this.updateList.add(sprite);

    this.scene.physics.world.enableBody(sprite, Phaser.Physics.Arcade.DYNAMIC_BODY);

    sprite.body.setSize(16, 16).setMass(1).setOffset(4, 16);

    return sprite;
  }
);
