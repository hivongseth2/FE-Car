import React from "react";

import Nav from "./views/Nav";
import Sidebar from "./views/Sidebar";
import Footer from "./views/Footer";
import { ToastContainer, toast } from "react-toastify";
// import "dotenv/config";
// require("dotenv").config();
import Sliderr from "./views/Sliderr";
import "react-toastify/dist/ReactToastify.css";
import Register from "./views/Register";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SlideAdmin from "./views/SlideAdmin/SlideAdmin";

//admin
import MainLayoutAdmin from "./views/Dashboard/MainLayoutAdmin";
import InfoStudentForAdmin from "./views/Dashboard/InfoStudentForAdmin";
import QuanLyBang from "./views/Dashboard/QuanLyBang";
import NewCustomer from "./views/Dashboard/NewCustomer";
import FollowAdmin from "./views/FollowAdmin/FollowAdmin";
import InfoStudent from "./views/InfoStudent";
import Logins from "./views/Logins";
import SocialPage from "./views/SocialPage";
import AdminLogin from "./views/Dashboard/AdminLogin";
import Contact from "./views/Contact";
import Certificate from "./views/Certificate";
import StudentManagement from "./views/Dashboard/StudentManagement";

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

            <Route path="/edit-admin">
              <MainLayoutAdmin />
            </Route>
            <Route path="/info-sudent">
              <InfoStudent />
            </Route>

            <Route path="/page-mxh">
              <SocialPage />
            </Route>

            <Route path="/edit-slide">
              <SlideAdmin></SlideAdmin>
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
            <Route path="/admin-login">
              <AdminLogin />
            </Route>
            <Route path="/contact">
              <Contact />
            </Route>
            <Route path="/certificate">
              <Certificate />
            </Route>
            <Route path="/student-management">
              <StudentManagement />
            </Route>
            <Route path="/account-management">
              <InfoStudentForAdmin />
            </Route>
            <Route path="/follow-admin">
              <FollowAdmin />
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
        <Footer />
      </div>
    </Router>
  );
}
export default App;
