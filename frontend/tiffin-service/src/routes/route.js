import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Login } from "../pages/Login/Login";

import { Register } from "../pages/Login/Register";
import LandingPage from "../pages/LandingPage/LandingPage";

export const MainRoutes = () => {
  return (
    <BrowserRouter>
      {/* <Header /> */}
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/login2" component={Login} />
        <Route exact path="/register" component={Register} />
      </Switch>
    </BrowserRouter>
  );
};
