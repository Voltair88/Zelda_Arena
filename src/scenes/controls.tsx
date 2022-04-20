import Phaser from 'phaser';

const controls = (scene: Phaser.Scene) => {
  const cursors = scene.input.keyboard.createCursorKeys();
  const jumpButton = scene.input.keyboard.addKey(
    Phaser.Input.Keyboard.KeyCodes.SPACE
  );
  const attackButton = scene.input.keyboard.addKey(
    Phaser.Input.Keyboard.KeyCodes.X
  );
  const leftButton = scene.input.keyboard.addKey(
    Phaser.Input.Keyboard.KeyCodes.LEFT
  );
  const rightButton = scene.input.keyboard.addKey(
    Phaser.Input.Keyboard.KeyCodes.RIGHT
  );
  const upButton = scene.input.keyboard.addKey(
    Phaser.Input.Keyboard.KeyCodes.UP
  );
  const downButton = scene.input.keyboard.addKey(
    Phaser.Input.Keyboard.KeyCodes.DOWN
  );

  return {
    cursors,
    jumpButton,
    attackButton,
    leftButton,
    rightButton,
    upButton,
    downButton,
  };
};

export default controls;
/* 

  update(cursors: CursorKeys) {
    const speed = 100;
    const left = cursors.left?.isDown;
    const right = cursors.right?.isDown;
    const up = cursors.up?.isDown;
    const down = cursors.down?.isDown;

    if (left) {
      this.anims.play('walk-side', true);
      this.setVelocityX(-speed);
      this.setFlipX(true);
    } else if (right) {
      this.anims.play('walk-side', true);
      this.setVelocityX(speed);
      this.setFlipX(false);
    } else if (up) {
      this.anims.play('walk-up', true);
      this.setVelocityY(-speed);
    } else if (down) {
      this.anims.play('walk-down', true);
      this.setVelocityY(speed);
    } else {
      if (this.anims.currentAnim.key === 'walk-side') {
        this.anims.play('idle-side', true);
      } else if (this.anims.currentAnim.key === 'walk-up') {
        this.anims.play('idle-up', true);
      } else if (this.anims.currentAnim.key === 'walk-down') {
        this.anims.play('idle-down', true);
      }
      this.setVelocityX(0);
    }
  }
} */
