import React from "react";
// import "./App.css";
import HomePage from "./views/HomePage";
import MainLayout from "./views/MainLayout";
import { useEffect } from "react";
import Nav from "./views/Nav";
// import Slider from "./views/Slider";
import Slider from "./views/Slider";
import { ToastContainer, toast } from "react-toastify";
// import "dotenv/config";
// require("dotenv").config();

import "react-toastify/dist/ReactToastify.css";
import Register from "./views/Register";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
// import { Helmet } from "react-helmet";
import BangDetail from "./views/BangDetail";
import Logins from "./views/Logins";
import Facebook from "./views/Facebook";
function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Nav />

          <Switch>
            <Route path="/" exact>
              {/* <HomePage></HomePage> */}
              <Slider></Slider>
            </Route>
            <Route path="/register">
              <Register />
            </Route>
            <Route path="/login">
              <Logins />
            </Route>

            <Route path="/socialmedia">
              <Facebook />
            </Route>
          </Switch>
        </header>
        <ToastContainer
          position="bottom-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </div>
    </Router>
  );
}
export default App;
