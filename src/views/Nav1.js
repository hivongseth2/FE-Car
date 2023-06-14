import React, { useState } from "react";
import { useEffect } from "react";
import "../styles/Nav1.scss"; // Import file CSS tương ứng
import { NavLink } from "react-router-dom";
import logo from "../img/zyro-image.png";
import login from "../img/login.png";
import menu from "../img/menu.png";
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

  // const isMobile = window.innerWidth < 768; // Xác định nếu là điện thoại di động
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isMobile]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
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

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      {isMobile ? (
        <nav
          className={`navbar ${isAtTop ? "" : "transparent-bg"} ${
            isMenuOpen ? "open" : ""
          }`}
        >
          <div className="logo">
            <img src={logo} className="logoct" alt="logo" />
          </div>

          <div id={`trapezoid`}>
            <a className="sub-home" href="#">
              Home
            </a>
            <input
              type="checkbox"
              id="menu-toggle"
              className="menu-toggle"
              checked={isMenuOpen}
            />

            <label
              htmlFor="menu-toggle"
              className="menu-icon"
              onClick={toggleMenu}
            >
              <img src={logo} className="menuIcon" alt="menu" />
            </label>

            <div className={`menu ${isMenuOpen ? "open" : ""}`}>
              {/* Nội dung menu */}
              <div className={`menu-content `}>
                <NavLink
                  to="/"
                  exact={true}
                  className="parent"
                  onClick={closeMenu}
                >
                  Trang chủ
                </NavLink>

                <NavLink to="/page-mxh" className="parent" onClick={closeMenu}>
                  Mạng xã hội
                </NavLink>

                {isLoggedIn ? (
                  <FlastInfo onLogout={handleLogout} className="rotate" />
                ) : (
                  <div className={` menu ${isMenuOpen ? "open" : ""}`}>
                    <NavLink
                      to="/login"
                      className="subItem parent "
                      style={{ border: "none" }}
                    >
                      <img src={login} alt="logo" className="parentLogo" />
                      <span>ĐĂNG NHẬP</span>
                    </NavLink>
                  </div>
                )}
              </div>
            </div>
          </div>
        </nav>
      ) : (
        <nav className={`navbar ${isAtTop ? "" : "transparent-bg"}`}>
          <div className="logo">
            <img src={logo} className="logoct" alt="logo" />
          </div>

          <div id="trapezoid">
            <a className="sub-home" href="#">
              Home
            </a>
            <input
              type="checkbox"
              id="menu-toggle"
              className="menu-toggle"
              checked={isMenuOpen}
            />

            <label
              htmlFor="menu-toggle"
              className="menu-icon"
              onClick={toggleMenu}
            >
              <img src={logo} className="menuIcon" alt="menu" />
            </label>

            <div className={`menu ${isMenuOpen ? "open" : ""}`}>
              {/* Nội dung menu */}
              <div className={`menu-content `}>
                <NavLink
                  to="/"
                  exact={true}
                  className="parent"
                  onClick={closeMenu}
                >
                  Trang chủ
                </NavLink>

                <NavLink to="/page-mxh" className="parent" onClick={closeMenu}>
                  Mạng xã hội
                </NavLink>
              </div>
            </div>
          </div>
          {isLoggedIn ? (
            <FlastInfo onLogout={handleLogout} className="rotate" />
          ) : (
            <div className={` menu ${isMenuOpen ? "open" : ""}`}>
              <NavLink
                to="/login"
                className="subItem parent "
                style={{ border: "none" }}
              >
                <img src={login} alt="logo" className="parentLogo" />
              </NavLink>
              {/* <span>ĐĂNG NHẬP</span> */}
            </div>
          )}
        </nav>
      )}{" "}
    </>
  );
};

export default Nav1;
