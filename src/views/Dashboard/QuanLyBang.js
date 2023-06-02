import React from "react";
import "../../styles/DashboardScss/InfoStudentForAdmin.scss"
import MainLayoutAdmin from "./MainLayoutAdmin";

const QuanLyBang = () => {
  return (
    <MainLayoutAdmin>
    <div className="contain-table-info">
      <div className="header-info">
        <h1>Quản lý bằng lái</h1>
        <button>Thêm bằng lái</button>
      </div>
      <table className="striped-table-info">
        <thead>
          <tr>
            <th>No.</th>
            <th>Hạng</th>
            <th>Mô tả</th>
            <th>Giá</th>
            <th>Độ tuổi</th>
            <th>Thời gian học</th>
            <th>Loại xe</th>
            <th>Số km DAT</th>
            <th>Ưu điểm</th>
            <th className="text-center-info">Hành động</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>B1</td>
            <td>Lái xe máy</td>
            <td>21.000.000</td>
            <td>18</td>
            <td>3-4 tháng</td>
            <td>Xe 4 chỗ</td>
            <td>810 km</td>
            <td>Nhiều ưu điểm</td>
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
export default QuanLyBang;
