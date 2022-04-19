import './App.css';
import Username from './Components/username';
import Highscore from './Components/Highscore';

function App() {
  return (
    <div className='App'>
      <Username />
      <Highscore />
      <div id='Highscore' />
      <div className='Game'></div>
    </div>
  );
}

export default App;
