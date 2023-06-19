import React, { useState, useEffect } from "react";
import "../../styles/DashboardScss/InfoStudentForAdmin.scss";
import "../../styles/DashboardScss/TableStudent.scss";
import MainLayoutAdmin from "./MainLayoutAdmin";
import SearchByID from "../SearchByID";
import FormUpdatePW from "./FormUpdatePW";
import FormSearchStudent from "./FormSearchStudent";
import CreateStudent from "../CreateStudent";

const InfoStudentForAdmin = () => {
  const [showForm, setShowForm] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const accessToken = localStorage.getItem("token");
  const [searchId, setSearchId] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [data, setData] = useState([]);
  const [editButton, setEditButton] = useState(false);
  const [editedData, setEditedData] = useState({});

  const handleOpenForm = () => {
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  const handleShowCreateForm = (value) => {
    setShowCreateForm(value);
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

  const handleEditClick = () => {
    setEditButton(true);
    setEditedData({});
  };

  const handleSaveClick = () => {
    const updatedData = renderData.map((item) => {
      if (editedData[item.id] !== undefined) {
        return {
          ...item,
          active: editedData[item.id],
        };
      }
      return item;
    });

    if (isSearching) {
      setSearchResult(updatedData);
    } else {
      setData(updatedData);
    }

    setEditButton(false);
    setEditedData({});
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

  const handleActiveChange = (itemId, checked) => {
    setEditedData((prevState) => ({
      ...prevState,
      [itemId]: checked,
    }));
  };

  return (
    <MainLayoutAdmin>
      <div className="contain-table-info">
        <div className="header-info">
          <h1>Quản lý khoản</h1>
          <button
            className="add-button"
            onClick={() => handleShowCreateForm(true)}
          >
            Thêm tài khoản
          </button>
          <button
            onClick={handleOpenForm}
            className="updatePW-button"
            style={{
              marginRight: "-0px",
            }}
          >
            Cập nhật mật khẩu
          </button>
        </div>
        <div className="searchByID">
          Tìm kiếm tài khoản theo ID:
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
          <table className="table-account">
            <thead className="thead">
              <tr>
                <th>No.</th>
                <th>UserName</th>
                <th>Role</th>
                <th>Active</th>
                <th className="text-center-info">Hành động</th>
              </tr>
            </thead>
            <tbody className="tbody">
              {renderData.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.username}</td>
                  <td>{item.role}</td>
                  <td>
                    {editButton ? (
                      <input
                        type="checkbox"
                        checked={
                          editedData[item.id] !== undefined
                            ? editedData[item.id]
                            : item.active
                        }
                        onChange={(e) =>
                          handleActiveChange(item.id, e.target.checked)
                        }
                        onClick={(e) => e.preventDefault()} // Prevent page reload
                      />
                    ) : item.active ? (
                      "active"
                    ) : (
                      "deactive"
                    )}
                  </td>
                  <td className="button-info">
                    {editButton ? (
                      <>
                        <button onClick={handleSaveClick}>Lưu</button>
                        <button onClick={() => setEditButton(false)}>
                          Hủy
                        </button>
                      </>
                    ) : (
                      <button onClick={handleEditClick}>Sửa</button>
                    )}
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
      {showCreateForm && (
        <div className="popup">
          <div className="popup-inner">
            <CreateStudent handleShowCreateForm={handleShowCreateForm} />
          </div>
        </div>
      )}
    </MainLayoutAdmin>
  );
};

export default InfoStudentForAdmin;
