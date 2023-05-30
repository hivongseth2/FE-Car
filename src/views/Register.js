import "../styles/Register.scss";
import React from "react";
import MainLayout from "./MainLayout";
import { Link } from "react-router-dom";
const Register = () => {
  const [fullName, setFullName] = React.useState("");
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [type, setType] = React.useState("");

  const handleOnchangeInput = (e) => {
    if (e.target.classList.contains("fullName")) {
      setFullName(e.target.value);
      console.log("Us" + fullName);
    } else if (e.target.classList.contains("phoneNumber")) {
      setPhoneNumber(e.target.value);
      console.log("Pn" + phoneNumber);
    } else if (e.target.classList.contains("email")) {
      setEmail(e.target.value);
      console.log("Em" + email);
    } else if (e.target.classList.contains("address")) {
      setAddress(e.target.value);
      console.log("Add" + address);
    } else {
      setType(e.target.value);
      console.log("Tp" + type);
    }
  };

  return (
    <MainLayout>
      <form className="my-form">
        <h3>Đăng ký</h3>
        <div className="mb-3">
          <label>Họ và tên</label>
          <input
            type="text"
            className="form-control"
            placeholder="Họ và tên"
            value={fullName}
            onChange={(e) => handleOnchangeInput(e)}
          />
        </div>
        <div className="mb-3">
          <label>Số điện thoại</label>
          <input
            type="text"
            className="form-control"
            placeholder="Số điện thoại"
          />
        </div>
        <div className="mb-3">
          <label>Email address</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            value={email}
            onChange={(e) => handleOnchangeInput(e)}
          />
        </div>
        <div className="mb-3">
          <label>Địa chỉ</label>
          <input
            type="text"
            className="form-control"
            placeholder="Địa chỉ"
            value={address}
            onChange={(e) => handleOnchangeInput(e)}
          />
        </div>
        <div className="mb-3">
          <label>Loại bằng</label>
          <input
            type="text"
            className="form-control"
            placeholder="Loại bằng"
            value={type}
            onChange={(e) => handleOnchangeInput(e)}
          />
        </div>
        <div>
          <p className="register-link forgot-password text-right">
            Already registered? <Link to="/login">Sign in</Link>
          </p>
        </div>
        <div className="d-grid">
          <button type="submit" className="btn btn-primary">
            Sign Up
          </button>
        </div>
      </form>
    </MainLayout>
  );
};
export default Register;
