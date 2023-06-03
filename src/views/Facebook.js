import React from "react";
import { useEffect } from "react";
import SocalItem from "./SocalItem";
const Facebook = () => {
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
      <div className="facebook">
        <div
          class="fb-page"
          data-href="https://www.facebook.com/profile.php?id=100078023214277"
          data-tabs="timeline"
          data-width=""
          data-height=""
          data-small-header="false"
          data-adapt-container-width="true"
          data-hide-cover="false"
          data-show-facepile="true"
        >
          <blockquote
            cite="https://www.facebook.com/profile.php?id=100078023214277"
            class="fb-xfbml-parse-ignore"
          >
            <a href="https://www.facebook.com/profile.php?id=100078023214277">
              Kaha Café.
            </a>
          </blockquote>
        </div>
      </div>

      <div className="tiktok">
        <blockquote
          class="tiktok-embed"
          cite="https://www.tiktok.com/@thanhluan1303"
          data-unique-id="thanhluan1303"
          data-embed-type="creator"
        >
          <section>
            {" "}
            <a
              target="_blank"
              href="https://www.tiktok.com/@thanhluan1303?refer=creator_embed"
            >
              @thanhluan1303
            </a>{" "}
          </section>{" "}
        </blockquote>{" "}
      </div>

      <div className="youtube">
        <iframe
          width="420"
          height="345"
          src="https://www.youtube.com/embed/XGSy3_Czz8k"
        ></iframe>
        <SocalItem />
      </div>
    </>
  );
};
export default Facebook;
