import React from "react";
import Dashboard from "../layouts/Dashboard/Dashboard.jsx";
import Login from "../views/Login/Login.view";
import LoginOTPView from "../views/LoginOTP/LoginOTP.view.js";

import { Route, Switch } from "react-router-dom";

const RouteComponent = () => (
  <Switch>
    <Route path={"/login"} component={Login} />
    <Route path={"/other"} component={LoginOTPView} />
    <Route path={"/"} component={Dashboard} />
  </Switch>
);
export default RouteComponent;
