import React from "react";
import "../styles/Sidebar.scss";
function Sidebar() {
  return (
    <div className="sidebar">
      <div className="social">
        <ul class="wrapper-sidebar">
          <li class="icon facebook">
            <span class="tooltip">Facebook</span>
            <span>
              <i class="fab fa-facebook-f"></i>
            </span>
          </li>
          <li class="icon twitter">
            <span class="tooltip">Twitter</span>
            <span>
              <i class="fab fa-twitter"></i>
            </span>
          </li>
          <li class="icon instagram">
            <span class="tooltip">Instagram</span>
            <span>
              <i class="fab fa-instagram"></i>
            </span>
          </li>
          <li class="icon github">
            <span class="tooltip">Github</span>
            <span>
              <i class="fab fa-github"></i>
            </span>
          </li>
          <li class="icon youtube">
            <span class="tooltip">Youtube</span>
            <span>
              <i class="fab fa-youtube"></i>
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}
export default Sidebar;
