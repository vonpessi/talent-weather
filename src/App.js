import './App.css';
import WeatherHandler from './WeatherPage/WeatherController';

function App() {
  return (
    <div className="App">
      <div className='cloud one'></div>
      <div className='cloud two'></div>
      <div className='cloud three'></div>
      <WeatherHandler />
    </div>
  );
}

export default App;
