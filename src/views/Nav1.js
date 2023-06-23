import React, { useState } from "react";
import { useEffect } from "react";
import "../styles/Nav1.scss"; // Import file CSS tương ứng
import { NavLink, useHistory  } from "react-router-dom";
import logo from "../img/zyro-image.png";
import listmenu from "../img/list-menu.png";
import login from "../img/login.png";
import FlastInfo from "./Forms/FlastInfo";
import FastContact from "./FastContact";
import MobileNav from "./MobileNav";
import nameBrand from "../img/59wtnp9f.png";

const Nav1 = () => {
  const token = localStorage.getItem("token");
  const [isLoggedIn, setIsLoggedIn] = useState(!!token);
  const [showPopup, setShowPopup] = useState(false);
  const history = useHistory();

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };
  const togglePopup = () => {
    setShowPopup(!showPopup);
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
  const handleClickHome = () => {
    history.push("/");
  };
  return (
    <>
      {isMobile ? (
        <nav>
          <div className="nav-header-mobile">
            <img src={logo} className="" alt="logo" onClick={handleClickHome}/>
            <img className="name-brand" src={nameBrand} alt="nameBrand"/>
            <img src={listmenu} alt="list-menu" onClick={togglePopup} />
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
              defaultChecked={isMenuOpen}
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
                <NavLink to="/document" className="parent" onClick={closeMenu}>
                  Tài liệu
                </NavLink>
              </div>
            </div>
          </div>
          <span className="slogan">Học, Học Nữa, Học Mãi</span>
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
      <div className="fast-contact-home">
        <FastContact />
      </div>
      {showPopup && (
          <div className={`popup-mobile-nav ${showPopup ? 'popup-slide-in' : ''}`}>
           <MobileNav onClosePopup={togglePopup}/>
          </div>
        )}
    </>
  );
};

export default Nav1;
