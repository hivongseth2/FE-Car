import React from "react";
import "../styles/SocialYoutube.scss";
const Youtube = () => {
  // const iframeStyle = {
  //   border: "none",
  //   overflow: "hidden",
  //   width: 0,
  //   height: 0,
  // };
  // const loadScript = (src) => {
  //   return new Promise((resolve, reject) => {
  //     const script = document.createElement("script");
  //     script.src = src;
  //     script.async = true;
  //     script.onload = resolve;
  //     script.onerror = reject;
  //     document.body.appendChild(script);
  //   });
  // };

  // useEffect(() => {
  //   Promise.all([
  //     loadScript(
  //       "https://connect.facebook.net/vi_VN/sdk.js#xfbml=1&version=v17.0"
  //     ),
  //     loadScript("https://www.tiktok.com/embed.js"),
  //   ])
  //     .then(() => {
  //       // Scripts loaded successfully
  //       console.log("Scripts loaded");
  //     })
  //     .catch((error) => {
  //       // Error occurred while loading scripts
  //       console.error("Error loading scripts:", error);
  //     });
  // }, []);

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
