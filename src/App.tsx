import React from 'react';
import Phaser from 'phaser';
import './App.css';
import './components/Phasergame';
import { Sidebar } from 'components';
import AuthProvider from 'Context/useAuthProvider';

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Sidebar />
        <div id="phaser-game" />
      </AuthProvider>
    </div>
  );
}

export default App;
