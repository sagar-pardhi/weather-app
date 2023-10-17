import { iconMap } from "@/app";
import { formateDateTime } from "@/utils/utils";
import { List } from "../../types";

interface WeatherForecastProps {
  data: List;
}

export const WeatherForecast = ({ data }: WeatherForecastProps) => {
  return (
    <div className="bg-[#1e213a] p-3 flex flex-col justify-between">
      <div className="flex flex-col items-center">
        <p className="text-center text-white">{formateDateTime(data.dt)}</p>
        {/* @ts-ignore */}
        <img className="py-3 w-32" src={iconMap[data.weather[0].icon]} alt="" />
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
  );
};
