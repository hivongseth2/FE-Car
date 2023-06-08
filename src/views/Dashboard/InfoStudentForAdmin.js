import React from "react";
import "../../styles/DashboardScss/InfoStudentForAdmin.scss"
import MainLayoutAdmin from "./MainLayoutAdmin";

const InfoStudentForAdmin = () => {
  return (
    <MainLayoutAdmin>
    <div className="contain-table-info">
      <div className="header-info">
        <h1>Quản lý học viên</h1>
        <button>Thêm học viên</button>
      </div>
      <table className="striped-table-info">
        <thead>
          <tr>
            <th>No.</th>
            <th>Họ và tên</th>
            <th>Ngày tháng năm sinh</th>
            <th>Email</th>
            <th>Số điện thoại</th>
            <th>Địa chỉ</th>
            <th className="text-center-info">Hành động</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Nguyễn Văn A</td>
            <td>01/01/2001</td>
            <td>thanhtungeric4@gmail.com</td>
            <td>0123456789</td>
            <td>123 Nguyễn Thái Sơn, Quận Gò Vấp, TP.Hồ Chí Minh</td>
            <td className="button-info">
              <button>Sửa</button>
              <button>Xóa</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    </MainLayoutAdmin>
  );
};
export default InfoStudentForAdmin;
