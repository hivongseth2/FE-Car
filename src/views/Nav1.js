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

        {/* <a href="#About" className="expandHome">
          <NavLink to="/admin-login" className="parent">
            Chỉnh sửa thông tin
          </NavLink>
        </a>
        <div className="subnav">
          <button className="subnavbtn">
            Clients<i className="fa fa-caret-down"></i>
          </button>
          <div className="subnav-content">
            <div id="subnav-trapezoid">
              <a href="#Clients">Burger King</a>
              <a href="#Clients">Southwest Airlines</a>
              <a href="#Clients">Levi Strauss</a>
            </div>
          </div>
        </div> */}
        {/* 
        <div className="subnav">
          <button className="subnavbtn">
            Services<i className="fa fa-caret-down"></i>
          </button>
          <div className="subnav-content">
            <div className="subnav-trapezoid">
              <a href="#Services">Print Design</a>
              <a href="#Services">Web Design</a>
              <a href="#Services">Mobile App Development</a>
            </div>
          </div>
        </div> */}
      </div>
      <div className="submenu">
        <div className="logo">
          <img src={login} alt="logo" className="parentLogo" />
          <NavLink to="/login" className="subItem">
            <FontAwesomeIcon icon={faSignInAlt} />
            Đăng Nhập
          </NavLink>
          <NavLink to="/register" className="subItem">
            <FontAwesomeIcon icon={faUserPlus} />
            Đăng kí
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Nav1;
