import React, { useState,useEffect } from "react";
import "../Weather/Weather.css";
import axios from "axios";

export function Weather() {
  const [city, setCity] = useState("");
  const [searchInput, setSearchInput] = useState(""); // Temporary input state
  const [weatherData, setWeatherData] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [cityTime, setCityTime] = useState("");
  console.log("get_city-->",city)
console.log("weatherData",weatherData)
  const API_KEY = "ed19d1d119c768cdd050fc172a07ccab"; // Replace with your API key

  // Function to fetch city name from latitude & longitude
  const fetchCityFromCoords = async (lat, lon) => {
    try {
      const res = await axios.get(
        `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${API_KEY}`
      );
      if (res.data.length > 0) {
        setCity(res.data[0].name); // Update city name
        setSearchInput(res.data[0].name); // Set input field to detected city
      }
    } catch (error) {
      console.error("Error fetching city:", error);
      setCity("Bangalore");
      setSearchInput("Bangalore");

    }
  };

   // Function to get user's location
   const getUserLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchCityFromCoords(latitude, longitude);
        },
        (error) => {
          console.error("Error getting location:", error);
          setCity("Bangalore");
          setCity("Bangalore");
          setSearchInput("Bangalore");
        }
      );
    } else {
      setCity("Geolocation not supported");
      setSearchInput("Geolocation not supported");
    }
  };

  const fetchData = async () => {
    if (!city) return;
    try {
      const weatherRes = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
      );

      const forecastRes = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
      );

      // Get Local Time
      const cityTime = new Date(
        Date.now() + weatherRes.data.timezone * 1000
      ).toLocaleString();

      // Extract one forecast per day (around 12:00 PM)
      const dailyForecast = [];
      const usedDates = new Set();

      forecastRes.data.list.forEach((entry) => {
        const date = new Date(entry.dt * 1000).toLocaleDateString();

        // Add only one entry per unique date (e.g., the first one we find)
        if (!usedDates.has(date)) {
          usedDates.add(date);
          dailyForecast.push(entry);
        }
      });

      setWeatherData(weatherRes.data);
      setForecast(dailyForecast);
      setCityTime(cityTime);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

 
  const handleInputChange = (e) => {
    setSearchInput(e.target.value); // Update only input, not city
    e.preventDefault();
    setCity(searchInput); // Set city only when user submits
  };


  useEffect(() => {
    getUserLocation(); // Get location on mount
  }, []);

useEffect(() => {
  fetchData();
}, [city]); // Fetch weather only when `city` updates (not searchInput)

  return (
   
    <div className="weather-container">
      <h3 className="heading">WEATHER FORECAST</h3>
      <input
        type="text"
        class="searchBox"
        placeholder="Enter a city"
        value={searchInput}
        onChange={handleInputChange}
      />
             
      {weatherData && (
        <div>
          <h2>
            {weatherData.name}, {weatherData.sys.country}
          </h2>
          <p>Local Time: {cityTime}</p>
          <p>Temperature: {weatherData.main.temp}°C</p>
          <p>Weather: {weatherData.weather[0].description}</p>
          <h3>7-Day Forecast</h3>

          {forecast.length > 0 ? (
            <div style={{ display: "flex" }}>
              {forecast.map((day, index) => {
                const dateObj = new Date(day.dt * 1000);
                const dayName = dateObj.toLocaleDateString("en-US", {
                  weekday: "long",
                }); // Get day name
                const formattedDate = dateObj.toLocaleDateString("en-US", {
                  day: "numeric",
                  month: "short",
                }); // Get date
                return (
                  <p key={index} className="showWeatherDayWise">
                    {/* {new Date(day.dt * 1000).toLocaleDateString()} - {day.temp?.day}°C */}
                    {dayName}, {formattedDate} - {day.main.temp}°C
                  </p>
                );
              })}
            </div>
          ) : (
            <p>No forecast data available</p>
          )}
        </div>
      )}
    </div>
  );
}
