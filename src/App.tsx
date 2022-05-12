import React from 'react';
import './App.css';
import './components/Phasergame';
import Username from 'components/username';
import AuthProvider from 'Context/useAuthProvider';

function App() {
  return (
    <AuthProvider>
      <div className="App" />
    </AuthProvider>
  );
}

export default App;
