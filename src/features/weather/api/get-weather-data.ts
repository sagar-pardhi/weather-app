export const getWeatherData = async (lat: number, lon: number) => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${
      import.meta.env.VITE_APP_ID
    }&units=metric`
  );
  const data = await response.json();
  return data;
};
