import React, { useState, useEffect } from "react";
import "../../styles/DashboardScss/InfoStudentForAdmin.scss";
import "../../styles/DashboardScss/TableStudent.scss";
import MainLayoutAdmin from "./MainLayoutAdmin";
import SearchByID from "../SearchByID";
import FormUpdatePW from "./FormUpdatePW";

import FormSearchStudent from "./FormSearchStudent";

const InfoStudentForAdmin = () => {
  const [showForm, setShowForm] = useState(false);
  const accessToken = localStorage.getItem("token");
  const [searchId, setSearchId] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [data, setData] = useState([]);

  const handleOpenForm = () => {
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  const handleSearch = async () => {
    try {
      const url = `http://trungtamdaotaolaixebinhduong.com:8080/api/admin/account/${searchId}`;

      if (searchId === "") {
        setSearchResult(data);
        setIsSearching(true);
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

        const responseDataSearchByID = await response.json();
        console.log("API response:", responseDataSearchByID);

        // Gán dữ liệu vào biến state searchResult
        if (responseDataSearchByID) {
          setSearchResult([responseDataSearchByID]);
          setIsSearching(true);
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleReset = () => {
    setSearchId("");
    setSearchResult([]);
    setIsSearching(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url =
          "http://trungtamdaotaolaixebinhduong.com:8080/api/admin/account";
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
        setData(fetchedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [accessToken]);

  const renderData = isSearching ? searchResult : data;
  // đôi mật khẩu

  return (
    <MainLayoutAdmin>
      <div className="contain-table-info">
        <div className="header-info">
          <h1>Quản lý học viên</h1>
          <button className="add-button">Thêm học viên</button>
          <button onClick={handleOpenForm} className="updatePW-button">
            Cập nhật mật khẩu
          </button>
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

        {/* form cập nhật PW */}
        {/* <FormUpdatePW /> */}

        <div class="container">
          <table>
            <thead>
              <tr>
                <th>No.</th>
                <th>UserName</th>
                <th>Role</th>
                <th>Active</th>
                <th className="text-center-info">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {renderData.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.username}</td>
                  <td>{item.role}</td>
                  <td>{item.active}</td>
                  <td className="button-info">
                    <button>Sửa</button>
                    <button>Xóa</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {showForm && (
        <div className="popup">
          <div className="popup-inner">
            <FormUpdatePW handleCloseForm={handleCloseForm} />
          </div>
        </div>
      )}
    </MainLayoutAdmin>
  );
};

export default InfoStudentForAdmin;
