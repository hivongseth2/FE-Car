import React from "react";
import { useEffect } from "react";
const Facebook = () => {
  useEffect(() => {
    if (window.FB) {
      window.FB.XFBML.parse(); // Cập nhật lại component sau khi render
    }
  }, []);

  return (
    <div className="social-facebook">
      <div
        className="fb-page"
        data-href="https://www.facebook.com/profile.php?id=100093409633684"
        data-tabs="timeline"
        data-width=""
        data-height=""
        data-small-header="false"
        data-adapt-container-width="true"
        data-hide-cover="false"
        data-show-facepile="true"
      >
        <blockquote
          cite="https://www.facebook.com/profile.php?id=100093409633684"
          className="fb-xfbml-parse-ignore"
        >
          <a href="https://www.facebook.com/profile.php?id=100093409633684">
            Dạy lái xe bình dương
          </a>
        </blockquote>
      </div>
    </div>
  );
};
export default Facebook;
