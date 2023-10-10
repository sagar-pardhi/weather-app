import { useEffect, useState } from "react";

import { WeatherSidebar } from "./components/weather-sidebar";
import { WeatherSearch } from "./components/weather-search";
import { WeatherDetails } from "./components/weather-details";
import { WeatherForecast } from "./components/weather-forecast";
import { getWeatherData, getForecastData } from "./services/weather-service";
import { ForecastData, Weather } from "../types";

export const iconMap = {
  "01d": "/assets/Clear.png",
  "02d": "/assets/LightCloud.png",
  "03d": "/assets/HeavyCloud.png",
  "04d": "/assets/LightCloud.png",
  "09d": "/assets/Shower.png",
  "10d": "/assets/LightRain.png",
  "11d": "/assets/Thunderstorm.png",
  "13d": "/assets/Snow.png",
  "50d": "/assets/LightCloud.png",
  "01n": "/assets/Clear.png",
  "02n": "/assets/LightCloud.png",
  "03n": "/assets/HeavyCloud.png",
  "04n": "/assets/LightCloud.png",
  "09n": "/assets/Shower.png",
  "10n": "/assets/LightRain.png",
  "11n": "/assets/Thunderstorm.png",
  "13n": "/assets/Snow.png",
  "50n": "/assets/LightCloud.png",
};

export const App = () => {
  const geoLoactionAPI = navigator.geolocation;
  const [lat, setLat] = useState(19.07609);
  const [lon, setLon] = useState(72.877426);
  const [weatherData, setWeatherData] = useState<Weather | null>(null);
  const [weatherForecastData, setWeatherForecastData] =
    useState<ForecastData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  useEffect(() => {
    fetchWeatherData();
  }, [lat, lon]);

  const fetchWeatherData = async () => {
    setIsLoading(true);
    try {
      const weatherResponse = await getWeatherData(lat, lon);
      const forecastResponse = await getForecastData(lat, lon, 5);
      setWeatherData(weatherResponse);
      setWeatherForecastData(forecastResponse);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  const getUserLocation = () => {
    if (!geoLoactionAPI) {
      alert("Geoloaction API is not availabel in your browser");
      return;
    }
    geoLoactionAPI.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLat(latitude);
        setLon(longitude);
      },
      (error) => {
        alert("Something went wrong getting your position!");
        console.log(error);
        return;
      }
    );
  };

  const toggleSearch = () => {
    setShowSearch((prevShowSearch) => !prevShowSearch);
  };

  return (
    <main className="w-full h-screen">
      {isLoading ? (
        <div className="flex justify-center items-center h-full text-white">
          Loading...
        </div>
      ) : (
        <>
          <div className="flex flex-col md:w-full md:flex-row">
            {showSearch && (
              <WeatherSearch
                toggleSearch={toggleSearch}
                setLat={setLat}
                setLon={setLon}
              />
            )}
            <WeatherSidebar
              getUserLocation={getUserLocation}
              weatherData={weatherData}
              toggleSearch={toggleSearch}
            />
            <div className="p-5 bg-[#100e1d] md:w-full h-fit">
              <div className="grid grid-cols-2 gap-x-5 gap-y-5 p-5 md:grid-cols-5">
                {weatherForecastData?.list?.map((data, index) => (
                  <WeatherForecast data={data} key={index} />
                ))}
              </div>
              <WeatherDetails weatherData={weatherData} />
            </div>
          </div>
        </>
      )}
    </main>
  );
};
