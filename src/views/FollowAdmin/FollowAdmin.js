import React, { useEffect, useState } from "react";
import MainLayoutAdmin from "../Dashboard/MainLayoutAdmin";
import "../../styles/DashboardScss/TableStudent.scss";
import "./FollowAdmin.scss";
import AddFollow from "./AddFollow";
import axios from "axios";
import IncreaseHours from "./IncreaseHours";
import { toast } from "react-toastify";

const FollowAdmin = () => {
  const [data, setData] = useState([]);
  const token = localStorage.getItem("token");
  const [currentPage, setCurrentPage] = useState();
  const [totalPage, setTotalPage] = useState();
  const [degree, setDegree] = useState([]);
  const [inputSearch, setInputSearch] = useState();
  const [selectedDegree, setSelectedDegree] = useState(-1);
  const [isDegree, setIsDegree] = useState(false);
  const [urlDegree, setUrlDegree] = useState("");
  const [editingItem, setEditingItem] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isFormCrease, setIsFormCrease] = useState(false);
  const [creasingItem, setCreasingItem] = useState(null);

  const params = {
    filter: inputSearch,
    page: 0,
    size: 10,
  };
  const url = "http://trungtamdaotaolaixebinhduong.com:8080/api/admin/follow";

  // ========config default

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      accept: "application/json",
    },
    params,
  };
  // =========config của Search Degree
  const paramsDe = {
    "degree-id": selectedDegree,
    filter: inputSearch,
    page: 0,
    size: 10,
  };

  const configDe = {
    headers: {
      Authorization: `Bearer ${token}`,
      accept: "application/json",
    },
    paramsDe,
  };

  // ========== xử dụng cho báo hiệu render Increase
  const [isUpdated, setIsUpdated] = useState(false);

  const handleUpdateSuccess = () => {
    setIsUpdated(true);
    console.log(isUpdated);
  };

  const handleDegreeChange = (e) => {
    setInputSearch("");
    setSelectedDegree(e.target.value);
    console.log(selectedDegree);
  };
  // ============
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    fetchDegree();
  }, []);

  useEffect(() => {
    if (selectedDegree == -1) {
      setIsDegree(false);
    } else {
      setIsDegree(true);
      setUrlDegree(
        `http://trungtamdaotaolaixebinhduong.com:8080/api/admin/follow/by-degree?degree-id=${selectedDegree}`
      );
    }
  }, [selectedDegree]);

  useEffect(() => {
    setIsUpdated(false);
    if (!isDegree) {
      fetchData();
    } else {
      fetchFollowByDegree();
    }
  }, [isDegree, urlDegree, isUpdated]);

  // ==========================fetch data
  const fetchData = () => {
    console.log("config", config);

    axios
      .get(url, config)
      .then((response) => {
        setData(response.data.data);
        setTotalPage(response.data.totalPages);
        setCurrentPage(response.data.currentPage + 1);
        console.log(currentPage);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  // ========HANDLE FORM
  const handleAddSlideClick = () => {
    setIsFormOpen(true);
  };

  const handleFormClose = () => {
    setIsFormOpen(false);
  };
  // Form crease
  const handleCreaseOpen = (id) => {
    const itemToCreasing = data.find((item) => item.id === id);

    setCreasingItem(itemToCreasing);

    setIsFormCrease(true);
  };

  const handleCreaseClose = () => {
    setIsFormCrease(false);
  };

  // ==========xử lý button edit

  const handleEditClick = (id) => {
    const itemToEdit = data.find((item) => item.id === id);

    setEditingItem(itemToEdit);
    console.log("edit id", itemToEdit);
  };
  //  xử lý update ở đây nè
  const handleSaveClick = () => {
    const { studentId, degreeId } = editingItem.id;

    const requestBody = {
      automaticRunningHours: editingItem.automaticRunningHours,
      course: editingItem.course,
      degreeId: degreeId,
      hoursRunningDAT: editingItem.hoursRunningDAT,
      kmDAT: editingItem.kmDAT,
      nightRunningHours: editingItem.nightRunningHours,
      note: editingItem.note,
      simulatedTestScore: editingItem.simulatedTestScore,
      studentId: studentId,
      teacher: editingItem.teacher,
      theotyTestScore: editingItem.theotyTestScore,
    };
    console.log(editingItem);
    axios
      .put(
        `http://trungtamdaotaolaixebinhduong.com:8080/api/admin/follow/update?degree-id=${editingItem.id.degree.id}&student-id=${editingItem.id.student.id}`,
        requestBody,
        config
      )
      .then((response) => {
        console.log("Data updated successfully:", response.data);
        setEditingItem(null); // Reset editingItem to exit edit mode
        toast.success("Cập nhật thành công");
        setIsUpdated(true);
      })
      .catch((error) => {
        toast.error("Đã có lỗi xảy ra, vui lòng thử lại sau");
        console.error("Error updating data:", error);
      });

    setEditingItem(null);
  };
  //  xử lý xóa
  const handleDeleteClick = (id) => {
    const configDelete = {
      headers: {
        Authorization: `Bearer ${token}`,
        accept: "application/json",
      },
    };
    const urlDelete = `http://trungtamdaotaolaixebinhduong.com:8080/api/admin/follow/delete?degree-id=${id.degree.id}&student-id=${id.student.id}`;

    const confirmed = window.confirm("Bạn có chắc chắn muốn xóa?");
    if (confirmed) {
      axios
        .delete(urlDelete, configDelete)
        .then((response) => {
          if (response.error) {
            toast.error("Đã có lỗi xảy ra");
          }
          toast.success("Xóa thành công");
          setIsUpdated(true);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          toast.error("Có lỗi xảy ra, vui lòng thử lại sau");
        });
    }
  };

  //  xử lý điểm
  const handleIncreaseHourse = (id) => {
    console.log(id);
  };

  //=============fetch loại bằng
  const fetchDegree = () => {
    axios
      .get(
        "http://trungtamdaotaolaixebinhduong.com:8080/api/degree?size=10",
        {}
      )
      .then((response) => {
        setDegree(response.data.data);
        console.log("loai bang", degree);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  //=================fetch follow loại bằng
  const fetchFollowByDegree = () => {
    axios
      .get(urlDegree, configDe)
      .then((response) => {
        setData(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };
  // ==================== fetch data search

  const handleInputSearch = (e) => {
    setInputSearch(e.target.value);
  };

  const handleClickSearch = () => {
    console.log(isDegree);
    if (isDegree === false) {
      fetchData();
    } else {
      setUrlDegree(
        `http://trungtamdaotaolaixebinhduong.com:8080/api/admin/follow/by-degree?degree-id=${selectedDegree}&filter=${inputSearch}`
      );
    }
  };
  // xem xét lại chỗ này
  // useEffect(() => {
  //   if (!isDegree) {
  //     fetchFollowByDegree();
  //   }
  // }, [urlDegree]);

  return (
    <MainLayoutAdmin>
      <div className="contain-table-info">
        <div className="header-info">
          <h1>Quản lý theo dõi học viên</h1>
          <button onClick={handleAddSlideClick}>Thêm Follow mới</button>

          {isFormOpen && (
            <AddFollow
              onClose={handleFormClose}
              onUpdateSuccess={handleUpdateSuccess}
            />
          )}
        </div>
      </div>

      <div className="s131">
        <form>
          <div className="inner-form">
            <div className="input-field first-wrap">
              <input
                id="search"
                type="text"
                value={inputSearch}
                onChange={(e) => handleInputSearch(e)}
                placeholder="Nhập thông tin học viên?"
              />
            </div>
            <div className="input-field third-wrap">
              <button
                className="btn-search"
                type="button"
                onClick={() => {
                  handleClickSearch();
                }}
              >
                SEARCH
              </button>
            </div>
            <h3>Filter</h3>
            <div className="input-field second-wrap">
              <div className="input-select">
                <select
                  data-trigger=""
                  name="choices-single-defaul"
                  className="fieldSelect"
                  onChange={handleDegreeChange}
                >
                  <option value="-1" key={-1}>
                    Tất cả
                  </option>
                  {degree.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.rating}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </form>
      </div>

      <table className="container-table">
        <thead>
          <tr>
            <th>Họ tên</th>
            <th>Số điện thoại</th>
            <th>Loại bằng</th>
            <th>Khóa học</th>
            <th>Giờ chạy DAT</th>
            <th>Giờ chạy đêm</th>
            <th>Giờ chạy tự động</th>
            <th>Số km DAT</th>
            <th>Điểm lý thuyết</th>
            <th>Điểm mô phỏng</th>
            <th>Giáo viên </th>
            <th>Ghi chú</th>
            <th className="text-center-info">Hành động</th>
          </tr>
        </thead>

        <tbody>
          {data.map((item) => (
            <tr
              key={`${item.id.student.id}${item.id.degree.id}`}
              className="rowFollow"
            >
              <td>{item.id.student.fullName}</td>
              <td>{item.id.student.phoneNumber}</td>
              <td>{item.id.degree.rating}</td>
              <td>
                {editingItem && editingItem.id === item.id ? (
                  <input
                    type="text"
                    value={editingItem.course}
                    onChange={(e) => {
                      const newValue = e.target.value;
                      setEditingItem((prevItem) => ({
                        ...prevItem,
                        course: newValue,
                      }));
                    }}
                  />
                ) : (
                  item.course
                )}
              </td>
              <td>
                {editingItem && editingItem.id === item.id ? (
                  <input
                    type="text"
                    value={editingItem.hoursRunningDAT}
                    onChange={(e) => {
                      const newValue = e.target.value;
                      setEditingItem((prevItem) => ({
                        ...prevItem,
                        hoursRunningDAT: newValue,
                      }));
                    }}
                  />
                ) : (
                  item.hoursRunningDAT
                )}
              </td>
              <td>
                {editingItem && editingItem.id === item.id ? (
                  <input
                    type="text"
                    value={editingItem.nightRunningHours}
                    onChange={(e) => {
                      const newValue = e.target.value;
                      setEditingItem((prevItem) => ({
                        ...prevItem,
                        nightRunningHours: newValue,
                      }));
                    }}
                  />
                ) : (
                  item.nightRunningHours
                )}
              </td>
              <td>
                {editingItem && editingItem.id === item.id ? (
                  <input
                    type="text"
                    value={editingItem.automaticRunningHours}
                    onChange={(e) => {
                      const newValue = e.target.value;
                      setEditingItem((prevItem) => ({
                        ...prevItem,
                        automaticRunningHours: newValue,
                      }));
                    }}
                  />
                ) : (
                  item.automaticRunningHours
                )}
              </td>
              <td>
                {editingItem && editingItem.id === item.id ? (
                  <input
                    type="text"
                    value={editingItem.kmDAT}
                    onChange={(e) => {
                      const newValue = e.target.value;
                      setEditingItem((prevItem) => ({
                        ...prevItem,
                        kmDAT: newValue,
                      }));
                    }}
                  />
                ) : (
                  item.kmDAT
                )}
              </td>
              <td>
                {editingItem && editingItem.id === item.id ? (
                  <input
                    type="text"
                    value={editingItem.theotyTestScore}
                    onChange={(e) => {
                      const newValue = e.target.value;
                      setEditingItem((prevItem) => ({
                        ...prevItem,
                        theotyTestScore: newValue, // Update theotyTestScore in editingItem
                      }));
                    }}
                  />
                ) : (
                  item.theotyTestScore
                )}
              </td>
              <td>
                {editingItem && editingItem.id === item.id ? (
                  <input
                    type="text"
                    value={editingItem.simulatedTestScore}
                    onChange={(e) => {
                      const newValue = e.target.value;
                      setEditingItem((prevItem) => ({
                        ...prevItem,
                        simulatedTestScore: newValue, // Update simulatedTestScore in editingItem
                      }));
                    }}
                  />
                ) : (
                  item.simulatedTestScore
                )}
              </td>
              <td>
                {editingItem && editingItem.id === item.id ? (
                  <input
                    type="text"
                    value={editingItem.teacher}
                    onChange={(e) => {
                      const newValue = e.target.value;
                      setEditingItem((prevItem) => ({
                        ...prevItem,
                        teacher: newValue, // Update teacher in editingItem
                      }));
                    }}
                  />
                ) : (
                  item.teacher
                )}
              </td>
              <td>
                {editingItem && editingItem.id === item.id ? (
                  <input
                    type="text"
                    value={editingItem.note}
                    onChange={(e) => {
                      const newValue = e.target.value;
                      setEditingItem((prevItem) => ({
                        ...prevItem,
                        note: newValue, // Update note in editingItem
                      }));
                    }}
                  />
                ) : (
                  item.note
                )}
              </td>

              <td className="button-info">
                {/* <button onClick={() => handleIncreaseHourse(item.id)}>
                  Cập nhật điểm
                </button> */}
                {editingItem && editingItem.id === item.id ? (
                  <button className="saveButton" onClick={handleSaveClick}>
                    Lưu
                  </button>
                ) : (
                  <button
                    className="editButton"
                    onClick={() => handleEditClick(item.id)}
                  >
                    Sửa
                  </button>
                )}
                <button
                  className="deleteButton"
                  onClick={() => handleDeleteClick(item.id)}
                >
                  Xóa
                </button>

                <button
                  className="creaseButton"
                  onClick={() => handleCreaseOpen(item.id)}
                >
                  Thêm giờ
                </button>
                {isFormCrease &&
                  creasingItem &&
                  creasingItem.id === item.id && (
                    <IncreaseHours
                      onCloseCrease={handleCreaseClose}
                      onUpdateSuccess={handleUpdateSuccess}
                      itemId={item.id}
                    />
                  )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="TotalPageContainer">
        <ul className="TotalPage">
          {Array.from({ length: totalPage }, (_, index) => (
            <li
              key={index}
              className={
                index + 1 === currentPage
                  ? "TotalPageItem current"
                  : "TotalPageItem"
              }
            >
              {index + 1}
            </li>
          ))}
        </ul>
      </div>

      {/* </div> */}
    </MainLayoutAdmin>
  );
};

export default FollowAdmin;
