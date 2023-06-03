import React, { useState, useEffect } from "react";

const Youtube = () => {
  const iframeStyle = {
    border: "none",
    overflow: "hidden",
    width: 0,
    height: 0,
  };
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
      loadScript("https://www.tiktok.com/embed.js"),
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
    <>
      <div className="social-youtube">
        <iframe
          width="420"
          height="345"
          src="https://www.youtube.com/embed/XGSy3_Czz8k"
        ></iframe>
      </div>
    </>
  );
};
export default Youtube;
