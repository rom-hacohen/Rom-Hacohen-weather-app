import React, { useEffect } from "react";
import useHttp from "../helpers/useHttp";
import { useState } from "react";
import {
  serverURL,
  apiKey,
  forecastURL,
  getNextDaysForecast,
} from "../helpers/urls";
import { useDispatch, useSelector } from "react-redux";
import { forecastActions } from "../store/Forecast-slice";
import { metricActions } from "../store/metric-slice";
import useForecast from "../helpers/useForecast";
import { notificationActions } from "../store/notification-slice";

const Input = (props) => {
  const isDefault = props.renderDefault;
  const darkThemeSlice = useSelector((state) => state.theme);
  const isMetric = useSelector((state) => state.metric);
  const { cityForecast, cityForecastHandler, cityInfo, cityInfoHandler } =
    useForecast();
  const regex = "[A-Za-z]";
  const dispatch = useDispatch();
  const unitHandler = () => dispatch(metricActions.toggleMetric());
  const { sendRequest } = useHttp();
  const [city, setCity] = useState("");
  const getCityHandler = (event) => setCity(event.target.value);

  const currentForecastData = (response) => {
    const temp = response[0].Temperature;
    const text = response[0].WeatherText;
    const time = response[0].LocalObservationDateTime;
    const newTime = time.split("T")[0];
    cityForecastHandler({ temp, text, newTime });
  };

  const nextDaysForecast = (response) => {
    const forecastArray = response.DailyForecasts;
    dispatch(forecastActions.getNextDaysForecast({ forecast: forecastArray }));
  };

  const cityData = (response) => {
    if (response.length === 0) {
      dispatch(
        notificationActions.showNotification({
          status: "failed",
          title: "Something went wrong",
          message: "No city founded",
        })
      );
    }
    const cityKey = response[0].Key;

    cityInfoHandler({ key: cityKey, name: response[0].LocalizedName });

    sendRequest(
      { url: `${forecastURL}${cityKey}?apikey=${apiKey}` },
      currentForecastData
    );

    sendRequest(
      { url: `${getNextDaysForecast}${cityKey}?apikey=${apiKey}&metric=true` },
      nextDaysForecast
    );
  };

  const getCityForecast = (event) => {
    event.preventDefault();
    if (!city.match(regex)) {
      dispatch(
        notificationActions.showNotification({
          status: "failed",
          title: "Something went wrong",
          message: "English letters only",
        })
      );
      return;
    }
    sendRequest({ url: `${serverURL}?apikey=${apiKey}&q=${city}` }, cityData);

    props.toggleDefault();
  };

  useEffect(() => {
    dispatch(
      forecastActions.getForecastForCity({
        temperature: cityForecast.temperature,
        weatherText: cityForecast.weatherText,
        time: cityForecast.time,
        key: cityInfo.key,
        name: cityInfo.name,
      })
    );
  }, [cityForecast, dispatch]);

  return (
    <div>
      <form className="find-location" onSubmit={getCityForecast}>
        <input
          type="text"
          placeholder="Search"
          onChange={getCityHandler}
          style={{
            backgroundColor:
              darkThemeSlice === "dark" ? null : "rgb(201, 236, 252)",
            color: darkThemeSlice === "dark" ? null : "#009ad8",
          }}
        />
        <input type="submit" value="Find" />
      </form>
      <form onSubmit={getCityForecast}>
        {isDefault && <div style={{ paddingTop: "1rem" }}></div>}
        {!isDefault && (
          <button
            style={{ display: "flex", margin: "0 auto" }}
            type="button"
            onClick={unitHandler}
          >
            {!isMetric ? "Change to Fahrenheit" : "Change to Celsius"}
          </button>
        )}
      </form>
    </div>
  );
};

export default Input;
