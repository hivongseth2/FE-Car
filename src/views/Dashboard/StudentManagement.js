import React, { useState, useEffect } from "react";
import "../../styles/DashboardScss/TableStudent.scss";
import MainLayoutAdmin from "./MainLayoutAdmin";
import "../../styles/DashboardScss/InfoStudentForAdmin.scss";
import { format} from "date-fns";
import AddStudent from "./AddStudent";
import UpdateStudent from "./UpdateStudent";
import { toast } from "react-toastify";
import ConfirmDeleteStudent from "./ConfirmDeleteStudent";

const StudentManagement = () => {
  const [searchId, setSearchId] = useState("");
  const [selectedInfoStudent, setSelectedInfoStudent] = useState(null);
  const [selectedInfoStudentDelete, setSelectedInfoStudentDelete] =
    useState(null);
  const [selectedInfoStudentReset, setSelectedInfoStudentReset] =
    useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  const [dataStudent, setDataStudent] = useState([]);
  const [showAddStudentPopup, setShowAddStudentPopup] = useState(false);
  const [showUpdateStudentPopup, setShowUpdateStudentPopup] = useState(false);
  const [showDeleteStudentPopup, setShowDeleteStudentPopup] = useState(false);

  const accessToken = localStorage.getItem("token");

  const handleSearch = async () => {
    try {
      const url = `http://trungtamdaotaolaixebinhduong.com:8080/api/admin/student/${searchId}`;

      if (searchId === "") {
        setSearchResult(dataStudent);
        setIsSearching(false);
      } else {
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (!response.ok) {
          throw new Error("Error fetching data");
        }

        const responseDataSearchById = await response.json();
        console.log("API response:", responseDataSearchById);

        // Gán dữ liệu vào biến state searchResult hoặc hiển thị thông báo nếu không tìm thấy
        if (responseDataSearchById) {
          setSearchResult([responseDataSearchById]);
          setIsSearching(true);
        } else {
          // Hiển thị thông báo không tìm thấy
          console.log("Không tìm thấy học viên");
          setIsSearching(false);
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleReset = () => {
    setSearchId("");
    setIsSearching(false);
    setSearchResult(dataStudent);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `${
          process.env.REACT_DOMAIN ||
          "http://trungtamdaotaolaixebinhduong.com:8080"
        }/api/admin/student`;
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (!response.ok) {
          throw new Error("Error fetching data");
        }

        const responseData = await response.json();
        const fetchedData =
          responseData && responseData.data ? responseData.data : [];
        setDataStudent(fetchedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [accessToken]);

  const handleResetPassword = async () => {
    try {
      const accessToken = localStorage.getItem("token");
      const url = `http://trungtamdaotaolaixebinhduong.com:8080/api/admin/student/reset-password?id=${selectedInfoStudentReset}`;

      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        throw new Error("Error resetting password");
      }

      // Reset mật khẩu thành công
      toast.success("Reset mật khẩu thành công");
      // Thực hiện các hành động cần thiết sau khi reset mật khẩu thành công
    } catch (error) {
      console.error("Error resetting password:", error);
      // Xử lý lỗi khi reset mật khẩu
      toast.error("Đã xảy ra lỗi khi reset mật khẩu");
    }
  };

  const handleShowAddStudentPopup = () => {
    setShowAddStudentPopup(true);
  };
  const handleShowUpdateStudentPopup = () => {
    setSelectedInfoStudent(null);
    setShowUpdateStudentPopup(true);
  };
  const handleShowDeleteStudentPopup = () => {
    setShowDeleteStudentPopup(true);
  };

  const renderDataStudent = isSearching ? searchResult : dataStudent;
  return (
    <MainLayoutAdmin>
      <div className="contain-table-info">
        <div className="header-info">
          <h1>Quản lý học viên</h1>
          <button onClick={handleShowAddStudentPopup}>Thêm học viên</button>
        </div>
        {/* Tìm kiếm học viên theo ID */}
        <div className="searchByID">
          Tìm kiếm học viên theo ID:
          <input
            className="input-searchByID"
            type="text"
            placeholder="Nhập ID học viên"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
          />
          <button className="search-button" onClick={handleSearch}>
            Tìm kiếm
          </button>
          {isSearching && (
            <button className="reset-button" onClick={handleReset}>
              Trở về
            </button>
          )}
        </div>

        <div class="container">
          <table>
            <thead>
              <tr>
                <th>No.</th>
                <th>Họ và tên</th>
                <th>Số điện thoại</th>
                <th>Địa chỉ</th>
                <th>Ngày sinh</th>
                <th>Ngày tạo</th>
                <th>Ngày cập nhật</th>
                <th className="text-center-info">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {renderDataStudent.map((item) => (
                <tr
                  key={item.id}
                  onClick={() => {
                    setSelectedInfoStudentDelete(item);
                    setSelectedInfoStudent(item);
                    setSelectedInfoStudentReset(item.id);
                  }}
                >
                  <td>{item.id}</td>
                  <td>{item.fullName}</td>
                  <td>{item.phoneNumber}</td>
                  <td>{item.address}</td>

                  <td>{format(new Date(item.birthday), "dd/MM/yyyy")}</td>
                  <td>{format(new Date(item.createdDate), "dd/MM/yyyy")}</td>
                  <td>{format(new Date(item.updatedDate), "dd/MM/yyyy")}</td>
                  <td className="button-info">
                    <button onClick={handleShowUpdateStudentPopup}>Sửa</button>
                    <button type="button-reset-pw" style={{ color: 'black' }} onClick={() => handleResetPassword()}>
                      Reset mật khẩu
                    </button>
                    <button onClick={handleShowDeleteStudentPopup}>Xóa</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {showAddStudentPopup && (
        <div className="popup">
          <div className="popup-inner">
            <AddStudent handleCloseForm={() => setShowAddStudentPopup(false)} />
          </div>
        </div>
      )}
      {showUpdateStudentPopup && (
        <div className="popup">
          <div className="popup-inner">
            <UpdateStudent
              handleCloseForm={() => setShowUpdateStudentPopup(false)}
              selectedInfoStudent={selectedInfoStudent}
            />
          </div>
        </div>
      )}
      {showDeleteStudentPopup && (
        <div className="popup">
          <div className="popup-inner">
            <ConfirmDeleteStudent
              handleCloseForm={() => setShowDeleteStudentPopup(false)}
              setDataStudent={setDataStudent}
              selectedInfoStudentDelete={selectedInfoStudentDelete}
            />
          </div>
        </div>
      )}
    </MainLayoutAdmin>
  );
};

export default StudentManagement;
