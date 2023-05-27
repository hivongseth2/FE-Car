import { useState } from "react";
import "../styles/Login.scss";
import MainLayout from "./MainLayout";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const [userName, setUserName] = useState("");
  const [passWord, setPassWord] = useState("");

  const handleOnchangeInput = (e) => {
    if (e.target.classList.contains("userName")) {
      setUserName(e.target.value);
      console.log("Us" + userName);
    } else {
      setPassWord(e.target.value);
      console.log("Pw" + passWord);
    }
  };
  const navigate = useNavigate();

  // Declare the setError function
  const setError = (errorMessage) => {
    // Handle the error, e.g., display an error message
    console.error(errorMessage);
  };
  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const reponse = await fetch("http://localhost:8080/api/account/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: userName,
          password: passWord,
        }),
      });
      const data = await reponse.json();
      console.log(data);
      if (data.errorCode !== undefined) {
        alert("loi");
        return;
      }
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data));
      console.log(data);
      // navigate("Info", { state: { user: data } });
      history.push("/Info", { user: data });
      toast.success(`Chào mừng ${data.userName} đã quay trở lại`);
      console.log(data);
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <MainLayout>
      <div className="wrapper">
        <h3>Đăng nhập</h3>
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
            <p className="login-link">
              Bạn chưa có tài khoản?
              <Link to="/register">Đăng ký</Link>
            </p>
          </div>

          <div>
            <button
              type="submit"
              className="btn btn-primary col-4 mx-auto"
              onClick={(e) => handleSignIn(e)}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </MainLayout>
  );
};

export default Login;
