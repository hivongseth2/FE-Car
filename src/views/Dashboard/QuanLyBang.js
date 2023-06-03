import React, { useState, useEffect } from "react";
import "../../styles/DashboardScss/InfoStudentForAdmin.scss";
import MainLayoutAdmin from "./MainLayoutAdmin";
import axios from "axios";

const QuanLyBang = () => {
  const [dataBang, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let result = await axios.get(
          "http://trungtamdaotaolaixebinhduong.com:8080/api/degree"
        );
        let data = result && result.data ? result.data.data : [];
        setData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);
  console.warn("data", dataBang);
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
              <th>Bổ sung</th>
              <th>Ưu điểm</th>
              <th className="text-center-info">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {dataBang && dataBang.length > 0 ? (
              dataBang.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.rating}</td>
                  <td>{item.description}</td>
                  <td>{item.price}</td>
                  <td>{item.allowAge}</td>
                  <td>{item.studyTime}</td>
                  <td>{item.categoryCar}</td>
                  <td>{item.dat}</td>
                  <td>{item.title}</td>
                  <td>{item.advantage}</td>
                  <td className="button-info">
                    <button>Sửa</button>
                    <button>Xóa</button>
                  </td>
                </tr>
              ))
            ) : (
              <div>Không có dữ liệu</div>
            )}
          </tbody>
        </table>
      </div>
    </MainLayoutAdmin>
  );
};
export default QuanLyBang;
