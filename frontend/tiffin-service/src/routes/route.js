import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Login } from "../pages/Login/Login";

import { Register } from "../pages/Login/Register";
import LandingPage from "../pages/LandingPage/LandingPage";
import { Products } from "../pages/Products/Products";
import { Header } from "../components/Header/Header";
import { AboutUs } from "../pages/About Us/AboutUs";
import { Footer } from "../components/Footer/Footer";
import { Profile } from "../pages/Profile/Profile";
import { ProductDetails } from "../pages/ProductDetails/ProductDetails";
import { ServiceDashboard } from "../pages/ServiceDashboard/ServiceDashboard";

import { useSelector } from "react-redux";
import CreateService from "../pages/Services/CreateService/CreateService";
import { AdminDash } from "../pages/AdminDashboard/AdminDash";
import ServiceList from "../pages/Admin/ServiceList/ServiceList";


export const MainRoutes = () => {
  const storeData = useSelector((store) => store.userReducer);
  const {  userAuth } = storeData;
  return (
    <BrowserRouter>
    <div className="wrapper">
    <Header />
    <div className={userAuth?.role === "Customer" ? "content" : userAuth?.role === "Service" ? "content2" : userAuth?.role === "Admin" ? "content2" :"content"}>
    <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/aboutus" component={AboutUs} />
        <Route exact path="/products" component={Products} />
        <Route exact path="/products/:id" component={ProductDetails} />
        <Route exact path="/profile/:id" component={Profile} />
        <Route exact path="/service/dashboard" component={ServiceDashboard} />
        <Route exact path="/service/create-service" component={CreateService} />
        <Route exact path="/admin/dashboard" component={AdminDash}/>
        <Route exact path="/admin/service-list" component={ServiceList}/>
      </Switch>

    </div>
    <div className={userAuth?.role === "Customer" ? "footer" : userAuth?.role === "Service" ? "footer2" : "footer2"}>
    <Footer />
    </div>
      
      
    </div>
      
    </BrowserRouter>
  );
};
