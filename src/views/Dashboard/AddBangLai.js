import React, { useState } from "react";
import "../../styles/DashboardScss/AddBangLai.scss";
import { toast } from "react-toastify";

const AddBangLai = ({handleCloseUpdate}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [allowAge, setAllowAge] = useState(0);
  const [rating, setRating] = useState("");
  const [studyTime, setStudyTime] = useState(0);
  const [categoryCar, setCategoryCar] = useState("");
  const [advantage, setAdvantage] = useState("");
  const [dat, setDat] = useState(0);

  const handleAddDegree = async (e) => {
    e.preventDefault();
  
    try {
      const accessToken = localStorage.getItem("token");
      const url = `${
        process.env.REACT_DOMAIN ||
        "http://trungtamdaotaolaixebinhduong.com:8080"
      }/api/admin/degree/create`;
  
      const response = await fetch(url, {
        method: "POST",
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
        throw new Error("Error add data");
      }
  
      // Cập nhật thông tin bằng lái thành công
      toast.success("Thêm bằng lái thành công");
  
      // Đóng form
      handleCloseUpdate();
    } catch (error) {
      console.error("Error add data:", error);
      toast.error("Đã xảy ra lỗi khi thêm thông tin bằng lái");
    }
  };

  return (
    <form className="form-add-degree">
      <h1>Thêm bằng lái</h1>
      <div className="container-lable-add-degree">
        <div className="form-row-add-degree">
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
          <label htmlFor="allowAge">Tuổi</label>
          <input
            id="allowAge"
            type="number"
            name="allowAge"
            value={allowAge}
            onChange={(e) => setAllowAge(e.target.value)}
          />
        </div>

        <div className="form-row-add-degree">
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
      <div className="button-addbanglai" style={{ marginTop: "30px" }}>
        <input
          style={{ marginLeft: "12px" }}
          className="muted-button"
          type="button"
          value="Hủy bỏ"
          onClick={handleCloseUpdate}
        />
        <input onClick={handleAddDegree} type="submit" value="Thêm" />
      </div>
    </form>
  );
};

export default AddBangLai;
