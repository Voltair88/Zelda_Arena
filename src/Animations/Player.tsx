import Phaser from 'phaser';

const playerAnims = (anims: Phaser.Animations.AnimationManager) => {
  // create player animations

  anims.create({
    key: 'idle-down',
    frames: [
      {
        key: 'character',
        frame: 'idle-down.png',
      },
    ],
  });

  anims.create({
    key: 'idle-up',
    frames: [
      {
        key: 'character',
        frame: 'idle-up.png',
      },
    ],
  });

  anims.create({
    key: 'idle-left',
    frames: [
      {
        key: 'character',
        frame: 'idle-left.png',
      },
    ],
  });
  anims.create({
    key: 'idle-right',
    frames: [
      {
        key: 'character',
        frame: 'idle-right.png',
      },
    ],
  });

  anims.create({
    key: 'walk-down',
    frames: anims.generateFrameNames('character', {
      prefix: 'walking-down-',
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
      prefix: 'walking-up-',
      suffix: '.png',
      start: 1,
      end: 8,
      zeroPad: 0,
    }),
    frameRate: 10,
    repeat: -1,
  });

  anims.create({
    key: 'walk-right',
    frames: anims.generateFrameNames('character', {
      prefix: 'walking-right-',
      suffix: '.png',
      start: 1,
      end: 8,
      zeroPad: 0,
    }),
    frameRate: 10,
    repeat: -1,
  });
  anims.create({
    key: 'walk-left',
    frames: anims.generateFrameNames('character', {
      prefix: 'walking-left-',
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
