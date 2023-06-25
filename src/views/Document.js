import React, { useState, useEffect } from "react";
import "../styles/Document.scss";
import axios from "axios";

const Document = () => {
  document.title = "Tài liệu";
  const [dataDocuments, setDataDocuments] = useState([]);
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
  }, []);
  return (
    <div className="document-page">
      <div className="document-header">
        <h2>CATEGORY ARCHIVES: TÀI LIỆU</h2>
        {/* <p>
          Đây là chuyên mục Tài Liệu của trang web
          “trungtamdaotaolaixebinhduong.com”. Chuyên mục lữu trữ những tài liệu
          cung cấp cho việc học & thi bằng lái xe ô tô B1. B2.C
        </p> */}
      </div>
      <>
        {dataDocuments.map((document) => (
          <div key={document.id} className="document-container">
            <div className="document-component-img"  style={{ textAlign: "center",display: "flex", justifyContent: "center", alignItems: "center" }}>
              <img
                src={`${
                  process.env.REACT_DOMAIN ||
                  "http://trungtamdaotaolaixebinhduong.com:8080/"
                }/api/document/${document.id}/image`}
                alt="img-app-document"
              />
            </div>
            <div className="document-component-content">
              <h4>{document.title}</h4>
              <p>{document.description}</p>
              <a href={document.link} className="action-document">
                Xem thêm ở đây
                <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        ))}
      </>
    </div>
  );
};
export default Document;
