import React, { useState } from "react";
import "../../styles/DashboardScss/AddAccount.scss";

const AdAccount = ({ handleCloseForm }) => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [selectedRole, setSelectedRole] = useState("");

  const handleRadioChange = (event) => {
    setSelectedRole(event.target.value); // Cập nhật trạng thái khi radio được chọn
    console.log(selectedRole);
  };

  const handleAddAccount = async (e) => {
    e.preventDefault();
  
    try {
      const accessToken = localStorage.getItem("token");
      const url = `${
        process.env.REACT_DOMAIN ||
        "http://trungtamdaotaolaixebinhduong.com:8080"
      }/api/admin/account/create`;
  
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          password: password,
          role: selectedRole,
          username: userName,
        }),
      });
  
      if (!response.ok) {
        throw new Error("Error updating data");
      }
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };
  return (
    <div className="form-add-degree">
      <form>
        <h1>Thêm tài khoản</h1>
        <label htmlFor="name">Tài khoản</label>
        <input
          id="name"
          type="text"
          name="name"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          checked=""
        />
        <label htmlFor="birthday">Mật khẩu</label>
        <input
          id="birthday"
          type="password"
          name="birthday"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="radio-inputs">
          <label className="radio">
            <input
              type="radio"
              name="radio"
              value="ROLE_USER"
              checked={selectedRole === "ROLE_USER"}
              onChange={handleRadioChange}
            />
            <span className="name">USER</span>
          </label>
          <label className="radio">
            <input
              type="radio"
              name="radio"
              value="ROLE_STAFF"
              checked={selectedRole === "ROLE_STAFF"}
              onChange={handleRadioChange}
            />
            <span className="name">STAFF</span>
          </label>

          <label className="radio">
            <input
              type="radio"
              name="radio"
              value="ROLE_ADMIN"
              checked={selectedRole === "ROLE_ADMIN"}
              onChange={handleRadioChange}
            />
            <span className="name">ADMIN</span>
          </label>
        </div>
        <div className="button-addbanglai">
        <input type="submit" value="Thêm" onClick={handleAddAccount} />
          <input type="submit" value="Đóng" onClick={handleCloseForm} />
        </div>
      </form>
    </div>
  );
};

export default AdAccount;
