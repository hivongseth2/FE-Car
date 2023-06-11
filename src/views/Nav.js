import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faUserPlus,
  faSignInAlt,
} from "@fortawesome/free-solid-svg-icons";
import logo from "../img/Logo-IUH.jpg";
import "../styles/Nav.scss";
import FlastInfo from "./Forms/FlastInfo";

const Nav = () => {
  const token = localStorage.getItem("token");
  const [isLoggedIn, setIsLoggedIn] = useState(!!token);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  return (
    <div className="topnav">
      <div className="logo">
        <img src={logo} alt="logo" className="logo" />
      </div>
      <div className="mainMenu">
        <NavLink to="/">
          <FontAwesomeIcon icon={faHome} />
          Trang chủ
        </NavLink>
      </div>
      <NavLink to="/admin-login">Chỉnh sửa thông tin</NavLink>
      <NavLink to="/info-sudent">Thông tin học viên</NavLink>
      <NavLink to="/page-mxh">Mạng xã hội</NavLink>
      {isLoggedIn ? (
        <div className="submenu">
          <FlastInfo onLogout={handleLogout} />
        </div>
      ) : (
        <div className="submenu">
          <NavLink to="/login">
            <FontAwesomeIcon icon={faSignInAlt} />
            Đăng Nhập
          </NavLink>
          <NavLink to="/register">
            <FontAwesomeIcon icon={faUserPlus} />
            Đăng kí
          </NavLink>
          <span className="hotline">Holine:0909789789</span>
        </div>
      )}
    </div>
  );
};

export default Nav;
