import "../styles/Register.scss";
import { useState } from "react";
import { Link } from "react-router-dom";
const Register = () => {
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");
  const [username, setUsername] = useState("");
  // const [address, setAddress] = useState("");
  // const [type, setType] = useState("");

  const handleOnchangeInput = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "fullName":
        setFullName(value);
        break;
      case "phoneNumber":
        setPhoneNumber(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "birthday":
        setBirthday(value);
        break;
      case "username":
        setUsername(value);
        break;
      // case "address":
      //   setAddress(value);
      //   break;
      // case "type":
      //   setType(value);
      //   break;
      default:
        break;
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(
      `${
        process.env.REACT_DOMAIN ||
        "http://trungtamdaotaolaixebinhduong.com:8080"
      }/api/account/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          birthday: birthday,
          email: email,
          fullName: fullName,
          password: "Thanhtung0404@",
          phoneNumber: phoneNumber,
          username: username,
        }),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        alert("Đăng ký thành công");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <form className="my-form">
      <h3>ĐĂNG KÝ</h3>
      <div className="mb-3">
        <label>Họ và tên</label>
        <input
          type="text"
          id="fullName"
          name="fullName"
          className="form-control"
          placeholder="Nhập họ và tên"
          value={fullName}
          onChange={handleOnchangeInput}
        />
      </div>
      <div className="mb-3">
        <label>Số điện thoại</label>
        <input
          type="text"
          id="phoneNumber"
          name="phoneNumber"
          className="form-control"
          placeholder="Nhập số điện thoại"
          value={phoneNumber}
          onChange={handleOnchangeInput}
        />
      </div>
      <div className="mb-3">
        <label>Email address</label>
        <input
          type="email"
          id="email"
          name="email"
          className="form-control"
          placeholder="Nhập email"
          value={email}
          onChange={handleOnchangeInput}
        />
      </div>
      <div className="mb-3">
        <label>Ngày tháng năm sinh</label>
        <input
          type="Date"
          className="form-control"
          id="birthday"
          name="birthday"
          placeholder="Nhập ngày tháng năm sinh"
          value={birthday}
          onChange={handleOnchangeInput}
        />
      </div>
      <div className="mb-3">
        <label>username</label>
        <input
          type="text"
          id="username"
          name="username"
          className="form-control"
          placeholder="Nhập username"
          value={username}
          onChange={handleOnchangeInput}
        />
      </div>
      <div>
        <p className="register-link forgot-password text-right">
          Already registered? <Link to="/login">Sign in</Link>
        </p>
      </div>
      <div className="d-grid">
        <button
          type="submit"
          className="btn btn-primary submitBtn"
          onClick={(e) => handleSubmit(e)}
          value="Submit"
        >
          ĐĂNG KÝ
        </button>
      </div>
    </form>
  );
};
export default Register;
