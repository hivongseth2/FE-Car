import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTools,
  faInfoCircle,
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
        {/* <a href={`${process.env.REACT_DOMAIN}`}> */}{" "}
        <img src={logo} alt="logo" className="logo" />
        {/* </a> */}
      </div>
      <input type="checkbox" id="menu-toggle" className="menu-toggle" />
      <label htmlFor="menu-toggle" className="menu-icon">
        <FontAwesomeIcon icon={faBars} />
      </label>
      <div className="mainMenu">
        <NavLink to="/">
          {/* </FontAwesomeIcon> */}
          <p className="menu-content1">
            <FontAwesomeIcon id="a" icon={faHome} />
            Trang chủ
          </p>
        </NavLink>

        <NavLink to="/socialmedia">
          <p className="menu-content2">
            <FontAwesomeIcon id="a" icon={faShareAlt}></FontAwesomeIcon>Social
            Media
          </p>
        </NavLink>
        <NavLink to="/edit-admin">
          <p className="menu-content3">
            {" "}
            <FontAwesomeIcon id="a" icon={faTools} />
            Chỉnh sửa thông tin
          </p>
        </NavLink>
        <NavLink to="/info-sudent">
          <p className="menu-content4">
            <FontAwesomeIcon id="a" icon={faInfoCircle} />
            Thông tin học viên
          </p>
        </NavLink>
      </div>
      {isLoggedIn ? (
        <div className="submenu">
          <FlastInfo onLogout={handleLogout} />
        </div>
      ) : (
        <div className="submenu">
          <NavLink to="/login">
            <p className="menu-content5">
              <FontAwesomeIcon icon={faSignInAlt} id="a" />
              Đăng Nhập{" "}
            </p>
          </NavLink>
          <NavLink to="/register">
            <p className="menu-content6">
              {" "}
              <FontAwesomeIcon icon={faUserPlus} id="a" />
              Đăng kí
            </p>
          </NavLink>
          <span className="hotline">Hotline: 0909789789</span>
        </div>
      )}
    </div>
  );
};

export default Nav;
