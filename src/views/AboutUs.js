import React from "react";
import "../styles/AboutUs.scss";
const AboutUs = () => {
  return (
    <div className="about-us-page">
      <h2 className="about-us-container-title">CHÚNG TÔI CAM KẾT</h2>
      <div className="about-us-container">
        <div className="about-us-content">
          <div className="card-about-us">
            <div className="header-about-us">
              <span className="icon-about-us">
                <svg
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    clipRule="evenodd"
                    d="M18 3a1 1 0 00-1.447-.894L8.763 6H5a3 3 0 000 6h.28l1.771 5.316A1 1 0 008 18h1a1 1 0 001-1v-4.382l6.553 3.276A1 1 0 0018 15V3z"
                    fillRule="evenodd"
                  ></path>
                </svg>
              </span>
              <p className="alert-about-us">PHÍ RẺ NHẤT BÌNH DƯƠNG</p>
            </div>

            <p className="message-about-us">
              Chúng tôi có giáo trình dạy, đội ngữ giáo viên, xe tập riêng. Sân
              sát hạch tiêu chuẩn. Bởi vậy học phí lái xe ô tô luôn rẻ nhất
              nhưng chất lượng tốt nhất tại Bình Dương
            </p>
            <p className="message-about-us">
              Cảnh báo: Học viên có thể sẽ gặp nhiều nơi tư vấn với mức thu phí
              đầu vào rất rẻ. Hãy kiểm tra kỹ trước khi đăng ký chương trình dạy
              và các khoản thu phí.
            </p>
          </div>
          <div className="card-about-us">
            <div className="header-about-us">
              <span className="icon-about-us">
                <svg
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    clipRule="evenodd"
                    d="M18 3a1 1 0 00-1.447-.894L8.763 6H5a3 3 0 000 6h.28l1.771 5.316A1 1 0 008 18h1a1 1 0 001-1v-4.382l6.553 3.276A1 1 0 0018 15V3z"
                    fillRule="evenodd"
                  ></path>
                </svg>
              </span>
              <p className="alert-about-us">HỌC PHÍ TRỌN GÓI</p>
            </div>

            <p className="message-about-us">
              Học viên sẽ được tư vấn kỹ về học phí khi đăng ký. Học phí đào tạo
              được tóng trọn gói - được cam kết không phát sinh phí bằng văn
              bản.
            </p>
            <p className="message-about-us">
              Tại Trung tâm đào tạo lái xe ô tô Bình Dương, Nếu học viên không
              hài lòng về chất lượng được yêu cầu đổi giáo viên. Chúng tôi luôn
              chọn giáo viên tốt nhất - phù hợp nhất với địa điểm và yêu cầu của
              học viên
            </p>
          </div>
          <div className="card-about-us">
            <div className="header-about-us">
              <span className="icon-about-us">
                <svg
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    clipRule="evenodd"
                    d="M18 3a1 1 0 00-1.447-.894L8.763 6H5a3 3 0 000 6h.28l1.771 5.316A1 1 0 008 18h1a1 1 0 001-1v-4.382l6.553 3.276A1 1 0 0018 15V3z"
                    fillRule="evenodd"
                  ></path>
                </svg>
              </span>
              <p className="alert-about-us">THI NHANH - TỶ LỆ ĐỖ CAO</p>
            </div>

            <p className="message-about-us">
              Thời gian đào tạo lái xe theo quy định: Hạng B1/76.5 ngày, B2/94.5
              ngày, C/144 ngày. Tại Trung tâm đào tạo lái xe ô tô Bình Dương,
              học viên có thể thi sát hạch chuẩn nhất với thời gian quy định.
            </p>
            <p className="message-about-us">
              Trung tâm đào tạo lái xe ô tô Bình Dương là đơn vị có học viên đạt
              tỷ đỗ cao nhất Bình Dương - Sở hữu xe thi đời mới, với 45000m2 sân
              sát hạch đạt tiêu chuẩn ISO 9001:2015.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AboutUs;
