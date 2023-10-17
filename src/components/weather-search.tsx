import { getCities } from "@/services/geodbcities-service";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

interface WeatherSearchProps {
  toggleSearch: () => void;
  setLat: Dispatch<SetStateAction<number>>;
  setLon: Dispatch<SetStateAction<number>>;
}

export const WeatherSearch = ({
  toggleSearch,
  setLat,
  setLon,
}: WeatherSearchProps) => {
  const [query, setQuery] = useState("");
  const [citiesData, setCitiesData] = useState([]);

  useEffect(() => {
    const fetchCities = setTimeout(async () => {
      const data = await getCities(query);
      setCitiesData(data.data);
    }, 2000);

    return () => clearTimeout(fetchCities);
  }, [query]);

  const handleUpdateLocation = (lat: number, lon: number) => {
    setLat(lat);
    setLon(lon);
  };

  return (
    <div className="w-full md:w-[28%] px-10 py-10 transition-all duration-75 bg-[#1e213a] h-full absolute top-0 left-0">
      <div className="flex flex-col pb-10">
        <button
          className="flex pb-10 ml-auto text-3xl text-white"
          onClick={toggleSearch}
        >
          x
        </button>
        <div className="flex gap-x-2 justify-between">
          <input
            type="text"
            className="p-2 w-full text-white bg-transparent border outline-none"
            placeholder="search location"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button className="p-2 text-white px-4 text-center bg-[#3c47e9]">
            Search
          </button>
        </div>
      </div>
      <div>
        {citiesData.map((city) => (
          <button
            // @ts-ignore
            key={city.id}
            className="flex justify-between px-2 py-5 w-full text-xl text-white group hover:border"
            // @ts-ignore
            onClick={() => handleUpdateLocation(city.latitude, city.longitude)}
          >
            {/* @ts-ignore */}
            {city.name}
            <span className="hidden group-hover:block">{">"}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
