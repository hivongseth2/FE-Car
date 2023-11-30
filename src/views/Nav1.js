import React, { useState } from "react";
import { useEffect } from "react";
import "../styles/Nav1.scss"; // Import file CSS tương ứng
import { NavLink, useHistory } from "react-router-dom";
import logo from "../img/zyro-image.png";
import listmenu from "../img/list-menu.png";
import login from "../img/login.png";
import FlastInfo from "./Forms/FlastInfo";
import FastContact from "./FastContact";
import MobileNav from "./MobileNav";
import { set } from "date-fns";

const Nav1 = () => {
  const token = localStorage.getItem("token");
  const [isLoggedIn, setIsLoggedIn] = useState(!!token);
  const [showPopup, setShowPopup] = useState(false);
  const history = useHistory();


  const [data, setData] = useState([]);
  const accessToken = localStorage.getItem("token");
  const [isUser, setIsUser] = useState(null);

  const fetchData = async () => {
    try {
      const url = `${process.env.REACT_DOMAIN ||
        "http://trungtamdaotaolaixebinhduong.com:8080"
        }/api/student/info-person`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        throw new Error("Error fetching data");
      }

      const responseData = await response.json();
      // console.log("API response:", responseData);

      // Gán dữ liệu vào biến state data
      if (responseData) {
        setData(responseData);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    // console.log(isUser);
    if (isUser === "ROLE_USER") {
      fetchData();
    }
  }, [isUser]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setIsUser(user.role);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    history.push("/login");
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
            <img src={logo} className="logo-nav-mobile" alt="logo" onClick={handleClickHome} />
            <div className="component-nav-mobile">
              <p className="title-nav-mobile-1">ĐÀO TẠO LÁI XE</p>
              <p className="title-nav-mobile">HẠNG A1, A2, B1, B2, C, D</p>
            </div>
            <img src={listmenu} className="list-menu" alt="list-menu" onClick={togglePopup} />
          </div>
        </nav>
      ) : (
        <div className="navbar-home">
          <div className="logo-home" onClick={handleClickHome}>
            <img style={{ height: 55, width: 55 }} src={logo} alt="logo" />
          </div>
          <div className="group-nav-home">
            <ul className="nav-home">
              <li className="li-nav-home">
                <svg
                  width="16"
                  height="15"
                  viewBox="0 0 16 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5 0.5C4.73478 0.5 4.48043 0.605357 4.29289 0.792893C4.10536 0.98043 4 1.23478 4 1.5C4 1.76522 4.10536 2.01957 4.29289 2.20711C4.48043 2.39464 4.73478 2.5 5 2.5H11C11.2652 2.5 11.5196 2.39464 11.7071 2.20711C11.8946 2.01957 12 1.76522 12 1.5C12 1.23478 11.8946 0.98043 11.7071 0.792893C11.5196 0.605357 11.2652 0.5 11 0.5H5ZM2 4.5C2 4.23478 2.10536 3.98043 2.29289 3.79289C2.48043 3.60536 2.73478 3.5 3 3.5H13C13.2652 3.5 13.5196 3.60536 13.7071 3.79289C13.8946 3.98043 14 4.23478 14 4.5C14 4.76522 13.8946 5.01957 13.7071 5.20711C13.5196 5.39464 13.2652 5.5 13 5.5H3C2.73478 5.5 2.48043 5.39464 2.29289 5.20711C2.10536 5.01957 2 4.76522 2 4.5ZM0 8.5C0 7.96957 0.210714 7.46086 0.585786 7.08579C0.960859 6.71071 1.46957 6.5 2 6.5H14C14.5304 6.5 15.0391 6.71071 15.4142 7.08579C15.7893 7.46086 16 7.96957 16 8.5V12.5C16 13.0304 15.7893 13.5391 15.4142 13.9142C15.0391 14.2893 14.5304 14.5 14 14.5H2C1.46957 14.5 0.960859 14.2893 0.585786 13.9142C0.210714 13.5391 0 13.0304 0 12.5V8.5Z"
                    fill="#111"
                  />
                </svg>
                <NavLink
                  to="/"
                  exact
                  className="nav-link-home"
                  activeClassName="active-home"
                >
                  Trang chủ
                </NavLink>
              </li>
              |
              <li className="li-nav-home">
                <svg
                  width="16"
                  height="17"
                  viewBox="0 0 16 17"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M16 8.5C16 10.6217 15.1571 12.6566 13.6569 14.1569C12.1566 15.6571 10.1217 16.5 8 16.5C5.87827 16.5 3.84344 15.6571 2.34315 14.1569C0.842855 12.6566 0 10.6217 0 8.5C0 6.37827 0.842855 4.34344 2.34315 2.84315C3.84344 1.34285 5.87827 0.5 8 0.5C10.1217 0.5 12.1566 1.34285 13.6569 2.84315C15.1571 4.34344 16 6.37827 16 8.5ZM10 5.5C10 6.03043 9.78929 6.53914 9.41421 6.91421C9.03914 7.28929 8.53043 7.5 8 7.5C7.46957 7.5 6.96086 7.28929 6.58579 6.91421C6.21071 6.53914 6 6.03043 6 5.5C6 4.96957 6.21071 4.46086 6.58579 4.08579C6.96086 3.71071 7.46957 3.5 8 3.5C8.53043 3.5 9.03914 3.71071 9.41421 4.08579C9.78929 4.46086 10 4.96957 10 5.5ZM8 9.5C7.0426 9.49981 6.10528 9.77449 5.29942 10.2914C4.49356 10.8083 3.85304 11.5457 3.454 12.416C4.01668 13.0706 4.71427 13.5958 5.49894 13.9555C6.28362 14.3152 7.13681 14.5009 8 14.5C8.86319 14.5009 9.71638 14.3152 10.5011 13.9555C11.2857 13.5958 11.9833 13.0706 12.546 12.416C12.147 11.5457 11.5064 10.8083 10.7006 10.2914C9.89472 9.77449 8.9574 9.49981 8 9.5Z"
                    fill="#111"
                  />
                </svg>
                <NavLink
                  to="/page-mxh"
                  className="nav-link-home"
                  activeClassName="active-home"
                >
                  Mạng xã hội
                </NavLink>
              </li>
              |
              <li className="li-nav-home">
                <svg
                  width="16"
                  height="15"
                  viewBox="0 0 16 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M0 2.5C0 1.96957 0.210714 1.46086 0.585786 1.08579C0.960859 0.710714 1.46957 0.5 2 0.5H14C14.5304 0.5 15.0391 0.710714 15.4142 1.08579C15.7893 1.46086 16 1.96957 16 2.5V12.5C16 13.0304 15.7893 13.5391 15.4142 13.9142C15.0391 14.2893 14.5304 14.5 14 14.5H2C1.46957 14.5 0.960859 14.2893 0.585786 13.9142C0.210714 13.5391 0 13.0304 0 12.5V2.5ZM3.293 3.793C3.48053 3.60553 3.73484 3.50021 4 3.50021C4.26516 3.50021 4.51947 3.60553 4.707 3.793L7.707 6.793C7.89447 6.98053 7.99979 7.23484 7.99979 7.5C7.99979 7.76516 7.89447 8.01947 7.707 8.207L4.707 11.207C4.5184 11.3892 4.2658 11.49 4.0036 11.4877C3.7414 11.4854 3.49059 11.3802 3.30518 11.1948C3.11977 11.0094 3.0146 10.7586 3.01233 10.4964C3.01005 10.2342 3.11084 9.9816 3.293 9.793L5.586 7.5L3.293 5.207C3.10553 5.01947 3.00021 4.76516 3.00021 4.5C3.00021 4.23484 3.10553 3.98053 3.293 3.793ZM9 9.5C8.73478 9.5 8.48043 9.60536 8.29289 9.79289C8.10536 9.98043 8 10.2348 8 10.5C8 10.7652 8.10536 11.0196 8.29289 11.2071C8.48043 11.3946 8.73478 11.5 9 11.5H12C12.2652 11.5 12.5196 11.3946 12.7071 11.2071C12.8946 11.0196 13 10.7652 13 10.5C13 10.2348 12.8946 9.98043 12.7071 9.79289C12.5196 9.60536 12.2652 9.5 12 9.5H9Z"
                    fill="#111"
                  />
                </svg>
                <NavLink
                  to="/document"
                  className="nav-link-home"
                  activeClassName="active-home"
                >
                  Tài liệu
                </NavLink>
              </li>
              |
              <li>
                {isUser ? (
                  isUser === "ROLE_USER" ? (
                    <NavLink
                      to="/info-sudent"
                      className="nav-link-home"
                      activeClassName="active-home"
                    >
                      Thông tin cá nhân
                    </NavLink>
                  ) : (
                    <NavLink
                      to="/follow-admin"
                      className="nav-link-home"
                      activeClassName="active-home"
                      onClick={() => {
                        history.push("/follow-admin");
                      }}
                    >
                      Đi đến trang quản lý
                    </NavLink>
                  )
                ) : null}
              </li>
                      |
              {isLoggedIn ? (
                <li>
                  <NavLink
                    to="/login"
                    className="nav-link-home"
                    activeClassName="active-home"
                    onClick={handleLogout}
                  >
                    Đăng xuất
                  </NavLink>
                </li>
              ) : (
                <li>
                  <NavLink
                    to="/login"
                    className="nav-link-home"
                    activeClassName="active-home"
                  >
                    Đăng nhập
                  </NavLink>  
                </li>
              )}

            </ul>
          </div>
        </div>
      )}
      <div className="fast-contact-home">
        <FastContact />
      </div>
      {showPopup && (
        <div className={`popup-mobile-nav ${showPopup ? 'popup-slide-in' : ''}`}>
          <MobileNav onClosePopup={togglePopup} />
        </div>
      )}
    </>
  );
};

export default Nav1;
