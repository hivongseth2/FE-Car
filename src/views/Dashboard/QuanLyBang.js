import React, { useState, useEffect } from "react";
import "../../styles/DashboardScss/InfoStudentForAdmin.scss";
import MainLayoutAdmin from "./MainLayoutAdmin";
import AddBangLai from "./AddBangLai";
import EditBangLai from "./EditBangLai";
import axios from "axios";

const QuanLyBang = () => {
  const [dataBang, setData] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedBangLai, setSelectedBangLai] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let result = await axios.get(
          `${
            process.env.REACT_DOMAIN ||
            "http://trungtamdaotaolaixebinhduong.com:8080"
          }/api/degree`
        );
        let data = result && result.data ? result.data.data : [];
        setData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleAddClick = () => {
    setShowForm(true);
  };

  const handleSetDegree = (degree) => {
    // Cập nhật danh sách bằng lái với degree mới
    setData([...dataBang, degree]);
  };

  const handleEdit = (banglai) => {
    setSelectedBangLai(banglai);
    setShowForm(false);
    setIsEditing(true);
  };

  const handleUpdateDegree = (updatedDegree) => {
    // Cập nhật danh sách bằng lái với degree được cập nhật
    const updatedData = dataBang.map((degree) =>
      degree.id === updatedDegree.id ? updatedDegree : degree
    );
    setData(updatedData);
    setIsEditing(false);
  };

  return (
    <MainLayoutAdmin>
      <div className="contain-table-info">
        <div className="header-info">
          <h1>Quản lý bằng lái</h1>
          {showForm ? (
            <button onClick={() => setShowForm(false)}>Quay lại</button>
          ) : (
            <button onClick={handleAddClick}>Thêm bằng lái</button>
          )}
        </div>
        {showForm ? (
          <AddBangLai setDegree={handleSetDegree} setIsAdding={setShowForm} />
        ) : null}
        {!showForm && !isEditing ? (
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
                      <button onClick={() => handleEdit(item)}>Sửa</button>
                      <button>Xóa</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="11">Không có dữ liệu</td>
                </tr>
              )}
            </tbody>
          </table>
        ) : null}
        {isEditing && selectedBangLai && (
          <EditBangLai
            banglais={dataBang}
            selectedBangLai={selectedBangLai}
            setBangLais={handleUpdateDegree}
            setIsEditing={setIsEditing}
          />
        )}
      </div>
    </MainLayoutAdmin>
  );
};

export default QuanLyBang;
