import "./Footer.css";
import React from "react";
import { Link } from "react-router-dom";

export const Footer = () => {
    return (
        <div className='Footer'>
            <div className='container-footer'>
                <div className='row p-0 m-0'>
                <div className="col foot-1">
                        <img src="images/logo-nb1.png" alt="logo" className="img-logo" />
                        <p>The best tiffin service in the Waterloo.<br/> Grab new offers and register now!<br/>
                           Subscribe, Eat, Enjoy!<br/></p>
                    </div>
                    <div className="col foot-2">
                        <h3>Quick Links</h3>
                        <ul className='quick-links align-items-left'>
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
                    <div className="col foot-3">
                        <h3>Contact Us</h3>
                        <p><i className="fa-sharp fa-solid fa-phone"></i> +1 234-456-7890</p>
                        <p><i className="fa-solid fa-envelope"></i> tiffinexpress@gmail.com</p>
                        <p><i className="fa-solid fa-location-dot"></i> Waterloo, ON, CA</p>
                    </div>
                </div>

                <small>&copy; Tiffin Express Inc., All rights reserved.</small>

          
      </div>
    </div>
  );
};
