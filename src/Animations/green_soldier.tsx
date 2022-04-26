import Phaser from 'phaser';

const greenSoldierAnims = (anims: Phaser.Animations.AnimationManager) => {
  // create green soldier animations

  anims.create({
    key: 'green-idle-down',
    frames: [
      {
        key: 'green_soldier',
        frame: 'green_soldier_down_2',
      },
    ],
  });

  anims.create({
    key: 'green-idle-up',
    frames: [
      {
        key: 'green_soldier',
        frame: 'green_soldier_up_3',
      },
    ],
  });

  anims.create({
    key: 'green-idle-left',
    frames: [
      {
        key: 'green_soldier',
        frame: 'green_soldier_side_3',
      },
    ],
  });

  anims.create({
    key: 'green-down',
    frames: anims.generateFrameNames('green_soldier', {
      prefix: 'green_soldier_down_',
      start: 1,
      end: 4,
      zeroPad: 0,
    }),
    frameRate: 10,
    repeat: -1,
  });

  anims.create({
    key: 'green-up',
    frames: anims.generateFrameNames('green_soldier', {
      prefix: 'green_soldier_up_',
      start: 1,
      end: 3,
      zeroPad: 0,
    }),
    frameRate: 10,
    repeat: -1,
  });
  anims.create({
    key: 'green-side',
    frames: anims.generateFrameNames('green_soldier', {
      prefix: 'green_soldier_side_',
      start: 1,
      end: 3,
      zeroPad: 0,
    }),
    frameRate: 10,
    repeat: -1,
  });
};

export default greenSoldierAnims;
