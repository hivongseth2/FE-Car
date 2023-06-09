import React, { useState, useEffect } from "react";
import "../../styles/DashboardScss/AddAccount.scss";
import { toast } from "react-toastify";

const AdAccount = ({ handleCloseForm }) => {
  const [isUser, setIsUser] = useState(null);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [selectedRole, setSelectedRole] = useState("");

  const handleRadioChange = (event) => {
    setSelectedRole(event.target.value); // Cập nhật trạng thái khi radio được chọn
    // console.log(selectedRole);
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
      // console.log("API response:", response);
      handleCloseForm();
      toast.success("Thêm tài khoản thành công");
      if (!response.ok) {
        throw new Error("Error updating data");
      }
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setIsUser(user.role);
  }, []);
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
              value="user"
              checked={selectedRole === "user"}
              onChange={handleRadioChange}
            />
            <span className="name">USER</span>
          </label>
          <label className="radio">
            <input
              type="radio"
              name="radio"
              value="staff"
              checked={selectedRole === "staff"}
              onChange={handleRadioChange}
            />
            <span className="name">STAFF</span>
          </label>

          {isUser !== "ROLE_STAFF" && (
  <label className="radio">
    <input
      type="radio"
      name="radio"
      value="admin"
      checked={selectedRole === "admin"}
      onChange={handleRadioChange}
    />
    <span className="name">ADMIN</span>
  </label>
)}

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
