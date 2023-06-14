import React from "react";
import "../styles/AboutUs.scss";
import imgcarchecked from "../img/muiten.png";

const AboutUs = () => {
  return (
    <div className="about-us-container">
      <h2>Chúng tôi đào tạo bạn bằng tâm huyết và kinh nghiệm</h2>
      <h3 className="about-us-container-p">
        Chúng tôi sẽ hỗ trợ bạn với giáo viên kèm cặp, đào tạo từ không biết lái
        xe có thể tự lái xe một mình trên đường
      </h3>
      <div className="list-about-us">
        <div className="about-us-1 card-about-1">
          <img src={imgcarchecked}></img>
          <div className="single-item">
            <h4>Hợp đồng đầy đủ</h4>
            <p>
              Cam kết đào tạo bằng hợp đồng pháp nhân rõ ràng, đầy đủ nhằm đảm
              bảo quyền lợi học viên
            </p>
          </div>
        </div>
        <div className="about-us-1 card-about-2">
        <img src={imgcarchecked}></img>
          <div className="single-item">
            <h4>Kinh nghiệm đào tạo lâu năm</h4>
            <p>
              Đội ngũ giáo viên giàu kinh nghiệm, trung tâm đem lại sự an tâm và
              tin cậy cho học viên
            </p>
          </div>
        </div>
        <div className="about-us-1 card-about-3">
        <img src={imgcarchecked}></img>
          <div className="single-item">
            <h4>Công nghệ giản dạy hiện đại</h4>
            <p>
              Cung cấp các bài ôn luyện trực tuyến miễn phí, chất lượng cao cho
              học viên toàn quốc
            </p>
          </div>
        </div>
        <div className="about-us-1 card-about-4">
        <img src={imgcarchecked}></img>
          <div className="single-item">
            <h4>Đảm bảo đầu ra</h4>
            <p>
              Theo báo cáo gần nhất năm 2022, tỷ lệ đậu sát hạch ngay lần thi
              đầu tiên là 96%
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AboutUs;
