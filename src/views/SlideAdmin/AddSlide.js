import React, { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import "./AddSlide.scss";
const AddSlide = (props) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState();
  const token = localStorage.getItem("token");
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleSubmit = () => {
    //

    const formData = new FormData();
    formData.append(
      "data",
      JSON.stringify({
        title: title,
        description: description,
      })
    );
    // console.log(editingSlide.image);
    formData.append("image", file[0], file[0].name);

    axios
      .post(`${process.env.REACT_DOMAIN}/api/admin/slide/create`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        // Xử lý phản hồi từ server
        // console.log(response);
        toast.success("Thêm slide thành công");
        props.trigger();
      })
      .catch((error) => {
        // console.error(error);
        toast.error("Đã có lỗi xảy ra vui lòng thử lại sau");
      });
    //
    setTitle("");
    setDescription("");
    setFile(null);
    closeForm();
  };
  const closeForm = () => {
    props.onClose();
  };

  return (
    <div className="add-slide-form">
      <div className="header">
        <span className="spanAddslide">Thêm slide</span>
        <button type="button" className="btnClose" onClick={closeForm}>
          X
        </button>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form-field">
          <label htmlFor="title">Tiêu đề:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={handleTitleChange}
            required
          />
        </div>
        <div className="form-field">
          <label htmlFor="description">Chi tiết:</label>
          <input
            type="text"
            id="description"
            name="description"
            value={description}
            onChange={handleDescriptionChange}
            required
          />
        </div>
        <div className="form-field">
          <label htmlFor="file">Image:</label>
          <input
            type="file"
            id="file"
            name="file"
            onChange={(e) => setFile(e.target.files)}
            required
          />
        </div>
        <div className="btnForm">
          {" "}
          <button type="button" onClick={handleSubmit}>
            Thêm
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddSlide;
