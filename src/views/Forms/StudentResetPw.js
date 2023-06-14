import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import "../../styles/Forms/StudentResetPw.scss";

const StudentResetPw = () => {
  const [showForm, setShowForm] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const history = useHistory();

  const toggleForm = (event) => {
    event.preventDefault();
    setShowForm(!showForm);
  };
  const handleSuccess = () => {
    history.push("/login");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (newPassword !== confirmPassword) {
      setPasswordError("Mật khẩu không trùng khớp");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `http://trungtamdaotaolaixebinhduong.com:8080/api/student/reset-person-password?password=${newPassword}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            newPassword: newPassword,
          }),
        }
      );

      if (response.ok) {
        console.log("Password reset successful");
        handleSuccess();
      } else {
        console.log("Password reset failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <div className={`popup-reset-pw ${showForm ? "show" : ""}`}>
        <form className="form" onSubmit={handleSubmit}>
          <div className="note">
            <label className="title">
              Đổi mật khẩu <i className="fa-solid fa-key"></i>
            </label>
            <span className="subtitle">
              Bạn nên sử dụng mật khẩu mạnh mà mình chưa sử dụng ở đâu khác
            </span>
            <button onClick={toggleForm}>
              {showForm ? "Đóng" : "Chỉnh sửa"}
            </button>
          </div>
          {showForm && (
            <>
              <input
                placeholder="Nhập mật khẩu"
                title="Enter your e-mail"
                name="email"
                type="password"
                className="input_field"
                value={newPassword}
                onChange={(event) => setNewPassword(event.target.value)}
              />
              <input
                placeholder="Nhập lại mật khẩu"
                title="Enter your e-mail"
                name="email"
                type="password"
                className="input_field"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
              />
              <p className="error-message">{passwordError}</p>
              <button type="submit" className="submit">
                Lưu thay đổi
              </button>
            </>
          )}
        </form>
      </div>
    </div>
  );
};

export default StudentResetPw;
