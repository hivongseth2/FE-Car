import React, { useState, useEffect } from "react";
import "../styles/Certificate.scss";
import MainLayoutAdmin from "./Dashboard/MainLayoutAdmin";
import { toast } from "react-toastify";
import axios from "axios";
import CreateCertificate from "./CreateCertificate";

const Certificate = () => {
  const accessToken = localStorage.getItem("token");
  const [data, setData] = useState([]);
  const [filterSearchCertificate, setFilterSearchCertificate] = useState("");
  const [dataSearchCertificate, setDataSearchCertificate] = useState([]);
  const [isSearchingCertificate, setIsSearchingCertificate] = useState(false);
  const [certificateFilterByDegree, setCertificateFilterByDegree] =
    useState("");
  const [dataCertificateFilterByDegree, setDataCertificateFilterByDegree] =
    useState([]);
  const [isSearchingFilterByDegree, setIsSearchingFilterByDegree] =
    useState(false);
  // create
  const [showCreateCertificate, setShowCreateCertificate] = useState(false);
  const handleShowCreateCertificate = (value) => {
    setShowCreateCertificate(value);
  };

  // confirm xoa
  const [showConfirmation, setShowConfirmation] = useState(false);
  const toggleConfirmation = () => {
    setShowConfirmation(!showConfirmation);
  };
  // Phan trang
  const [currentPageCertificate, setCurrentPageCertificate] = useState(0);
  const [totalPagesCertificate, setTotalPagesCertificate] = useState(0);
  // Reload lại trang
  const [isEditingCertificate, setIsEditingCertificate] = useState(false);

  const handleIsEditingCertificate = () => {
    setIsEditingCertificate(false);
  };

  const handleCertificateFilter = (event) => {
    const selectedValue = event.target.value;
    setCertificateFilterByDegree(selectedValue);
  };

  const getByDegree = async () => {
    try {
      const url = `${
        process.env.REACT_DOMAIN ||
        "http://trungtamdaotaolaixebinhduong.com:8080"
      }/api/admin/by-degree?degree-id=${certificateFilterByDegree}&page=0&size=10`;
      if (certificateFilterByDegree === "") {
        setDataCertificateFilterByDegree(data);
        setIsSearchingFilterByDegree(false);
      } else {
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        });
        if (!response.ok) {
          throw new Error("Error fetching data");
        }
        const responseDataFilterByDegree = await response.json();
        // console.log("API response:", responseDataFilterByDegree);
        if (
          responseDataFilterByDegree &&
          responseDataFilterByDegree.data &&
          responseDataFilterByDegree.data.length > 0
        ) {
          setIsSearchingFilterByDegree(true);
          const fetchedDataFilter =
            responseDataFilterByDegree && responseDataFilterByDegree.data
              ? responseDataFilterByDegree.data
              : [];
          setDataCertificateFilterByDegree(fetchedDataFilter);
        } else {
          setIsSearchingFilterByDegree(false);
          setDataCertificateFilterByDegree([]);
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getAllCertificateFilter = async () => {
    try {
      const url = `${
        process.env.REACT_DOMAIN ||
        "http://trungtamdaotaolaixebinhduong.com:8080"
      }/api/admin?filter=${filterSearchCertificate}&page=${currentPageCertificate}&size=1`;

      if (filterSearchCertificate === "") {
        setDataSearchCertificate(data);
        setIsSearchingCertificate(false);
      } else {
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        });
        if (!response.ok) {
          throw new Error("Error fetching data");
        }
        const responseDataFilter = await response.json();
        // console.log("API response:", responseDataFilter);
        if (
          responseDataFilter &&
          responseDataFilter.data &&
          responseDataFilter.data.length > 0
        ) {
          setIsSearchingCertificate(true);
          const fetchedDataFilter =
            responseDataFilter && responseDataFilter.data
              ? responseDataFilter.data
              : [];
          setDataSearchCertificate(fetchedDataFilter);
          const totalPages =
            responseDataFilter && responseDataFilter.totalPages
              ? responseDataFilter.totalPages
              : 0;
          setTotalPagesCertificate(totalPages);
        } else {
          setIsSearchingCertificate(false);
          setDataSearchCertificate([]);
          toast.error("Không tìm thấy kết quả");
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleResetFilter = () => {
    setFilterSearchCertificate("");
    setIsSearchingCertificate(false);
    setDataSearchCertificate(data);
  };

  const getAllCertificate = async () => {
    try {
      const url = `${
        process.env.REACT_DOMAIN ||
        "http://trungtamdaotaolaixebinhduong.com:8080"
      }/api/admin?page=${currentPageCertificate}&size=3`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
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
      setDataSearchCertificate(fetchedData);
      // Lấy tổng số trang từ response và cập nhật state
      const totalPages =
        responseData && responseData.totalPages ? responseData.totalPages : 0;
      setTotalPagesCertificate(totalPages);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getAllCertificate();
    getAllCertificateFilter();
  }, [accessToken, currentPageCertificate, isEditingCertificate]);

  const deleteCertificate = async (degreeId, studentId) => {
    try {
      const url = `${
        process.env.REACT_DOMAIN ||
        "http://trungtamdaotaolaixebinhduong.com:8080"
      }/api/admin/delete?degree-id=${degreeId}&student-id=${studentId}`;
      const response = await axios.delete(url, {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.status === 200) {
        // Xóa thành công, thực hiện các hành động cần thiết
        // console.log("Certificate deleted successfully");
        getAllCertificate();
        toast.success("Xóa thành công");
      } else {
        // Xóa thất bại, xử lý lỗi hoặc hiển thị thông báo lỗi
        console.error("Failed to delete certificate");
        toast.success("Xóa thành công");
      }
    } catch (error) {
      console.error("Error deleting certificate:", error);
    }
  };

  const updateCertificateStatus = async (degreeId, studentId, newStatus) => {
    try {
      const confirmed = window.confirm(
        "Bạn có chắc chắn muốn cập nhật trạng thái?"
      );

      if (!confirmed) {
        return; // Exit the function if the user cancels the confirmation
      }

      const url = `${
        process.env.REACT_DOMAIN ||
        "http://trungtamdaotaolaixebinhduong.com:8080"
      }/api/admin/destatus?degree-id=${degreeId}&student-id=${studentId}`;
      const response = await axios.put(
        url,
        { status: newStatus },
        {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (response.status === 200) {
        // Cập nhật trạng thái thành công
        // console.log("Certificate status updated successfully");
        toast.success("Cập nhật trạng thái thành công");
        setIsEditingCertificate(true);
        // window.location.reload();
      } else {
        // Cập nhật trạng thái thất bại, xử lý lỗi hoặc hiển thị thông báo lỗi
        console.error("Failed to update certificate status");
        toast.error("Cập nhật trạng thái thất bại");
      }
    } catch (error) {
      console.error("Error updating certificate status:", error);
    }
  };

  const handlePreviousPage = () => {
    if (currentPageCertificate > 0) {
      setCurrentPageCertificate(currentPageCertificate - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPageCertificate < totalPagesCertificate - 1) {
      setCurrentPageCertificate(currentPageCertificate + 1);
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPageCertificate(pageNumber);
  };

  // Tạo danh sách các số trang để hiển thị
  const pageNumbers = [];
  for (let i = 1; i <= totalPagesCertificate; i++) {
    pageNumbers.push(i);
    // console.log(pageNumbers);
  }

  const renderDataCertificate = isSearchingFilterByDegree
    ? dataCertificateFilterByDegree
    : isSearchingCertificate
    ? dataSearchCertificate
    : data;

  return (
    <div>
      <MainLayoutAdmin>
        <div className="header-info">
          <h1>Thông tin học viên</h1>
        </div>
        {/* <button onClick={() => handleShowCreateCertificate(true)}>Thêm</button> */}
        {/* <div className="searchByIDCer">
          <span className="content-search-cer">
            Tìm kiếm theo tên hoặc số điện thoại:
          </span>
          <input
            type="text"
            placeholder="Nhập thông tin"
            className="input-certificate"
            value={filterSearchCertificate}
            onChange={(e) => setFilterSearchCertificate(e.target.value)}
          />
          <button onClick={getAllCertificateFilter}>Tìm kiếm</button>
          {isSearchingCertificate && (
            <button onClick={handleResetFilter}>Trở về</button>
          )}
        </div> */}
        {/* <div className="searchByIDCer">
          <span className="content-search-cer">Tìm kiếm theo loại bằng:</span>
          <select
            className="select-certificate"
            value={certificateFilterByDegree}
            onChange={handleCertificateFilter}
          >
            <option value="">Tất cả</option>
            <option value="1">B1</option>
            <option value="2">B2</option>
            <option value="3">C</option>
          </select>
          <button onClick={getByDegree}>Tìm kiếm</button>
        </div> */}
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
            placeholder="Tìm kiếm theo tên hoặc số điện thoại"
            type="search"
            className="input-search-student"
            value={filterSearchCertificate}
            onChange={(e) => setFilterSearchCertificate(e.target.value)}
          />
          <button
            className="button-search-student"
            onClick={getAllCertificateFilter}
          >
            Tìm kiếm
          </button>
          <button onClick={handleResetFilter} className="reset-button">
            Trở về
          </button>
        </div>

        <div className="container-table">
          <table className="table-certificate">
            <thead className="thead-certificate">
              <tr>
                <th>ID</th>
                <th>Họ tên</th>
                <th>Số điện thoại</th>
                <th>Loại bằng</th>
                <th>Năm sinh</th>
                <th>Trạng thái</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody className="tbody-certificate">
              {renderDataCertificate.length === 0 && (
                <tr>
                  <td colSpan="7">Không có dữ liệu</td>
                </tr>
              )}
              {renderDataCertificate.map((item) => (
                <tr key={`${item.id.student.id}-${item.id.degree.id}`}>
                  <td>{item.id.student.id}</td>
                  <td>{item.id.student.fullName}</td>
                  <td>{item.id.student.phoneNumber}</td>
                  <td>{item.id.degree.rating}</td>
                  <td>{item.finishDay}</td>
                  <td>
                    {item.status ? (
                      <input
                        type="checkbox"
                        checked={true}
                        onChange={() =>
                          updateCertificateStatus(
                            item.id.degree.id,
                            item.id.student.id,
                            false
                          )
                        }
                        onClick={handleIsEditingCertificate}
                      />
                    ) : (
                      <input
                        type="checkbox"
                        checked={false}
                        onChange={() =>
                          updateCertificateStatus(
                            item.id.degree.id,
                            item.id.student.id,
                            true
                          )
                        }
                        onClick={handleIsEditingCertificate}
                      />
                    )}
                  </td>
                  <td className="button-info">
                    {/* <button>Sửa</button> */}

                    <div>
                      {showConfirmation ? (
                        <div>
                          <p>Bạn có chắc chắn muốn xóa?</p>
                          <button
                            style={{ background: "red" }}
                            onClick={() =>
                              deleteCertificate(
                                item.id.degree.id,
                                item.id.student.id
                              )
                            }
                          >
                            Xóa
                          </button>
                          <button
                            style={{ background: "green" }}
                            onClick={toggleConfirmation}
                          >
                            Hủy
                          </button>
                        </div>
                      ) : (
                        <button onClick={toggleConfirmation}>Xóa</button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div>
          <button
            onClick={handlePreviousPage}
            disabled={currentPageCertificate === 0}
          >
            Previous
          </button>

          {/* <span className="total-page">
            Tổng : {totalPagesCertificate} - Trang hiện tại:{" "}
            {currentPageCertificate + 1}
          </span> */}

          {/* {pageNumbers.map((pageNumber) => (
            <button
              key={pageNumber}
              onClick={() => handlePageChange(pageNumber - 1)}
              disabled={pageNumber - 1 === currentPageCertificate}
            >
              {pageNumber}
            </button>
          ))} */}
          <button>
            Tổng số trang: {totalPagesCertificate} - Trang hiện tại:{" "}
            {currentPageCertificate + 1}
          </button>
          <button
            onClick={handleNextPage}
            disabled={currentPageCertificate === totalPagesCertificate}
          >
            Next
          </button>
        </div>

        {showCreateCertificate && (
          <div className="popup">
            <div className="popup-inner">
              <CreateCertificate
                handleShowCreateCertificate={handleShowCreateCertificate}
                getAllCertificate={getAllCertificate}
              />
            </div>
          </div>
        )}
      </MainLayoutAdmin>
    </div>
  );
};

export default Certificate;
