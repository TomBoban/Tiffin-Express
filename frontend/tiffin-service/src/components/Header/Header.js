import { Grid } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { logoutAction } from "../../redux/slice/usersSlice";
import Dropdown from "react-dropdown-select";
import { ServiceNavbar } from "./ServiceNavbar/ServiceNavbar";
import AdminSidebar from "./AdminNavbar/AdminNavbar";

export const Header = () => {
  const userAuth = useSelector((state) => state.userReducer.userAuth);

  const history = useHistory();
  const dispatch = useDispatch();

  const logoutFn = async () => {
    await dispatch(logoutAction());
    history.push("/login");
  };
  const profileFn = async () => {
    history.push(`/profile/${userAuth?._id}`);
  };

  const handleOptionSelect = (selectedOptions) => {
    if (selectedOptions.length > 0) {
      const selectedOption = selectedOptions[0].value;
      if (selectedOption === "logout") {
        logoutFn();
      } else if (selectedOption === "profile") {
        profileFn();
      } else if (selectedOption === "username") {
        // Handle username click
      }
    }
  };

  const dropdownOptions = [
    { value: "profile", label: "Profile" },

    { value: "logout", label: "Logout" },
  ];

  return (
    <>
    {
      userAuth?.role === "Customer" ? (<Grid className="menu-area">
      <div className="rts-menu-area">
        <Link to="/" className="logo">
          <img src="/images/logo-nb1.png" alt="logo" className="img-logo" />
        </Link>

        <ul className="nav-menu mb-0">
          <Link to="/products" className="log_link">
            <li>Products</li>
          </Link>
          <Link to="/aboutus" className="log_link">
            <li>About Us</li>
          </Link>
          {userAuth ? (
            <div className="dropdown-container">
              <Dropdown
                options={dropdownOptions}
                className="user_dropdown"
                onChange={handleOptionSelect}
                placeholder={`${userAuth?.firstName} ${userAuth?.lastName}`}
                dropdownHandleRenderer={(selectedOption, placeholder) => (
                  <li>
                    {selectedOption ? selectedOption.label : placeholder} ▼
                  </li>
                )}
                searchable={false}
              />
            </div>
          ) : (
            <Link to="/login" className="log_link">
              <li>Login</li>
            </Link>
          )}
        </ul>
      </div>
    </Grid>) : userAuth?.role === "Service" ? (
      <ServiceNavbar/>
    ) : userAuth?.role === "Admin" ? (
      <AdminSidebar/>
    ) 
    : (
      <Grid className="menu-area">
      <div className="rts-menu-area">
        <Link to="/" className="logo">
          <img src="images/logo-nb1.png" alt="logo" className="img-logo" />
        </Link>

        <ul className="nav-menu mb-0">
          <Link to="/products" className="log_link">
            <li>Products</li>
          </Link>
          <Link to="/aboutus" className="log_link">
            <li>About Us</li>
          </Link>
          {userAuth ? (
            <div className="dropdown-container">
              <Dropdown
                options={dropdownOptions}
                className="user_dropdown"
                onChange={handleOptionSelect}
                placeholder={`${userAuth?.firstName} ${userAuth?.lastName}`}
                dropdownHandleRenderer={(selectedOption, placeholder) => (
                  <li>
                    {selectedOption ? selectedOption.label : placeholder} ▼
                  </li>
                )}
                searchable={false}
              />
            </div>
          ) : (
            <Link to="/login" className="log_link">
              <li>Login</li>
            </Link>
          )}
        </ul>
      </div>
    </Grid>
    )
    }

    </>
    
  );
};
