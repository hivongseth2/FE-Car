import React, { useState, useEffect } from "react";
import MainLayout from "./MainLayout";
import SocalItem from "./SocalItem";
import "../styles/SocialMedia.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faYoutube } from "@fortawesome/free-brands-svg-icons";
import { faTiktok } from "@fortawesome/free-brands-svg-icons";
import { faFacebook } from "@fortawesome/free-brands-svg-icons";
import Facebook from "./Facebook";
import Youtube from "./Youtube";
import Tiktok from "./Tiktok";
const SocialMedia = () => {
  const loadScript = (src) => {
    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = src;
      script.async = true;
      script.onload = resolve;
      script.onerror = reject;
      document.body.appendChild(script);
    });
  };

  useEffect(() => {
    Promise.all([
      loadScript(
        "https://connect.facebook.net/vi_VN/sdk.js#xfbml=1&version=v17.0"
      ),
      // loadScript("https://www.tiktok.com/embed.js"),
    ])
      .then(() => {
        // Scripts loaded successfully
        console.log("Scripts loaded");
      })
      .catch((error) => {
        // Error occurred while loading scripts
        console.error("Error loading scripts:", error);
      });
  }, []);
  return (
    <div>
      <MainLayout>
        {/* youtube */}
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
          <div className="social-youtube">
            <div className="chanel-youtube">
              <SocalItem></SocalItem>
            </div>
            <div className="video-youtube">
              <Youtube></Youtube>
            </div>
          </div>
        </div>

        {/* facebook */}
        <div className="grid-container-facebook">
          <div className="info-facebook">
            <div className="grid-item-facebook-icon">
              <div className="facebook-content">Facebook </div>
              <div className="facebook-icon">
                {" "}
                <FontAwesomeIcon icon={faFacebook} />
              </div>
            </div>
            <div></div>
            <div className="grid-item-facebook-sub">
              Hãy nhấn đăng ký và subscribe
            </div>
          </div>
          <div className="social-facebook">
            <div className="chanel-facebook">
              <Facebook></Facebook>
            </div>
          </div>
        </div>

        {/* TikTok */}

        <div className="grid-container-tiktok">
          <div className="info-tiktok">
            <div className="grid-item-tiktok-icon">
              <div className="tiktok-content">Tiktok </div>
              <div className="tiktok-icon">
                {" "}
                <FontAwesomeIcon icon={faTiktok} />
              </div>
            </div>
            <div></div>
            <div className="grid-item-tiktok-sub">
              Hãy nhấn đăng ký và subscribe
            </div>
          </div>
          <div className="social-tiktok">
            <div className="chanel-tiktok">
              <Tiktok></Tiktok>
            </div>
          </div>
        </div>
      </MainLayout>
    </div>
  );
};
export default SocialMedia;
