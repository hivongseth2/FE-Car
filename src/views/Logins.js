import { useState } from "react";
import "../styles/Login.scss";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Logins = () => {
  const [userName, setUserName] = useState("");
  const [passWord, setPassWord] = useState("");
  // const history = useHistory();
  // const NODE_ENV = process.env.REACT_DOMAIN;
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

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data));
      setTimeout(function () {
        window.location.href = "/";
      }, 1000);

      toast.success(`Chào mừng ${data.fullName} đã quay trở lại!`);
      // console.log(data);
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <div className="wrapper-login">
      <form className="form">
        <div className="header">Đăng nhập</div>
        <div className="inputs">
          <input
            type="text"
            placeholder="Tên đăng nhập"
            className="userName input"
            value={userName}
            onChange={(e) => handleOnchangeInput(e)}
          ></input>
          <input
            type="password"
            placeholder="Mật khẩu"
            className="passWord input"
            value={passWord}
            onChange={(e) => handleOnchangeInput(e)}
          ></input>
          {/* <div className="checkbox-container">
            <label className="checkbox">
              <input type="checkbox" id="checkbox" />
            </label>
            <label htmlFor="checkbox" className="checkbox-text">
              Nhớ tài khoản
            </label>
          </div> */}
          <button className="sigin-btn" onClick={(e) => handleSignIn(e)}>
            Đăng nhập
          </button>
          {/* <a className="forget" href="#">
            Quên mật khẩu
          </a> */}
        </div>
      </form>
    </div>
  );
};

export default Logins;
