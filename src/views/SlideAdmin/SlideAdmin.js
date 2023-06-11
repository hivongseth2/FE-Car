import React, { useState, useEffect } from "react";
import axios from "axios";
import AddSlide from "./AddSlide";
import { toast } from "react-toastify";
import "../SlideAdmin/SliderAdmin.scss";
import MainLayoutAdmin from "../Dashboard/MainLayoutAdmin";

const SlideAdmin = () => {
  const [slides, setSlides] = useState([]);
  const [editingSlide, setEditingSlide] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const token =
    "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImlhdCI6MTY4NjQxOTQzOCwiZXhwIjoxNjg2NTA1ODM4fQ.aqLrvRpMeKXxlrj20xZDd1COzRn63Cp_9iuQNtg4QJCRC-Ze9ZhpSMz2tmKYavZBOfKfulI1tdsGVkmlTFA9ew";
  const [file, setFile] = useState();
  // Gọi API và lấy danh sách slide
  useEffect(() => {
    axios
      .get(`${process.env.REACT_DOMAIN}/api/slide`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setSlides(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleEditClick = (slideId) => {
    const slideToEdit = slides.find((slide) => slide.id === slideId);
    setEditingSlide(slideToEdit);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditingSlide((prevSlide) => ({
      ...prevSlide,
      [name]: value,
    }));
  };

  const handleAddSlideClick = () => {
    setIsFormOpen(true);
  };

  const handleFormClose = () => {
    setIsFormOpen(false);
  };

  const handleDeleteClick = (id) => {
    axios
      .delete(`${process.env.REACT_DOMAIN}/api/admin/slide/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        // Xử lý phản hồi từ server
        console.log(response);

        // Cập nhật lại danh sách slides
        const updatedSlides = slides.filter((slide) => slide.id !== id);
        setSlides(updatedSlides);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleSaveClick = async () => {
    const formData = new FormData();
    formData.append(
      "data",
      JSON.stringify({
        title: editingSlide.title,
        description: editingSlide.description,
      })
    );
    console.log(editingSlide.image);
    formData.append("image", file[0], file[0].name);
    formData.append("id", editingSlide.id);

    console.log(formData);

    axios
      .post(`${process.env.REACT_DOMAIN}/api/admin/slide/update`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        // Xử lý phản hồi từ server
        // Cập nhật lại danh sách slides
        const data = response.json();
        if (data.errorCode !== undefined) {
          console.log(data);

          toast.error(`Cập nhật thất bại, đã có lỗi xảy ra. Thử lại sau`);

          return;
        }
        toast.success(`Cập nhật slide thành công`);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <MainLayoutAdmin>
      <div className="contain-table-info">
        <div className="header-info">
          <h1>Quản Lý Slider</h1>
          <button onClick={handleAddSlideClick}>Thêm Slider mới</button>

          {isFormOpen && <AddSlide onClose={handleFormClose} />}
        </div>
        <table className="striped-table-info">
          <thead>
            <tr>
              <th>Id</th>
              <th>Tiêu đề</th>
              <th>Chi tiết</th>
              <th>Hình ảnh</th>
              <th className="text-center-info">Hành động</th>
            </tr>
          </thead>

          <tbody>
            {slides.map((slide) => (
              <tr key={slide.id}>
                <td>{slide.id}</td>
                <td>
                  {editingSlide && editingSlide.id === slide.id ? (
                    <input
                      type="text"
                      name="title"
                      value={editingSlide.title}
                      onChange={handleInputChange}
                    />
                  ) : (
                    slide.title
                  )}
                </td>
                <td>
                  {editingSlide && editingSlide.id === slide.id ? (
                    <textarea
                      name="description"
                      value={editingSlide.description}
                      onChange={handleInputChange}
                    />
                  ) : (
                    slide.description
                  )}
                </td>

                <td className="imgContainer">
                  {editingSlide && editingSlide.id === slide.id ? (
                    <div>
                      <input
                        type="file"
                        name="image"
                        onChange={(e) => setFile(e.target.files)}
                      />
                      {imageFile || editingSlide.image ? (
                        <img
                          src={
                            imageFile
                              ? URL.createObjectURL(imageFile)
                              : `${
                                  process.env.REACT_DOMAIN ||
                                  "http://trungtamdaotaolaixebinhduong.com:8080/"
                                }/api/slide/image?image-name=${
                                  editingSlide.image
                                }`
                          }
                          alt="Preview"
                        />
                      ) : (
                        <span>No image selected</span>
                      )}
                    </div>
                  ) : (
                    <img
                      src={`${
                        process.env.REACT_DOMAIN ||
                        "http://trungtamdaotaolaixebinhduong.com:8080/"
                      }/api/slide/image?image-name=${slide.image}`}
                      alt="Slide"
                    />
                  )}
                </td>

                <td className="button-info">
                  {editingSlide && editingSlide.id === slide.id ? (
                    <button onClick={handleSaveClick}>Lưu</button>
                  ) : (
                    <button onClick={() => handleEditClick(slide.id)}>
                      Sửa
                    </button>
                  )}
                  <button onClick={() => handleDeleteClick(slide.id)}>
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </MainLayoutAdmin>
  );
};

export default SlideAdmin;
