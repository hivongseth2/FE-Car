import React from "react";
import HomePage from "./views/HomePage";

import Nav from "./views/Nav";
import Sidebar from "./views/Sidebar";
import { ToastContainer, toast } from "react-toastify";
// import "dotenv/config";
// require("dotenv").config();
import Sliderr from "./views/Sliderr";
import "react-toastify/dist/ReactToastify.css";
import Register from "./views/Register";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import SocialMedia from "./views/SocialMedia";
// import { Helmet } from "react-helmet";

//admin
import MainLayoutAdmin from "./views/Dashboard/MainLayoutAdmin";
import InfoStudentForAdmin from "./views/Dashboard/InfoStudentForAdmin";
import QuanLyBang from "./views/Dashboard/QuanLyBang";
import NewCustomer from "./views/Dashboard/NewCustomer";

import InfoStudent from "./views/InfoStudent";
import Logins from "./views/Logins";
import Facebook from "./views/Facebook";
import BangDetail from "./views/BangDetail";

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Nav />

          <Switch>
            <Route path="/" exact>
              {/* <HomePage></HomePage> */}
              <Sliderr></Sliderr>
            </Route>
            <Route path="/register">
              <Register />
            </Route>

            <Route path="/login">
              <Logins />
            </Route>

            <Route path="/socialmedia">
              <SocialMedia />
            </Route>
            <Route path="/edit-admin">
              <MainLayoutAdmin />
            </Route>
            <Route path="/info-sudent">
              <InfoStudent />
            </Route>
            <Route path="/edit-info">
              <InfoStudentForAdmin />
            </Route>
            <Route path="/edit-bang">
              <QuanLyBang />
            </Route>
            <Route path="/edit-new-customer">
              <NewCustomer />
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
        <Sidebar />
      </div>
    </Router>
  );
}
export default App;
