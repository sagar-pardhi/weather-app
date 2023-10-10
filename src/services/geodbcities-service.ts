const BASE_URL = "https://wft-geo-db.p.rapidapi.com/v1/geo/cities";

const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": import.meta.env.VITE_RAPID_API_KEY,
    "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
  },
};

export const getCities = async (query: string) => {
  try {
    const response = await fetch(`${BASE_URL}?namePrefix=${query}`, options);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};
