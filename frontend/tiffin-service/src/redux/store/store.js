import { configureStore } from "@reduxjs/toolkit";
import getuserReducer from "../slice/usersSlice";
import getProductReducer from "../slice/productsSlice";

const store = configureStore({
  reducer: {
    userReducer: getuserReducer,
    productReducer: getProductReducer,
  },
});

export default store;
