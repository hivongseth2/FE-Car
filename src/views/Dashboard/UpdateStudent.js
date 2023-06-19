import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../styles/DashboardScss/AddAccount.scss";
import { format} from "date-fns";

const UpdateStudent = ({ handleCloseForm, selectedInfoStudent }) => {
  const [fullName, setFullName] = useState(selectedInfoStudent.fullName);
  const [address, setAddress] = useState(selectedInfoStudent.address);
  const [birthday, setBirthday] = useState(format(new Date(selectedInfoStudent.birthday), "yyyy-MM-dd"));

  const handleUpdateStudent = async (e) => {
    e.preventDefault();

    try {
      const accessToken = localStorage.getItem("token");
      const url = `http://trungtamdaotaolaixebinhduong.com:8080/api/admin/student/${selectedInfoStudent.id}`;

      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
            address: address,
            birthday: birthday,
            fullName: fullName,
        }),
      });

      if (!response.ok) {
        throw new Error("Error updating data");
      }

      // Cập nhật thông tin sinh viên thành công
      toast.success("Cập nhật thông tin sinh viên thành công");

      // Đóng form
      handleCloseForm();
    } catch (error) {
      console.error("Error updating data:", error);
      toast.error("Đã xảy ra lỗi khi cập nhật thông tin sinh viên");
    }
  };
  console.log(selectedInfoStudent.id);
  return (
    <div className="form-add-degree">
      <form>
        <h1>Cập nhật sinh viên</h1>
        <label htmlFor="fullName">Họ và tên</label>
        <input
          id="fullName"
          type="text"
          name="fullName"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
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
          <input type="submit" value="Cập nhật" onClick={handleUpdateStudent} />
          <input type="submit" value="Đóng" onClick={handleCloseForm} />
        </div>
      </form>
    </div>
  );
};

export default UpdateStudent;
