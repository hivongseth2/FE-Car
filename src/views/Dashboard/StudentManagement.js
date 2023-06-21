import React, { useState, useEffect } from "react";
import "../../styles/DashboardScss/TableStudent.scss";
import "../../styles/DashboardScss/StudentManagement.scss";
import MainLayoutAdmin from "./MainLayoutAdmin";
import "../../styles/DashboardScss/InfoStudentForAdmin.scss";
import { format } from "date-fns";
import AddStudent from "./AddStudent";
import UpdateStudent from "./UpdateStudent";
import { toast } from "react-toastify";
import ConfirmDeleteStudent from "./ConfirmDeleteStudent";
import is from "date-fns/locale/is/index";

const StudentManagement = () => {
  const [dataStudent, setDataStudent] = useState([]);
  // const [searchId, setSearchId] = useState("");
  const [selectedInfoStudent, setSelectedInfoStudent] = useState(null);
  const [selectedInfoStudentDelete, setSelectedInfoStudentDelete] =
    useState(null);
  const [selectedInfoStudentReset, setSelectedInfoStudentReset] =
    useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  const [filterSearchStudent, setFilterSearchStudent] = useState(""); // Dữ liệu tìm kiếm theo filter [
  const [dataSearchFilter, setDataSearchFilter] = useState([]); // Dữ liệu sau khi tìm kiếm theo filter [
  const [isSearchingFilter, setIsSearchingFilter] = useState(false); // Trạng thái tìm kiếm theo filter [
  const [isEditing, setIsEditing] = useState(false); // Trạng thái đang sửa thông tin học viên [
  const [showAddStudentPopup, setShowAddStudentPopup] = useState(false);
  const [showUpdateStudentPopup, setShowUpdateStudentPopup] = useState(false);
  const [showDeleteStudentPopup, setShowDeleteStudentPopup] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const accessToken = localStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const currentPageTemp = currentPage;
        const url = `${
          process.env.REACT_DOMAIN ||
          "http://trungtamdaotaolaixebinhduong.com:8080"
        }/api/admin/student?page=${currentPageTemp}&size=6`;
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

        // Lấy tổng số trang từ response và cập nhật state
        const totalPages =
          responseData && responseData.totalPages ? responseData.totalPages : 0;
        setTotalPages(totalPages);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [accessToken, currentPage, isEditing]);

  // const handleSearch = async () => {
  //   try {
  //     const url = `http://trungtamdaotaolaixebinhduong.com:8080/api/admin/student/${searchId}`;

  //     if (searchId === "") {
  //       setSearchResult(dataStudent);
  //       setIsSearching(false);
  //     } else {
  //       const response = await fetch(url, {
  //         method: "GET",
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${accessToken}`,
  //         },
  //       });

  //       if (!response.ok) {
  //         throw new Error("Error fetching data");
  //       }

  //       const responseDataSearchById = await response.json();
  //       console.log("API response:", responseDataSearchById);

  //       // Gán dữ liệu vào biến state searchResult hoặc hiển thị thông báo nếu không tìm thấy
  //       if (responseDataSearchById) {
  //         setSearchResult([responseDataSearchById]);
  //         setIsSearching(true);
  //       } else {
  //         // Hiển thị thông báo không tìm thấy
  //         console.log("Không tìm thấy học viên");
  //         setIsSearching(false);
  //       }
  //     }
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   }
  // };

  const handleSearchFilter = async () => {
    try {
      const url = `${
        process.env.REACT_DOMAIN ||
        "http://trungtamdaotaolaixebinhduong.com:8080"
      }/api/admin/student?filter=${filterSearchStudent}`;

      if (filterSearchStudent === "") {
        setSearchResult(dataStudent);
        setIsSearchingFilter(false);
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

        const responseDataSearchFilter = await response.json();
        console.log("API response:", responseDataSearchFilter);

        // Gán dữ liệu vào biến state searchResult hoặc hiển thị thông báo nếu không tìm thấy
        if (responseDataSearchFilter) {
          setIsSearchingFilter(true);
          const fetchedDataFilter =
            responseDataSearchFilter && responseDataSearchFilter.data
              ? responseDataSearchFilter.data
              : [];
          setDataSearchFilter(fetchedDataFilter);
        } else {
          // Hiển thị thông báo không tìm thấy
          console.log("Không tìm thấy học viên");
          setIsSearchingFilter(false);
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleReset = () => {
    // setSearchId("");
    setIsSearching(false);
    setSearchResult(dataStudent);
  };

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
  const handleResetFilter = () => {
    //setFilterSearchStudent("");
    setIsSearchingFilter(false);
    setDataSearchFilter(dataStudent);
  };
  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const handleEditStudent = () => {
    setIsEditing(false);
  };

  // Tạo danh sách các số trang để hiển thị
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const renderDataStudent = isSearchingFilter
    ? dataSearchFilter
    : isSearching
    ? searchResult
    : dataStudent;

  return (
    <MainLayoutAdmin>
      <div className="contain-table-info">
        <div className="header-info">
          <h1>Quản lý học viên</h1>
          <button
            onClick={() => {
              handleShowAddStudentPopup();
              handleEditStudent();
            }}
          >
            Thêm học viên
          </button>
        </div>
        {/* Tìm kiếm học viên theo ID */}
        {/* <div className="searchByID">
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
        </div> */}
        <div className="group-search-student">
          <svg
            className="icon-search-student"
            aria-hidden="true"
            viewBox="0 0 24 24"
          >
            <g>
              <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path>
            </g>
          </svg>
          <input
            onChange={(e) => setFilterSearchStudent(e.target.value)}
            placeholder="Tìm kiếm"
            type="search"
            className="input-search-student"
          />
          <button
            className="button-search-student"
            onClick={handleSearchFilter}
          >
            Tìm kiếm
          </button>
          <button className="reset-button" onClick={handleResetFilter}>
            Trở về
          </button>
        </div>

        <div className="container-table">
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
                    <button
                      onClick={() => {
                        handleShowUpdateStudentPopup();
                        handleEditStudent();
                      }}
                    >
                      Sửa
                    </button>
                    <button
                      type="button-reset-pw"
                      style={{ color: "black" }}
                      onClick={() => {
                        handleResetPassword();
                      }}
                    >
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
      <div>
        <button onClick={handlePreviousPage} disabled={currentPage === 0}>
          Previous
        </button>

        {/* {pageNumbers.map((pageNumber) => (
          <button
            key={pageNumber}
            onClick={() => handlePageChange(pageNumber - 1)}
            disabled={pageNumber - 1 === currentPage}
          >
            {pageNumber}
          </button>
        ))} */}

        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
      {showAddStudentPopup && (
        <div className="popup-student">
          <div className="popup-inner">
            <AddStudent
              handleCloseForm={() => setShowAddStudentPopup(false)}
              IsEditing={() => setIsEditing(true)}
            />
          </div>
        </div>
      )}
      {showUpdateStudentPopup && (
        <div className="popup-student">
          <div className="popup-inner-student">
            <UpdateStudent
              selectedInfoStudent={selectedInfoStudent}
              handleCloseForm={() => setShowUpdateStudentPopup(false)}
              IsEditing={() => setIsEditing(true)}
            />
          </div>
        </div>
      )}
      {showDeleteStudentPopup && (
        <div className="popup-student">
          <div className="popup-inner-student">
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
