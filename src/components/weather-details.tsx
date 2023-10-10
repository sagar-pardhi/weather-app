import { Weather } from "../../types";

interface WeatherDetailsProps {
  weatherData: Weather | null;
}

export const WeatherDetails = ({ weatherData }: WeatherDetailsProps) => {
  return (
    <div className="py-5">
      <div>
        <h2 className="text-xl font-semibold text-white">Today's Highlights</h2>
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
  );
};
