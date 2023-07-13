import React from "react";
import "./CreateService.css";
import {
  Button,
  Checkbox,
  Container,
  Grid,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { Formik, Form } from "formik";
import * as Yup from "yup";

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
    <Grid container>
      <Grid item xs={12}>
        <Container maxWidth="md">
          <div className="formWrapper">
            <Formik
              initialValues={{
                ...INITIAL_FORM_STATE,
              }}
              validationSchema={FORM_VALIDATION}
              onSubmit={(values) => {
                console.log(values);
              }}
            >
              <Form>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography>Add Your Service </Typography>
                  </Grid>

                  <Grid item xs={12} lg={12}>
                    <TextField name="name" label="Name"  sx={{width:"100%"}}/>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField name="description" label="Description"   sx={{width:"100%"}}/>
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                     sx={{width:"100%"}}
                      name="shortDescription"
                      label="Short Description"
                    />
                  </Grid>

                  <Grid item xs={12} >
                    <TextField name="price" label="Price"  sx={{width:"100%"}} />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField name="menuOption1" label="Menu 1"  sx={{width:"100%"}} />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField name="menuOption2" label="Menu 2"  sx={{width:"100%"}} />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField name="menuOption3" label="Menu 3"  sx={{width:"100%"}} />
                  </Grid>

                  <Grid item xs={12}>
                    <Button>Submit Form</Button>
                  </Grid>
                </Grid>
              </Form>
            </Formik>
          </div>
        </Container>
      </Grid>
    </Grid>
  );
};
export default CreateService;
