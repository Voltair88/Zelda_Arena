import Phaser from 'phaser';

export const link_bow_anims = (anims: Phaser.Animations.AnimationManager) => {
  // create links bow animations

  anims.create({
    key: 'bow-down',
    frames: anims.generateFrameNames('link_bow', {
      prefix: 'bow-down-',
      suffix: '.png',
      start: 2,
      end: 3,
      zeroPad: 0,
    }),
    frameRate: 10,
    repeat: 0,
  });

  anims.create({
    key: 'bow-up',
    frames: anims.generateFrameNames('link_bow', {
      prefix: 'bow-up-',
      suffix: '.png',
      start: 1,
      end: 3,
      zeroPad: 0,
    }),
    frameRate: 10,
    repeat: 0,
  });

  anims.create({
    key: 'bow-left',
    frames: anims.generateFrameNames('link_bow', {
      prefix: 'bow-left-',
      suffix: '.png',
      start: 1,
      end: 3,
      zeroPad: 0,
    }),
    frameRate: 10,
    repeat: 0,
  });

  anims.create({
    key: 'bow-right',
    frames: anims.generateFrameNames('link_bow', {
      prefix: 'bow-right-',
      suffix: '.png',
      start: 1,
      end: 3,
      zeroPad: 0,
    }),
    frameRate: 10,
    repeat: 0,
  });
};
