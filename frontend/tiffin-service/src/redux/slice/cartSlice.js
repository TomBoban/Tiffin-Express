import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../../utils/baseUrl";

// Add to Cart action
export const addToCartSlice = createAsyncThunk(
  "cart/addToCart",
  async (cartData, { rejectWithValue, getState, dispatch }) => {
    const user = getState()?.userReducer;
    const { userAuth } = user;
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.post(
        `${baseUrl}/api/cart`,
        cartData,
        config
      );

      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

// Add to Cart action
export const decreaseToCartSlice = createAsyncThunk(
  "cart/decreaseToCart",
  async (cartData, { rejectWithValue, getState, dispatch }) => {
    const user = getState()?.userReducer;
    const { userAuth } = user;
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.post(
        `${baseUrl}/api/cart/substract`,
        cartData,
        config
      );

      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

// Remove from Cart action
export const removeCartSlice = createAsyncThunk(
  "cart/removeFromCart",
  async (id, { rejectWithValue, getState, dispatch }) => {
    const user = getState()?.userReducer;
    const { userAuth } = user;
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.delete(`${baseUrl}/api/cart/${id}`, config);

      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

// Clear from Cart action
export const clearCartSlice = createAsyncThunk(
  "cart/clearFromCart",
  async (_, { rejectWithValue, getState, dispatch }) => {
   
    const user = getState()?.userReducer;
    const { userAuth } = user;
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.delete(`${baseUrl}/api/cart/clear`, config);
      console.log(data,"data");

      return data;
    } catch (error) {
      if (!error?.response) {
        console.log(error,"error");
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

//  Get Cart
export const getCartSlice = createAsyncThunk(
  "cart/getCartData",
  async (_, { getState, dispatch }) => {
    const user = getState()?.userReducer;
    const { userAuth } = user;
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.get(`${baseUrl}/api/cart`, config);

      return data;
    } catch (error) {
      if (!error?.response) {
        console.log(error, "err");
        throw error;
      }
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    getCartData: null,
  },
  reducers: {
    clearCartData: (state) => {
      state.getCartData = null;
    },
  },
  extraReducers: (builder) => {
    //Add to cart
    builder.addCase(addToCartSlice.pending, (state, action) => {
      state.loading = true;
      state.appErr = undefined;
      state.serverErr = undefined;
    });

    builder.addCase(addToCartSlice.fulfilled, (state, action) => {
      state.loading = false;

      state.appErr = undefined;
      state.serverErr = undefined;
    });

    builder.addCase(addToCartSlice.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });

    //Substract to cart
    builder.addCase(decreaseToCartSlice.pending, (state, action) => {
      state.loading = true;
      state.appErr = undefined;
      state.serverErr = undefined;
    });

    builder.addCase(decreaseToCartSlice.fulfilled, (state, action) => {
      state.loading = false;

      state.appErr = undefined;
      state.serverErr = undefined;
    });

    builder.addCase(decreaseToCartSlice.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });

    //Remove from  cart
    builder.addCase(removeCartSlice.pending, (state, action) => {
      state.loading = true;
      state.appErr = undefined;
      state.serverErr = undefined;
    });

    builder.addCase(removeCartSlice.fulfilled, (state, action) => {
      state.loading = false;

      state.appErr = undefined;
      state.serverErr = undefined;
    });

    builder.addCase(removeCartSlice.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });

    //Clear from  cart
    builder.addCase(clearCartSlice.pending, (state, action) => {
      state.loading = true;
      state.appErr = undefined;
      state.serverErr = undefined;
    });

    builder.addCase(clearCartSlice.fulfilled, (state, action) => {
      state.loading = false;

      state.appErr = undefined;
      state.serverErr = undefined;
    });

    builder.addCase(clearCartSlice.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });

    //Get  cart
    builder.addCase(getCartSlice.pending, (state, action) => {
      state.loading = true;
      state.appErr = undefined;
      state.serverErr = undefined;
    });

    builder.addCase(getCartSlice.fulfilled, (state, action) => {
      state.loading = false;
      state.getCartData = action?.payload;
      state.appErr = undefined;
      state.serverErr = undefined;
    });

    builder.addCase(getCartSlice.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });
  },
});

export const { clearCartData } = cartSlice.actions;
export default cartSlice.reducer;
