import React, { useState, useEffect } from "react";
import "../../styles/DashboardScss/InfoStudentForAdmin.scss";
import "../../styles/DashboardScss/TableStudent.scss";
import MainLayoutAdmin from "./MainLayoutAdmin";
import AdAccount from "./AdAccount";
import FormUpdatePW from "./FormUpdatePW";
import { toast } from "react-toastify";
import axios from "axios";
import { tr } from "date-fns/locale";

const InfoStudentForAdmin = () => {
  const [showForm, setShowForm] = useState(false);
  const accessToken = localStorage.getItem("token");
  const [searchId, setSearchId] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  const [data, setData] = useState([]);
  const [showFormAddAccount, setShowFormAddAccount] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState({});
  const [currentPageAccount, setCurrentPageAccount] = useState(0);
  const [totalPagesAccount, setTotalPagesAccount] = useState(0);
  const [isActived, setIsActived] = useState(false);
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
      }/api/admin/account?filter=${searchId}`;
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
        if (responseDataSearchByID) {
          setIsSearching(true);
          const fetchedDataFilter =
            responseDataSearchByID && responseDataSearchByID.data
              ? responseDataSearchByID.data
              : [];
          setSearchResult(fetchedDataFilter);
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
    setSearchResult([]);
    setIsSearching(false);
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
        setIsActived(true);
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
  }, [accessToken, currentPageAccount, isActived]);

  const renderData = isSearching ? searchResult : data;
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
        </div>
        {/* button search */}
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
            placeholder="Tìm kiếm"
            type="search"
            className="input-search-student"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
          />
          <button className="button-search-student" onClick={handleSearch}>
            Tìm kiếm
          </button>
          <button onClick={handleReset} className="reset-button">
            Trở về
          </button>
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
                <tr
                  key={item.id}
                  onClick={() => {
                    setSelectedAccount(item);
                  }}
                >
                  <td>{item.id}</td>
                  <td>{item.username}</td>
                  <td>{item.role}</td>
                  <td>
                    {item.active ? (
                      <input
                        type="checkbox"
                        checked={true}
                        onChange={() => {
                          const confirmed = window.confirm(
                            "Bạn có chắc muốn dừng hoạt động tài khoản này?"
                          );
                          if (confirmed) {
                            updateActive(item.id, false);
                            setIsActived(false);
                          }
                        }}
                      />
                    ) : (
                      <input
                        type="checkbox"
                        checked={false}
                        onChange={() => {
                          const confirmed = window.confirm(
                            "Bạn có chắc muốn mở hoạt động tài khoản này?"
                          );
                          if (confirmed) {
                            updateActive(item.id, true);
                            setIsActived(false);
                          }
                        }}
                      />
                    )}
                  </td>
                  <td className="button-info">
                    <button onClick={handleOpenForm}>Đổi mật khẩu</button>
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

            {/* <span className="total-page">
              Tổng : {totalPagesAccount} - Trang hiện tại:{" "}
              {currentPageAccount + 1}
            </span> */}

            {/* {pageNumbers.map((pageNumber) => (
              <button
                key={pageNumber}
                onClick={() => handlePageChange(pageNumber - 1)}
                disabled={pageNumber - 1 === currentPageAccount}
              >
                {pageNumber}
              </button>
            ))} */}
            <button>
              Tổng số trang: {totalPagesAccount} - Trang hiện tại:{" "}
              {currentPageAccount + 1}
            </button>
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

            <FormUpdatePW
              handleCloseForm={handleCloseForm}
              selectedAccount={selectedAccount}
            />
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
