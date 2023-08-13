import { configureStore } from "@reduxjs/toolkit";
import getuserReducer from "../slice/usersSlice";
import getProductReducer from "../slice/productsSlice";
import getCategoryReducer from "../slice/categorySlice";
import getCartReducer from "../slice/cartSlice";

const store = configureStore({
  reducer: {
    userReducer: getuserReducer,
    productReducer: getProductReducer,
    categoryReducer:getCategoryReducer,
    cartReducer:getCartReducer
  },
});

export default store;
