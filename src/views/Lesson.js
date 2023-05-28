import React, { useState } from "react";
import "../styles/Lesson.scss";
import MainLayout from "./MainLayout";
import PlayIcon from "../img/play-button.png";

const Lesson = () => {
  const [videoUrl, setVideoUrl] = useState(
    "https://www.youtube.com/embed/ABuY4KUUVcI"
  );
  const changeVideo = (newVideoUrl) => {
    setVideoUrl(newVideoUrl);
  };

  const [expandedItem, setExpandedItem] = useState(null);
  const expandListItem = (index) => {
    if (expandedItem === index) {
      setExpandedItem(null); // Trạng thái đã mở rộng, nhấn lại để đóng
    } else {
      setExpandedItem(index); // Trạng thái chưa mở rộng hoặc mở rộng một "list-item" khác
    }
  };

  return (
    <MainLayout>
      <div className="container">
        <div className="header">
          <h1>Nội dung khóa học</h1>
          <p>13 chương • 166 bài học • Thời lượng 30 giờ 27 phút</p>
        </div>
        <div className="contents">
          <ul className="list-lesson">
            <li
              className={`list-item  ${expandedItem === 0 ? "expanded" : ""}`}
              onClick={(e) => {
                expandListItem(0);
                changeVideo("https://www.youtube.com/embed/ABuY4KUUVcI");
              }}
            >
              <div className="lesson lesson-1">
                <img className="icon-plus" src={PlayIcon} alt="Icon" />
                <p>Bài 1</p>
              </div>
              <div
                className={`description ${expandedItem === 0 ? "" : "hidden"}`}
              >
                <p style={{ textAlign: 'justify' }}>
                  Đào tạo học bằng lái xe ô tô giá rẻ - Tập lái xe an toàn - Hỗ
                  trợ ghi danh lên đến 64 tỉnh thành trên khắp cả nước, bạn
                  không cần suy nghĩ về việc tìm kiếm địa điểm uy tín ở tại khu
                  vực bạn đang sống, với tỷ lệ đậu lên đến 90% cùng với giảng
                  viên có nhiều kinh nghiệm 1 kèm 1, chúng tôi sẽ hỗ trợ bạn hết
                  mình trên con đường học !
                </p>
              </div>
            </li>

            <li
              className="list-item"
              onClick={() =>
                changeVideo("https://www.youtube.com/embed/3NExzDM-IEY")
              }
            >
              <div className="lesson lesson-2">
                <img className="icon-plus" src={PlayIcon} alt="Icon" />
                <p>Bài 2</p>
              </div>
            </li>
            <li
              className="list-item"
              onClick={() =>
                changeVideo("https://www.youtube.com/embed/rSqOhVonfiY")
              }
            >
              <div className="lesson lesson-1">
                <img className="icon-plus" src={PlayIcon} alt="Icon" />
                <p>Bài 3</p>
              </div>
            </li>
            <li className="list-item">
              <div className="lesson lesson-1">
                <img className="icon-plus" src={PlayIcon} alt="Icon" />
                <p>Bài 1</p>
              </div>
            </li>
          </ul>
          <div className="Video">
            <div className="lesson-video">
              <iframe
                width="773"
                height="435"
                src={videoUrl}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Lesson;
