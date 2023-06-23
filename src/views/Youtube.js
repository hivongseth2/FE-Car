import React from "react";
import "../styles/SocialYoutube.scss";
const Youtube = () => {
  return (
    <>
      <div className="social-youtube">
        <div className="video-container">
          <iframe
            src="https://www.youtube.com/embed/e-ORhEE9VVg"
            title="Video"
            allowfullscreen
          ></iframe>
        </div>
      </div>
    </>
  );
};
export default Youtube;
