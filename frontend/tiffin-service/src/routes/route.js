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

export const MainRoutes = () => {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/aboutus" component={AboutUs} />
        <Route exact path="/products" component={Products} />
        <Route exact path="/products/:id" component={ProductDetails} />
        <Route exact path="/profile" component={Profile} />
      </Switch>
      <Footer />
    </BrowserRouter>
  );
};
