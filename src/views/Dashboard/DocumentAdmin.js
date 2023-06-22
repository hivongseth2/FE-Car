import MainLayoutAdmin from "./MainLayoutAdmin";
import React, { useState, useEffect } from "react";
import "../../styles/DashboardScss/TableStudent.scss";
import axios from "axios";
import { toast } from "react-toastify";
import AddDocument from "./AddDocmument";
import ConfirmDeleteDocument from "./ConfirmDeleteDocument";
import { set } from "date-fns";

const DocumentAdmin = () => {
  const [dataDocuments, setDataDocuments] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [editingRowId, setEditingRowId] = useState(null);
  const [showAddDocumentPopup, setShowAddDocumentPopup] = useState(false);
  const [isAddDocument, setIsAddDocument] = useState(false);
  const [showDeleteDocumentPopup, setShowDeleteDocumentPopup] = useState(false);
  const [selectedDocumentDelete, setSelectedDocumentDelete] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get(`${process.env.REACT_DOMAIN}/api/document`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setDataDocuments(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [isAddDocument]);

  const handleEdit = (document) => {
    setSelectedRow(document);
    setEditingRowId(document.id);
  };

  const updateDocument = async () => {
    const formData = new FormData();
    formData.append(
      "data",
      JSON.stringify({
        title: selectedRow.title,
        description: selectedRow.description,
      })
    );

    if (imageFile) {
      formData.append("image", imageFile, imageFile.name);
    } else {
      // Use the existing image from editingRow
      formData.append("image", selectedRow.image);
    }

    formData.append("id", selectedRow.id);

    try {
      const response = await axios.post(
        `${process.env.REACT_DOMAIN}/api/admin/document/update`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.errorCode !== undefined) {
        toast.error("Cập nhật thất bại, đã có lỗi xảy ra. Thử lại sau.");
        return;
      }

      // Update the documents state with the updated document
      const updatedDocument = {
        ...selectedRow,
        image: response.data.image, // Update the image URL if necessary
      };
      const updatedDataDocuments = dataDocuments.map((document) =>
        document.id === selectedRow.id ? updatedDocument : document
      );
      setDataDocuments(updatedDataDocuments);

      // Clear the editingRow state to exit the edit mode
      setEditingRowId(null);

      // Clear the image file state
      setImageFile(null);

      toast.success("Cập nhật tài liệu thành công.");
    } catch (error) {
      console.error(error);
      toast.error("Đã có lỗi xảy ra. Vui lòng thử lại sau.");
    }
  };
  const handleShowAddDocumentPopup = () => {
    setShowAddDocumentPopup(true);
  };
  const handleShowDeleteDocumentPopup = () => {
    setShowDeleteDocumentPopup(true);
  };
  const handleIsAddDocument = () => {
    setIsAddDocument(false);
  };

  return (
    <MainLayoutAdmin>
      <div className="contain-table-info">
        <div className="header-info">
          <h1>Quản tài liệu</h1>
          <button
            onClick={() => {
              handleShowAddDocumentPopup();
              handleIsAddDocument();
            }}
          >
            Thêm tài liệu mới
          </button>

          <button>Quay lại</button>
        </div>
        <table className="container-table">
          <thead>
            <tr>
              <th>No.</th>
              <th>Tiêu đề</th>
              <th>Mô tả</th>
              <th>Hình ảnh</th>
              <th>Link</th>
              <th className="text-center-info">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {dataDocuments.map((document) => (
              <tr
                key={document.id}
                className={selectedRow === document.id ? "selected-row" : ""}
                onClick={() => setSelectedDocumentDelete(document)}
              >
                <td>{document.id}</td>
                <td>
                  {editingRowId === document.id ? (
                    <input
                      type="text"
                      value={document.title}
                      onChange={(e) => {
                        const updatedDataDocuments = [...dataDocuments];
                        const editedDocument = updatedDataDocuments.find(
                          (d) => d.id === document.id
                        );
                        if (editedDocument) {
                          editedDocument.title = e.target.value;
                          setDataDocuments(updatedDataDocuments);
                        }
                      }}
                    />
                  ) : (
                    <span>{document.title}</span>
                  )}
                </td>
                <td>
                  {editingRowId === document.id ? (
                    <input
                      type="text"
                      value={document.description}
                      onChange={(e) => {
                        const updatedDataDocuments = [...dataDocuments];
                        const editedDocument = updatedDataDocuments.find(
                          (d) => d.id === document.id
                        );
                        if (editedDocument) {
                          editedDocument.description = e.target.value;
                          setDataDocuments(updatedDataDocuments);
                        }
                      }}
                    />
                  ) : (
                    document.description
                  )}
                </td>
                <td>
                  {editingRowId === document.id ? (
                    <div>
                      <input
                        type="file"
                        name="image"
                        onChange={(e) => setImageFile(e.target.files[0])}
                      />
                      {imageFile || selectedRow.image ? (
                        <img
                          src={
                            imageFile
                              ? URL.createObjectURL(imageFile)
                              : `${
                                  process.env.REACT_DOMAIN ||
                                  "http://trungtamdaotaolaixebinhduong.com:8080/"
                                }/api/document/image?image-name=${
                                  selectedRow.image
                                }`
                          }
                          alt="Preview"
                        />
                      ) : (
                        <span>No image selected</span>
                      )}
                    </div>
                  ) : (
                    <>
                      <img
                        src={`${
                          process.env.REACT_DOMAIN ||
                          "http://trungtamdaotaolaixebinhduong.com:8080/"
                        }/api/document/${document.id}/image`}
                        alt="Document"
                      />
                    </>
                  )}
                </td>

                <td>
                  {editingRowId === document.id ? (
                    <input
                      type="text"
                      value={document.link}
                      onChange={(e) => {
                        const updatedDataDocuments = [...dataDocuments];
                        const editedDocument = updatedDataDocuments.find(
                          (d) => d.id === document.id
                        );
                        if (editedDocument) {
                          editedDocument.link = e.target.value;
                          setDataDocuments(updatedDataDocuments);
                        }
                      }}
                    />
                  ) : (
                    <a
                      href={document.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {document.link}
                    </a>
                  )}
                </td>
                <td className="button-info">
                  {editingRowId === document.id ? (
                    <button onClick={updateDocument}>Lưu</button>
                  ) : (
                    <button onClick={() => handleEdit(document)}>Sửa</button>
                  )}
                  <button onClick={handleShowDeleteDocumentPopup}>Xóa</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showAddDocumentPopup && (
        <div className="popup-student">
          <div className="popup-inner-student">
            <AddDocument
              handleCloseForm={() => setShowAddDocumentPopup(false)}
              isAddDocument={() => setIsAddDocument(true)}
            />
          </div>
        </div>
      )}
      {showDeleteDocumentPopup && (
        <div className="popup-student">
          <div className="popup-inner-student">
            <ConfirmDeleteDocument
              handleCloseForm={() => setShowDeleteDocumentPopup(false)}
              setDataDocument={setDataDocuments}
              selectedDocumentDelete={selectedDocumentDelete} // Pass the correct prop name here
            />
          </div>
        </div>
      )}
    </MainLayoutAdmin>
  );
};

export default DocumentAdmin;
