import React from "react";
import "../styles/ConfirmFinish.scss";
const ConfirmFinish = () => {
  return(
    <div className="card-confirm-finish">
      <div className="header-confirm-finish">
        <div className="image-confirm-finish">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <g strokeWidth="0" id="SVGRepo_bgCarrier"></g>
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              id="SVGRepo_tracerCarrier"
            ></g>
            <g id="SVGRepo_iconCarrier">
              {" "}
              <path
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="1.5"
                stroke="#000000"
                d="M20 7L9.00004 18L3.99994 13"
              ></path>{" "}
            </g>
          </svg>
        </div>
        <div className="content-confirm-finish">
          <span className="title-confirm-finish">Đăng ký thành công !</span>
          <p className="message-confirm-finish">
            Cảm ơn bạn đã đăng ký. Chúng tôi sẽ liên lạc với bạn sớm nhất có thể. Chúc bạn một ngày tốt lành!
          </p>
        </div>
      </div>
    </div>
  );
};
export default ConfirmFinish;
