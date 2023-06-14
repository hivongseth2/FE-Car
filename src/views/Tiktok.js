import React from "react";
import { useEffect } from "react";
const Tiktok = () => {
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
      <div className="social-tiktok">
        <blockquote
          className="tiktok-embed"
          cite="https://www.tiktok.com/@daylaixebinhduongg"
          data-unique-id="daylaixebinhduongg"
          data-embed-type="creator"
        >
          <section>
            {" "}
            <a
              target="_blank"
              href="https://www.tiktok.com/@daylaixebinhduongg?refer=creator_embed"
            >
              @daylaixebinhduongg
            </a>{" "}
          </section>{" "}
        </blockquote>{" "}
      </div>
    </>
  );
};
export default Tiktok;
