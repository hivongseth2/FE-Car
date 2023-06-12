import React, { useState, useEffect } from "react";
import "../../styles/Forms/FlastInfo.scss";
import imgavt from "../../img/avtnoavt.png";
import { useHistory } from "react-router-dom";

const FlastInfo = ({ onLogout }) => {
  const [showCardBody, setShowCardBody] = useState(false);
  const [data, setData] = useState([]);
  const accessToken = localStorage.getItem("token");
  const history = useHistory();

  const fetchData = async () => {
    try {
      const url =
      `${
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

  useEffect(() => {
    fetchData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    onLogout(); // Gọi hàm xử lý đăng xuất từ prop onLogout
    history.push("/login");
  };
  const toggleCardBody = () => {
    setShowCardBody(!showCardBody);
  };
  return (
    <div className="card-container">
      <div className="card-header" onClick={toggleCardBody}>
        <div className="img-avatar">
          <img src={imgavt} alt="anh" />
        </div>
        <div className="text-chat">{data && data.fullName}</div>
      </div>
      {showCardBody && (
        <div className="card-body">
          <div className="messages-container">
            <div className="message-box left" onClick={() => { history.push("/info-sudent"); }}>
              <i className="fa-solid fa-list-ul"></i>
              <p>Xem thông tin cá nhân</p>
            </div>
            <div className="message-box left" onClick={handleLogout}>
              <i className="fa-solid fa-arrow-right-from-bracket"></i>
              <p>Đăng xuất</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FlastInfo;
