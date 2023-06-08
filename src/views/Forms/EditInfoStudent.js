import React, { useState } from "react";
import { format } from "date-fns";
import "../../styles/Forms/EditInfoStudent.scss";

const EditInfoStudent = ({ selectedInfoStudent, setIsEditing, setIsUpdating }) => {
  const [name, setName] = useState(selectedInfoStudent.fullName);
  const [birthday, setBirthday] = useState(selectedInfoStudent.birthday);
  const [address, setAddress] = useState(selectedInfoStudent.address);
  const [phoneNumber, setPhoneNumber] = useState(
    selectedInfoStudent.phoneNumber
  );

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const accessToken = localStorage.getItem("token");
      const url =
        "http://trungtamdaotaolaixebinhduong.com:8080/api/student/update-person";

      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          fullName: name,
          birthday: birthday,
          address: address,
          phoneNumber: phoneNumber,
        }),
      });

      if (!response.ok) {
        throw new Error("Error updating data");
      }

      setIsEditing(false);
      //setIsUpdating(true); // Notify parent component about the update
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  return (
    <div className="form-add-degree">
      <form onSubmit={handleUpdate}>
        <h1>Sửa thông tin của bạn</h1>
        <label htmlFor="name">Họ và tên</label>
        <input
          id="name"
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label htmlFor="birthday">Ngày tháng năm sinh</label>
        <input
          id="birthday"
          type="date"
          name="birthday"
          value={format(new Date(birthday), "yyyy-MM-dd")}
          onChange={(e) => setBirthday(e.target.value)}
        />
        <label htmlFor="address">Địa chỉ</label>
        <input
          id="address"
          type="text"
          name="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <label htmlFor="phoneNumber">Số điện thoại</label>
        <input
          id="phoneNumber"
          type="number"
          name="phoneNumber"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <div className="button-addbanglai">
          <input type="submit" value="Lưu" onClick={handleUpdate} />
        </div>
      </form>
    </div>
  );
};

export default EditInfoStudent;
