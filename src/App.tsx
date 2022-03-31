import React from 'react';
import './App.css';
import Username from './Components/username';
import { auth } from './Firebase/firebase';

function App() {
  return (
    <div className='App'>
      <Username />
    </div>
  );
}

export default App;
