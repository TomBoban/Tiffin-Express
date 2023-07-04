import "./ProductDetails.css";
import React, { useEffect, useState } from "react";
import { CircularProgress, Grid, Paper } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getSingleProduct } from "../../redux/slice/productsSlice";
import { Link, useParams, useHistory } from "react-router-dom";

export const ProductDetails = () => {
  const dispatch = useDispatch();
  const [prodList, setProdList] = useState([]);
  const singleProduct = useSelector(
    (state) => state.productReducer.singleProduct
  );

  const { id } = useParams();

  useEffect(() => {
    dispatch(getSingleProduct(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (singleProduct && singleProduct !== null) {
      setProdList(singleProduct);
    }
  }, [singleProduct, prodList]);

  console.log(prodList, "prodList");

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        {singleProduct === null ? (
          <CircularProgress />
        ) : (
          <>
            <Grid item lg={6} sm={12}>
              Image
            </Grid>
            <Grid item lg={6} sm={12}>
              Details
            </Grid>
          </>
        )}
      </Grid>
    </Grid>
  );
};
