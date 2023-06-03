import "../styles/Menu.scss";
import { Link } from "react-router-dom";
const Menu = () => {
  return (
    <div className="main">
      <div className="navbar">
        <h2 className="logo">WEBNAME</h2>
      </div>
      <div className="menu">
        <ul>
          <li>
            <Link to="/">TRANG CHỦ</Link>
          </li>
          <li>
            <Link to="/Register_advise">GIỚI THIỆU</Link>
          </li>
          <li>
            <a href="/social-media">SOCIAL MEDIA</a>
          </li>
        </ul>
      </div>
      <div className="login-register">
        <ul>
          <li>
            <Link to="/register">ĐĂNG KÝ</Link>
          </li>
          <li>
            <Link to="/login">ĐĂNG NHẬP</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};
export default Menu;
