import React, { useState } from "react";
import { toast } from "react-toastify";
import "../styles/RegisterAdvise.scss";
import driver_img from "../img/driver_car.jpg";

const RegisterAdvise = () => {
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [degree, setDegree] = useState("");

  const handleDegreeChange = (event) => {
    setDegree(event.target.value);
  };

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

      setTimeout(function () {
        window.location.reload();
      }, 5000);

      toast.success(
        `Đăng ký thành công. Chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất`
      );
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
            class="input"
            name="text"
            placeholder="Nhập tên của bạn"
            type="search"
            onChange={(e) => setFullName(e.target.value)}
          />
          <input
            class="input"
            name="text"
            placeholder="Nhập số điện thoại"
            type="search"
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>
        <div className="container-radio-input">
          <form>
            <label>
              <input
                type="radio"
                name="radio"
                value="Hạng B1"
                checked={degree === "Hạng B1"}
                onChange={handleDegreeChange}
              />
              <span>Hạng B1</span>
            </label>
            <label>
              <input
                type="radio"
                name="radio"
                value="Hạng B2"
                checked={degree === "Hạng B2"}
                onChange={handleDegreeChange}
              />
              <span>Hạng B2</span>
            </label>
            <label>
              <input
                type="radio"
                name="radio"
                value="Hạng C"
                checked={degree === "Hạng C"}
                onChange={handleDegreeChange}
              />
              <span>Hạng C</span>
            </label>
            <label>
              <input
                type="radio"
                name="radio"
                value="Hạng D"
                checked={degree === "Hạng D"}
                onChange={handleDegreeChange}
              />
              <span>Hạng D</span>
            </label>
          </form>
        </div>
        <div className="button-register-advise">
          <button onClick={handleRegisterAdvise}>Đăng ký</button>
        </div>
      </div>
      <div className="register-advise-img">
        <img src={driver_img} alt="Driver_img" />
      </div>
    </div>
  );
};
export default RegisterAdvise;
