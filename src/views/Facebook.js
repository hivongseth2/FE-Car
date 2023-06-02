import React from "react";
const Facebook = () => {
  const iframeStyle = {
    border: "none",
    overflow: "hidden",
    width: 0,
    height: 0,
  };

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
      </div>
    </>
  );
};
export default Facebook;
