import React from "react";
import Cards from "../Cards/Cards";
import "./MainDash.css";
const MainDash = () => {
  return (
    <div className="MainDash">
    <h1 className="welcome">Welcome to Tiffin-Express</h1>
      <Cards />
      <div className="main_dashh">
      <h3>Start registering your self to start a business and join our organization!</h3>
      <p className="descr">Are you passionate about food and customer service? Join our team at Tiffin Express, where we take pride in delivering scrumptious and wholesome tiffin meals to our cherished patrons. As a valued member, you'll be a part of a supportive and dynamic environment, dedicated to culinary excellence and customer satisfaction. Whether you're a talented chef, a skilled delivery professional, or an enthusiastic customer service representative, we welcome you to register with us. Let's work together to create delightful culinary experiences, spread smiles, and make a lasting impact on the lives of our customers. Visit our website now to be a part of the Tiffin Express family!</p>
  
      </div>
       </div>
  );
};

export default MainDash;
