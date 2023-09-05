import React from "react";
import Dashboard from "../layouts/Dashboard/Dashboard.jsx";
import Login from "../views/Login/Login.view";
import { Route, Switch } from "react-router-dom";

const RouteComponent = () => (
  <Switch>
    <Route path={"/login"} component={Login} />
    <Route path={"/"} component={Dashboard} />
  </Switch>
);
export default RouteComponent;
