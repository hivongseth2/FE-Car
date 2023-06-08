import { useState } from "react";
import "../styles/Login.scss";
import MainLayout from "./MainLayout";
// import { useNavigate } from "react-router-d?om";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";

const Logins = () => {
  const [userName, setUserName] = useState("");
  const [passWord, setPassWord] = useState("");
  const history = useHistory();

  const handleOnchangeInput = (e) => {
    if (e.target.classList.contains("userName")) {
      setUserName(e.target.value);
      console.log("Us" + userName);
    } else {
      setPassWord(e.target.value);
      console.log("Pw" + passWord);
    }
  };

  // const navigate = useNavigate();

  // Declare the setError function
  const setError = (errorMessage) => {
    // Handle the error, e.g., display an error message
    console.error(errorMessage);
  };
  const handleSignIn = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        "http://trungtamdaotaolaixebinhduong.com:8080/api/account/login",
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
      console.log(data);

      if (data.errorCode !== undefined) {
        console.log(data);

        toast.error(`Tên đăng nhập hoặc mật khẩu sai`);

        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data));
      // navigate("/Course");
      // history.push("/Course");
      setTimeout(function () {
        window.location.href = "/";
      }, 1000);

      toast.success(`Chào mừng ${data.fullName} đã quay trở lại!`);
      console.log(data);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="wrapper">
      <h1 className="dang_nhap">Đăng nhập</h1>
      <form>
        <div className="input-field">
          <input
            type="text"
            placeholder="Tên đăng nhập"
            className="userName"
            value={userName}
            onChange={(e) => handleOnchangeInput(e)}
          ></input>
        </div>

        <div className="input-field">
          <input
            type="password"
            placeholder="Mật khẩu"
            className="passWord"
            value={passWord}
            onChange={(e) => handleOnchangeInput(e)}
          ></input>
        </div>

        <div>
          <p>
            Bạn chưa có tài khoản? <Link to="/register">Đăng ký</Link>
          </p>
        </div>

        <div>
          <button
            type="submit"
            className="button  btn-primary col-4 mx-auto"
            onClick={(e) => handleSignIn(e)}
          >
            Đăng nhập
          </button>
        </div>
      </form>
    </div>
  );
};

export default Logins;
