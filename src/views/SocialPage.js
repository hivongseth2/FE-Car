import React, { Suspense, useState, useEffect  } from "react";
import axios from "axios";
import "../styles/SocialPage.scss";
import geekcode from "../img/logott.jpg";
import SocalItem from "./SocalItem";
import imgFacebook from "../img/facebook-fanpage.png";
import Tiktok from "./Tiktok";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faYoutube } from "@fortawesome/free-brands-svg-icons";
import { faTiktok } from "@fortawesome/free-brands-svg-icons";

import { faFacebook } from "@fortawesome/free-brands-svg-icons";

const SocialPage = () => {
  document.title = "Mạng xã hội";
  const VideoTikTok = React.lazy(() => import("./VideoTikTok"));
  const Youtube = React.lazy(() => import("./Youtube"));
  const [apiTextLink, setApiTextlink] = useState("");
  const [descriptionYoutube, setDescriptionYoutube] = useState("");
  const [descriptionFacebook, setDescriptionFacebook] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        let result = await axios.get(
          `${
            process.env.REACT_DOMAIN ||
            "http://trungtamdaotaolaixebinhduong.com:8080"
          }/api/intro/8`
        );
        let data = result && result.data ? result.data : [];
        setApiTextlink(data.link);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    const descriptionYoutube = async () => {
      try {
        let result = await axios.get(
          `${
            process.env.REACT_DOMAIN ||
            "http://trungtamdaotaolaixebinhduong.com:8080"
          }/api/intro/9`
        );
        let data = result && result.data ? result.data : [];
        setDescriptionYoutube(data.link);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    const descriptionFacebook = async () => {
      try {
        let result = await axios.get(
          `${
            process.env.REACT_DOMAIN ||
            "http://trungtamdaotaolaixebinhduong.com:8080"
          }/api/intro/10`
        );
        let data = result && result.data ? result.data : [];
        setDescriptionFacebook(data.link);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
    descriptionYoutube();
    descriptionFacebook();
  }, []);

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
              {apiTextLink}
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
            <p className="card-body-youtube">
              {descriptionYoutube}
            </p>
          </div>
        </div>
        <div className="content-youtube-video">
          <Suspense fallback={<div>Loading...</div>}>
            <Youtube />
          </Suspense>
        </div>
      </div>
      <div className="container-social-page-facebook">
        <div className="card-social-page-info-facebook">
          <div className="card-social-page-facebook">
            <div className="card-image-facebook">
              <img src={geekcode} alt="anh" />
            </div>
            <p className="card-title-facebook">
              <FontAwesomeIcon icon={faFacebook} style={{ color: "#3161b4" }} />{" "}
              <a href="https://www.facebook.com/profile.php?id=100093409633684">
                FACEBOOK
              </a>
            </p>

            <p className="card-body-facebook">
              {descriptionFacebook}
            </p>
          </div>
        </div>
        <div className="content-facebook-video">
          <a href="https://www.facebook.com/profile.php?id=100093409633684">
            <img src={imgFacebook} alt="facebook-fanpage-img" />
          </a>
        </div>
      </div>
    </div>
  );
};
export default SocialPage;
