import React, { useState, useEffect } from "react";
import axios from "axios";
import AddSlide from "./AddSlide";
import { toast } from "react-toastify";
import "../SlideAdmin/SliderAdmin.scss";
import "../../styles/DashboardScss/TableStudent.scss";

import MainLayoutAdmin from "../Dashboard/MainLayoutAdmin";

const SlideAdmin = () => {
  const [slides, setSlides] = useState([]);
  const [editingSlide, setEditingSlide] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [updateTrigger, setUpdateTrigger] = useState(false); // State để trigger việc render lại

  const token = localStorage.getItem("token");
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
  }, [updateTrigger]);

  const handleEditClick = (slideId) => {
    const slideToEdit = slides.find((slide) => slide.id === slideId);
    setEditingSlide(slideToEdit);
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image") {
      // Update the image file state
      setImageFile(files[0]);
    }

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
    const confirmed = window.confirm("Bạn có chắc chắn muốn xóa slide này?");
    if (confirmed) {
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
    }
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

    if (file && file[0]) {
      formData.append("image", file[0], file[0].name);
    } else {
      // Use the existing image from editingSlide
      formData.append("image", editingSlide.image);
    }

    formData.append("id", editingSlide.id);

    axios
      .post(`${process.env.REACT_DOMAIN}/api/admin/slide/update`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.data.errorCode !== undefined) {
          toast.error(`Cập nhật thất bại, đã có lỗi xảy ra. Thử lại sau`);
          return;
        }

        // Update the slides state with the updated slide
        const updatedSlide = {
          ...editingSlide,
          image: response.data.image, // Update the image URL if necessary
        };
        const updatedSlides = slides.map((slide) =>
          slide.id === editingSlide.id ? updatedSlide : slide
        );
        setSlides(updatedSlides);

        // Clear the editingSlide state to exit the edit mode
        // setSlides(updatedSlides);

        // Clear the image file state
        setImageFile(null);
        setUpdateTrigger(!updateTrigger);
        setEditingSlide(null);
        toast.success(`Cập nhật slide thành công`);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // ...

  return (
    <MainLayoutAdmin>
      <div className="contain-table-info">
        <div className="header-info">
          <h1>Quản Lý Slider</h1>
          <button onClick={handleAddSlideClick}>Thêm Slider mới</button>

          {isFormOpen && <AddSlide onClose={handleFormClose} />}
        </div>
        <table className="container-table">
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
                    <button className="btnAddSlide" onClick={handleSaveClick}>
                      Lưu
                    </button>
                  ) : (
                    <button
                      className="btnAddSlide"
                      onClick={() => handleEditClick(slide.id)}
                    >
                      Sửa
                    </button>
                  )}
                  <button
                    className="btnAddSlide"
                    onClick={() => handleDeleteClick(slide.id)}
                  >
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
