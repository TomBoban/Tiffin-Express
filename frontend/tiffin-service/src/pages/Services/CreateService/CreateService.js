import React from "react";
import "./CreateService.css";
import {
  Button,
  Checkbox,
  Container,
  Grid,
  InputLabel,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { fontWeight } from "@mui/system";

const INITIAL_FORM_STATE = {
  name: "",
  description: "",
  shortDescription: "",
  price: "",
  menuOption1: "",
  menuOption2: "",
  menuOption3: "",
};

const FORM_VALIDATION = Yup.object().shape({
  name: Yup.string().required("Required"),
  description: Yup.string().required("Required"),
  shortDescription: Yup.string(),
  price: Yup.string().required("Required"),
  menuOption1: Yup.string().required("Required"),
  menuOption2: Yup.string().required("Required"),
  menuOption3: Yup.string().required("Required"),
});

const CreateService = () => {
  return (
    <Grid container className="service_container">
      <Formik
        initialValues={{
          ...INITIAL_FORM_STATE,
        }}
        validationSchema={FORM_VALIDATION}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        <Grid spacing={2} item xs={12} className="service_semi_container">
          <Grid item xs={12} className="service_header">
            <Typography
              sx={{
                fontSize: "1rem",
                fontFamily: "'Public Sans', sans-serif",
                fontWeight: "600",
              }}
            >
              Add Your Service{" "}
            </Typography>
          </Grid>

          <Grid item xs={12} lg={12}>
            <Stack spacing={1.25}>
              <InputLabel sx={{ fontWeight: "700" }} htmlFor="email">
                Name
              </InputLabel>
              <TextField name="name" label="Name" sx={{ width: "100%" }} />
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Stack spacing={1.25}>
              <InputLabel sx={{ fontWeight: "700" }} htmlFor="email">
                Description
              </InputLabel>
              <TextField
                name="description"
                label="Description"
                sx={{ width: "100%" }}
              />
            </Stack>
          </Grid>

          <Grid item xs={12}>
            <Stack spacing={1.25}>
              <InputLabel sx={{ fontWeight: "700" }} htmlFor="email">
                Short Description
              </InputLabel>
              <TextField
                sx={{ width: "100%" }}
                name="shortDescription"
                label="Short Description"
              />
            </Stack>
          </Grid>

          <Grid item xs={12}>
            <Stack spacing={1.25}>
              <InputLabel sx={{ fontWeight: "700" }} htmlFor="email">
                Price
              </InputLabel>
              <TextField name="price" label="Price" sx={{ width: "100%" }} />
            </Stack>
          </Grid>

          <Grid item xs={12}>
            <Stack spacing={1.25}>
              <InputLabel sx={{ fontWeight: "700" }} htmlFor="email">
                Menu Item 1
              </InputLabel>
              <TextField
                name="menuOption1"
                label="Menu Item 1"
                sx={{ width: "100%" }}
              />
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Stack spacing={1.25}>
              <InputLabel sx={{ fontWeight: "700" }} htmlFor="email">
                Menu Item 2
              </InputLabel>
              <TextField
                name="menuOption2"
                label="Menu Item 2"
                sx={{ width: "100%" }}
              />
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Stack spacing={1.25}>
              <InputLabel sx={{ fontWeight: "700" }} htmlFor="email">
                Menu Item 3
              </InputLabel>
              <TextField
                name="menuOption3"
                label="Menu Item 3"
                sx={{ width: "100%" }}
              />
            </Stack>
          </Grid>

          <Grid item xs={12}>
            <Button className="btn_submit">Submit Form</Button>
          </Grid>
        </Grid>
      </Formik>
    </Grid>
  );
};
export default CreateService;
