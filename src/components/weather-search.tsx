interface WeatherSearchProps {
  toggleSearch: () => void;
}

export const WeatherSearch = ({ toggleSearch }: WeatherSearchProps) => {
  return (
    <div className="w-full md:w-[29%] transition-all duration-75 bg-[#1e213a] h-full absolute top-0 left-0">
      <div className="flex flex-col px-10 py-10 border">
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
          />
          <button className="p-2 text-white px-4 text-center bg-[#3c47e9]">
            Search
          </button>
        </div>
      </div>
    </div>
  );
};
