import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../../utils/baseUrl";

// Get all  Payments action
export const getAllPayments = createAsyncThunk(
  "category/getAll",
  async (_, { rejectWithValue, getState, dispatch }) => {
    const user = getState()?.userReducer;
    const { userAuth } = user;
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
      },
    };
    try {
      const res = await axios.get(
        `${baseUrl}/api/payment`,

        config
      );

      return res.data;
    } catch (error) {
      if (!error?.response) {
        console.log(error, "err");
        throw error;
      }
    }
  }
);

//Slices(reducers)

const paymentReducer = createSlice({
  name: "payments",
  initialState: {
    getPaymentDetails: null,
  },

  extraReducers: (builder) => {
    //Get All Category

    builder.addCase(getAllPayments.pending, (state, action) => {
      state.loading = true;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(getAllPayments.fulfilled, (state, action) => {
      state.loading = false;
      state.getPaymentDetails = action?.payload;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(getAllPayments.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });
  },
});

export default paymentReducer.reducer;
