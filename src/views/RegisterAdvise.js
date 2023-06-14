import React from "react";
import "../styles/RegisterAdvise.scss";
import driver_img from "../img/driver_car.jpg";

const RegisterAdvise = () => {
  return (
    <div className="register-advise-container">
      <div className="register-advise-content">
        <h1>96% học viên tại trung tâm đã thi đậu ngay lần đầu tiên</h1>
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
          />
          <input
            class="input"
            name="text"
            placeholder="Nhập số điện thoại"
            type="search"
          />
        </div>
        <div class="radio-input">
          <label>
            <input
              type="radio"
              id="value-1"
              name="value-radio"
              value="value-1"
            />
            <span>Hạng B1</span>
          </label>
          <label>
            <input
              type="radio"
              id="value-2"
              name="value-radio"
              value="value-2"
            />
            <span>Hạng B2</span>
          </label>
          <label>
            <input
              type="radio"
              id="value-3"
              name="value-radio"
              value="value-3"
            />
            <span>Hạng C</span>
          </label>
          <span class="selection"></span>
        </div>
        <div className="button-register">
          <button>
            <span>Đăng ký nghe tư vấn</span>
          </button>
        </div>
      </div>
      <div className="register-advise-img">
        <img src={driver_img} alt="Driver_img" />
      </div>
    </div>
  );
};
export default RegisterAdvise;
