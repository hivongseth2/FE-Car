import React from "react";
import Menu from "./Menu";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function MainLayout({ children }) {
  return (
    <div id="container">
      <Menu></Menu>
      <div>
        {children}
        <ToastContainer
          position="bottom-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </div>
      <div>This is a sidebar</div>
    </div>
  );
}
export default MainLayout;
