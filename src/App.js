import React from "react";
import "./App.css";
import HomePage from "./views/HomePage";
import MainLayout from "./views/MainLayout";
import { useEffect } from "react";
// import { Helmet } from "react-helmet";

import BangDetail from "./views/BangDetail";
function App() {
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
    <div className="App">
      {/* <Helmet>
        <script async src="https://www.tiktok.com/embed.js"></script>
        <script
          async
          defer
          crossorigin="anonymous"
          src="https://connect.facebook.net/vi_VN/sdk.js#xfbml=1&version=v17.0"
          nonce="ocv4IcD6"
        ></script>
      </Helmet> */}

      <MainLayout>
        <HomePage></HomePage>
        <BangDetail></BangDetail>
      </MainLayout>
    </div>
  );
}
export default App;
