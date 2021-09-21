import moment from "moment";
import { TempText } from "../../components";
import { useHistory } from "react-router-dom";

const WeatherInfo = ({ data = {} }) => {
  const now = new Date();
  const date_time = (dt) => moment.unix(dt).format("h:mm A - ddd,D MMM 'YY");
  const time = (dt) => moment.unix(dt).format("h:mm A");
  const { humidity, temp, pressure } = data.main ? data.main : {};
  const { description, icon } = data.weather ? data.weather[0] : [{}];
  const { sunrise, sunset, country } = data?.sys ? data.sys : {};
  const { speed } = data?.wind ? data.wind : {};
  const { push } = useHistory();

  return (
    <div className="container px-3">
      <div className="rounded-3xl shadow-2xl p-2 flex flex-col items-center justify-center mt-7 mx-auto bg-blue-600	">
        <div className="weather-icon  w-3/5 flex flex-col items-center justify-center">
          <img
            src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
            alt="icon"
            className="w-60"
          />
        </div>
        <p className="text-4xl text-center text-white mt-2 mb-2 capitalize">
          {description ?? "Cloudy"}
        </p>
        <div className="flex flex-row justify-start items-center gap-x-4 pb-2">
          <TempText
            temp={temp}
            className="text-6xl text-center text-white font-semibold"
          />
          <div>
            <p className="text-2xl text-center text-white break-words mb-2">
              {`${data?.name} , ${country}`}
            </p>
            <p className="text-white">{date_time(data?.dt ?? now)}</p>
          </div>
        </div>
      </div>
      <h3 className="text-left text-3xl font-medium mt-5">Today's Highlight</h3>
      <div className="flex flex-row items-center gap-3 justify-evenly my-8 overflow-x-scroll overscroll-x-auto flex-wrap">
        <div className="rounded-3xl shadow-2xl p-3 h-40 w-40 bg-yellow-200 flex flex-col items-center justify-center gap-3">
          <h3 className="text-gray-50 text-lg">Wind Status</h3>
          <i className="wi wi-day-cloudy-gusts text-5xl text-center text-white"></i>
          <h3 className="text-white font-bold text-center text-lg">
            {speed} m/sec
          </h3>
        </div>
        <div className="rounded-3xl shadow-2xl p-2 h-40 w-40 bg-green-300 flex flex-col items-center justify-center gap-3">
          <h3 className="text-gray-50 text-lg">Air Pressure</h3>
          <i className="wi wi-barometer text-5xl text-center text-white"></i>
          <h3 className="text-white font-bold text-center text-lg">
            {pressure} hPa
          </h3>
        </div>
        <div className="rounded-3xl shadow-2xl p-2 h-40 w-40 bg-red-300 flex flex-col items-center justify-center gap-3">
          <h3 className="text-gray-50 text-lg">Humidity</h3>
          <i className="wi wi-humidity text-5xl text-center text-white"></i>
          <h3 className="text-white font-bold text-center text-lg">
            {humidity} %
          </h3>
        </div>
        <div className="rounded-3xl shadow-2xl p-2 h-40 w-40 bg-blue-300 flex flex-col items-center justify-center">
          <h3 className="text-gray-50 text-lg">Sunrise & Sunset</h3>
          <i className="wi wi-sunrise text-2xl text-center text-yellow-400"></i>
          <h3 className="text-white font-md text-center text-sm">
            {time(sunrise)}
          </h3>
          <i className="wi wi-sunset text-2xl text-center text-yellow-200"></i>
          <h3 className="text-white font-md text-center text-sm">
            {time(sunset)}
          </h3>
        </div>
        <div className="rounded-3xl shadow-2xl p-2 h-40 w-40 bg-purple-300 flex flex-col items-center justify-center">
          <h3 className="text-gray-50 text-lg">Visibility</h3>
          <i className="wi wi-windy text-5xl text-center text-white"></i>
          <h3 className="text-white font-bold text-center text-lg">
            {data?.visibility}
          </h3>
        </div>
        <div className="rounded-3xl shadow-2xl p-2 h-40 w-40 bg-blue-300 flex flex-col items-center justify-center">
          <h3 className="text-gray-50 text-lg">Cloud Cover</h3>
          <i className="wi wi-cloud text-5xl text-center text-white"></i>
          <h3 className="text-white font-md text-center text-lg">
            {data?.clouds?.all} %
          </h3>
        </div>
      </div>
      <div className="w-full px-4 flex flex-col items-center justify-center md:hidden">
        <button
          className="shadow p-3 text-white bg-yellow-300 rounded-md border-0 w-full flex flex-row items-center justify-center"
          onClick={() => push("/historical")}
        >
          View More
        </button>
      </div>
    </div>
  );
};

export default WeatherInfo;
