import axios from "axios";
import React, { useState, useEffect } from "react";
import MainLayoutAdmin from "./MainLayoutAdmin";
import { toast } from "react-toastify";

const LinkManagement = () => {
  document.title = "Quản lý link";
  const [isUpdate, setIsUpdate] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingItemId, setEditingItemId] = useState(null);
  const [onAddLink, setOnAddLink] = useState(false);
  const [showTextArea, setShowTextArea] = useState(false);
  const [newLink, setNewLink] = useState("");
  const [selectedLinkDelete, setSelectedLinkDelete] = useState(null);
  const [dataLink, setLink] = useState([]);

  const handleDeleteLink = async () => {
    try {
      const accessToken = localStorage.getItem("token");
      const url = `${
        process.env.REACT_DOMAIN ||
        "http://trungtamdaotaolaixebinhduong.com:8080"
      }/api/admin/intro/${selectedLinkDelete.id}`;

      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        throw new Error("Error deleting student");
      }
      if (response.status === 200) {
        toast.success("Xóa thành công");
      }

      setLink((prevData) =>
        prevData.filter((link) => link.id !== selectedLinkDelete.id)
      );
    } catch (error) {
      console.error("Error deleting student:", error);
      toast.error("Đã xảy ra lỗi khi xóa");
    }
  };
  const handleAddLink = async (e) => {
    e.preventDefault();

    try {
      const accessToken = localStorage.getItem("token");
      const url = `${
        process.env.REACT_DOMAIN ||
        "http://trungtamdaotaolaixebinhduong.com:8080"
      }/api/admin/intro/create?link=${newLink}`;

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        throw new Error("Error updating data");
      }
      if (response.status === 200) {
        toast.success("Thêm học viên thành công");
        handleCancel();
        setOnAddLink(true);
      }
    } catch (error) {
      console.error("Error updating data:", error);
      toast.error("Đã xảy ra lỗi khi thêm link");
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        let result = await axios.get(
          `${
            process.env.REACT_DOMAIN ||
            "http://trungtamdaotaolaixebinhduong.com:8080"
          }/api/intro`
        );
        console.log(result);
        let data = result && result.data ? result.data : [];
        console.log(data);
        setLink(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [onAddLink, isUpdate]);


  const handleAddPost = () => {
    setShowTextArea(true);
    setOnAddLink(false);
  };

  const handleCancel = () => {
    setShowTextArea(false);
  };

  const [linkSelected, setLinkSelected] = useState(null);
  const handleSaveLinkChange = async (e) => {
    try {
      const accessToken = localStorage.getItem("token");
      const url = `${
        process.env.REACT_DOMAIN ||
        "http://trungtamdaotaolaixebinhduong.com:8080"
      }/api/admin/intro/update?id=${editingItemId}&link=${linkSelected}`;
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        throw new Error("Error updating data");
      }
      if (response.status === 200) {
        toast.success("Cập nhật thông tin link thành công");
        setIsUpdate(true);
      }
    } catch (error) {
      console.error("Error updating data:", error);
      toast.error("Đã xảy ra lỗi khi cập nhật thông tin link");
    }
  };

  return (
    <MainLayoutAdmin>
      <div className="contain-table-info">
        <div className="header-info">
          <div>
            {showTextArea ? (
              <div>
                <textarea
                  placeholder="Nhập nội dung"
                  onChange={(e) => setNewLink(e.target.value)}
                />
                <button onClick={handleAddLink}>Thêm</button>
                <button onClick={handleCancel}>Quay lại</button>
              </div>
            ) : (
              <button onClick={handleAddPost}>Thêm bài đăng</button>
            )}
          </div>
        </div>
        <table className="container-table">
          <thead>
            <tr>
              <th>No.</th>
              <th>Hạng - Không được xóa 3 link tiktok này. chỉ được cập nhật 3 link tiktok này</th>
              <th className="text-center-info">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {dataLink && dataLink.length > 0 ? (
              dataLink.map((item) => (
                <tr key={item.id} onClick={() => setSelectedLinkDelete(item)}>
                  <td>{item.id}</td>
                  {editingItemId === item.id && !isUpdate ? (
                    <td>
                      <textarea
                        value={linkSelected}
                        onChange={(e) => setLinkSelected(e.target.value)}
                      />
                    </td>
                  ) : (
                    <td>{item.link}</td>
                  )}

                  <td className="button-info">
                    {editingItemId === item.id && isEditing ? (
                      <button
                        onClick={() => {
                          handleSaveLinkChange();
                          setIsEditing(false);
                        }}
                      >
                        Lưu
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          setEditingItemId(item.id);
                          setIsEditing(true);
                          setIsUpdate(false);
                        }}
                      >
                        Sửa
                      </button>
                    )}
                    <button
                      onClick={() => {
                        const confirmed = window.confirm(
                          "Bạn có chắc muốn reset mật khẩu?"
                        );
                        if (confirmed) {
                          handleDeleteLink();
                        }
                      }}
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="11">Không có dữ liệu</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </MainLayoutAdmin>
  );
};
export default LinkManagement;
