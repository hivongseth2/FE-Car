import React from "react";
import "../../styles/DashboardScss/ConfirmDeleteDegree.scss";
import { toast } from "react-toastify";

const ConfirmDeleteDegree = ({
  handleCloseFormDelete,
  dataBang,
  selectedDegreeDelete,
}) => {
  const handleDeleteDegree = async () => {
    try {
      const accessToken = localStorage.getItem("token");
      // console.log(selectedDegreeDelete.id);
      const url = `${
        process.env.REACT_DOMAIN ||
        "http://trungtamdaotaolaixebinhduong.com:8080"
      }/api/admin/degree/${selectedDegreeDelete.id}`;
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        throw new Error("Error deleting degree");
      }

      // Xóa sinh viên thành công
      toast.success("Xóa bằng thành công");
      handleClosePopup();
      // Remove the deleted student from dataStudent array
      dataBang((prevData) =>
        prevData.filter((degree) => degree.id !== selectedDegreeDelete.id)
      );
    } catch (error) {
      console.error("Error deleting degree:", error);
      toast.error("Đã xảy ra lỗi khi xóa bằng");
    }
  };

  const handleClosePopup = () => {
    handleCloseFormDelete();
  };

  return (
    <div className="card-delete-degree">
      <div className="header">
        <div className="image">
          <svg
            aria-hidden="true"
            stroke="currentColor"
            strokeWidth="1.5"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
              strokeLinejoin="round"
              strokeLinecap="round"
            ></path>
          </svg>
        </div>
        <div className="content">
          <span className="title">Xóa học viên</span>
          <p className="message">
            Bạn có chắc chắn muốn xóa bằng này? Hành động này sẽ không thể hoàn
            tác sau khi thực hiện.
          </p>
        </div>
        <div className="actions-delete">
          <button
            className="desactivate-delete"
            type="button"
            onClick={handleDeleteDegree}
          >
            Xóa
          </button>
          <button
            className="cancel-delete"
            type="button"
            onClick={handleClosePopup}
          >
            Hủy bỏ
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteDegree;
