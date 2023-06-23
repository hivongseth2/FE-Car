import React, { useState, useEffect } from "react";
import "../../styles/DashboardScss/InfoStudentForAdmin.scss";
import "../../styles/DashboardScss/TableStudent.scss";
import MainLayoutAdmin from "./MainLayoutAdmin";
import AdAccount from "./AdAccount";
import FormUpdatePW from "./FormUpdatePW";
import { toast } from "react-toastify";
import axios from "axios";

const InfoStudentForAdmin = () => {
  const [showForm, setShowForm] = useState(false);
  const accessToken = localStorage.getItem("token");
  const [searchId, setSearchId] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  const [data, setData] = useState([]);
  const [editButton, setEditButton] = useState(false);
  const [editedData, setEditedData] = useState({});
  const [showFormAddAccount, setShowFormAddAccount] = useState(false);

  const [currentPageAccount, setCurrentPageAccount] = useState(0);
  const [totalPagesAccount, setTotalPagesAccount] = useState(0);

  // active
  const [checkedActive, setCheckedActive] = useState({});

  useEffect(() => {
    const storedCheckedActive = JSON.parse(
      localStorage.getItem("checkedActive")
    );
    if (storedCheckedActive) {
      setCheckedActive(storedCheckedActive);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("checkedActive", JSON.stringify(checkedActive));
  }, [checkedActive]);

  const handleOpenFormAddAccount = () => {
    setShowFormAddAccount(true);
  };

  const handleOpenForm = () => {
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  const handleSearch = async () => {
    try {
      const url = `${
        process.env.REACT_DOMAIN ||
        "http://trungtamdaotaolaixebinhduong.com:8080"
      }/api/admin/account/${searchId}`;
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
        // console.log("API response:", responseDataSearchByID);

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

  const updateActive = async (id, newActive) => {
    try {
      const url = `${
        process.env.REACT_DOMAIN ||
        "http://trungtamdaotaolaixebinhduong.com:8080"
      }/api/admin/account/deactive?id=${id}`;
      const response = await axios.put(
        url,
        { Active: newActive },
        {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (response.status === 200) {
        // Cập nhật trạng thái thành công
        console.log("Certificate Active updated successfully");
        toast.success("Cập nhật trạng thái thành công");
        setTimeout(() => window.location.reload(), 1000);
        // window.location.reload();
      } else {
        // Cập nhật trạng thái thất bại, xử lý lỗi hoặc hiển thị thông báo lỗi
        console.error("Failed to update certificate Active");
        toast.error("Cập nhật trạng thái thất bại");
      }
    } catch (error) {
      console.error("Error updating certificate Active:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `${
          process.env.REACT_DOMAIN ||
          "http://trungtamdaotaolaixebinhduong.com:8080"
        }/api/admin/account?page=${currentPageAccount}&size=10`;
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
        // Lấy tổng số trang từ response và cập nhật state
        const totalPages =
          responseData && responseData.totalPages ? responseData.totalPages : 0;
        setTotalPagesAccount(totalPages);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [accessToken, currentPageAccount]);

  const renderData = isSearching ? searchResult : data;

  const handleActiveChange = (itemId, checked) => {
    setEditedData((prevState) => ({
      ...prevState,
      [itemId]: checked,
    }));
  };

  const handlePreviousPage = () => {
    if (currentPageAccount > 0) {
      setCurrentPageAccount(currentPageAccount - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPageAccount < totalPagesAccount - 1) {
      setCurrentPageAccount(currentPageAccount + 1);
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPageAccount(pageNumber);
  };

  // Tạo danh sách các số trang để hiển thị
  const pageNumbers = [];
  for (let i = 1; i <= totalPagesAccount; i++) {
    pageNumbers.push(i);
  }

  return (
    <MainLayoutAdmin>
      <div className="contain-table-info">
        <div className="header-info">
          <h1>Quản lý khoản</h1>
          <button
            className="add-button"
            onClick={() => handleOpenFormAddAccount(true)}
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

        <div class="container-table">
          <table className="table-account">
            <thead className="thead">
              <tr>
                <th>No.</th>
                <th>UserName</th>
                <th>Role</th>
                <th>Active/ tích là hoạt động được</th>
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
                    {item.active ? (
                      <input
                        type="checkbox"
                        checked={true}
                        onChange={() => updateActive(item.id, false)}
                      />
                    ) : (
                      <input
                        type="checkbox"
                        checked={false}
                        onChange={() => updateActive(item.id, true)}
                      />
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
          <div>
            <button
              onClick={handlePreviousPage}
              disabled={currentPageAccount === 0}
            >
              Previous
            </button>

            <span className="total-page">
              Tổng : {totalPagesAccount} - Trang hiện tại:{" "}
              {currentPageAccount + 1}
            </span>

            {/* {pageNumbers.map((pageNumber) => (
              <button
                key={pageNumber}
                onClick={() => handlePageChange(pageNumber - 1)}
                disabled={pageNumber - 1 === currentPageAccount}
              >
                {pageNumber}
              </button>
            ))} */}
            <button>Tổng số trang: {totalPagesAccount} - Trang hiện tại: {currentPageAccount+1}</button>
            <button
              onClick={handleNextPage}
              disabled={setCurrentPageAccount === totalPagesAccount}
            >
              Next 
            </button>
          </div>
        </div>
      </div>
      {showForm && (
        <div className="popup">
          <div className="popup-inner">
            {/* <AdAccount handleCloseForm={handleCloseForm} /> */}
            <FormUpdatePW handleCloseForm={handleCloseForm} />
          </div>
        </div>
      )}
      {showFormAddAccount && (
        <div className="popup">
          <div className="popup-inner">
            <AdAccount handleCloseForm={() => setShowFormAddAccount(false)} />
          </div>
        </div>
      )}
    </MainLayoutAdmin>
  );
};

export default InfoStudentForAdmin;
