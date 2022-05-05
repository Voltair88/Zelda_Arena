import Phaser from 'phaser';

const arrow_anims = (anims: Phaser.Animations.AnimationManager) => {
  // create arrows animations

  anims.create({
    key: 'arrow-down',
    frames: anims.generateFrameNames('arrow', {
      prefix: 'arrow-down-',
      suffix: '.png',
      start: 1,
      end: 1,
      zeroPad: 0,
    }),
    frameRate: 10,
    repeat: 0,
  });

  anims.create({
    key: 'arrow-up',
    frames: anims.generateFrameNames('arrow', {
      prefix: 'arrow-up-',
      suffix: '.png',
      start: 1,
      end: 1,
      zeroPad: 0,
    }),
    frameRate: 10,
    repeat: 0,
  });

  anims.create({
    key: 'arrow-left',
    frames: anims.generateFrameNames('arrow', {
      prefix: 'arrow-left-',
      suffix: '.png',
      start: 1,
      end: 1,
      zeroPad: 0,
    }),
    frameRate: 10,
    repeat: 0,
  });

  anims.create({
    key: 'arrow-right',
    frames: anims.generateFrameNames('arrow', {
      prefix: 'arrow-right-',
      suffix: '.png',
      start: 1,
      end: 1,
      zeroPad: 0,
    }),
    frameRate: 10,
    repeat: 0,
  });

  anims.create({
    key: 'arrow-down-hit',
    frames: anims.generateFrameNames('arrow', {
      prefix: 'arrow-down-',
      suffix: '.png',
      start: 1,
      end: 9,
      zeroPad: 0,
    }),
    frameRate: 10,
    repeat: 0,
  });

  anims.create({
    key: 'arrow-up-hit',
    frames: anims.generateFrameNames('arrow', {
      prefix: 'arrow-up-',
      suffix: '.png',
      start: 1,
      end: 9,
      zeroPad: 0,
    }),
    frameRate: 10,
    repeat: 0,
  });

  anims.create({
    key: 'arrow-left-hit',
    frames: anims.generateFrameNames('arrow', {
      prefix: 'arrow-left-',
      suffix: '.png',
      start: 1,
      end: 9,
      zeroPad: 0,
    }),
    frameRate: 10,
    repeat: 0,
  });

  anims.create({
    key: 'arrow-right-hit',
    frames: anims.generateFrameNames('arrow', {
      prefix: 'arrow-right-',
      suffix: '.png',
      start: 1,
      end: 9,
      zeroPad: 0,
    }),
    frameRate: 10,
    repeat: 0,
  });
};
