import React, { useState, useEffect } from "react";
import "../styles/Slider.scss";
import BangDetail from "./BangDetail";
// var ObjectFitCover = require("react-object-fit-cover");

const Slider = () => {
  const [slides, setSlides] = useState([]);

  useEffect(() => {
    fetch("http://trungtamdaotaolaixebinhduong.com:8080/api/slide", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setSlides(data);
        const slideTitles = data.map((slide) => slide.title);
        setTitles(slideTitles);

        const srcslide = data.map(
          (slide) =>
            `http://trungtamdaotaolaixebinhduong.com:8080/api/slide/image?image-name=${slide.image}`
        );
        console.log(srcslide);

        setCurrentSlide(srcslide);
        const captions = data.map((slide) => slide.description);
        setCaptions(captions);
      })
      .catch((error) => console.log(error));
  }, []);

  // const [captions, setCaptions] = useState([]);
  const [autoplay, setAutoplay] = useState(null);
  const [captions, setCaptions] = useState([]);
  const [titles, setTitles] = useState([]);

  const [currentSlide, setCurrentSlide] = useState([]); // Thêm state currentSlide

  // useEffect(() => {
  //   const autoplayInterval = setInterval(() => {
  //     nextSlide();
  //   }, 4000);
  //   setAutoplay(autoplayInterval);

  //   return () => {
  //     clearInterval(autoplayInterval);
  //   };
  // }, [currentSlide]);

  const handleTransitionEnd = () => {
    const imageElement = document.getElementById("slider-image");
    if (imageElement) {
      imageElement.style.transition = ""; // Xóa thuộc tính transition
    }
  };
  useEffect(() => {
    const imageElement = document.getElementById("slider-image");
    if (imageElement) {
      imageElement.style.opacity = "0";
      imageElement.style.height = "100px";
      imageElement.style.width = "100px";

      const loadImage = () => {
        const newImage = new Image();
        newImage.src = currentSlide[0];
        newImage.onload = () => {
          imageElement.src = newImage.src;
          setTimeout(() => {
            imageElement.style.transition =
              "height 0.6s,width 0.6s, opacity 0.5s";
            imageElement.style.width = "100%";
            imageElement.style.height = "80vh";
            imageElement.style.opacity = "1";
          }, 0);
        };
      };

      loadImage();
    }
  }, [currentSlide]);

  const nextSlide = () => {
    const updatedSlides = [...slides];
    const updatedCaptions = [...captions];
    const updatedTitles = [...titles];
    const updatedSrc = [...currentSlide];

    const firstSlide = updatedSlides.shift();
    updatedSlides.push(firstSlide);

    const firstCaption = updatedCaptions.shift();
    updatedCaptions.push(firstCaption);

    const firstSrc = updatedSrc.shift();
    updatedSrc.push(firstSrc);

    const firstTitle = updatedTitles.shift();
    updatedTitles.push(firstTitle);

    setSlides(updatedSlides);
    setCaptions(updatedCaptions);
    setTitles(updatedTitles);
    setCurrentSlide(updatedSrc);
  };

  const backSlide = () => {
    const updatedSlides = [...slides];
    const updatedCaptions = [...captions];
    const updatedTitles = [...slides.map((slide) => slide.title)]; // Create a copy of the titles
    const updatedSrc = [...currentSlide];

    const lastSlide = updatedSlides.pop();
    updatedSlides.unshift(lastSlide);

    const lasttSrc = updatedSrc.pop();
    updatedSrc.unshift(lasttSrc);

    const lastCaption = updatedCaptions.pop();
    updatedCaptions.unshift(lastCaption);

    const lastTitle = updatedTitles.pop();
    updatedTitles.unshift(lastTitle);
    setCurrentSlide(updatedSrc);

    setSlides(updatedSlides);
    setCaptions(updatedCaptions);
    setTitles(updatedTitles); // Update the titles state
  };

  return (
    <>
      {" "}
      <div className="container" id="container">
        <>
          <div
            className={`caption
      current-caption
      `}
            id="slider-caption"
          >
            <div className="caption-heading">
              <h1>{titles[0]}</h1>
            </div>
            <div className="caption-subhead">
              <h2>{captions[0]}</h2>
            </div>
            <button className="learn-more">
              <span className="circle" aria-hidden="true">
                <span className="icon arrow"></span>
              </span>
              <span className="button-text">Tìm hiểu thêm</span>
            </button>
          </div>
          <div className="left-col" id="left-col">
            <img
              id="slider-image"
              style={{ objectFit: "contain" }}
              src={currentSlide[0]}
              onTransitionEnd={handleTransitionEnd}
            />
            <div id="left-slider"></div>
          </div>
        </>

        <ul className="nav">
          <li className="slide-up">
            <a id="slide-up" href="#" onClick={backSlide}>
              &#8656;
            </a>
          </li>
          <li className="slide-down">
            <a id="slide-down" href="#" onClick={nextSlide}>
              &#8658;
            </a>
          </li>
        </ul>
      </div>
      <BangDetail />
    </>
  );
};
export default Slider;
