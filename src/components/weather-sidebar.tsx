import { LocateFixed, MapPin } from "lucide-react";

import { iconMap } from "@/app";
import { dateTimeFormat } from "@/utils/utils";
import { Weather } from "../../types";

interface WeatherSidebarProps {
  weatherData: Weather | null;
  getUserLocation: () => void;
  toggleSearch: () => void;
}

export const WeatherSidebar = ({
  getUserLocation,
  weatherData,
  toggleSearch,
}: WeatherSidebarProps) => {
  return (
    <div className="bg-[#1e213a] md:w-[40%] flex flex-col items-center">
      <div className="flex justify-between px-2 py-2 w-full text-white">
        <button className="p-1 px-4 bg-gray-500" onClick={toggleSearch}>
          Search for places
        </button>
        <button
          className="flex justify-center items-center w-10 h-10 bg-gray-500 rounded-full"
          onClick={getUserLocation}
        >
          <LocateFixed />
        </button>
      </div>
      <div className="flex flex-col gap-y-5 items-center pb-24">
        <img
          className="py-16 w-36"
          src={iconMap[weatherData?.weather[0].icon]}
          alt=""
        />
        <div className="flex flex-col gap-y-5 items-center">
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
            <p className="font-semibold text-[#a09fb1]">{weatherData?.name}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
