import { Grid } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

export const Header = () => {
  return (
    <Grid className="menu-area">
      <div className="rts-menu-area">
        <div className="logo">
          <img src="images/logo-nb1.png" alt="logo" className="img-logo" />
        </div>

        <div className="main-menu">
          <ul className="nav-menu">
            <li>Products</li>

            <li>About Us</li>
            <Link to="/login" className="log_link">
              <li>Login</li>
            </Link>
          </ul>
        </div>
      </div>
    </Grid>
  );
};
