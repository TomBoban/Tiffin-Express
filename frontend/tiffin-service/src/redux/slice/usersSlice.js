import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../../utils/baseUrl";

// register action
export const registerUserAction = createAsyncThunk(
  "users/register",
  async (user, { rejectWithValue, getState, dispatch }) => {
    //http call
    console.log(user, "user");
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.post(
        `${baseUrl}/api/users/register`,
        user,
        config
      );
      return res.data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

// Login action
export const loginUserAction = createAsyncThunk(
  "user/login",
  async (userData, { rejectWithValue, getState, dispatch }) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    console.log(userData, "dara");
    try {
      const { data } = await axios.post(
        `${baseUrl}/api/users/login`,
        userData,
        config
      );
      //save the user into local storage

      localStorage.setItem("userInfo", JSON.stringify(data));
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

// Update User

export const updateUserInfo = createAsyncThunk(
  "users/updateUserData",
  async ({ id, data }) => {
    //http call
    console.log(data, "usee");
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.put(
        `${baseUrl}/api/users/userInfo/${id}`,
        data,
        config
      );
      return res.data;
    } catch (error) {
      if (!error?.response) {
        console.log(error, "errror");
        throw error;
      }
    }
  }
);

//Get Single User
export const getSingleUserAction = createAsyncThunk(
  "users/getSingleUser",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${baseUrl}/api/users/${userId}`);
      return response.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

//logout action

export const logoutAction = createAsyncThunk(
  "/user/logout",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      localStorage.removeItem("userInfo");
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
    }
  }
);

// get user from local storage and place into store

const userLoginFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

//Slices(reducers)

const userSlices = createSlice({
  name: "users",
  initialState: {
    userAuth: userLoginFromStorage,
    isRegistered: false,
    singleUserData: null,
  },
  reducers: {
    clearUserData: (state) => {
      state.isRegistered = false;
    },
    clearLoginData: (state) => {
      state.appErr = undefined;
      state.serverErr = undefined;
    },
  },
  extraReducers: (builder) => {
    //register

    builder.addCase(registerUserAction.pending, (state, action) => {
      state.loading = true;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(registerUserAction.fulfilled, (state, action) => {
      state.loading = false;
      state.registered = action?.payload;
      state.isRegistered = true;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(registerUserAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });

    //login
    builder.addCase(loginUserAction.pending, (state, action) => {
      state.loading = true;
      state.appErr = undefined;
      state.serverErr = undefined;
    });

    builder.addCase(loginUserAction.fulfilled, (state, action) => {
      state.userAuth = action?.payload;
      state.loading = false;
      state.appErr = undefined;
      state.serverErr = undefined;
    });

    builder.addCase(loginUserAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });

    // User Profile
    builder.addCase(updateUserInfo.pending, (state, action) => {
      state.loading = true;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(updateUserInfo.fulfilled, (state, action) => {
      state.loading = false;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(updateUserInfo.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });

    //Single User Data

    builder.addCase(getSingleUserAction.pending, (state, action) => {
      state.loading = true;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(getSingleUserAction.fulfilled, (state, action) => {
      state.loading = false;
      state.singleUserData = action?.payload;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(getSingleUserAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });

    //logout
    builder.addCase(logoutAction.pending, (state, action) => {
      state.loading = false;
    });
    builder.addCase(logoutAction.fulfilled, (state, action) => {
      state.userAuth = undefined;
      state.loading = false;

      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(logoutAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });
  },
});

export const { clearUserData, clearLoginData } = userSlices.actions;
export default userSlices.reducer;
