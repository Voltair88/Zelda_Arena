import './App.css';
import Username from './Components/username';
import Highscore from './Components/Highscore';
import AuthStateChanged from './Firebase/AuthStateChanged';
import signIn from './Firebase/signInAnonymously';

signIn();
AuthStateChanged();

function App() {
  return (
    <div className='App'>
      <header className='App-header'>
        <Username />
        <Highscore />
      </header>
      <div id='Highscore' />
      <div className='Game'></div>
    </div>
  );
}

export default App;
