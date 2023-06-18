import React from "react";
import "../styles/Document.scss";
import imgAppDocument from "../img/img-app-document.png";

const Document = () => {
  return (
    <div className="document-page">
      <div className="document-header">
        <h2>CATEGORY ARCHIVES: TÀI LIỆU</h2>
        <p>
          Đây là chuyên mục Tài Liệu của trang web
          “trungtamdaotaolaixebinhduong.com”. Chuyên mục lữu trữ những tài liệu
          cung cấp cho việc học & thi bằng lái xe ô tô B1. B2.C
        </p>
      </div>
      <div className="document-container">
        <div className="document-component-img">
          <img src={imgAppDocument} alt="img-app-document" />
        </div>
        <div className="document-component-content">
          <h4>Phần mềm học & thi lý thuyết lái xe 600 câu B1, B2, C đầy đủ</h4>
          <p>Tải phần mềm học & thi 600 câu hỏi lý thuyết lái xe B1, B2, C</p>
          <a href="#" class="action-document">
            Find out more
            <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </div>
  );
};
export default Document;
