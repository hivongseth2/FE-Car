import React, { useState, useEffect } from "react";
// import "../../styles/DashboardScss/InfoStudentForAdmin.scss";
import MainLayoutAdmin from "./MainLayoutAdmin";
import AddBangLai from "./AddBangLai";
import EditBangLai from "./EditBangLai";
import ConfirmDeleteDegree from "./ConfirmDeleteDegree";
import axios from "axios";

const QuanLyBang = () => {
  const [dataBang, setData] = useState([]);
  const [selectedBangLai, setSelectedBangLai] = useState(null);
  const [showUpdateDegreePopup, setShowUpdateDegreePopup] = useState(false);
  const [showAddDegreePopup, setShowAddDegreePopup] = useState(false);
  const [showDeleteDegreePopup, setShowDeleteDegreePopup] = useState(false);
  const [selectedDegreeDelete, setSelectedDegreeDelete] = useState(null);
  const [isEditingDegree, setIsEditingDegree] = useState(false);

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
  }, [isEditingDegree]);

  const handleUpdateDegree = async () => {
    setSelectedBangLai(null);
    setShowUpdateDegreePopup(true);
  };
  const handleAddDegree = async () => {
    setShowAddDegreePopup(true);
  };
  const handleShowDeleteDegree = async () => {
    setSelectedBangLai(null);
    setShowDeleteDegreePopup(true);
  };
  const handleEditDegree = async () => {
    setIsEditingDegree(false);
  };
  return (
    <MainLayoutAdmin>
      <div className="contain-table-info">
        <div className="header-info">
          <h1>Quản lý bằng lái</h1>
          <button>Quay lại</button>
          <button onClick={()=>{handleAddDegree();handleEditDegree()}}>Thêm bằng lái</button>
        </div>
        <table className="container-table">
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
                <tr
                  key={item.id}
                  onClick={() => {
                    setSelectedBangLai(item);
                    setSelectedDegreeDelete(item);
                  }}
                >
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
                    <button onClick={()=>{handleUpdateDegree();handleEditDegree()}}>Sửa</button>
                    <button onClick={handleShowDeleteDegree}>Xóa</button>
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
      </div>
      {showUpdateDegreePopup && (
        <div className="popup-student">
          <div className="popup-inner-student">
            <EditBangLai
              handleCloseUpdate={() => setShowUpdateDegreePopup(false)}
              selectedBangLai={selectedBangLai}
              setData={setData}
              IsEditDegree ={() => setIsEditingDegree(true)}
            />
          </div>
        </div>
      )}
      {showDeleteDegreePopup && (
        <div className="popup-student">
          <div className="popup-inner-student">
            <ConfirmDeleteDegree
              handleCloseFormDelete={() => setShowDeleteDegreePopup(false)}
              selectedDegreeDelete={selectedDegreeDelete}
              dataBang={setData}
            />
          </div>
        </div>
      )}
      {showAddDegreePopup && (
        <div className="popup-student">
          <div className="popup-inner-student">
            <AddBangLai
              handleCloseUpdate={() => setShowAddDegreePopup(false)}
              IsEditDegree ={() => setIsEditingDegree(true)}
            />
          </div>
        </div>
      )}
    </MainLayoutAdmin>
  );
};

export default QuanLyBang;
