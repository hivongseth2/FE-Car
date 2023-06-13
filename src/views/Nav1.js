import React, { useState } from "react";
import { useEffect } from "react";
import "../styles/Nav1.scss"; // Import file CSS tương ứng
import { NavLink } from "react-router-dom";
import logo from "../img/zyro-image.png";
import login from "../img/login.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FlastInfo from "./Forms/FlastInfo";

import { faUserPlus, faSignInAlt } from "@fortawesome/free-solid-svg-icons";

const Nav1 = () => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
  const role = user.role;
  console.log(role);
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
        <NavLink to="/" exact={true} className="parent">
          Trang chủ
        </NavLink>

        <NavLink to="/page-mxh" className="parent">
          Mạng xã hội
        </NavLink>
        {role === "ROLE_USER" && (
          <NavLink to="/info-sudent" className="parent">
            Thông tin học viên
          </NavLink>
        )}

        {(role === "ROLE_ADMIN" || role === "ROLE_STAFF") && (
          <NavLink to="/admin-login" className="parent">
            Chỉnh sửa thông tin
          </NavLink>
        )}
      </div>
      <div className="submenu login-register-submenu">
        <div className="logo">
          <img src={login} alt="logo" className="parentLogo" />
          <NavLink to="/login" className="subItem">
            <FontAwesomeIcon icon={faSignInAlt} /> Đăng Nhập
          </NavLink>
          <NavLink to="/register" className="subItem">
            {" "}
            {""}
            <FontAwesomeIcon icon={faUserPlus} />
            Đăng kí
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Nav1;
