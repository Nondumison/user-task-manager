import React, { useState, useEffect } from "react";
import axios from "axios";

interface WeatherData {
  name: string;
  main: {
    temp: number;
    humidity: number;
  };
  weather: {
    description: string;
    icon: string;
  }[];
}

const WeatherWidget: React.FC = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [city, setCity] = useState("Johannesburg");

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.REACT_APP_WEATHER_API_KEY}`
        );
        setWeather(response.data);
      } catch (error) {
        console.error("Error fetching weather:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [city]);

  if (loading) return <div className="text-center">Loading weather...</div>;

  return (
    <div className="weather-widget p-3 bg-primary text-white rounded">
      <h5>Weather in {city}</h5>
      <div className="d-flex align-items-center">
        {weather?.weather[0].icon && (
          <img
            src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt={weather.weather[0].description}
            style={{ width: "60px" }}
          />
        )}
        <div>
          <h2 className="mb-0">{weather?.main.temp}°C</h2>
          <small>{weather?.weather[0].description}</small>
        </div>
      </div>
      <div className="mt-2">
        <small>Humidity: {weather?.main.humidity}%</small>
      </div>
      <div className="mt-2">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Change city"
          className="form-control form-control-sm"
        />
      </div>
    </div>
  );
};

export default WeatherWidget;
