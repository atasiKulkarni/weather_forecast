import "./App.css";
import SearchSection from "./components/Weather/SearchSection";
import CurrentWeather from "./components/Weather/CurrentWeather";
import { weatherCodes } from "./components/Weather/constants";
import { useEffect, useRef, useState } from "react";
import NoResultsDiv from "./components/Weather/NoResultsDiv";

function App() {
  const [currentWeather, setCurrentWeather] = useState({});
  const [hourlyForecasts, setHourlyForecasts] = useState([]);
  const [hasNoResults, setHasNoResults] = useState(false);
  const searchInputRef = useRef(null);
  const API_KEY = process.env.REACT_APP_API_KEY;

  // Fetches weather details based on the API URL
  const getWeatherDetails = async (API_URL) => {
    setHasNoResults(false);
    window.innerWidth <= 768 && searchInputRef.current.blur();
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error();
      const data = await response.json();
      // Extract current weather data
      const icon = data.current.condition.icon;
      const country = data.location.country;
      const location = data.location.name;
      const dataTime = data.location.localtime;
      const temperature = Math.floor(data.current.temp_c);
      const description = data.current.condition.text;
      const weatherIcon = Object.keys(weatherCodes).find((icon) =>
        weatherCodes[icon].includes(data.current.condition.code)
      );
      setCurrentWeather({
        temperature,
        description,
        weatherIcon,
        location,
        country,
        dataTime,
        icon,
      });
     

        // ✅ Extract 7-day forecast data
        const dailyData = data.forecast.forecastday.map((day) => ({
          date: day.date,
          avgTempC: day.day.avgtemp_c,
          condition: day.day.condition.text,
          icon: day.day.condition.icon, // Weather icon URL
        }));

    
      searchInputRef.current.value = data.location.name;
      setHourlyForecasts(dailyData); // Update state with daily forecast instead of hourly
    } catch {
      // Set setHasNoResults state if there's an error
      setHasNoResults(true);
    }
  };

  const getDayName = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { weekday: "long" }); // Output: "Monday"
  };

  // Fetch default city (London) weather data on initial render
  useEffect(() => {
    const defaultCity = "London";
    const API_URL = `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${defaultCity}&days=7`;
    getWeatherDetails(API_URL);
  }, []);

  return (
    <div className="container">
      {/* Search section */}
      <SearchSection
        getWeatherDetails={getWeatherDetails}
        searchInputRef={searchInputRef}
      />
      {/* Conditionally render based on hasNoResults state */}
      {hasNoResults ? (
        <NoResultsDiv />
      ) : (
        <div className="weather-section">
          {/* Current weather */}
          <CurrentWeather currentWeather={currentWeather} />
          {/* Hourly weather forecast list */}
          <div className="hourly-forecast">
          <h2>7-Day Forecast</h2>
            <ul className="weather-list">
              {hourlyForecasts.map((dailyWeather, index) => (
                <li key={index} className="weather-item">
                   <p>{getDayName(dailyWeather.date)}</p>
                  <img src={`https:${dailyWeather.icon}`} alt="Weather Icon" />
                  <p>{dailyWeather.avgTempC}°C</p>
                  <p>{dailyWeather.condition}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
