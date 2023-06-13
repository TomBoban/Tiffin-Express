import React, { useEffect } from "react";
import "./Login.css";
import { Grid } from "@mui/material";
import { Link, useHistory } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { registerUserAction } from "../../redux/slice/usersSlice";

//Form Schema
const formSchema = Yup.object({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  email: Yup.string().required("Email is required"),
  password: Yup.string().required("Password is required"),
});

export const Register = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const storeData = useSelector((store) => store.userReducer);
  const { loading, isRegistered, appErr, serverErr } = storeData;

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      dispatch(registerUserAction(values));
    },
    validationSchema: formSchema,
  });

  useEffect(() => {
    if (isRegistered) {
      history.push("/login");
    }
  }, [history, isRegistered]);

  return (
    <Grid
      container
      rowSpacing={1}
      columnSpacing={{ xs: 1, sm: 1, md: 1 }}
      className="log_main"
    >
      <Grid item xs={12} md={6} className="bg1-img">
        <div className="log_info">
          <div className="typing">
            <h1>Welcome To Tiffin Express</h1>
          </div>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled
          </p>
        </div>
      </Grid>
      <Grid item xs={12} md={6} className="form-section">
        <div className="login-inner-form">
          <div className="details">
            <Link to="#">
              <img src="images/tf-logo.png" alt="logo" />
            </Link>
            <h3>
              {appErr || serverErr ? (
                <div className="err_register">
                  {serverErr} {appErr}
                </div>
              ) : null}
            </h3>
            <form onSubmit={formik.handleSubmit}>
              <div className="form-group form-box">
                <input
                  value={formik.values.firstName}
                  onChange={formik.handleChange("firstName")}
                  onBlur={formik.handleBlur("firstName")}
                  className="form-control"
                  type="firstName"
                  placeholder="First Name"
                  required
                />
              </div>

              <div className="form-group form-box">
                <input
                  value={formik.values.lastName}
                  onChange={formik.handleChange("lastName")}
                  onBlur={formik.handleBlur("lastName")}
                  className="form-control"
                  type="lastName"
                  placeholder="Last Name"
                  required
                />
              </div>
              <div className="form-group form-box">
                <input
                  value={formik.values.email}
                  onChange={formik.handleChange("email")}
                  onBlur={formik.handleBlur("email")}
                  className="form-control"
                  type="email"
                  placeholder="Email"
                  required
                />
              </div>

              <div className="form-group form-box">
                <input
                  value={formik.values.password}
                  onChange={formik.handleChange("password")}
                  onBlur={formik.handleBlur("password")}
                  type="password"
                  className="form-control"
                  autoComplete="off"
                  placeholder="Password"
                />
              </div>
              <div className="form-group form-box checkbox clearfix">
                <div className="form-check checkbox-theme">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="rememberMe"
                  />
                  <label className="form-check-label" htmlFor="rememberMe">
                    Remember me
                  </label>
                </div>
              </div>
              <div className="form-group">
                {loading ? (
                  <button disabled className="btn-md btn-theme w-100">
                    Loading please wait....
                  </button>
                ) : (
                  <button type="submit" className="btn-md btn-theme w-100">
                    Register
                  </button>
                )}
              </div>
              <p>
                Already a member?
                <Link to="/login">Login here</Link>
              </p>
            </form>
          </div>
        </div>
      </Grid>
    </Grid>
  );
};
