import { de } from "date-fns/locale";
import React from "react";
import MainLayoutAdmin from "./MainLayoutAdmin";

const LinkManagement = () => {
    document.title = "Quản lý bài đăng";
    return (
        <MainLayoutAdmin>
        <div className="contain-table-info">
          <div className="header-info">
            <h1>Quản lý bài đăng</h1>
            <button>Quay lại</button>
            <button >Thêm bài đăng</button>
          </div>
          <table className="container-table">
            <thead>
              <tr>
                <th>No.</th>
                <th>Hạng</th>
                <th className="text-center-info">Hành động</th>
              </tr>
            </thead>
            <tbody>
                  <tr>
                    <td></td>
                    <td className="button-info">
                      <button >Sửa</button>
                      <button >Xóa</button>
                    </td>
                  </tr>
            </tbody>
          </table>
        </div>
      </MainLayoutAdmin>
    );
}; export default LinkManagement;