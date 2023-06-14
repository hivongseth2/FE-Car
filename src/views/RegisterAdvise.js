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
        <div class="container-radio-input">
          <form>
            <label>
              <input type="radio" name="radio"/>
              <span>Hạng B1</span>
            </label>
            <label>
              <input type="radio" name="radio" />
              <span>Hạng B2</span>
            </label>
            <label>
              <input type="radio" name="radio" />
              <span>Hạng C</span>
            </label>
            <label>
              <input type="radio" name="radio" />
              <span>Hạng D</span>
            </label>
          </form>
        </div>
        <div className="button-register-advise">
                <button>Đăng ký</button>
              </div>
      </div>
      <div className="register-advise-img">
        <img src={driver_img} alt="Driver_img" />
      </div>
    </div>
  );
};
export default RegisterAdvise;
