import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faBars,
  faUserPlus,
  faSignInAlt,
  faSignOutAlt,
  faShareAlt,
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
      <input type="checkbox" id="menu-toggle" className="menu-toggle" />
      <label htmlFor="menu-toggle" className="menu-icon">
        <FontAwesomeIcon icon={faBars} />
      </label>
      <div className="mainMenu">
        <NavLink to="/">
          <FontAwesomeIcon id="a" icon={faHome}>
            {" "}
          </FontAwesomeIcon>
          <p className="menu-content1">Trang chủ</p>
        </NavLink>
        <NavLink to="/socialmedia">
          <FontAwesomeIcon id="a" icon={faShareAlt}></FontAwesomeIcon>
          <p className="menu-content2">Social Media</p>
        </NavLink>
        <NavLink to="/edit-admin">Chỉnh sửa thông tin</NavLink>
        <NavLink to="/info-sudent">Thông tin học viên</NavLink>
      </div>
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
          <span className="hotline">Hotline: 0909789789</span>
        </div>
      )}
    </div>
  );
};

export default Nav;
