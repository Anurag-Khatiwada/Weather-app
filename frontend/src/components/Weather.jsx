import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const Weather = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const { token } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/api/weather/${city}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (response.ok) {
        setWeatherData(data);
      } else {
        alert(data.message);
      }
    } catch (error) {
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div>
      <h2>Weather Search</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      {weatherData && (
        <div>
          <h3>{weatherData.location.name}, {weatherData.location.country}</h3>
          <p>Temperature: {weatherData.current.temperature}°C</p>
          <p>Weather: {weatherData.current.weather_descriptions[0]}</p>
        </div>
      )}
    </div>
  );
};

export default Weather;

