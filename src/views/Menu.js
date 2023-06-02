import "../styles/Menu.scss"
import { Link} from "react-router-dom";
const Menu = () => {
    return (
        <div className="main-header">
            <div className="navbar-header">
                <h2 className="logo-header">WEBNAME</h2>
            </div>
            <div className="menu-header">
                <ul>
                    <li><Link to="/">TRANG CHỦ</Link></li>
                    <li><Link to="/info">THÔNG TIN HỌC VIÊN</Link></li>
                    <li><a href="/training">LUYỆN THI</a></li>
                    <li><Link to="/admin-edit-info">CHỈNH SỬA THÔNG TIN</Link></li>   
                </ul>
            </div>
            <div className="login-register">
                <ul>
                    <li><Link to="/register">ĐĂNG KÝ</Link></li>
                    <li><Link to="/login">ĐĂNG NHẬP</Link></li>
                </ul>
            </div>
        </div>
    );
};
export default Menu;