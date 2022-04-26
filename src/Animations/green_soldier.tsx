import Phaser from 'phaser';

const greenSoldierAnims = (anims: Phaser.Animations.AnimationManager) => {
  // create green soldier animations

  anims.create({
    key: 'idle-down',
    frames: [
      {
        key: 'green_soldier',
        frame: 'green_soldier_down_2.png',
      },
    ],
  });

  anims.create({
    key: 'idle-up',
    frames: [
      {
        key: 'green_soldier',
        frame: 'green_soldier_up_3.png',
      },
    ],
  });

  anims.create({
    key: 'idle-left',
    frames: [
      {
        key: 'green_soldier',
        frame: 'green_soldier_side_3.png',
      },
    ],
  });

  anims.create({
    key: 'walk-down',
    frames: anims.generateFrameNames('green_soldier', {
      prefix: 'green_soldier_down_',
      suffix: '.png',
      start: 1,
      end: 4,
      zeroPad: 0,
    }),
    frameRate: 10,
    repeat: -1,
  });

  anims.create({
    key: 'walk-up',
    frames: anims.generateFrameNames('green_soldier', {
      prefix: 'green_soldier_up_',
      suffix: '.png',
      start: 1,
      end: 3,
      zeroPad: 0,
    }),
    frameRate: 10,
    repeat: -1,
  });
  anims.create({
    key: 'walk-side',
    frames: anims.generateFrameNames('green_soldier', {
      prefix: 'green_soldier_side_',
      suffix: '.png',
      start: 1,
      end: 3,
      zeroPad: 0,
    }),
    frameRate: 10,
    repeat: -1,
  });
};
