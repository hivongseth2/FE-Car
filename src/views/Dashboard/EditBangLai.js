import React, { useState } from "react";
import "../../styles/DashboardScss/UpdateDegree.scss";
import { toast } from "react-toastify";

const EditBangLai = ({ selectedBangLai, handleCloseUpdate }) => {
  const [title, setTitle] = useState(selectedBangLai.title);
  const [description, setDescription] = useState(selectedBangLai.description);
  const [price, setPrice] = useState(selectedBangLai.price);
  const [allowAge, setAllowAge] = useState(selectedBangLai.allowAge);
  const [rating, setRating] = useState(selectedBangLai.rating);
  const [studyTime, setStudyTime] = useState(selectedBangLai.studyTime);
  const [categoryCar, setCategoryCar] = useState(selectedBangLai.categoryCar);
  const [advantage, setAdvantage] = useState(selectedBangLai.advantage);
  const [dat, setDat] = useState(selectedBangLai.dat);

  const handleUpdateDegree = async (e) => {
    e.preventDefault();
  
    try {
      const accessToken = localStorage.getItem("token");
      const url = `${
        process.env.REACT_DOMAIN ||
        "http://trungtamdaotaolaixebinhduong.com:8080"
      }/api/admin/degree/${selectedBangLai.id}`;
  
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          advantage: advantage,
          allowAge: allowAge,
          categoryCar: categoryCar,
          dat: dat,
          description: description,
          price: price,
          rating: rating,
          studyTime: studyTime,
          title: title,
        }),
      });
  
      if (!response.ok) {
        throw new Error("Error updating data");
      }
  
      // Cập nhật thông tin bằng lái thành công
      toast.success("Cập nhật thông tin bằng lái thành công");
  
      // Đóng form
      handleCloseUpdate();
    } catch (error) {
      console.error("Error updating data:", error);
      toast.error("Đã xảy ra lỗi khi cập nhật thông tin bằng lái");
    }
  };

  return (
    <div className="form-update-degree">
      <form>
        <h1>Sửa thông tin bằng lái</h1>
        <div className="container-lable-update-degree">
          <div className="form-row">
            <label htmlFor="rating">Loại bằng</label>
            <input
              id="rating"
              type="text"
              name="rating"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
            />
            <label htmlFor="title">Bổ sung</label>
            <input
              id="title"
              type="text"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <label htmlFor="description">Mô tả</label>
            <textarea
              id="description"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
            <label htmlFor="price">Giá</label>
            <input
              id="price"
              type="number"
              name="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <label htmlFor="allowAge">Độ tuổi</label>
            <input
              id="allowAge"
              type="number"
              name="allowAge"
              value={allowAge}
              onChange={(e) => setAllowAge(e.target.value)}
            />
          </div>
          <div className="form-row">
            <label htmlFor="studyTime">Thời gian học</label>
            <input
              id="studyTime"
              type="number"
              name="studyTime"
              value={studyTime}
              onChange={(e) => setStudyTime(e.target.value)}
            />
            <label htmlFor="categoryCar">Loại xe</label>
            <input
              id="categoryCar"
              type="text"
              name="categoryCar"
              value={categoryCar}
              onChange={(e) => setCategoryCar(e.target.value)}
            />
            <label htmlFor="advantage">Ưu điểm</label>
            <input
              id="advantage"
              type="text"
              name="advantage"
              value={advantage}
              onChange={(e) => setAdvantage(e.target.value)}
            />
            <label htmlFor="dat">Số km DAT</label>
            <input
              id="dat"
              type="number"
              name="dat"
              value={dat}
              onChange={(e) => setDat(e.target.value)}
            />
          </div>
        </div>
        <div className="button-update-degree">
        <input onClick={handleUpdateDegree} type="submit" value="Cập nhật" />
          <input
            style={{ marginLeft: "12px" }}
            className="muted-button"
            type="button"
            value="Hủy bỏ"
            onClick={handleCloseUpdate}
          />
          
        </div>
      </form>
    </div>
  );
};

export default EditBangLai;
