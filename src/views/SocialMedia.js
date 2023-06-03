import React, { useState, useEffect } from "react";
import MainLayout from "./MainLayout";
import Facebook from "./Facebook";
import SocalItem from "./SocalItem";
import SocialItem from "./SocialItem";
import "../styles/SocialMedia.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faYoutube } from "@fortawesome/free-brands-svg-icons";
const SocialMedia = () => {
  return (
    <div>
      <MainLayout>
        <div className="grid-container-youtube">
          <div className="info-youtube">
            <div className="grid-item-youtube-icon">
              <div className="youtube-content">Youtube </div>
              <div className="youtube-icon">
                {" "}
                <FontAwesomeIcon icon={faYoutube} />
              </div>
            </div>
            <div></div>
            <div className="grid-item-youtube-sub">
              Hãy nhấn đăng ký và subscribe
            </div>
          </div>
          <div className="grid-item-youtube">
            <Facebook></Facebook>
          </div>
        </div>

        {/* <div className="grid-container-youtube">
          <div className="info-youtube">
            <div className="grid-item-youtube-icon">
              <div className="youtube-content">Youtube </div>
              <div className="youtube-icon">
                {" "}
                <FontAwesomeIcon icon={faYoutube} />
              </div>
            </div>
            <div></div>
            <div className="grid-item-youtube-sub">
              Hãy nhấn đăng ký và subscribe
            </div>
          </div>
          <div className="grid-item-youtube">
            <Facebook></Facebook>
          </div>
        </div> */}
      </MainLayout>
    </div>
  );
};
export default SocialMedia;
