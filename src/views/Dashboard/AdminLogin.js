import React, { useState } from "react";
import "../../styles/DashboardScss/AdminLogin.scss";
import { Link, useHistory } from "react-router-dom";
import { toast } from "react-toastify";

const AdminLogin = () => {
  const [userName, setUserName] = useState("");
  const [passWord, setPassWord] = useState("");
  const history = useHistory();
  const handleOnchangeInput = (e) => {
    if (e.target.classList.contains("userName")) {
      setUserName(e.target.value);
      // console.log("Us" + userName);
    } else {
      setPassWord(e.target.value);
      // console.log("Pw" + passWord);
    }
  };
  const setError = (errorMessage) => {
    console.error(errorMessage);
  };
  const handleSignIn = async (event) => {
    event.preventDefault();
    try {
      // console.log(process.env.REACT_DOMAIN);
      const response = await fetch(
        `${
          process.env.REACT_DOMAIN ||
          "http://trungtamdaotaolaixebinhduong.com:8080"
        }/api/account/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: userName,
            password: passWord,
          }),
        }
      );

      const data = await response.json();
      // console.log(data);

      if (data.errorCode !== undefined) {
        // console.log(data);

        toast.error(`Tên đăng nhập hoặc mật khẩu sai`);

        return;
      }
      setTimeout(function () {
        window.location.href = "/edit-admin";
      }, 1000);

      toast.success(`Chào mừng ${data.fullName} đã quay trở lại!`);
      // console.log(data);
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <div className="form-login-admin">
      <form className="form">
        <p className="form-title">Sign in to your admin account</p>
        <div className="input-container">
          <input
            type="email"
            placeholder="Nhập username"
            className="userName"
            value={userName}
            onChange={(e) => handleOnchangeInput(e)}
          />
          <span></span>
        </div>
        <div className="input-container">
          <input
            type="password"
            placeholder="Nhập password"
            className="passWord"
            value={passWord}
            onChange={(e) => handleOnchangeInput(e)}
          />
        </div>
        <button type="submit" className="submit" onClick={(e) => handleSignIn(e)}>
          Sign in
        </button>
      </form>
    </div>
  );
};
export default AdminLogin;
