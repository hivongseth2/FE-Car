import React from "react";
import "../styles/Nav.scss";
import Nav1 from "./Nav1";

const Nav = () => {
  // const token = localStorage.getItem("token");
  // const [isLoggedIn, setIsLoggedIn] = useState(!!token);

  // const handleLogout = () => {
  //   localStorage.removeItem("user");
  //   localStorage.removeItem("token");
  //   setIsLoggedIn(false);
  // };
  return (
    <>
      <Nav1 />
      {/* <div className="topnav">
        <input type="checkbox" id="menu-toggle" className="menu-toggle" />
        <label htmlFor="menu-toggle" className="menu-icon">
          <FontAwesomeIcon icon={faBars} />
        </label>
        <div className="mainMenu">
          <NavLink to="/" exact={true}>
            <FontAwesomeIcon icon={faHome} />
            Trang chủ
          </NavLink>

          <NavLink to="/page-mxh">
            <FontAwesomeIcon icon={faShareAlt} />
            Mạng xã hội
          </NavLink>
          <NavLink to="/admin-login">Chỉnh sửa thông tin</NavLink>
          <NavLink to="/info-sudent">Thông tin học viên</NavLink>
        </div>
        {isLoggedIn ? (
          <div className="submenu fast-info">
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
      </div> */}
    </>
  );
};

export default Nav;
