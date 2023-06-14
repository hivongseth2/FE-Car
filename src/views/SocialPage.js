import React, { Suspense } from "react";
import "../styles/SocialPage.scss";
import geekcode from "../img/logott.jpg";
import SocalItem from "./SocalItem";
//import Youtube from "./Youtube";
import Tiktok from "./Tiktok";
//import VideoTikTok from "./VideoTikTok";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faYoutube } from "@fortawesome/free-brands-svg-icons";
import { faTiktok } from "@fortawesome/free-brands-svg-icons";

const SocialPage = () => {
  const VideoTikTok = React.lazy(() => import("./VideoTikTok"));
  const Youtube = React.lazy(() => import("./Youtube"));
  return (
    <div>
      <div className="container-social-page-tiktok">
        <div className="card-social-page-info-tiktok">
          <div className="card-social-page-tiktok">
            <div className="card-image-tiktok">
              <img src={geekcode} alt="anh" />
            </div>
            <p className="card-title-tiktok">
              <FontAwesomeIcon icon={faTiktok} style={{ color: "#000" }} />{" "}
              TIKTOK
            </p>
            <p className="card-body-tiktok">
              Nullam ac tristique nulla, at convallis quam. Integer consectetur
              mi nec magna tristique, non lobortis. Nullam ac tristique nulla,
              at convallis quam. Integer consectetur mi nec magna tristique, non
              lobortis. Nullam ac tristique nulla, at convallis quam. Integer
              consectetur mi nec magna tristique, non lobortis. mi nec magna
              tristique, non lobortis. Nullam ac tristique nulla, at convallis
              quam. Integer consectetur mi nec magna tristique, non lobortis.
            </p>
            <p className="footer-tiktok">
              Written by <span className="by-name-tiktok">John Doe</span> on{" "}
              <span className="date-tiktok">25/05/23</span>
            </p>
          </div>
        </div>
        <div className="content-tiktok-video">
          <Tiktok></Tiktok>
        </div>
      </div>
      <div className="video-tiktok">
        <Suspense fallback={<div>Loading...</div>}>
          <VideoTikTok />
        </Suspense>
      </div>
      <div className="container-social-page-youtube">
        <div className="card-social-page-info">
          <div className="card-social-page">
            <div className="card-image">
              <SocalItem></SocalItem>
            </div>
            <p className="card-title">
              <FontAwesomeIcon icon={faYoutube} style={{ color: "#ff0000" }} />{" "}
              YOUTUBE
            </p>
            <p className="card-body">
              Nullam ac tristique nulla, at convallis quam. Integer consectetur
              mi nec magna tristique, non lobortis. Nullam ac tristique nulla,
              at convallis quam. Integer consectetur mi nec magna tristique, non
              lobortis. Nullam ac tristique nulla, at convallis quam. Integer
              consectetur mi nec magna tristique, non lobortis. Nullam ac
              tristique nulla, at convallis quam. Integer consectetur card-image
              Nullam ac tristique nulla, at
            </p>
            <p className="footer">
              Written by <span className="by-name">John Doe</span> on{" "}
              <span className="date">25/05/23</span>
            </p>
          </div>
        </div>
        <div className="content-youtube-video">
          <Suspense fallback={<div>Loading...</div>}>
            <Youtube />
          </Suspense>
        </div>
      </div>
    </div>
  );
};
export default SocialPage;
