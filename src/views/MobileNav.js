import logomobile from "../img/zyro-image.png";
import close from "../img/close.png";
import React, { useState, useEffect } from "react";

import { NavLink, useHistory } from "react-router-dom";
import "../styles/MobileNav.scss";

const MobileNav = ({ onClosePopup }) => {
  const token = localStorage.getItem("token");
  const [userRole, setUserRole] = useState(null);
  const history = useHistory();

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    history.push("/login");
  };

  const handleButtonClick = () => {
    onClosePopup();
  };

  const handleClickHome = () => {
    history.push("/");
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setUserRole(user?.role);
    // console.log(user?.role);
  }, []);

  return (
    <nav className="navbar-mobile">
      <div className="navbar-mobile-header">
        <img src={logomobile} alt="logo" onClick={handleClickHome} />
        <img src={close} alt="close" onClick={handleButtonClick} />
      </div>
      <div className="container-navbar-mobile-list">
        <ul className="navbar-mobile-list">
          <li>
            <NavLink to="/" onClick={handleButtonClick} exact={true}>
              TRANG CHỦ
            </NavLink>
          </li>
          <li>
            <NavLink to="/page-mxh" onClick={handleButtonClick}>
              MẠNG XÃ HỘI
            </NavLink>
          </li>
          <li>
            <NavLink to="/document" onClick={handleButtonClick}>
              TÀI LIỆU
            </NavLink>
          </li>
          {!userRole && (
            <>
              <li>
                <NavLink to="/login" onClick={handleButtonClick}>
                  ĐĂNG NHẬP
                </NavLink>
              </li>
            </>
          )}
          {userRole === "ROLE_USER" && (
            <li>
              <NavLink to="/info-sudent" onClick={handleButtonClick}>
                XEM THÔNG TIN CÁ NHÂN
              </NavLink>
            </li>
          )}
          {userRole === "ROLE_ADMIN" && (
            <li>
              <NavLink to="/edit-admin" onClick={handleButtonClick}>
                TRANG QUẢN LÝ
              </NavLink>
            </li>
          )}
          {token && (
            <li
              onClick={() => {
                handleLogout();
                handleButtonClick();
              }}
            >
              ĐĂNG XUẤT
            </li>
          )}
        </ul>
      </div>
      <div className="footer-navbar-mobile">
        <h3>Thông tin liên hệ</h3>
        <ul className="footer-navbar-mobile-ul">
          <li>Bình dương, Thu Dau Mot, Vietnam</li>
          <li>03 4444 9778</li>
          <li>maivanthuong3066@gmail.com</li>
          <li>&#169; 2023 Dạy lái xe Bình Dương</li>
        </ul>
      </div>
    </nav>
  );
};

export default MobileNav;
