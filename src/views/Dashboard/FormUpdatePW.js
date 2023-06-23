import React, { useState, useEffect } from "react";
import "../../styles/DashboardScss/FormUpdatePW.scss";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const FormUpdatePW = ({ handleCloseForm }) => {
  const [passwordError, setPasswordError] = useState("");
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleResetForm = () => {
    setId("");
    setPassword("");
    setConfirmPassword("");
  };
  const setError = (errorMessage) => {
    console.error(errorMessage);
  };
  const handleSubmit = async (event) => {
    if (password !== confirmPassword) {
      setPasswordError("Mật khẩu không trùng khớp");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `${
          process.env.REACT_DOMAIN ||
          "http://trungtamdaotaolaixebinhduong.com:8080"
        }/api/admin/account/update?id=${id}`,

        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            password: password,
            studentId: id,
          }),
        }
      );

      if (response.ok) {
        console.log("Password reset successful");
        toast.success("Cập nhật khẩu thành công");
        handleResetForm();
      } else {
        setError("Cập nhật mật khẩu thất bại");
      }
    } catch (error) {
      toast.error(error.message || "Cập nhật mật khẩu thất bại");
    }
    handleCloseForm(false);
  };
  return (
    <div className="formUpdatePW">
      <p className="content-update">Cập nhật mật khẩu học viên</p>
      <input
        className="input-formUpdateID"
        type="text"
        placeholder="Nhập ID học viên"
        value={id}
        onChange={(e) => setId(e.target.value)}
      />
      <input
        className="input-formUpdatePW"
        type="password"
        placeholder="Nhập mật khẩu học viên"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        className="input-formUpdateConfirmPW"
        type="password"
        placeholder="Nhập lại mật khẩu học viên"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <p className="error-message">{passwordError}</p>

      <div className="group-button">
        <button className="search-button" onClick={handleSubmit}>
          Cập nhật
        </button>
        <button className="cancel-button" onClick={handleCloseForm}>
          Hủy bỏ
        </button>
      </div>
    </div>
  );
};
export default FormUpdatePW;
