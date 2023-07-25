
import React from "react";

import "../Header.css";

import Sidebar from "../../Sidebar/Sidebar";

export const ServiceNavbar = () => {


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
