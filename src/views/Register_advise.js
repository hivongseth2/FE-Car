import "../styles/Register_advise.scss";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";

const Register_Advise = () => {
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [license, setLicense] = useState("");
  const history = useHistory();
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
    console.log(license);
  };

  const handleClickBtn = () => {
    let object = {
      fullName: fullName,
      phoneNumber: phoneNumber,
      license: license,
    };
    // Lấy thông tin vào local
    console.log("aaaaaaaaa", object);
    let objectJSON = JSON.stringify(object);
    localStorage.setItem("client", objectJSON);
  };
  const setError = (errorMessage) => {
    // Handle the error, e.g., display an error message
    console.error(errorMessage);
  };

  // Hàm đóng Modal
  const [isModalOpen, setIsModalOpen] = useState(true);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSignIn = async (event) => {
    // event.preventDefault();
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
            note: license,
            phoneNumber: phoneNumber,
          }),
        }
      );
      const data = await response.json();
      console.log(data);

      if (data.errorCode !== undefined) {
        console.log(data);
        toast.error(`Vui lòng nhập đúng số điện thoại`);
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data));

      // history.push("/");
      setTimeout(function () {
        window.location.reload();
      }, 5000);

      toast.success(
        `Đăng ký thành công. Chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất`
      );

      console.log(data);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      {isModalOpen && (
        <div className="card shadow" id="modal">
          <button className="close" onClick={closeModal}>
            &times;
          </button>

          <p className="dangkyngay-content">Đăng ký tư vấn</p>
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
          <button className="btn_DKngay" onClick={() => handleSignIn()}>
            <span>Đăng ký ngay</span>
          </button>
        </div>
      )}
    </div>
  );
};
export default Register_Advise;
