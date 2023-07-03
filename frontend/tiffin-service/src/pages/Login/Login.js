import React, { useEffect } from "react";
import "./Login.css";
import { Grid } from "@mui/material";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  clearLoginData,
  clearUserData,
  loginUserAction,
} from "../../redux/slice/usersSlice";
import { useFormik } from "formik";
import * as Yup from "yup";

const formSchema = Yup.object({
  email: Yup.string().required("Email is required"),
  password: Yup.string().required("Password is required"),
});

export const Login = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const storeData = useSelector((store) => store.userReducer);
  const { loading, appErr, serverErr, isLoggedIn } = storeData;

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      dispatch(loginUserAction(values));
    },
    validationSchema: formSchema,
  });

  useEffect(() => {
    dispatch(clearUserData());
    if (isLoggedIn) {
      history.push("/products");
    } else {
      dispatch(clearLoginData());
    }
  }, [dispatch, history, isLoggedIn]);

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
            <Link to="/">
              <img src="images/tf-logo.png" alt="logo" />
            </Link>

            {appErr || serverErr ? toast.error(appErr) : null}
            <form onSubmit={formik.handleSubmit}>
              <div className="form-group form-box">
                <input
                  value={formik.values.email}
                  onChange={formik.handleChange("email")}
                  onBlur={formik.handleBlur("email")}
                  type="email"
                  className="form-control"
                  placeholder="Email Address"
                  required
                />
              </div>

              <div className="form-group form-box">
                <input
                  type="password"
                  className="form-control"
                  autoComplete="off"
                  placeholder="Password"
                  value={formik.values.password}
                  onChange={formik.handleChange("password")}
                  onBlur={formik.handleBlur("password")}
                  required
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
                <Link to="#">Forgot Password</Link>
              </div>
              <div className="form-group">
                {loading ? (
                  <button disabled className="btn-md btn-theme w-100">
                    Loading please wait....
                  </button>
                ) : (
                  <button type="submit" className="btn-md btn-theme w-100">
                    Login
                  </button>
                )}
              </div>
              <p>
                Don't have an account?
                <Link to="/register">Register here</Link>
              </p>
            </form>
          </div>
        </div>
      </Grid>
      <ToastContainer />
    </Grid>
  );
};
