import "../styles/Register_advise.scss";
import React, { useState } from "react";

const Register_Advise = () => {
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleOnchangeInput = (e) => {
    if (e.target.classList.contains("fullName")) {
      setFullName(e.target.value);
      console.log("hoTen" + fullName);
    } else {
      setPhoneNumber(e.target.value);
      console.log("soDienThoai" + phoneNumber);
    }
  };
  return (
    <div className="card shadow">
      <button className="Cancel">X</button>
>>>>>>> 8d967ba932ead70a9c4bfd5e3231b9ef05ff8eab
      <p>Đăng ký tư vấn</p>
      <label className="label1">Họ tên </label>
      <br></br>
      <input
        type="text"
        placeholder="Tên của bạn"
        className="fullName"
        value={fullName}
        onChange={(e) => handleOnchangeInput(e)}
      ></input>
      <br></br>
      <label className="label2">Số điện thoại </label>
      <br></br>
      <input
        type="text"
        placeholder="Số điện thoại"
        className="phoneNumber"
        value={phoneNumber}
        onChange={(e) => handleOnchangeInput(e)}
      ></input>
      <br></br>
      <label className="label3">Loại bằng </label>
      <div className="typeagree">
        <select>
          <option value="B1">B1</option>
          <option value="B2">B2</option>
          <option value="C">C</option>
          <option value="E">E</option>
        </select>
      </div>
      <br></br>
      <button className="btn_DKngay">
        <span>Đăng ký ngay</span>
      </button>
    </div>
    </MainLayout>
  );
};
export default Register_advise;
