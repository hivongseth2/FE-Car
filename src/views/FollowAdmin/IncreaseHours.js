import React, { useState, useEffect } from "react";
import "./CreasingItem.scss";
import { toast } from "react-toastify";
import axios from "axios";

const IncreaseHours = (props) => {
  const [selectedItem, setSelectedItem] = useState("");
  const [updateValue, setUpdateValue] = useState("");
  const [updatePoints, setUpdatePoints] = useState([]);
  const [isSuccess, setIsSuccess] = useState(false); // Biến state để theo dõi thành công

  const token = localStorage.getItem("token");

  const url = `${
    process.env.REACT_DOMAIN || "http://trungtamdaotaolaixebinhduong.com:8080"
  }/api/admin/follow/increase-hours?degree-id=${
    props.itemId.degree.id
  }&student-id=${props.itemId.student.id}`;

  const body = {
    category: selectedItem,
    value: updateValue,
  };

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      accept: "application/json",
    },
  };

  useEffect(() => {
    if (isSuccess) {
      // Khi isSuccess thay đổi thành true, thực hiện các hành động bạn muốn sau khi cập nhật thành công
      // Ví dụ: gọi lại API lấy dữ liệu mới, render lại component cha, vv.
      console.log("Cập nhật thành công");
      // Reset form sau khi cập nhật thành công
      setSelectedItem("");
      setUpdateValue("");
      setUpdatePoints([]);
    }
  }, [isSuccess]);

  const handleAddPoint = async () => {
    console.log(body);
    axios
      .post(url, body, config)
      .then((response) => {
        if (response.error) {
          toast.error("Đã có lỗi xảy ra");
          return;
        }
        setIsSuccess(true); // Đánh dấu cập nhật thành công
        props.onUpdateSuccess();
        toast.success("Cập nhật điểm thành công");
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        toast.error("Có lỗi xảy ra, vui lòng thử lại sau");
      });
  };

  const closeCrease = () => {
    props.onCloseCrease();
  };

  return (
    <form className="formCreasing">
      <div>
        <label htmlFor="selectItem">Loại:</label>
        <select
          id="selectItem"
          value={selectedItem}
          onChange={(e) => setSelectedItem(e.target.value)}
        >
          <option value="">-- Chọn mục --</option>
          <option value="night">Giờ chạy đêm</option>
          <option value="automatic">Giờ chạy tự động</option>
          <option value="DAT">Giờ chạy đạt</option>
        </select>
      </div>

      <div>
        <label htmlFor="updateValue">Gía trị:</label>
        <input
          type="text"
          id="updateValue"
          value={updateValue}
          onChange={(e) => setUpdateValue(e.target.value)}
        />
        <button type="button" onClick={handleAddPoint}>
          Thêm điểm
        </button>
      </div>

      <button onClick={closeCrease}>Đóng</button>
    </form>
  );
};

export default IncreaseHours;
