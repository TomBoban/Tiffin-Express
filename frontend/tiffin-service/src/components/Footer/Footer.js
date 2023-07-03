import './Footer.css';
import React from "react";
import {Link} from "react-router-dom";

export const Footer = () => {
    return (
        <div className='Footer'>
            <div className='container'>
                <div className='row'>
                    <div className="col-sm-4 col-lg-4 foot-1">
                        <img src="images/logo-nb1.png" alt="logo" className="img-logo" />
                        <p>The best tiffin service in the Waterloo. Grab new offers and register now!<br/>
                           Subscribe, Eat, Enjoy!<br/>
                        &copy; 2023 Tiffin-Express</p>
                        <div className='footer-icons'>
                            <i class="fa-brands fa-facebook"></i>
                            <i class="fa-brands fa-twitter"></i>
                            <i class="fa-brands fa-instagram"></i>
                            <i class="fa-brands fa-youtube"></i>
                        </div>
                    </div>
                    <div className="col-sm-4 col-lg-4 foot-2">
                        <h3>Quick Links</h3>
                        <ul className='quick-links align-items-center'>
                            <Link to="/products" className="log_link">
                                <li>Products</li>
                            </Link>

                            <li>About Us</li>
                            <Link to="/login" className="log_link">
                                <li>Login</li>
                            </Link>
                        </ul>
                    </div>
                    <div className="col-sm-4 col-lg-4 foot-3">
                        <h3>Contact us:</h3>
                        <p><i class="fa-sharp fa-solid fa-phone"></i> +1 234-456-7890</p>
                        <p><i class="fa-solid fa-envelope"></i> tiffinexpress@gmail.com</p>
                        <p><i class="fa-solid fa-location-dot"></i> Waterloo, ON, CA</p>
                    </div>
                </div>
            </div>
        </div>
    );
};