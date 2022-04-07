import React from 'react';

function actionByKey(key: any) {
  switch (key) {
    case 'ArrowUp':
      return 'moveForward';
    case 'ArrowDown':
      return 'moveBackward';
    case 'ArrowLeft':
      return 'moveLeft';
    case 'ArrowRight':
      return 'moveRight';
    default:
      return null;
  }
}

export const useKeyboardControls = () => {
  const [movement, setMovement] = React.useState({
    moveForward: false,
    moveBackward: false,
    moveLeft: false,
    moveRight: false,
  });

  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const action = actionByKey(event.key);
      if (action) {
        setMovement({
          ...movement,
          [action]: true,
        });
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      const action = actionByKey(event.key);
      if (action) {
        setMovement({
          ...movement,
          [action]: false,
        });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [movement]);

  return movement;
};
