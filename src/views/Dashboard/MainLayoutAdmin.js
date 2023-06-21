import React from "react";
import "../../styles/DashboardScss/MainLayoutAdmin.scss";
import { Link } from "react-router-dom";

function MainLayoutAdmin({ children }) {
  return (
    <div className="main-sidebar-admin">
      <div className="sidebar-admin">
        <ul>
          <li>
            <Link to="/">Trang chủ</Link>
          </li>
          <li>
            <Link to="/account-management">Tài khoản</Link>
          </li>

          <li>
            <Link to="/student-management">Quản lý học viên</Link>
          </li>

          <li>
            <Link to="/follow-admin">Quản lý theo dõi học viên</Link>
          </li>
          <li>Quản lý bài đăng</li>
          <li>
            <Link to="/edit-bang">Quản lý bằng lái</Link>
          </li>
          <li>
            <Link to="/edit-slide">Quản lý slide</Link>
          </li>
          <li>
            <Link to="/document-management">Quản tài liệu</Link>
          </li>

          <li>
            <Link to="/contact">Quản lý liên hệ mới</Link>
          </li>
          <li>
            <Link to="/certificate">Quản lý hoàn thành khóa học</Link>
          </li>
        </ul>
      </div>
      <div className="content-sibebar-admin">{children}</div>
    </div>
  );
}
export default MainLayoutAdmin;
