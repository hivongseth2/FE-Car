import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "../../styles/DashboardScss/AddDocument.scss";

const AddDocument = ({ handleCloseForm, isAddDocument }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setImage] = useState();
  const [link, setLink] = useState("");
  const token = localStorage.getItem("token");
  const handleCreateDocument = () => {
    const formData = new FormData();
    formData.append(
      "data",
      JSON.stringify({
        title: title,
        description: description,
        link: link,
      })
    );
    if (file && file.length > 0) {
      formData.append("image", file[0], file[0].name);
    } else {
      formData.append("image", null);
    }

    axios
      .post(
        `${
          process.env.REACT_DOMAIN ||
          "http://trungtamdaotaolaixebinhduong.com:8080"
        }/api/admin/document/create`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        // Xử lý phản hồi từ server
        // console.log(response);
        if (response.status === 200) {
          toast.success("Thêm tài liệu thành công");
          handleCloseForm();
          isAddDocument();
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="form-add-document">
      <form>
        <h1>Thêm tài liệu mới</h1>
        <label htmlFor="title">Tiêu đề</label>
        <input
          id="title"
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label htmlFor="description">Mô tả</label>
        <input
          id="description"
          type="text"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <label htmlFor="image">Hình ảnh</label>
        <input
          type="file"
          id="file"
          name="file"
          onChange={(e) => setImage(e.target.files)}
        />
        <label htmlFor="link">Link</label>
        <input
          id="link"
          type="text"
          name="link"
          value={link}
          onChange={(e) => setLink(e.target.value)}
        />
        <div className="button-add-document">
          <input type="button" value="Thêm" onClick={handleCreateDocument} />
          <input type="button" value="Đóng" onClick={handleCloseForm} />
        </div>
      </form>
    </div>
  );
};

export default AddDocument;
