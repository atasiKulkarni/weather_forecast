import "./App.css";
import { Routes, Route } from 'react-router-dom';
import { Login } from "./components/Login/Login";
import { Weather } from "./components/Weather/Weather";
import { AboutWeather } from "./components/AboutWeather";
function App() {
  return (
    // <div>
    //   <Login />
    // </div>

    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="weather" element={<Weather />} />
        <Route path="about" element={<AboutWeather />} />
      </Routes>
    </div>

  );
}

export default App;
