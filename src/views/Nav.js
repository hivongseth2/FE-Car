import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGlobe,
  faBars,
  faUserPlus,
  faSignInAlt,
  faCircleInfo,
  faPenToSquare,
  faHouse,
} from "@fortawesome/free-solid-svg-icons";
import logo from "../img/logott.jpg";
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
      <input type="checkbox" id="menu-toggle" className="menu-toggle" />
      <label htmlFor="menu-toggle" className="menu-icon">
      <FontAwesomeIcon icon={faBars} size="xs" style={{color: "#000000",}} />
      </label>
      <div className="mainMenu">
        <NavLink to="/" exact activeClassName="custom-active">
          <div className="logo-img">
            <img src={logo} alt="logo" className="logo" />
          </div>
        </NavLink>
        <NavLink to="/" exact={true}>
          {/* <FontAwesomeIcon icon={faHouse} size="2xs" style={{ color: "#000000" }} /> {""} */}
          Trang chủ
        </NavLink>

        <NavLink to="/page-mxh">
          {/* <FontAwesomeIcon icon={faGlobe} size="2xs" style={{ color: "#000000" }} /> {""} */}
          Mạng xã hội
        </NavLink>
        <NavLink to="/admin-login">
          {/* <FontAwesomeIcon icon={faPenToSquare} size="2xs" style={{ color: "#000000" }} />{" "} */}
          {""}
          Chỉnh sửa thông tin
        </NavLink>
        <NavLink to="/info-sudent">
          {/* <FontAwesomeIcon icon={faCircleInfo} size="2xs" style={{ color: "#000000" }} />{" "} */}
          {""}
          Thông tin học viên
        </NavLink>
      </div>
      {isLoggedIn ? (
        <div className="submenu fast-info">
          <FlastInfo onLogout={handleLogout} />
        </div>

      ) : (
        <div className="submenu">
          <NavLink to="/login">
            {/* <FontAwesomeIcon size="2xs" icon={faSignInAlt} /> {" "} */}
            Đăng Nhập
          </NavLink>
          <NavLink to="/register">
            {/* <FontAwesomeIcon size="2xs" icon={faUserPlus} /> {" "}  */}
            Đăng kí
          </NavLink>
          <span className="hotline">Hotline: 0909789789</span>
        </div>
      )}
    </div>
  );
};

export default Nav;
