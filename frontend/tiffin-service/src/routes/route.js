import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Login } from "../pages/Login/Login";

import { Register } from "../pages/Login/Register";
import LandingPage from "../pages/LandingPage/LandingPage";
import { Products } from "../pages/Products/Products";
import { Header } from "../components/Header/Header";

export const MainRoutes = () => {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />

        <Route exact path="/products" component={Products} />
      </Switch>
    </BrowserRouter>
  );
};
