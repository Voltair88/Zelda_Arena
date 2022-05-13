import phaser from 'phaser';

export const enemyKilledAnims = (anims: phaser.Animations.AnimationManager) => {
  // create enemy killed animation

  anims.create({
    key: 'enemyKilled',
    frames: anims.generateFrameNames('enemyKilled', {
      prefix: 'enemyKilled',
      start: 1,
      end: 3,
      zeroPad: 0,
    }),
    frameRate: 10,
    repeat: 0,
  });
};
