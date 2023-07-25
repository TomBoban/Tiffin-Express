import { configureStore } from "@reduxjs/toolkit";
import getuserReducer from "../slice/usersSlice";
import getProductReducer from "../slice/productsSlice";
import getCategoryReducer from "../slice/categorySlice";

const store = configureStore({
  reducer: {
    userReducer: getuserReducer,
    productReducer: getProductReducer,
    categoryReducer:getCategoryReducer
  },
});

export default store;
