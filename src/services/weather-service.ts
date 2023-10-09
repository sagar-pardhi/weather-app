const BASE_URL = "https://api.openweathermap.org/data/2.5";
const APP_ID = import.meta.env.VITE_APP_ID;

export const getWeatherData = async (lat: number, lon: number) => {
  const response = await fetch(
    `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${APP_ID}&units=metric`
  );
  const data = await response.json();
  return data;
};

export const getForecastData = async (
  lat: number,
  lon: number,
  cnt: number
) => {
  const response = await fetch(
    `${BASE_URL}/forecast/daily?lat=${lat}&lon=${lon}&cnt=${cnt}&appid=${APP_ID}&units=metric`
  );
  const data = await response.json();
  return data;
};
