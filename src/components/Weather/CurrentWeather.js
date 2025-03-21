import React from "react";

const CurrentWeather = ({ currentWeather }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString("en-US", { month: "long" }); // "March"
    const year = date.getFullYear();
    const time = date.toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    }); // "5:45 PM"

    return `${month} ${day} ${year}, ${time} `;
  };

  return (
    <div>
      <h2 className="current-weather-text">CURRENT WEATHER</h2>
      <div className="current-weather">
        <img
          src={currentWeather.icon}
          alt="Weather Icon"
          className="weather-icon"
        />
        <div className="weather-data">
          <p className="text"> {formatDate(currentWeather.dataTime)}</p>
          <p className="text">
            {" "}
            {currentWeather.location}, {currentWeather.country}
          </p>
          <p className="text"> {currentWeather.temperature} °C</p>
          <p className="text">{currentWeather.description}</p>
        </div>
      </div>
    </div>
  );
};
export default CurrentWeather;
