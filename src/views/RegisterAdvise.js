import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "../styles/RegisterAdvise.scss";
import driver_img from "../img/driver_car.jpg";
import ConfirmFinish from "./ConfirmFinish";

const RegisterAdvise = () => {
  const [dataBang, setData] = useState([]);
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [degree, setDegree] = useState("");
  const [showConfirmFinish, setShowConfirmFinish] = useState(false);

  const handleDegreeChange = (event) => {
    setDegree(event.target.value);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        let result = await axios.get(
          `${
            process.env.REACT_DOMAIN ||
            "http://trungtamdaotaolaixebinhduong.com:8080"
          }/api/degree`
        );
        let data = result && result.data ? result.data.data : [];
        setData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  const handleRegisterAdvise = async (e) => {
    try {
      const response = await fetch(
        `${
          process.env.REACT_DOMAIN ||
          "http://trungtamdaotaolaixebinhduong.com:8080"
        }/api/contact/send-contact`,
        {
          method: "POST",
          headers: {
            "content-Type": "application/json",
          },
          body: JSON.stringify({
            fullName: fullName,
            note: degree,
            phoneNumber: phoneNumber,
          }),
        }
      );
      const data = await response.json();

      if (data.errorCode !== undefined) {
        toast.error(`Vui lòng nhập đúng số điện thoại`);
        return;
      }

      setShowConfirmFinish(true);

      setTimeout(function () {
        setShowConfirmFinish(false);
      }, 3000);

      // toast.success(
      //   `Đăng ký thành công. Chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất`
      // );
    } catch (error) {
      console.error("Error add data:", error);
      toast.error("Đã xảy ra lỗi khi thêm thông tin");
    }
  };

  return (
    <div className="register-advise-container">
      <div className="register-advise-content">
        <h1>Hình ảnh học viên tại trung tâm đã thi đậu ngay lần đầu tiên</h1>
        <p>
          Nếu bạn còn nhiều thắc mắc về quy trình đào tạo, hạng lái xe nào phù
          hợp với mình hay cách thức sát hạch ra sao. Hãy để lại số điện thoại
          để được nghe tư vấn
        </p>
        <div className="input-info-register">
          <input
            className="input"
            name="text"
            placeholder="Nhập tên của bạn"
            type="search"
            onChange={(e) => setFullName(e.target.value)}
          />
          <input
            className="input"
            name="text"
            placeholder="Nhập số điện thoại"
            type="search"
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>
        <div className="container-radio-input">
          <form>
            {dataBang && dataBang.length > 0 ? (
              dataBang.map((item) => (
                <label key={item.id}>
                  <input
                    type="radio"
                    name="radio"
                    value={`Hạng ${item.rating}`}
                    checked={degree === `Hạng ${item.rating}`}
                    onChange={handleDegreeChange}
                  />
                  <span>
                    Hạng {""}
                    {item.rating}
                  </span>
                </label>
              ))
            ) : (
              <div>Không có dữ liệu</div>
            )}
          </form>
        </div>
        <div className="button-register-advise">
          <button className="registerAButton" onClick={handleRegisterAdvise}>
            Đăng ký
          </button>
        </div>
      </div>
      <div className="register-advise-img">
        <img src={driver_img} alt="Driver_img" />
      </div>

      {showConfirmFinish && (
        <div className="popup-confirm-finish">
          <div className="popup-inner-confirm-finish">
            <ConfirmFinish />
          </div>
        </div>
      )}
    </div>
  );
};

export default RegisterAdvise;
