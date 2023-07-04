import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  InputLabel,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import "./Profile.css";
import { Stack } from "@mui/system";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useHistory, useParams } from "react-router-dom";
import {
  getSingleUserAction,
  updateUserInfo,
} from "../../redux/slice/usersSlice";

export const Profile = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { id } = useParams();
  const singleUserData = useSelector(
    (state) => state.userReducer.singleUserData
  );

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getSingleUserAction(id));
    };
    fetchData();
  }, [dispatch, id]);

  const formik = useFormik({
    initialValues: {
      firstName: singleUserData?.firstName || "",
      lastName: singleUserData?.lastName || "",
      email: singleUserData?.email || "",
      phone: singleUserData?.phone || "",
      address: singleUserData?.address || "",
      role: singleUserData?.role || "",
    },

    enableReinitialize: true,
    onSubmit: (values) => {
      handleUpdateUser(values);
    },
  });

  const handleUpdateUser = async (values) => {
    const data = {
      firstName: values?.firstName,
      lastName: values?.lastName,
      email: values?.email,
      phone: values?.phone,
      address: values?.address,
      role: values?.role,
    };

    await dispatch(updateUserInfo({ id, data }));

    history.push(`/products`);
  };
  const handleCancel = () => {
    history.push(`/products`);
  };

  return (
    <Box className="box_container">
      <Container className="pro_container" maxWidth="xl">
        <Grid
          container
          justifyContent="space-between"
          alignItems="center"
          sx={{ position: "relative", zIndex: 5 }}
          className="top_head"
        >
          <Grid item>
            <Stack direction="row" alignItems="center">
              <Box sx={{ ml: { xs: 0, sm: 1 } }}>
                {/* <ProfileRadialChart /> */}
              </Box>
              <Stack spacing={0.75}>
                <Typography variant="h5">Edit Your Profile</Typography>
                <Typography className="pro_head" color="secondary">
                  Complete your profile to unlock all features
                </Typography>
              </Stack>
            </Stack>
          </Grid>
          <Grid item>
            <Button className="contain_btn" variant="contained">
              Edit Your Profile
            </Button>
          </Grid>
        </Grid>
        <Grid sx={{ padding: "2rem", background: "#fff", marginBottom: "2%" }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <Grid>
                <Grid container spacing={1} direction="column">
                  <Grid item xs={12}>
                    <InputLabel sx={{ mb: 1, fontWeight: "bold" }}>
                      First Name
                    </InputLabel>
                    <TextField
                      onChange={formik.handleChange}
                      placeholder="Enter First Name"
                      fullWidth
                      name="firstName"
                      id="firstName"
                      value={formik.values.firstName}
                      error={
                        formik.touched.firstName &&
                        Boolean(formik.errors.firstName)
                      }
                      helperText={
                        formik.touched.firstName && formik.errors.firstName
                      }
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <InputLabel sx={{ mb: 1, fontWeight: "bold" }}>
                      Last Name
                    </InputLabel>
                    <TextField
                      placeholder="Enter Last Name"
                      fullWidth
                      multiline
                      rows={3}
                      value={formik.values.lastName}
                      onChange={formik.handleChange}
                      name="lastName"
                      id="lastName"
                      error={
                        formik.touched.lastName &&
                        Boolean(formik.errors.lastName)
                      }
                      helperText={
                        formik.touched.lastName && formik.errors.lastName
                      }
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <InputLabel sx={{ mb: 1, fontWeight: "bold" }}>
                      Email
                    </InputLabel>
                    <TextField
                      placeholder="Enter Email"
                      fullWidth
                      multiline
                      rows={3}
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      name="email"
                      id="email"
                      error={
                        formik.touched.email && Boolean(formik.errors.email)
                      }
                      helperText={formik.touched.email && formik.errors.email}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <InputLabel sx={{ mb: 1, fontWeight: "bold" }}>
                      Phone Number
                    </InputLabel>
                    <TextField
                      placeholder="Enter Phone Number"
                      fullWidth
                      multiline
                      rows={3}
                      value={formik.values.phone}
                      onChange={formik.handleChange}
                      name="phone"
                      id="phone"
                      error={
                        formik.touched.phone && Boolean(formik.errors.phone)
                      }
                      helperText={formik.touched.phone && formik.errors.phone}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <InputLabel sx={{ mb: 1, fontWeight: "bold" }}>
                      Address
                    </InputLabel>
                    <TextField
                      placeholder="Enter Address"
                      fullWidth
                      multiline
                      rows={3}
                      value={formik.values.address}
                      onChange={formik.handleChange}
                      name="address"
                      id="address"
                      error={
                        formik.touched.address && Boolean(formik.errors.address)
                      }
                      helperText={
                        formik.touched.address && formik.errors.address
                      }
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <InputLabel sx={{ mb: 1, fontWeight: "bold" }}>
                      User Type
                    </InputLabel>
                    <TextField
                      placeholder="Enter Type"
                      fullWidth
                      multiline
                      rows={3}
                      value={formik.values.role}
                      onChange={formik.handleChange}
                      name="role"
                      id="role"
                      error={formik.touched.role && Boolean(formik.errors.role)}
                      helperText={formik.touched.role && formik.errors.role}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Stack
                      direction="row"
                      spacing={2}
                      justifyContent="start"
                      alignItems="center"
                      sx={{ mt: 8 }}
                    >
                      <Button
                        onClick={formik.handleSubmit}
                        variant="contained"
                        sx={{ textTransform: "none" }}
                      >
                        Update Profile
                      </Button>
                      <Button
                        variant="outlined"
                        color="secondary"
                        onClick={handleCancel}
                      >
                        Cancel
                      </Button>
                    </Stack>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};
