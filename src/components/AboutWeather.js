import './Weather/Weather.css'
export function AboutWeather()
{
  return(
    <div>
      <h4>Select City</h4>
      <select className="listOfCities">
         <option value="volvo">List Of Cities</option>
        <option value="saab">Delhi</option>
        <option value="mercedes">Mumbai</option>
        <option value="audi">Pune</option>
        <option value="audi">Chennai</option>
        <option value="audi">Bangalore</option>
      </select>

      <div className="section">
        <div className="left">
          <h3>Current Weather Data</h3>
        </div>
        <div className="right">
          <h3>5 Days Weather Forecast</h3>
        </div>
        <div className="right">
          <h3>About Weather</h3>
        </div>
      </div>
      <div>
        
      </div>
    </div>
  )
}