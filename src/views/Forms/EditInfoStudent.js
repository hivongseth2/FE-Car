import React, { useState } from "react";
import { format } from "date-fns";
import "../../styles/Forms/EditInfoStudent.scss";

const EditInfoStudent = ({
  selectedInfoStudent,
  setIsEditing,
  setIsUpdating,
}) => {
  const [name, setName] = useState(selectedInfoStudent.fullName);
  const [birthday, setBirthday] = useState(selectedInfoStudent.birthday);
  const [address, setAddress] = useState(selectedInfoStudent.address);


  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const accessToken = localStorage.getItem("token");
      const url = `${
        process.env.REACT_DOMAIN ||
        "http://trungtamdaotaolaixebinhduong.com:8080"
      }/api/student/update-person`;

      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          address: address,
          birthday: birthday,
          fullName: name,
        }),
      });

      if (!response.ok) {
        throw new Error("Error updating data");
      }
      if (response.status === 200) {
        setIsEditing(false);
        setIsUpdating();
      }
      
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
        <div className="button-addbanglai">
          <input type="submit" value="Lưu" onClick={handleUpdate} />
        </div>
      </form>
    </div>
  );
};

export default EditInfoStudent;
