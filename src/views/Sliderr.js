import React, { useState, useEffect } from "react";
import "../styles/Sliderr.scss";
import BangDetail from "./BangDetail";
import Nav1 from "./Nav1";

const Sliderr = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const xmlns = "http://www.w3.org/2000/svg";
  const [slides, setSlides] = useState([]);
  //trungtamdaotaolaixebinhduong.com:8080/api/slide
  useEffect(() => {
    fetch(`${process.env.REACT_DOMAIN}/api/slide`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setSlides(data);
      });
  }, []);

  useEffect(() => {
    if (slides.length > 0) {
      let updatedSlides = [...slides]; // Tạo một bản sao mới của mảng slides để thay đổi

      updatedSlides = updatedSlides.map((slide) => {
        // Kiểm tra xem thuộc tính image đã được cập nhật hay chưa
        if (!slide.image.includes(process.env.REACT_DOMAIN)) {
          const temp = `${process.env.REACT_DOMAIN}/api/slide/image?image-name=${slide.image}`;
          console.log("temp", temp);
          return { ...slide, image: temp };
        }
        return slide;
      });

      // Kiểm tra xem có thay đổi về slides không trước khi cập nhật state
      if (JSON.stringify(updatedSlides) !== JSON.stringify(slides)) {
        setSlides(updatedSlides);
      }
    }
  }, [slides]);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  //   }, 5000);

  //   return () => clearInterval(interval);
  // }, [slides.length]);

  const handleSlideClick = (index) => {
    setCurrentIndex(index);
    const btn = document.getElementById(`${index}`);
  };

  return (
    <main className="main-content">
      <section className="slideshow">
        <div className="slideshow-inner">
          <div className="slides">
            {slides.map((slide, index) => (
              <div
                key={index}
                className={`slide ${index === currentIndex ? "is-active" : ""}`}
                onClick={() => handleSlideClick(index)}
              >
                <div className="slide-content">
                  <div className="caption">
                    <div className="title">{slide.title}</div>
                    <div className="text">
                      <p>{slide.description}</p>
                    </div>
                  </div>
                </div>
                <div className="image-container">
                  <img src={slide.image} alt="" className="image" />
                </div>
              </div>
            ))}
            <a
              href="#"
              className="btn"

              // onMouseLeave={console.log(index)}
            >
              <span className="btn-inner">Learn More</span>
            </a>
          </div>
          <div className="pagination">
            {slides.map((_, index) => (
              <div
                key={index}
                className={`item ${index === currentIndex ? "is-active" : ""}`}
                onClick={() => handleSlideClick(index)}
              >
                <span className="icon">{index + 1}</span>
              </div>
            ))}
          </div>
          <div className="arrows">
            <div
              className="arrow prev"
              onClick={() =>
                handleSlideClick(
                  (currentIndex - 1 + slides.length) % slides.length
                )
              }
            >
              <span className="svg svg-arrow-left">
                <svg
                  version="1.1"
                  id="svg4-Layer_1"
                  xmlns={xmlns}
                  xlinkHref="http://www.w3.org/1999/xlink"
                  x="0px"
                  y="0px"
                  viewBox="0 0 24 24"
                  xmlSpace="preserve"
                >
                  {" "}
                  <path d="M13,26c-0.256,0-0.512-0.098-0.707-0.293l-12-12c-0.391-0.391-0.391-1.023,0-1.414l12-12c0.391-0.391,1.023-0.391,1.414,0s0.391,1.023,0,1.414L2.414,13l11.293,11.293c0.391,0.391,0.391,1.023,0,1.414C13.512,25.902,13.256,26,13,26z" />{" "}
                </svg>
              </span>
            </div>
            <div
              className="arrow next"
              onClick={() =>
                handleSlideClick((currentIndex + 1) % slides.length)
              }
            >
              <span className="svg svg-arrow-right">
                <svg
                  version="1.1"
                  id="svg4-Layer_1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  x="0px"
                  y="0px"
                  viewBox="0 0 24 24"
                  xmlSpace="preserve"
                >
                  {/* <path d="M12,0C5.383,0,0,5.383,0,12s5.383,12,12,12s12-5.383,12-12S18.617,0,12,0z M12,22C6.486,22,2,17.514,2,12 S6.486,2,12,2s10,4.486,10,10S17.514,22,12,22z" /> */}
                  <path
                    d="M11,26c0.256,0,0.512-0.098,0.707-0.293l12-12c0.391-0.391,0.391-1.023,0-1.414l-12-12c-0.391-0.391-1.023-0.391-1.414,0s-0.391,1.023,0,1.414L21.586,13l-11.293,11.293c-0.391,0.391-0.391,1.023,0,1.414C10.488,25.902,10.744,26,11,26z
"
                  />{" "}
                </svg>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* <BangDetail /> */}
      {/* <Nav1 /> */}
    </main>
  );
};

export default Sliderr;
