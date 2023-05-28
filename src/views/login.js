import { useState } from "react";
import "../styles/Login.scss";
import MainLayout from "./MainLayout";
import { Link} from "react-router-dom";
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
            <p>
              Bạn chưa có tài khoản? <a><Link to="/register">Đăng ký</Link></a>
            </p>
          </div>
          <div>
            <button type="submit">Đăng nhập</button>
          </div>
        </form>
      </div>
    </MainLayout>
  );
};

export default Login;
