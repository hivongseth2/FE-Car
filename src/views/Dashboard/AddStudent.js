import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../styles/DashboardScss/AddAccount.scss";

const AddStudent = ({ handleCloseForm }) => {
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [birthday, setBirthday] = useState("");

  const handleAddStudent = async (e) => {
    e.preventDefault();

    try {
      const accessToken = localStorage.getItem("token");
      const url = `${
        process.env.REACT_DOMAIN ||
        "http://trungtamdaotaolaixebinhduong.com:8080"
      }/api/admin/student/create`;

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          address: address,
          birthday: birthday,
          fullName: fullName,
          phoneNumber: phoneNumber,
        }),
      });

      if (!response.ok) {
        throw new Error("Error updating data");
      }

      // Thêm sinh viên thành công
      toast.success("Thêm học viên thành công");

      // Đóng form
      handleCloseForm();
    } catch (error) {
      console.error("Error updating data:", error);
      toast.error("Đã xảy ra lỗi khi thêm sinh viên");
    }
  };

  return (
    <div className="form-add-degree">
      <form>
        <h1>Thêm sinh viên</h1>
        <label htmlFor="fullName">Họ và tên</label>
        <input
          id="fullName"
          type="text"
          name="fullName"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
        <label htmlFor="phoneNumber">Số điện thoại</label>
        <input
          id="phoneNumber"
          type="text"
          name="phoneNumber"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <label htmlFor="address">Địa chỉ</label>
        <input
          id="address"
          type="text"
          name="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <label htmlFor="birthday">Ngày sinh</label>
        <input
          id="birthday"
          type="date"
          name="birthday"
          value={birthday}
          onChange={(e) => setBirthday(e.target.value)}
        />
        <div className="button-addbanglai">
          <input type="submit" value="Thêm" onClick={handleAddStudent} />
          <input type="submit" value="Đóng" onClick={handleCloseForm} />
        </div>
      </form>
    </div>
  );
};

export default AddStudent;
