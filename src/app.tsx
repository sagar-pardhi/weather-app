import { useEffect, useState } from "react";
import { LocateFixed, MapPin } from "lucide-react";

import { dateTimeFormat, formateDateTime } from "./utils/utils";
import { getWeatherData } from "./features/weather/api/get-weather-data";
import { getForecastData } from "./features/weather/api/get-forecast-data";
import { Weather } from "../types";

const iconMap = {
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

  return (
    <main className="w-full h-screen">
      {isLoading ? (
        <div className="flex justify-center items-center h-full text-white">
          Loading...
        </div>
      ) : (
        <>
          <div className="flex flex-col md:w-full md:flex-row">
            <div className="px-2 py-2 bg-[#1e213a] md:w-[40%]  flex flex-col md:justify-between">
              <div className="flex justify-between text-white">
                <button className="p-1 px-4 bg-gray-500">
                  Search for places
                </button>
                <button
                  className="flex justify-center items-center w-10 h-10 bg-gray-500 rounded-full"
                  onClick={getUserLocation}
                >
                  <LocateFixed />
                </button>
              </div>
              <div className="flex flex-col gap-y-5 items-center py-14">
                <img
                  className="w-36"
                  src={iconMap[weatherData?.weather[0].icon]}
                  alt=""
                />
                <h1 className="text-8xl font-light text-[#e7e7eb]">
                  {Math.floor(weatherData?.main.temp!)}
                  <span className="text-4xl">°</span>
                  <span className="text-5xl font-thin text-[#a09fb1]">c</span>
                </h1>
                <h2 className="text-3xl font-semibold text-[#a09fb1]">
                  {weatherData?.weather[0]?.main}
                </h2>
                <p className="text-[#88869d] text-lg font-normal">
                  {dateTimeFormat.format(new Date())}
                </p>
                <div className="flex gap-x-2 items-center">
                  <MapPin className="w-4 h-4 text-[#a09fb1]" />
                  <p className="font-semibold text-[#a09fb1]">
                    {weatherData?.name}
                  </p>
                </div>
              </div>
            </div>
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
