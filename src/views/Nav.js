// import "../styles/Nav.scss";
import {NavLink } from "react-router-dom";
import "../styles/Nav.scss";
const Nav = () => {
  return (
    <div className="topnav">
      <NavLink to="/">Trang chủ</NavLink>
      <NavLink to="/register">Đăng kí</NavLink>
      <NavLink to="/login">Đăng Nhập</NavLink>
      <NavLink to="/edit-admin">Chỉnh sửa thông tin</NavLink>
      <NavLink to="/info-sudent">Thông tin học viên</NavLink>
      {/* <NavLink to="/ForgotPass">Quên Mật khẩu</NavLink> */}
      {/* <NavLink to="/Info">Ca Nhan</NavLink> */}
      {/* <NavLink to="/Course">Mua san pham</NavLink> */}
      <NavLink to="/socialmedia">Social Media</NavLink>
      {/* <NavLink to="/Cart">Giỏ Hàng </NavLink> */}
    </div>
  );
};
export default Nav;
