import "../styles/Register.scss";
import React from "react";
import MainLayout from "./MainLayout";
import { Link} from "react-router-dom";
const Register = () => {
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
          />
        </div>
        <div className="mb-3">
          <label>Số điện thoại</label>
          <input type="text" className="form-control" placeholder="Số điện thoại" />
        </div>
        <div className="mb-3">
          <label>Email address</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
          />
        </div>
        <div className="mb-3">
          <label>Địa chỉ</label>
          <input
            type="text"
            className="form-control"
            placeholder="Địa chỉ"
          />
        </div>
        <div className="mb-3">
          <label>Loại bằng</label>
          <input
            type="text"
            className="form-control"
            placeholder="Loại bằng"
          />
        </div>
        <div className="d-grid">
          <button type="submit" className="btn btn-primary">
            Sign Up
          </button>
        </div>
        <p className="forgot-password text-right">
          Already registered <a href="#"><Link to="/login">Sign in?</Link></a>
        </p>
      </form> 
    </MainLayout>
  );
};
export default Register;