import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../../utils/baseUrl";

// Get all  Products action
export const getAllProducts = createAsyncThunk("products/getAll", async () => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const res = await axios.get(
      `${baseUrl}/api/products`,

      config
    );

    return res.data;
  } catch (error) {
    if (!error?.response) {
      console.log(error, "err");
      throw error;
    }
  }
});

// Get single product action
export const getSingleProduct = createAsyncThunk(
  "product/single",
  async (id) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.get(
        `${baseUrl}/api/products/${id}`,

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

//admin
// Create Product action
export const createProduct = createAsyncThunk(
  "products/create",
  async (productData, { rejectWithValue, getState, dispatch }) => {
    const user = getState()?.userReducer
    const { userAuth } = user;
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
      },
    };
    console.log(productData.productData,"val");
    const formData = new FormData();
    formData.append("name", productData?.productData?.name);
    formData.append("description", productData?.productData?.description);
    formData.append("shortDescription", productData?.productData?.shortDescription);
    formData.append("price", productData?.productData?.price);
    formData.append("menuOption1", productData?.productData?.menuOption1);
    formData.append("menuOption2", productData?.productData?.menuOption2);
    formData.append("menuOption3", productData?.productData?.menuOption3);
    formData.append("image", productData?.productData?.image);
   
    console.log(formData,"formData");
    try {
      const { data } = await axios.post(
        `${baseUrl}/api/products`,
        formData,
        config
      );
     
      //save the user into local storage

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

//Slices(reducers)

const productSlices = createSlice({
  name: "products",
  initialState: {
    getProducts: null,
    singleProduct: null,
    createProduct: null,
  },
  reducers: {
    clearProductsData: (state) => {
      state.getProducts = null;
      state.singleProduct = null;
      state.appErr = undefined;
      state.serverErr = undefined;
    },
  },
  extraReducers: (builder) => {
    //Get All Products

    builder.addCase(getAllProducts.pending, (state, action) => {
      state.loading = true;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(getAllProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.getProducts = action?.payload;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(getAllProducts.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });

    //Get Single Product

    builder.addCase(getSingleProduct.pending, (state, action) => {
      state.loading = true;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(getSingleProduct.fulfilled, (state, action) => {
      state.loading = false;
      state.singleProduct = action?.payload;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(getSingleProduct.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });

    //login
    builder.addCase(createProduct.pending, (state, action) => {
      state.loading = true;
      state.appErr = undefined;
      state.serverErr = undefined;
    });

    builder.addCase(createProduct.fulfilled, (state, action) => {
      state.createProduct = action?.payload;
      state.loading = false;

      state.appErr = undefined;
      state.serverErr = undefined;
    });

    builder.addCase(createProduct.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });
  },
});

export const { clearProductsData } = productSlices.actions;
export default productSlices.reducer;
