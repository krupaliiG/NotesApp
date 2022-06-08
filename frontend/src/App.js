import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
import Register from "./components/Register";
import Profile from "./components/Profile";
import "./App.css";

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/myprofile" component={Profile} />
    </Switch>
  </BrowserRouter>
);
export default App;
