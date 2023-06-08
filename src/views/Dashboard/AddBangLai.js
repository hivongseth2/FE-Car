import React, { useState } from "react";
import "../../styles/DashboardScss/AddBangLai.scss";

const AddBangLai = ({ setDegree, setIsAdding }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [allowAge, setAllowAge] = useState(0);
  const [rating, setRating] = useState("");
  const [studyTime, setStudyTime] = useState(0);
  const [categoryCar, setCategoryCar] = useState("");
  const [advantage, setAdvantage] = useState("");
  const [dat, setDat] = useState(0);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (
      !title ||
      !description ||
      !price ||
      !allowAge ||
      !rating ||
      !studyTime ||
      !categoryCar ||
      !advantage ||
      !dat
    ) {
      console.error("Error fetching data:");
      return;
    }

    const newDegree = {
      title,
      description,
      price,
      allowAge,
      rating,
      studyTime,
      categoryCar,
      advantage,
      dat,
    };

    setDegree(newDegree);

    setIsAdding(false);
  };

  return (
      <form className="form-add-degree" onSubmit={handleFormSubmit}>
        <h1>Thêm bằng lái</h1>
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
        <div className="button-addbanglai" style={{ marginTop: "30px" }}>
          <input
            style={{ marginLeft: "12px" }}
            className="muted-button"
            type="button"
            value="Hủy bỏ"
            onClick={() => setIsAdding(false)}
          />
          <input type="submit" value="Thêm" />
        </div>
      </form>
  );
};

export default AddBangLai;
