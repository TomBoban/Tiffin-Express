import { Grid } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import "../Header.css";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { logoutAction } from "../../../redux/slice/usersSlice";
import Dropdown from "react-dropdown-select";
import Sidebar from "../../Sidebar/Sidebar";

export const ServiceNavbar = () => {
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
      <Sidebar/>
    </>
    // <Grid className="menu-area">
    //   <div className="rts-menu-area">
    //     <Link to="/service/dashboard" className="logo">
    //       <img src="/images/logo-nb1.png" alt="logo" className="img-logo" />
    //     </Link>

    //     <ul className="nav-menu mb-0">
    //       <Link to="#" className="log_link">
    //         <li>Add Service</li>
    //       </Link>
    //       <Link to="#" className="log_link">
    //         <li>View Service</li>
    //       </Link>
    //       {userAuth ? (
    //         <div className="dropdown-container">
    //           <Dropdown
    //             options={dropdownOptions}
    //             className="user_dropdown"
    //             onChange={handleOptionSelect}
    //             placeholder={`${userAuth?.firstName} ${userAuth?.lastName}`}
    //             dropdownHandleRenderer={(selectedOption, placeholder) => (
    //               <li>
    //                 {selectedOption ? selectedOption.label : placeholder} ▼
    //               </li>
    //             )}
    //             searchable={false}
    //           />
    //         </div>
    //       ) : (
    //         <Link to="/login" className="log_link">
    //           <li>Login</li>
    //         </Link>
    //       )}
    //     </ul>
    //   </div>
    // </Grid>
  );
};
