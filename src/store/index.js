
import { configureStore } from "@reduxjs/toolkit";
import darkThemeReducer from "./darkTheme-slicer";
import metricReducer from './metric-slice'
import defaultForecastReducer from "./defaultForecast";
import forecastReducer from "./Forecast-slice";
import notificationReducer from "./notification-slice"
const store = configureStore({
  reducer: {
    forecast: defaultForecastReducer.reducer,
    cityForecast: forecastReducer.reducer,
    metric:metricReducer.reducer,
    theme: darkThemeReducer.reducer,
    Alert: notificationReducer.reducer
  },
});

export default store;