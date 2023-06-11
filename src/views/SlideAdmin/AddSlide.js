import React, { useState } from "react";
import axios from "axios";
import "./AddSlide.scss";
const AddSlide = (props) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState();
  const token =
    "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImlhdCI6MTY4NjQxOTQzOCwiZXhwIjoxNjg2NTA1ODM4fQ.aqLrvRpMeKXxlrj20xZDd1COzRn63Cp_9iuQNtg4QJCRC-Ze9ZhpSMz2tmKYavZBOfKfulI1tdsGVkmlTFA9ew";
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
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
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
      {console.log(props)}
      <form onSubmit={handleSubmit}>
        <div className="form-field">
          <label htmlFor="title">Title:</label>
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
          <label htmlFor="description">Description:</label>
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
        <div className="form-field">
          <button type="button" onClick={closeForm}>
            Đóng
          </button>
        </div>
        <div className="form-field">
          <button type="button" onClick={handleSubmit}>
            Thêm
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddSlide;
