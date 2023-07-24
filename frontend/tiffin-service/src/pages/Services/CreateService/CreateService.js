import React, { useState } from "react";
import "./CreateService.css";
import {
  Button,
  Grid,
  InputLabel,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import Dropzone from "react-dropzone";
import { useDispatch, useSelector } from "react-redux";
import { createProduct } from "../../../redux/slice/productsSlice";


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
  const [file, setFile] = useState(null);
const dispatch=useDispatch()

  const handleFileDrop = (acceptedFiles) => {
    setFile(acceptedFiles[0]);
  };

  const formik = useFormik({
    initialValues: INITIAL_FORM_STATE,
    validationSchema: FORM_VALIDATION,
    onSubmit: (values) => {
      console.log("Form is being submitted");
      handleAddUsers(values);
    },
  });

  const handleAddUsers = async (values) => {
    
    const productData = {
      name: values.name,
      description: values.description,
      shortDescription: values.shortDescription,
      price: parseFloat(values.price),
      menuOption1: values.menuOption1,
      menuOption2: values.menuOption2,
      menuOption3: values.menuOption3,
      image: values?.image,
    };
  
    await dispatch(createProduct({productData}))
  };

  return (
    <form onSubmit={formik.handleSubmit} >
      <Grid container className="service_container">
        <Grid item xs={12} className="service_semi_container">
          <Grid item xs={12} className="service_header">
            <Typography
              sx={{
                fontSize: "1rem",
                fontFamily: "'Public Sans', sans-serif",
                fontWeight: "600",
              }}
            >
              Add Service Details{" "}
            </Typography>
          </Grid>

          <Grid item xs={12} lg={12}>
            <Stack spacing={1.25}>
              <InputLabel sx={{ fontWeight: "700" }} htmlFor="email">
                Name
              </InputLabel>
              <TextField
                name="name"
                id="name"
                label="Name"
                sx={{ width: "100%" }}
                value={formik.values.name}
                onChange={formik.handleChange}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
              />
            </Stack>
          </Grid>
          <Grid>
            <Stack spacing={1.25}>
              <InputLabel sx={{ fontWeight: "700" }} htmlFor="image">
                File Upload
              </InputLabel>
              <Dropzone
                onDrop={(acceptedFiles) => {
                  handleFileDrop(acceptedFiles[0]);
                  formik.setFieldValue("image", acceptedFiles[0]);
                }}
              >
                {({ getRootProps, getInputProps }) => (
                  <div {...getRootProps()} className="dropzone">
                    <input {...getInputProps()}  />
                    {file ? (
                      <p>File selected: {file.name}</p>
                    ) : (
                      <p>
                        Drag 'n' drop an image here, or click to select a file
                      </p>
                    )}
                  </div>
                )}
              </Dropzone>
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
                value={formik.values.description}
                onChange={formik.handleChange}
                error={
                  formik.touched.description &&
                  Boolean(formik.errors.description)
                }
                helperText={
                  formik.touched.description && formik.errors.description
                }
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
                value={formik.values.shortDescription}
                onChange={formik.handleChange}
                error={
                  formik.touched.shortDescription &&
                  Boolean(formik.errors.shortDescription)
                }
                helperText={
                  formik.touched.shortDescription &&
                  formik.errors.shortDescription
                }
              />
            </Stack>
          </Grid>

          <Grid item xs={12}>
            <Stack spacing={1.25}>
              <InputLabel sx={{ fontWeight: "700" }} htmlFor="email">
                Price
              </InputLabel>
              <TextField
                name="price"
                label="Price"
                type="number"
                sx={{ width: "100%" }}
                value={formik.values.price}
                onChange={formik.handleChange}
                error={formik.touched.price && Boolean(formik.errors.price)}
                helperText={formik.touched.price && formik.errors.price}
              />
            </Stack>
          </Grid>
          <Grid item xs={12} className="service_header">
            <Typography
              sx={{
                fontSize: "1rem",
                fontFamily: "'Public Sans', sans-serif",
                fontWeight: "600",
              }}
            >
              Add Menu Options{" "}
            </Typography>
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
                value={formik.values.menuOption1}
                onChange={formik.handleChange}
                error={
                  formik.touched.menuOption1 &&
                  Boolean(formik.errors.menuOption1)
                }
                helperText={
                  formik.touched.menuOption1 && formik.errors.menuOption1
                }
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
                value={formik.values.menuOption2}
                onChange={formik.handleChange}
                error={
                  formik.touched.menuOption2 &&
                  Boolean(formik.errors.menuOption2)
                }
                helperText={
                  formik.touched.menuOption2 && formik.errors.menuOption2
                }
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
                value={formik.values.menuOption3}
                onChange={formik.handleChange}
                error={
                  formik.touched.menuOption3 &&
                  Boolean(formik.errors.menuOption3)
                }
                helperText={
                  formik.touched.menuOption3 && formik.errors.menuOption3
                }
              />
            </Stack>
          </Grid>

          <Grid item xs={12}>
            <Button type="submit" className="btn_submit">
              Add Service
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
};

export default CreateService;
