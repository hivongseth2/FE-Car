import "../styles/Register_advise.scss";
import React, { useState } from "react";

const Register_Advise = () => {
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [license, setLicense] = useState("");

  const handleClickBtn = () => {
    let object = {
      fullName: fullName,
      phoneNumber: phoneNumber,
      license: license,
    };
    console.log("aaaaaaaaa", object);
    let objectJSON = JSON.stringify(object);
    localStorage.setItem("client", objectJSON);
  };

  // Lấy thông tin
  const handleOnchangeInput = (e) => {
    if (e.target.classList.contains("fullName")) {
      setFullName(e.target.value);
      console.log("hoTen" + fullName);
    } else {
      setPhoneNumber(e.target.value);
      console.log("soDienThoai" + phoneNumber);
    }
  };
  const handleSelectChange = (event) => {
    setLicense(event.target.value);
  };
  // Hàm đóng Modal
  const [isModalOpen, setIsModalOpen] = useState(true);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      {isModalOpen && (
        <div className="card shadow" id="modal">
          <button className="close" onClick={closeModal}>
            X
          </button>

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
            <select onChange={handleSelectChange}>
              <option value="B1">B1</option>
              <option value="B2">B2</option>
              <option value="C">C</option>
              <option value="E">E</option>
            </select>
          </div>
          <br></br>
          <button className="btn_DKngay" onClick={() => handleClickBtn()}>
            <span>Đăng ký ngay</span>
          </button>
        </div>
      )}
    </div>
  );
};
export default Register_Advise;
