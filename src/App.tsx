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
      <header>
        <Username />
        <Highscore />
      </header>
    </div>
  );
}

export default App;
