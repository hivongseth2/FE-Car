// import "../styles/Nav.scss";
import { NavLink } from "react-router-dom";
import "../styles/Nav.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { faSignInAlt } from "@fortawesome/free-solid-svg-icons";
import { faShareAlt } from "@fortawesome/free-solid-svg-icons";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";

import logo from "../img/Logo-IUH.jpg";
const Nav = () => {
  return (
    <div className="topnav">
      <div className="logo">
        <img src={logo} alt="logo" className="logo"></img>
      </div>
      <div className="mainMenu">
        <NavLink to="/">
          <FontAwesomeIcon icon={faHome} />
          Trang chủ
        </NavLink>
        <NavLink to="/socialmedia">
          {" "}
          <FontAwesomeIcon icon={faShareAlt} />
          Social Media
        </NavLink>
      </div>
      <NavLink to="/edit-admin">
        {" "}
        <FontAwesomeIcon icon={faEdit} />
        Chỉnh sửa thông tin
      </NavLink>
      <NavLink to="/info-sudent">
        <FontAwesomeIcon icon={faInfoCircle} />
        Thông tin học viên
      </NavLink>
      <div className="submenu">
        <NavLink to="/login">
          <FontAwesomeIcon icon={faSignInAlt} />
          Đăng Nhập
        </NavLink>
        <NavLink to="/register">
          <FontAwesomeIcon icon={faUserPlus} />
          Đăng kí
        </NavLink>
        <span className="hotline">
          <FontAwesomeIcon icon={faPhone} />
          Holine:0909789789
        </span>
      </div>
      {/* <NavLink to="/Cart">Giỏ Hàng </NavLink> */}
    </div>
  );
};
export default Nav;
