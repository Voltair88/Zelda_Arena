import Phaser from 'phaser';

const playerAnims = (anims: Phaser.Animations.AnimationManager) => {
  // create player animations

  anims.create({
    key: 'idle-down',
    frames: [
      {
        key: 'character',
        frame: 'sprites/walk-down/walk-down-3.png',
      },
    ],
  });

  anims.create({
    key: 'idle-walk-up',
    frames: [
      {
        key: 'character',
        frame: 'sprites/walk-up/walk-up-3.png',
      },
    ],
  });

  anims.create({
    key: 'idle-side',
    frames: [
      {
        key: 'character',
        frame: 'sprites/walk-side/walk-side-3.png',
      },
    ],
  });

  anims.create({
    key: 'walk-down',
    frames: anims.generateFrameNames('character', {
      prefix: 'sprites/walk-down/walk-down-',
      suffix: '.png',
      start: 1,
      end: 8,
      zeroPad: 0,
    }),
    frameRate: 10,
    repeat: -1,
  });

  anims.create({
    key: 'walk-up',
    frames: anims.generateFrameNames('character', {
      prefix: 'sprites/walk-up/walk-up-',
      suffix: '.png',
      start: 1,
      end: 8,
      zeroPad: 0,
    }),
    frameRate: 10,
    repeat: -1,
  });

  anims.create({
    key: 'walk-side',
    frames: anims.generateFrameNames('character', {
      prefix: 'sprites/walk-side/walk-side-',
      suffix: '.png',
      start: 1,
      end: 8,
      zeroPad: 0,
    }),
    frameRate: 10,
    repeat: -1,
  });

  anims.create({
    key: 'run-down',
    frames: anims.generateFrameNames('character', {
      prefix: 'sprites/run-down/run-down-',
      suffix: '.png',
      start: 1,
      end: 8,
      zeroPad: 0,
    }),
    frameRate: 10,
    repeat: -1,
  });

  anims.create({
    key: 'run-up',
    frames: anims.generateFrameNames('character', {
      prefix: 'sprites/run-up/run-up-',
      suffix: '.png',
      start: 1,
      end: 8,
      zeroPad: 0,
    }),
    frameRate: 10,
    repeat: -1,
  });

  anims.create({
    key: 'run-side',
    frames: anims.generateFrameNames('character', {
      prefix: 'sprites/run-side/run-side-',
      suffix: '.png',
      start: 1,
      end: 8,
      zeroPad: 0,
    }),
    frameRate: 10,
    repeat: -1,
  });
};

export default playerAnims;
