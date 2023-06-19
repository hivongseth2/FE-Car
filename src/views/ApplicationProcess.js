import React from "react";
import "../styles/ApplicationProcess.scss";
import imgdriver from "../img/aranprime-2.jpg";
import imgmessage from "../img/message.png";
import imgprofile from "../img/cart.png";
import carimg from "../img/CarImg.png";
import imgregisterwrite from "../img/img_register_write.png";

const ApplicationProcess = () => {
  return (
    <div className="aplication-process-container">
      <div className="aplication-process-title">
        <div className="item-title">
          <h1>Quy trình đăng ký học lái xe</h1>
        </div>
        <p>
          Nhằm tiết kiệm thời gian cho học viên đăng ký học lái xe các hạng,
          trung tâm đưa ra quy trình ngắn gọn như sau:
        </p>
        <img src={imgdriver} alt="img-diver"></img>
        <div className="aplication-process-now">
          <div className="aplication-process-now-img">
            <img src={imgregisterwrite} alt=""></img>
          </div>
          <div className="aplication-process-now-content">
            <h4>Hãy đăng ký ngay</h4>
            <h4>Với nhiều bài học online miễn phí kèm theo...</h4>
            <p>Nhiều bài luyện thi miễn phí cho bạn khi đăng ký.</p>
          </div>
        </div>
      </div>
      <div className="aplication-process-content">
        <div className="aplication-process-1">
          <img src={imgmessage} alt="img1"></img>
          <h4>Đăng ký để được nghe tư vấn</h4>
          <p>
            Điền thông tin để lại số điện thoại để được gọi và nghe trung tâm tư
            vấn
          </p>
        </div>
        <div className="aplication-process-2">
          <img src={imgprofile} alt="img2"></img>
          <h4>Nộp hồ sơ cho trung tâm</h4>
          <p>
            Sau khi được nghe tư vấn về hạng xe, cũng như cách thức học và thi
            sát hạch, bạn sẽ nộp hồ sơ cho trung tâm để được lên lịch học
          </p>
        </div>
        <div className="aplication-process-3">
          <img src={carimg} alt="img3"></img>
          <h4>Nhận lịch học và đi học</h4>
          <p>
            Sau khi trung tâm sắp xếp hồ sơ và lên lịch học sẽ báo cho bạn qua
            điện thoại hoặc email thời gian học, giáo viên phụ trách cho bạn
          </p>
        </div>
        <div className="button-register">
          <button>Đăng ký</button>
        </div>
      </div>
    </div>
  );
};
export default ApplicationProcess;
