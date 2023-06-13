import { configureStore } from "@reduxjs/toolkit";
import getuserReducer from "../slice/usersSlice";

const store = configureStore({
  reducer: {
    userReducer: getuserReducer,
  },
});

export default store;
