import React, { useState } from "react";

const EditBangLai = ({ selectedBangLai, setIsEditing }) => {
  const [title, setTitle] = useState(selectedBangLai.title);
  const [description, setDescription] = useState(selectedBangLai.description);
  const [price, setPrice] = useState(selectedBangLai.price);
  const [allowAge, setAllowAge] = useState(selectedBangLai.allowAge);
  const [rating, setRating] = useState(selectedBangLai.rating);
  const [studyTime, setStudyTime] = useState(selectedBangLai.studyTime);
  const [categoryCar, setCategoryCar] = useState(selectedBangLai.categoryCar);
  const [advantage, setAdvantage] = useState(selectedBangLai.advantage);
  const [dat, setDat] = useState(selectedBangLai.dat);

  const handleUpdate = (e) => {
    e.preventDefault();

    // Thực hiện các thay đổi lưu vào selectedBangLai hoặc gửi yêu cầu cập nhật dữ liệu

    setIsEditing(false);
  };

  return (
    <div className="form-add-degree">
      <form onSubmit={handleUpdate}>
        <h1>Sửa thông tin bằng lái</h1>
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
        <div className="button-addbanglai">
          <input
            style={{ marginLeft: "12px" }}
            className="muted-button"
            type="button"
            value="Hủy bỏ"
            onClick={() => setIsEditing(false)}
          />
          <input type="submit" value="Cập nhật" />
        </div>
      </form>
    </div>
  );
};

export default EditBangLai;
