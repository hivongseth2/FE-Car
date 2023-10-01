import React, { useEffect, useState } from "react";
import "../styles/ImageComponent.scss"
import img1 from "../img/img-component-1.jpg";
import img2 from "../img/img-component-2.jpg";
import img3 from "../img/img-component-3.jpg";
import img4 from "../img/img-component-4.jpg";
import img5 from "../img/img-component-5.jpg";
import img6 from "../img/img-component-6.jpg";
const ImageComponent = () => {
  return (
    <div className="image-component-container">
      <div className="image-grid">
        <div className="image-item">
          <img src={img1} alt="img-component1"/>
        </div>
        <div className="image-item">
          <img src={img2} alt="img-component1"/>
        </div>
        <div className="image-item">
          <img src={img3} alt="img-component1"/>
        </div>
        <div className="image-item">
          <img src={img4} alt="img-component1"/>
        </div>
        <div className="image-item">
          <img src={img5} alt="img-component1"/>
        </div>
        <div className="image-item">
          <img src={img6} alt="img-component1"/>
        </div>
      </div>
    </div>
  );
};

export default ImageComponent;
