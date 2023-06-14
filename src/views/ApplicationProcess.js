import React from "react";
import "../styles/ApplicationProcess.scss";
import imgdriver from "../img/aranprime-2.jpg";
import imgmessage from "../img/message.png";

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
      </div>
      <div className="aplication-process-content">
        <div className="aplication-process-1">
          <img src={imgmessage}></img>
          <h5>Đăng ký để được nghe tư vấn</h5>
          <p>Điền thông tin để lại số điện thoại để được gọi và nghe trung tâm tư vấn</p>
        </div>
      </div>
    </div>
  );
};
export default ApplicationProcess;
