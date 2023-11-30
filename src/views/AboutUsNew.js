// AboutUsNew.jsx

import React, { useEffect } from "react";
import "../styles/AbouUsNew.scss";
import { useRef } from "react";
import img1 from "../img/img-component-1.jpg";
import img2 from "../img/img-component-2.jpg";
import img3 from "../img/img-component-3.jpg";
import img4 from "../img/img-component-4.jpg";
import img5 from "../img/img-component-5.jpg";
import img6 from "../img/img-component-6.jpg";

const AboutUsNew = () => {
  const cardRef = useRef(null);

  //   useEffect(() => {
  //     const card = cardRef.current;

  //     card.addEventListener("mousemove", handleMouseMove);
  //     card.addEventListener("mouseleave", handleMouseLeave);

  //     return () => {
  //       card.removeEventListener("mousemove", handleMouseMove);
  //       card.removeEventListener("mouseleave", handleMouseLeave);
  //     };
  //   }, []);

  return (
    <div className="about-us-page">
      <h2 className="about-us-container-title">CHÚNG TÔI CAM KẾT</h2>
      <div className="about-us-container">
        <div className="about-us-content" ref={cardRef}>
          {/* Card 1 */}
          <div className="parallax-card">
            <img src={img1} alt="Image 1" className="about-us-image" />
            <p className="message-about-us">
              Chúng tôi có giáo trình dạy, đội ngữ giáo viên, xe tập riêng. Sân
              sát hạch tiêu chuẩn. Bởi vậy học phí lái xe ô tô luôn rẻ nhất
              nhưng chất lượng tốt nhất tại Bình Dương.
            </p>
          </div>

          {/* Card 2 */}
          <div className="parallax-card">
            <p className="message-about-us">
              Cảnh báo: Học viên có thể sẽ gặp nhiều nơi tư vấn với mức thu phí
              đầu vào rất rẻ. Hãy kiểm tra kỹ trước khi đăng ký chương trình dạy
              và các khoản thu phí.
            </p>
            <img src={img2} alt="Image 2" className="about-us-image" />
          </div>

          {/* Card 3 */}
          <div className="parallax-card">
            <img src={img3} alt="Image 3" className="about-us-image" />
            <p className="message-about-us">
              Học viên sẽ được tư vấn kỹ về học phí khi đăng ký. Học phí đào tạo
              được đóng trọn gói - được cam kết không phát sinh phí bằng văn
              bản.
            </p>
          </div>

          {/* Card 4 */}
          <div className="parallax-card">
            <p className="message-about-us">
              Tại Trung tâm đào tạo lái xe ô tô Bình Dương, Nếu học viên không
              hài lòng về chất lượng được yêu cầu đổi giáo viên. Chúng tôi luôn
              chọn giáo viên tốt nhất - phù hợp nhất với địa điểm và yêu cầu của
              học viên
            </p>
            <img src={img4} alt="Image 4" className="about-us-image" />
          </div>

          {/* Card 5 */}
          <div className="parallax-card">
            <img src={img5} alt="Image 5" className="about-us-image" />
            <p className="message-about-us">
              Thời gian đào tạo lái xe theo quy định: Hạng B1/76.5 ngày, B2/94.5
              ngày, C/144 ngày. Tại Trung tâm đào tạo lái xe ô tô Bình Dương,
              học viên có thể thi sát hạch chuẩn nhất với thời gian quy định.
            </p>
          </div>

          {/* Card 6 */}
          <div className="parallax-card">
            <p className="message-about-us">
              Trung tâm đào tạo lái xe ô tô Bình Dương là đơn vị có học viên đạt
              tỷ đỗ cao nhất Bình Dương - Sở hữu xe thi đời mới, với 45000m2 sân
              sát hạch đạt tiêu chuẩn ISO 9001:2015.
            </p>
            <img src={img6} alt="Image 6" className="about-us-image" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUsNew;
