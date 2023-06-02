import React from "react";
import "../../styles/DashboardScss/MainLayoutAdmin.scss";
import { Link} from "react-router-dom";

function MainLayoutAdmin({ children }) {
  return (
    <div className="main-sidebar-admin">
      <div className="sidebar-admin">
        <ul>
          <li><Link to="/">Trang chủ</Link></li>
          <li><Link to="/edit-info">Thông tin học viên</Link></li>
          <li>Theo dõi học viên</li>
          <li>Quản lý bài đăng</li>
          <li><Link to="/quan-ly-bang">Quản lý bằng lái</Link></li>
          <li><Link to="/new-customer">Quản lý khách hàng mới</Link></li>
        </ul>
      </div>
      <div class="content-sibebar-admin">
        {children}
      </div>
    </div>
  );
}
export default MainLayoutAdmin;
