import { configureStore } from "@reduxjs/toolkit";
import reactotron from "../ReactotronConfig";
import carSlice from "./reducers/car/carSlice";
import carDetailsSlice from "./reducers/car/carDetailsSlice";
import loginSlice from "../redux/authApi/loginSlice";
import orderSlice from "../redux/order/orderSlice";
export const store = configureStore({
  reducer: {
    car: carSlice,
    carDetails: carDetailsSlice,
    order: orderSlice,
    login: loginSlice,
  },
  enhancers: (getDefaultenhancers) =>
    __DEV__
      ? getDefaultenhancers().concat(reactotron.createEnhancer())
      : getDefaultenhancers(),
});
