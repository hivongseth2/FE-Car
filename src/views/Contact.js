import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "../styles/contact.scss";
import MainLayoutAdmin from "./Dashboard/MainLayoutAdmin";
import { set } from "date-fns";

const Contact = () => {
  document.title = "Quản lý liên hệ mới";
  const [data, setData] = useState([]);
  const [selectedRowId, setSelectedRowId] = useState(null);
  const [selectedRowIdDelete, setSelectedRowIdDelete] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [checkedStatus, setCheckedStatus] = useState({});

  // ===================
  const [searchId, setSearchId] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const accessToken = localStorage.getItem("token");

  // Phan trang
  const [currentPageContact, setCurrentPageContact] = useState(0);
  const [totalPagesContact, setTotalPagesContact] = useState(0);

  // Xoa
  const [showConfirmation, setShowConfirmation] = useState(false);

  // ===================
  const handleSearch = async () => {
    try {
      const accessToken = localStorage.getItem("token");

      const url = `${
        process.env.REACT_DOMAIN ||
        "http://trungtamdaotaolaixebinhduong.com:8080"
      }/api/admin/contact?filter=${searchId}`;

      if (searchId === "") {
        setSearchResult(data);
        setShowResult(false);
      } else {
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (!response.ok) {
          console.log("Error fetching data");

          toast.error("Không tìm thấy học viên");
        }

        const responseDataSearchById = await response.json();
        if (responseDataSearchById) {
          setShowResult(true);
          const fetchedDataFilter =
          responseDataSearchById && responseDataSearchById.data
              ? responseDataSearchById.data
              : [];
              setSearchResult(fetchedDataFilter);
        } else {
          // Hiển thị thông báo không tìm thấy
          console.log("Không tìm thấy học viên");
          setShowResult(false);
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // ===================
  const toggleConfirmation = () => {
    setShowConfirmation(!showConfirmation);
  };

  // ===================
  const handleReset = () => {
    setSearchId("");
    setShowResult(false);
    setSearchResult(data);
  };

  const getAllContact = async () => {
    try {
      const url = `${
        process.env.REACT_DOMAIN ||
        "http://trungtamdaotaolaixebinhduong.com:8080"
      }/api/admin/contact?page=${currentPageContact}&size=10`;
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
      // Lấy tổng số trang từ response và cập nhật state
      const totalPages =
        responseData && responseData.totalPages ? responseData.totalPages : 0;
      setTotalPagesContact(totalPages);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getAllContact();
  }, [accessToken, currentPageContact, isEditing]);

  useEffect(() => {
    const storedCheckedStatus = JSON.parse(
      localStorage.getItem("checkedStatus")
    );
    if (storedCheckedStatus) {
      setCheckedStatus(storedCheckedStatus);
    }
  }, []);

  const handleFullNameChange = (e, id) => {
    const updatedData = data.map((item) =>
      item.id === id ? { ...item, fullName: e.target.value } : item
    );
    setData(updatedData);
  };

  const handlePhoneNumberChange = (e, id) => {
    const updatedData = data.map((item) =>
      item.id === id ? { ...item, phoneNumber: e.target.value } : item
    );
    setData(updatedData);
  };

  const handleNoteChange = (e, id) => {
    const updatedData = data.map((item) =>
      item.id === id ? { ...item, note: e.target.value } : item
    );
    setData(updatedData);
  };

  const handleSaveChanges = async (id) => {
    try {
      const confirmed = window.confirm("Bạn có chắc chắn muốn cập nhật ?");

      if (!confirmed) {
        return; // Exit the function if the user cancels the confirmation
      }

      const selectedRow = data.find((item) => item.id === id);
      const url = `${
        process.env.REACT_DOMAIN ||
        "http://trungtamdaotaolaixebinhduong.com:8080"
      }/api/admin/contact/${id}`;
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(selectedRow),
      });
      if (!response.ok) {
        throw new Error("Error updating data");
      }
      setSelectedRowId(null); // Reset the selected row after saving changes
      setIsEditing(true); // Exit edit mode after saving
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  useEffect(() => {
    localStorage.setItem("checkedStatus", JSON.stringify(checkedStatus));
  }, [checkedStatus]);

  const handleDeleteContact = async () => {
    try {
      const accessToken = localStorage.getItem("token");
      const url = `${
        process.env.REACT_DOMAIN ||
        "http://trungtamdaotaolaixebinhduong.com:8080"
      }/api/admin/contact/${selectedRowIdDelete.id}`;

      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        throw new Error("Error deleting student");
      }

      // Xóa sinh viên thành công
      toast.success("Xóa sinh viên thành công");

      // Remove the deleted student from dataStudent array
      setData((prevData) =>
        prevData.filter((contact) => contact.id !== selectedRowIdDelete.id)
      );
    } catch (error) {
      console.error("Error deleting student:", error);
      toast.error("Đã xảy ra lỗi khi xóa");
    }
  };

  const handlePreviousPage = () => {
    if (currentPageContact > 0) {
      setCurrentPageContact(currentPageContact - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPageContact < totalPagesContact - 1) {
      setCurrentPageContact(currentPageContact + 1);
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPageContact(pageNumber);
  };

  // Tạo danh sách các số trang để hiển thị
  const pageNumbers = [];
  for (let i = 1; i <= totalPagesContact; i++) {
    pageNumbers.push(i);
  }

  const renderDataContact = showResult ? searchResult : data;

  return (
    <MainLayoutAdmin>
      <div>
        <div className="header-info">
          <h1>Quản lý khách hàng</h1>
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
          <button
            className="button-search-student"
            onClick={handleSearch}
          >
            Tìm kiếm
          </button>
          <button className="reset-button" onClick={handleReset}>
            Trở về
          </button>
        </div>
        {/* ========================== */}
        <div className="container-table">
          <table className="table-contact">
            <thead className="thead-contact">
              <tr>
                <th>ID</th>
                <th>Họ tên</th>
                <th>Số điện thoại</th>
                <th>Ghi chú</th>
                <th>Đã gọi</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody className="tbody-contact">
              {renderDataContact.map((item) => (
                <tr key={item.id} onClick={() => setSelectedRowIdDelete(item)}>
                  <td>{item.id}</td>
                  <td>
                    {selectedRowId === item.id ? (
                      <input
                        type="text"
                        value={item.fullName}
                        onChange={(e) => handleFullNameChange(e, item.id)}
                      />
                    ) : (
                      item.fullName
                    )}
                  </td>
                  <td>
                    {selectedRowId === item.id ? (
                      <input
                        type="text"
                        value={item.phoneNumber}
                        onChange={(e) => handlePhoneNumberChange(e, item.id)}
                      />
                    ) : (
                      item.phoneNumber
                    )}
                  </td>
                  <td>
                    {selectedRowId === item.id ? (
                      <input
                        type="text"
                        value={item.note}
                        onChange={(e) => handleNoteChange(e, item.id)}
                      />
                    ) : (
                      item.note
                    )}
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      checked={checkedStatus[item.id]}
                      // disabled={!checkedStatus[item.id]}
                      onChange={() =>
                        setCheckedStatus((prevState) => ({
                          ...prevState,
                          [item.id]: !prevState[item.id],
                        }))
                      }
                    />
                  </td>

                  <td className="button-info">
                    {selectedRowId === item.id ? (
                      <button onClick={() => handleSaveChanges(item.id)}>
                        Lưu
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          setSelectedRowId(item.id); setIsEditing(false);
                        }}
                      >
                        Sửa
                      </button>
                    )}
                    <div>
                      {showConfirmation ? (
                        <div>
                          <p>Bạn có chắc chắn muốn xóa?</p>
                          <button
                            onClick={handleDeleteContact}
                            style={{ background: "red" }}
                          >
                            Xóa
                          </button>
                          <button
                            onClick={toggleConfirmation}
                            style={{ background: "green" }}
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
          <div>
            <button
              onClick={handlePreviousPage}
              disabled={currentPageContact === 0}
            >
              Previous
            </button>

            {/* <span className="total-page">
              Tổng : {totalPagesContact} - Trang hiện tại:{" "}
              {currentPageContact + 1}
            </span> */}

            {/* {pageNumbers.map((pageNumber) => (
          <button
            key={pageNumber}
            onClick={() => handlePageChange(pageNumber - 1)}
            disabled={pageNumber - 1 === currentPage}
          >
            {pageNumber}
          </button>
        ))} */}
            <button>
              Tổng số trang: {totalPagesContact} - Trang hiện tại:{" "}
              {currentPageContact + 1}
            </button>
            <button
              onClick={handleNextPage}
              disabled={currentPageContact === totalPagesContact}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </MainLayoutAdmin>
  );
};

export default Contact;
