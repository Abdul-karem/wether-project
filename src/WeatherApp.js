import React, { useState, useEffect } from 'react';
import axios from 'axios';

function WeatherApp() {
  const [cities, setCities] = useState([
    { name: 'London', image: 'https://planetofhotels.com/guide/sites/default/files/styles/node__blog_post__bp_banner/public/live_banner/London-1.jpg' },
    { name: 'New York', image: 'https://www.investopedia.com/thmb/d79LCb8qXW9V5NAyUUPIma6wVE4=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/getty-new-york-city-58b9db1f3df78c353c44bab3.jpg' },
    { name: 'Tokyo', image: 'https://assets.editorial.aetnd.com/uploads/2013/07/gettyimages-1390815938.jpg' },
    { name: 'Amman', image: 'https://jordantraveler.com/wp-content/uploads/2023/03/Things-to-Do-in-Amman-Hero-1024x683.png' },
  ]);
  const [selectedCity, setSelectedCity] = useState(cities[0]);
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    fetchWeatherData(selectedCity);
  }, [selectedCity]);

  const fetchWeatherData = async (city) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city.name}&appid=3a97590994b9479ddc429cb92185e46c&units=metric`
      );
      setWeatherData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCityChange = (e) => {
    const selectedCityName = e.target.value;
    const selectedCity = cities.find((city) => city.name === selectedCityName);
    setSelectedCity(selectedCity);
  };

  return (
    <div style={{ marginTop: '5rem' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Weather App</h2>
      <div style={{ display: 'flex', justifyContent: 'center' , alignItems: 'center'}}>
        <label htmlFor="city-select" style={{ marginRight: '1rem' }}>
          Select City:
        </label>
        <select
          id="city-select"
          value={selectedCity.name}
          onChange={handleCityChange}
          style={{ padding: '0.5rem', borderRadius: '4px' }}
        >
          {cities.map((city) => (
            <option key={city.name} value={city.name}>
              {city.name}
            </option>
          ))}
        </select>
      </div>
      {weatherData && (
        <div
          style={{
            display: 'flex',
            // flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '2rem auto',
            border: '1px solid #ccc',
            borderRadius: '4px',
            padding: '1rem',
            gap: '10px',
            width: '450px'
          }}
        >
          <img
            src={selectedCity.image}
            alt={weatherData.name}
            style={{ width: '250px',  height: '150px' }}
          />
          <div>
          <h3 style={{ marginBottom: '1rem' }}>{weatherData.name}</h3>
          <p style={{ marginBottom: '0.5rem' }}>Temperature: {weatherData.main.temp}°C</p>
          <p style={{ marginBottom: '0.5rem' }}>Humidity: {weatherData.main.humidity}%</p>
          <p style={{ marginBottom: '0.5rem' }}>Wind Speed: {weatherData.wind.speed} m/s</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default WeatherApp;
