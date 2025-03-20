
import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import '../Weather/Weather.css'
import axios from 'axios';
import cloudBackground from "../../assests/cloudBackground.jpg";

export function Weather()
{
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [cityTime, setCityTime] = useState("");
  const API_KEY = "ed19d1d119c768cdd050fc172a07ccab"; // Replace with your API key

const fetchWeather = async () => {
  try {
    // Fetch current weather
    const weatherRes = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    );

    // Fetch 7-day forecast
    const { lat, lon } = weatherRes.data.coord;
    const forecastRes = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast/daily?lat=${lat}&lon=${lon}&cnt=7&appid=${API_KEY}&units=metric`
    );

    // Fetch time using Timezone API
    const timeRes = await axios.get(
      `http://worldtimeapi.org/api/timezone/${weatherRes.data.timezone}`
    );

    setWeather(weatherRes.data);
    setForecast(forecastRes.data.list);
    setCityTime(new Date(timeRes.data.datetime).toLocaleString());
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

    useEffect(() => {
      fetchWeather();
    }, []);

    const handleInputChange = (e) => {
      setCity(e.target.value);
      e.preventDefault();
      fetchWeather();
    };

    // const handleSubmit = (e) => {
    //   e.preventDefault();
    //   fetchWeather();
    // };

  return(

    // <div>
    //   <h4>Select City</h4>
    //   <select className="listOfCities">
    //      <option value="volvo">List Of Cities</option>
    //     <option value="saab">Delhi</option>
    //     <option value="mercedes">Mumbai</option>
    //     <option value="audi">Pune</option>
    //     <option value="audi">Chennai</option>
    //     <option value="audi">Bangalore</option>
    //   </select>

    //   <div className="section">
    //     <div className="left">
    //       <h3>Current Weather Data</h3>
    //     </div>
    //     <div className="right">
    //       <h3>5 Days Weather Forecast</h3>
    //     </div>
        
    //   </div>
    //   <button className="button-submit" onClick={() => gotToNewPage()}>About Us</button>
    //   <div>

    //   </div>
    // </div>

<div className='weather-container'>
  <h3 className='heading'>WEATHER FORECAST</h3>
    {/* <form onSubmit={handleSubmit}> */}
      <input
        type="text"
        placeholder="Enter a city"
        value={city}
        onChange={handleInputChange}
        // onChange={(e) => setCity(e.target.value)}

      />
    
    {/* </form> */}
    {weather && (
        <div>
          <h2>{weather.name}, {weather.sys.country}</h2>
          <p>Local Time: {cityTime}</p>
          <p>Temperature: {weather.main.temp}°C</p>
          <p>Weather: {weather.weather[0].description}</p>
          <h3>7-Day Forecast</h3>
          <ul>
            {forecast.map((day, index) => (
              <li key={index}>
                {new Date(day.dt * 1000).toLocaleDateString()} - {day.temp.day}°C
              </li>
            ))}
          </ul>
        </div>
      )}
  </div>

  )
}