import { useEffect, useState } from "react";

import { WeatherSidebar } from "./components/weather-sidebar";
import { getWeatherData, getForecastData } from "./services/weather-service";
import { formateDateTime } from "@/utils/utils";
import { Weather } from "../types";
import { WeatherSearch } from "./components/weather-search";

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
  const [weatherForecastData, setWeatherForecastData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  useEffect(() => {
    fetchWeatherData();
  }, []);

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
            {showSearch && <WeatherSearch toggleSearch={toggleSearch} />}
            <WeatherSidebar
              getUserLocation={getUserLocation}
              weatherData={weatherData}
              toggleSearch={toggleSearch}
            />
            <div className="p-5 bg-[#100e1d] md:w-full h-fit">
              <div className="grid grid-cols-2 gap-x-5 gap-y-5 p-5 md:grid-cols-5">
                {weatherForecastData?.list?.map((data, index) => (
                  <div
                    key={index}
                    className="bg-[#1e213a] p-3 flex flex-col justify-between"
                  >
                    <div className="flex flex-col items-center">
                      <p className="text-center text-white">
                        {formateDateTime(data.dt)}
                      </p>
                      <img
                        className="py-3 w-32"
                        src={iconMap[data.weather[0].icon]}
                        alt=""
                      />
                    </div>
                    <div className="flex justify-between items-center">
                      <p className="text-white">
                        {Math.floor(data.temp.max)}
                        <span>°C</span>
                      </p>
                      <p className="text-[#a09fb1] text-sm">
                        {Math.floor(data.temp.min)}
                        <span>°C</span>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="py-5">
                <div>
                  <h2 className="text-xl font-semibold text-white">
                    Today's Highlights
                  </h2>
                </div>
                <div className="grid grid-cols-1 gap-x-5 p-5 md:grid-cols-2">
                  <div className="pt-5">
                    <div className="bg-[#1e213a] w-full p-5">
                      <div className="flex flex-col gap-y-5 items-center text-white">
                        <p className="text-sm">Wind Status</p>
                        <h2 className="text-5xl font-bold">
                          {weatherData?.wind.speed}{" "}
                          <span className="text-[30px] font-normal">kmph</span>
                        </h2>
                      </div>
                    </div>
                  </div>
                  <div className="pt-5">
                    <div className="bg-[#1e213a] w-full p-5">
                      <div className="flex flex-col gap-y-5 items-center text-white">
                        <p className="text-sm">Humidity</p>
                        <h2 className="text-5xl font-bold">
                          {weatherData?.main.humidity}
                          <span className="text-[30px] font-thin">%</span>
                        </h2>
                        {/* <div className="w-full bg-gray-200 rounded-lg">
                          <div
                            className="bg-yellow-300 p-0.5 text-center rounded-lg text-xs font-medium leading-none text-primary-100"
                            style={{ width: `${weatherData?.main.humidity}%` }}
                          >
                            {weatherData?.main.humidity}%
                          </div>
                        </div> */}
                      </div>
                    </div>
                  </div>
                  <div className="pt-5">
                    <div className="bg-[#1e213a] w-full p-5">
                      <div className="flex flex-col gap-y-5 items-center text-white">
                        <p className="text-sm">Visibility</p>
                        <h2 className="text-5xl font-bold">
                          {weatherData?.visibility / 1000} km
                        </h2>
                      </div>
                    </div>
                  </div>
                  <div className="pt-5">
                    <div className="bg-[#1e213a] w-full p-5">
                      <div className="flex flex-col gap-y-5 items-center text-white">
                        <p className="text-sm">Air Pressure</p>
                        <h2 className="text-5xl font-bold">
                          {weatherData?.main.pressure} mb
                        </h2>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </main>
  );
};
