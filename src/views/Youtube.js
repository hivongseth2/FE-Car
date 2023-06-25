import axios from "axios";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "../styles/SocialYoutube.scss";
const Youtube = () => {
  const [apiTextYoutube, setApiTextYoutube] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        let result = await axios.get(
          `${
            process.env.REACT_DOMAIN ||
            "http://trungtamdaotaolaixebinhduong.com:8080"
          }/api/intro/5`
        );
        console.log(result);
        let data = result && result.data ? result.data : [];
        setApiTextYoutube(data.link);
        console.log(apiTextYoutube);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);
  return (
    <>
      <div className="social-youtube">
        <div className="video-container">
          <iframe
            src={apiTextYoutube}
            title="Video"
            allowfullscreen
          ></iframe>
        </div>
      </div>
    </>
  );
};
export default Youtube;
