import React from "react";
import "./AddFollow.scss";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const AddFollow = (props) => {
  const [degree, setDegree] = useState([]);
  const [data, setData] = useState([]);
  const [phone, setPhone] = useState("");
  const [formData, setFormData] = useState({
    course: "",
    teacher: "",
    note: "",

    // name: "",
    studentId: "",
    degreeId: "",
    automaticRunningHours: 0,
    hoursRunningDAT: 0,
    kmDAT: 0,
    nightRunningHours: 0,
    theotyTestScore: 0,
    simulatedTestScore: 0,
  });
  const [nameStudent, setNameStudent] = useState(null);
  const token = localStorage.getItem("token");
  const [showPopup, setShowPopup] = useState(false);
  const [popupData, setPopupData] = useState({ id: "", name: "", phone: "" });

  const [filterSearchStudent, setFilterSearchStudent] = useState(""); // Dữ liệu tìm kiếm theo filter [
  const [dataSearchFilter, setDataSearchFilter] = useState([]);

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      // accept: "application/json",
      "Content-Type": "application/json",
    },
    request: formData, // Thay đổi tên biến này thành 'request'
  };
  //  lỗi generic
  const submitForm = async () => {
    try {
      const { phone, ...updatedFormData } = formData;
      setFormData(updatedFormData);
      console.log("ssssss", formData);
      const urlcr = `${
        process.env.REACT_DOMAIN ||
        "http://trungtamdaotaolaixebinhduong.com:8080"
      }/api/admin/follow/create`;
      const response = await fetch(urlcr, {
        method: "POST",
        ...config,
        body: JSON.stringify(config.request),
      });

      if (!response.ok) {
        toast.error(response.error);
        throw new Error("Error fetching data");
      } else {
        toast.success("Tạo theo dõi thành công");
        props.onUpdateSuccess();
        closeForm();
        return;
      }
    } catch (error) {
      toast.error("đã xảy ra lỗi trong quá trình tạo, vui lòng thử lại sau");
    }
  };

  const handleSearchFilter = async () => {
    try {
      const url = `${
        process.env.REACT_DOMAIN ||
        "http://trungtamdaotaolaixebinhduong.com:8080"
      }/api/admin/student?filter=${formData.phone}`;

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Error fetching data");
      }

      const responseDataSearchFilter = await response.json();
      console.log("API response:", responseDataSearchFilter);

      // Gán dữ liệu vào biến state searchResult hoặc hiển thị thông báo nếu không tìm thấy
      if (responseDataSearchFilter && responseDataSearchFilter.data) {
        const fetchedDataFilter = responseDataSearchFilter.data;
        setDataSearchFilter(fetchedDataFilter);

        // =========== pop up
        if (fetchedDataFilter.length > 0) {
          const firstData = fetchedDataFilter[0]; // Assuming you want to display the first data item
          setPopupData({
            id: firstData.id,
            name: firstData.fullName,
            phone: firstData.phoneNumber,
          });
          setShowPopup(true);
        } else {
          alert("khong tim thay");
        }
        // ============end pop up
      } else {
        // Hiển thị thông báo không tìm thấy
        console.log("Không tìm thấy học viên");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    // Chuyển đổi degreeId thành số nguyên khi tên trường là "degreeId"
    const processedValue = name === "degreeId" ? parseInt(value, 10) : value;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: processedValue,
    }));
  };

  useEffect(() => {
    fetchDegree();
  }, []);

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
  // ========Xử lý chọn tên

  const selectStudent = (e) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      phone: e.phoneNumber,
      studentId: e.id,
    }));
    console.log(e);
    setNameStudent(e.fullName);
  };

  // create button
  const CreateFollow = () => {
    console.log(formData);

    submitForm();
  };
  //
  const closeForm = () => {
    props.onClose();
  };
  return (
    <div className="container">
      <div className="title">Thêm theo dõi mới</div>
      <button className="closeBtn" onClick={closeForm}>
        X
      </button>
      <form>
        <div className="user__details">
          <div className="input__box">
            <span className="details">Số điện thoại</span>
            <input
              type="text"
              name="phone"
              placeholder="09xxx"
              // required
              className="phoneInput"
              value={formData.phone}
              onChange={handleInputChange}
            />
            <button
              type="button" // Change the type to "button"
              className="searchPhone"
              onClick={() => {
                handleSearchFilter();
              }}
            >
              tìm
            </button>

            {/* ========= */}

            {/* ============ */}
          </div>
          <div className="input__box">
            <span className="details">Tên học viên</span>
            <input
              type="text"
              readOnly
              className="NameInput"
              value={nameStudent}
            />
          </div>
          <div className="input__box">
            <span className="details">Tên khóa học</span>
            <input
              type="text"
              name="course"
              placeholder=""
              className="courseInput"
              value={formData.course}
              onChange={handleInputChange}
            />
          </div>
          <div className="input__box">
            <span className="details">Giảng viên</span>
            <input
              type="text"
              name="teacher"
              placeholder=""
              // required
              className="GVInput"
              value={formData.instructor}
              onChange={handleInputChange}
            />
          </div>
          <div className="input__box">
            <span className="details">Ghi chú</span>
            <input
              type="email"
              name="note"
              placeholder="Note"
              // required
              className="noteInput"
              value={formData.note}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="gender__details">
          <span className="gender__title">Loại bằng</span>
          <div className="category">
            {degree.map((item) => (
              <div className="itemDegree" key={item.id}>
                <input
                  type="radio"
                  name="degreeId"
                  id={item.id}
                  className={`dot dot-${item.id}`}
                  value={item.id}
                  // checked={formData.selectedDegree === item.id}
                  onChange={handleInputChange}
                />
                <label htmlFor={item.id}>
                  <span className={item.id}></span>
                  <span>{item.rating}</span>
                </label>
              </div>
            ))}
          </div>
        </div>
        <div className="button">
          <input type="button" value="Thêm lịch mới" onClick={CreateFollow} />
        </div>
      </form>

      {showPopup && (
        <div className="popupFollow">
          <div className="popup-header">
            <h3 className="popup-title">Chọn học viên</h3>
            <button className="close-button" onClick={closePopup}>
              X
            </button>
          </div>
          <div className="popup-content">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Phone</th>
                </tr>
              </thead>
              <tbody>
                {dataSearchFilter.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.fullName}</td>
                    <td>{item.phoneNumber}</td>
                    <td>
                      <button type="button" onClick={() => selectStudent(item)}>
                        chọn
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
export default AddFollow;
