export const getForecastData = async (
  lat: number,
  lon: number,
  cnt: number
) => {
  const response = await fetch(
    `http://api.openweathermap.org/data/2.5/forecast/daily?lat=${lat}&lon=${lon}&cnt=${cnt}&appid=${
      import.meta.env.VITE_APP_ID
    }&units=metric`
  );
  const data = await response.json();
  return data;
};
