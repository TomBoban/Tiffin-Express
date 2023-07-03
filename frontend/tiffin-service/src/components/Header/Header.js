import { Grid } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

export const Header = () => {
  return (
    <Grid className="menu-area">
      <div className="rts-menu-area">
        <Link to="/" className="logo">
          <img src="images/logo-nb1.png" alt="logo" className="img-logo" />
        </Link>

        <div className="main-menu">
          <ul className="nav-menu mb-0">
            <Link to="/products" className="log_link">
              <li>Products</li>
            </Link>
            <Link to="/aboutus" className="log_link">
              <li>About Us</li>
            </Link>            
            <Link to="/login" className="log_link">
              <li>Login</li>
            </Link>
          </ul>
        </div>
      </div>
    </Grid>
  );
};
