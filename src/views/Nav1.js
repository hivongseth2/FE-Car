import React, { useState } from "react";
import { useEffect } from "react";
import "../styles/Nav1.scss"; // Import file CSS tương ứng
import { NavLink } from "react-router-dom";
import logo from "../img/zyro-image.png";
import login from "../img/login.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FlastInfo from "./Forms/FlastInfo";

import {
  faHome,
  faBars,
  faUserPlus,
  faSignInAlt,
  faSignOutAlt,
  faShareAlt,
} from "@fortawesome/free-solid-svg-icons";

const Nav1 = () => {
  const token = localStorage.getItem("token");
  const [isLoggedIn, setIsLoggedIn] = useState(!!token);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  const [isAtTop, setIsAtTop] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setIsAtTop(window.scrollY === 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <nav className={`navbar ${isAtTop ? "" : "transparent-bg"}`}>
      <div className="logo">
        <img src={logo} className="logoct" alt="logo" />
      </div>

      <div id="trapezoid">
        <a className="sub-home" href="#">
          Home
        </a>

        <NavLink to="/" exact={true} className="parent">
          Trang chủ
        </NavLink>

        <NavLink to="/page-mxh" className="parent">
          Mạng xã hội
        </NavLink>

        <NavLink to="/page-mxh" className="parent">
          Mạng xã hội
        </NavLink>
      </div>
      <div className="submenu">
        <NavLink to="/login" className="subItem" style={{ border: "none" }}>
          <img src={login} alt="logo" className="parentLogo" />
        </NavLink>
      </div>
    </nav>
  );
};

export default Nav1;
