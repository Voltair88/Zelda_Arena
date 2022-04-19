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
//
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

/* The code above does the following:
1. We define a custom hook that accepts a callback function as an argument.
2. The hook calls React.useEffect, which returns a cleanup function that is called when the component unmounts.
3. The hook adds an event listener to the window object, which is removed when the component unmounts.
4. The hook returns the movement state.  */
