import Phaser from 'phaser';

export const linkDyingAnims = (anims: Phaser.Animations.AnimationManager) => {
  // create link dying animations

  anims.create({
    key: 'link-dying',
    frames: anims.generateFrameNames('link_dying', {
      prefix: 'link-dying-',
      start: 1,
      end: 10,
      zeroPad: 0,
    }),
    frameRate: 10,
    repeat: 0,
  });
};
