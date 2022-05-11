import Phaser from 'phaser';
import { sceneEvents } from 'Event';

export default class GameUI extends Phaser.Scene {
  private hearts!: Phaser.GameObjects.Group;
  private Score = 0;
  constructor() {
    super({ key: 'GameUI' });
  }

  create() {
    this.hearts = this.add.group({
      classType: Phaser.GameObjects.Image,
    });
    this.hearts.createMultiple({
      key: 'ui-heart-full',
      setXY: {
        x: 10,
        y: 10,
        stepX: 14,
        stepY: 0,
      },
      quantity: 3,
    });

    const scoreLabel = this.add.text(3, 20, `Score: ${this.Score}`, {
      fontSize: '12px',
      color: '#0b0b0b',
      backgroundColor: '#ffffff58',
    });

    sceneEvents.on('scoreChanged', (score: number) => {
      this.Score = score;
      scoreLabel.text = `Score: ${this.Score}`;
    });

    sceneEvents.on('player-health-changed', this.handlePlayerHealthChanged, this);
    this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
      sceneEvents.off('player-health-changed', this.handlePlayerHealthChanged, this);
      sceneEvents.off('scoreChanged');
    });
  }

  private handlePlayerHealthChanged(health: number) {
    this.hearts.children.each((go, idx) => {
      const heart = go as Phaser.GameObjects.Image;
      if (idx < health) {
        heart.setTexture('ui-heart-full');
      } else {
        heart.setTexture('ui-heart-empty');
      }
      if (idx === health) {
        return false;
      }
      return true;
    });
  }
}
