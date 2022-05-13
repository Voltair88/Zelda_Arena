import React from 'react';
import './App.css';
import './components/Phasergame';
import Username from 'components/username';
import AuthProvider from 'Context/useAuthProvider';

function App() {
  return (
    <AuthProvider>
      <Username />
      <div id="phaser-game" />
    </AuthProvider>
  );
}

export default App;
