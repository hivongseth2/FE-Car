import React, { useState, useEffect } from "react";
import imgavt from "../img/avtnoavt.png";
import "../styles/InfoStudent.scss";
import EditInfoStudent from "./Forms/EditInfoStudent";
import { format, set } from "date-fns";
import StudentResetPw from "./Forms/StudentResetPw";
import Loading from "./Forms/Loading";
import { is } from "date-fns/esm/locale";

const InfoStudent = () => {
  const [currentTab, setCurrentTab] = useState("1"); // 0: tab "Thông tin cá nhân", 1: tab "Bằng lái xe"
  const [showForm, setShowForm] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false); // Dùng để thông báo cho component cha là đã cập nhật dữ liệu
  const accessToken = localStorage.getItem("token");
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const url = `${
        process.env.REACT_DOMAIN ||
        "http://trungtamdaotaolaixebinhduong.com:8080"
      }/api/student/info-person`;
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
      console.log("API response:", responseData);

      // Gán dữ liệu vào biến state data
      if (responseData) {
        setData(responseData);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const [datafollow, setDatafollow] = useState([]);
  const getDataFollow = async () => {
    try {
      const url = `${
        process.env.REACT_DOMAIN ||
        "http://trungtamdaotaolaixebinhduong.com:8080"
      }/api/follow/list-person?page=0&size=10`;
      const responsefl = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!responsefl.ok) {
        throw new Error("Error fetching data");
      }

      const responseDataFl = await responsefl.json();
      console.log("API response follow:", responseDataFl);

      // Gán dữ liệu vào biến state datafollow
      const datafollow =
        responseDataFl && responseDataFl.data ? responseDataFl.data : [];
      setDatafollow(datafollow);
    } catch (error) {
      console.error("Error fetching data follow:", error);
    }
  };

  useEffect(() => {
    fetchData();
    getDataFollow();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isUpdating]);

  if (data.length === 0) {
    return <Loading />;
  }
  const formattedBirthday = format(new Date(data.birthday), "dd/MM/yyyy");

  const handleEditClick = () => {
    setShowForm(true);
  };

  const handleUpdate = async () => {
    try {
      await fetchData();
      setShowForm(false);
      // Gọi lại hàm fetchData để cập nhật dữ liệu mới
      fetchData();
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };
  const handleTabClick = (e) => {
    setCurrentTab(e.target.id);
  };
  const handleUpdating = () => {
    setIsUpdating(false);
  };

  return (
    <div className="info-stuedent-container">
      <div className="center">
        {data && (
          <div key={data.id}>
            <div className="profile">
              <div className="image">
                <div className="circle-1"></div>
                <div className="circle-2"></div>
                <img src={imgavt} alt="anh" />
              </div>
              <div className="name">Họ và tên: {data.fullName}</div>
              <div className="job">
                Ngày tháng năm sinh: {formattedBirthday}
              </div>
              <div className="job">Số điện thoại: {data.phoneNumber}</div>
              <div className="job">Địa chỉ: {data.address}</div>
              <div className="edit-thong-tin-icon" onClick={()=>{handleEditClick();handleUpdating()}}>
                Chỉnh sửa thông tin{" "}
                <i className="fa-regular fa-pen-to-square"></i>
              </div>
              <StudentResetPw />
            </div>
          </div>
        )}
        <div>
          <div className="Tabs">
            {datafollow.map((item) => (
              <button
                key={item.id.degree.id}
                id={item.id.degree.id}
                className={
                  currentTab === `${item.id.degree.id}` ? "active" : ""
                }
                disabled={currentTab === `${item.id.degree.id}`}
                onClick={handleTabClick}
              >
                Bằng {item.id.degree.rating}
              </button>
            ))}
          </div>
          <>
            {datafollow.map((item) => (
              <div key={item.id.degree.id} className="stats">
                {currentTab === `${item.id.degree.id}` && (
                  <>
                    <div className="box">
                      <span className="parameter">Khóa học:</span>
                      <span className="value">{item.course}</span>
                    </div>
                    <div className="box">
                      <span className="parameter">Tên thầy dạy:</span>
                      <span className="value">{item.techer}</span>
                    </div>
                    <div className="box">
                      <span className="parameter">Giờ chạy DAT:</span>
                      <span className="value">{item.hoursRunningDAT}</span>
                    </div>
                    <div className="box">
                      <span className="parameter">Giờ chạy đêm:</span>
                      <span className="value">{item.nightRunningHours}</span>
                    </div>
                    <div className="box">
                      <span className="parameter">Giờ chạy số tự động:</span>
                      <span className="value">
                        {item.automaticRunningHours}
                      </span>
                    </div>
                    <div className="box">
                      <span className="parameter">Số Km DAT:</span>
                      <span className="value">{item.kmDAT}</span>
                    </div>
                    <div className="box">
                      <span className="parameter">Điểm thi lý thuyết:</span>
                      <span className="value">{item.theotyTestScore}</span>
                    </div>
                    <div className="box">
                      <span className="parameter">Điểm thi thử mô phỏng:</span>
                      <span className="value">{item.simulatedTestScore}</span>
                    </div>
                  </>
                )}
              </div>
            ))}
          </>
        </div>
        {showForm && (
          <div className="overlay">
            <EditInfoStudent
              selectedInfoStudent={{
                ...data,
                birthday: new Date(data.birthday),
              }}
              setIsEditing={setShowForm}
              handleUpdate={handleUpdate}
              setIsUpdating={()=>setIsUpdating(true)}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default InfoStudent;
