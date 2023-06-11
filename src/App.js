import React from "react";

import Nav from "./views/Nav";
import Sidebar from "./views/Sidebar";
import { ToastContainer} from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import Register from "./views/Register";
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
// import { Helmet } from "react-helmet";

//admin
import MainLayoutAdmin from "./views/Dashboard/MainLayoutAdmin";
import InfoStudentForAdmin from "./views/Dashboard/InfoStudentForAdmin";
import QuanLyBang from "./views/Dashboard/QuanLyBang";
import NewCustomer from "./views/Dashboard/NewCustomer";

import InfoStudent from "./views/InfoStudent";
import Logins from "./views/Logins";
import SocialPage from "./views/SocialPage";
import Slider from "./views/Slider";
import AdminLogin from "./views/Dashboard/AdminLogin";
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

            <Route path="/edit-admin">
              <MainLayoutAdmin />
            </Route>
            <Route path="/info-sudent">
              <InfoStudent />
            </Route>

            <Route path="/page-mxh">
              <SocialPage />
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
              <AdminLogin/>
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
