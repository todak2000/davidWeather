import { useState, useEffect, useContext, useCallback } from "react";
import { Tab } from "@headlessui/react";
import moment from "moment";
import { ArrowLeft } from "react-feather";
import { useHistory } from "react-router-dom";
import WeatherService from "../../services/weather";
import { TempText, Loader } from "../../components";
import { LocationContext } from "../../context/LocationContext";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const HistoricalReport = () => {
  const { push } = useHistory();
  const [weather, setWeather] = useState([]);
  const [loading, setLoading] = useState(false);
  const { location } = useContext(LocationContext);
  const now = new Date();
  const date_time = moment(now).format("YYYY-MM-DD");
  const [date, setDate] = useState(date_time);

  const getWeather = useCallback(async () => {
    setLoading(true);
    const weatherReport = await WeatherService.getHistoricalWeather(
      location,
      date
    );
    setWeather(weatherReport?.data?.weather[0]?.hourly);
    setLoading(false);
  }, [date, location]);

  const handleDate = (e) => {
    const formatDate = moment(e.target.value).format("YYYY-MM-DD");
    setDate(formatDate);
  };

  useEffect(() => {
    getWeather();
  }, [date, location, getWeather]);

  return (
    <div className="w-full  md:container h-full">
      <div className="bg-blue-600 text-black fixed h-16 w-full md:hidden flex flex-row justify-between items-center border px-4">
        <ArrowLeft onClick={() => push("/")} className="text-white" />
        <p className="text-xl text-white">Historical Weather </p> <div />
      </div>
      <div className="bg-white rounded-md shadow w-full pt-20 px-5 mb-5 md:mb-0 md:pt-0 md:w-1/3 md:mx-60 md:mb-5">
        <input
          type="date"
          className="p-3 w-full"
          value={date}
          onChange={handleDate}
        />
      </div>
      {loading ? (
        <Loader />
      ) : (
        <Tab.Group>
          <Tab.List className="flex p-1 space-x-1 overscroll-y-auto overflow-scroll">
            {weather?.map((item, key) => (
              <Tab key={key}>
                <div className="rounded-3xl p-3 h-32 w-32 border-blue-500 bg-transparent border-2 flex flex-col items-center justify-center gap-x-5">
                  <h3 className="text-blue-500 text-sm">{item.time} Hours</h3>
                  <img
                    src={item.weatherIconUrl[0].value}
                    alt="icon"
                    className="w-10 rounded-md"
                  />
                  <h3 className="text-blue-700 text-center text-sm capitalize">
                    {item.weatherDesc[0].value}
                  </h3>
                </div>
              </Tab>
            ))}
          </Tab.List>
          <Tab.Panels className="mt-2">
            {weather?.map((item, idx) => (
              <Tab.Panel
                key={idx}
                className={classNames(
                  "bg-white rounded-xl p-3",
                  "focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60"
                )}
              >
                <div className="flex flex-row items-center gap-3 justify-evenly my-8 overflow-x-scroll overscroll-x-auto flex-wrap">
                  <div className="rounded-3xl shadow-2xl p-3 h-40 w-40 bg-yellow-200 flex flex-col items-center justify-center gap-3">
                    <h3 className="text-gray-50 text-lg">Wind Status</h3>
                    <i className="wi wi-day-cloudy-gusts text-5xl text-center text-white"></i>
                    <h3 className="text-white font-bold text-center text-lg">
                      {item.windspeedKmph} km
                    </h3>
                  </div>
                  <div className="rounded-3xl shadow-2xl p-2 h-40 w-40 bg-green-300 flex flex-col items-center justify-center gap-3">
                    <h3 className="text-gray-50 text-lg">Air Pressure</h3>
                    <i className="wi wi-barometer text-5xl text-center text-white"></i>
                    <h3 className="text-white font-bold text-center text-lg">
                      {item.pressure} mb
                    </h3>
                  </div>
                  <div className="rounded-3xl shadow-2xl p-2 h-40 w-40 bg-red-300 flex flex-col items-center justify-center gap-3">
                    <h3 className="text-gray-50 text-lg">Humidity</h3>
                    <i className="wi wi-humidity text-5xl text-center text-white"></i>
                    <h3 className="text-white font-bold text-center text-lg">
                      {item.humidity} %
                    </h3>
                  </div>
                  <div className="rounded-3xl shadow-2xl p-2 h-40 w-40 bg-blue-300 flex flex-col items-center justify-center">
                    <h3 className="text-gray-50 text-lg">Cloud Cover</h3>
                    <i className="wi wi-cloud text-5xl text-center text-white"></i>
                    <h3 className="text-white font-md text-center text-lg">
                      {item.cloudcover} %
                    </h3>
                  </div>
                  <div className="rounded-3xl shadow-2xl p-2 h-40 w-40 bg-purple-300 flex flex-col items-center justify-center">
                    <h3 className="text-gray-50 text-lg">Visibility</h3>
                    <i className="wi wi-windy text-5xl text-center text-white"></i>
                    <h3 className="text-white font-bold text-center text-lg">
                      {item.visibility}
                    </h3>
                  </div>
                  <div className="rounded-3xl shadow-2xl p-2 h-40 w-40 bg-pink-300 flex flex-col items-center justify-center">
                    <h3 className="text-gray-50 text-lg">Temperature</h3>
                    <i className="wi wi-thermometer text-3xl text-center text-white"></i>
                    <TempText
                      temp={item.tempF}
                      className="text-white font-bold text-center text-lg"
                    />
                  </div>
                </div>
              </Tab.Panel>
            ))}
          </Tab.Panels>
        </Tab.Group>
      )}
    </div>
  );
};
export default HistoricalReport;
