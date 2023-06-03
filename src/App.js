import React from "react";
import "./App.css";
import HomePage from "./views/HomePage";
import MainLayout from "./views/MainLayout";
import { useEffect } from "react";
// import { Helmet } from "react-helmet";

import BangDetail from "./views/BangDetail";
function App() {
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
