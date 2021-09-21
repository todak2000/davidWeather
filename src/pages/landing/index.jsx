import React, { useState, useEffect, useContext, useCallback } from "react";
import "./style.css";
import HistoryResult from "../partials/HistoricalReport";
import WeatherService from "../../services/weather";
import { usePlacesWidget } from "react-google-autocomplete";
import WeatherInfo from "../partials/WeatherInfo";
import { Loader } from "../../components";
import { LocationContext } from "../../context/LocationContext";

const LandingPage = () => {
  const [weather, setWeather] = useState({});
  const [loading, setLoading] = useState(false);
  const { location, setLocation } = useContext(LocationContext);

  const { ref } = usePlacesWidget({
    apiKey: "AIzaSyD8u45kgrvvySV5rSWvWr1Tff0PdGm8ELU",
    onPlaceSelected: (place) => setLocation(place.formatted_address),
  });

  const getWeather = useCallback(async () => {
    setLoading(true);
    const weatherReport = await WeatherService.getCurrentLocation(location);
    setWeather(weatherReport);
    setLoading(false);
  },[location]);

  useEffect(() => {
    getWeather();
  }, [location, getWeather]);

  return (
    <div className="md:container md:mx-auto bg-gray-100 md:bg-white h-auto">
      <div className="flex flex-col items-start justify-start h-full w-full gap-0 md:flex-row md:justify-between">
        <div className="md:w-1/3 w-full">
          <div className="h-2/4 w-full p-4">
            <div className="bg-white rounded-md shadow w-full">
              <input
                type="search"
                className="p-3 w-full"
                placeholder="Search Location ...."
                ref={ref}
                defaultValue={location}
              />
            </div>
          </div>
          {loading ? <Loader /> : <WeatherInfo data={weather} />}
        </div>
        <div className="w-full p-4 h-2/5 hidden md:block md:w-2/3	">
          <HistoryResult />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
