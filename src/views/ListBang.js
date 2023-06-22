import React, { useState, useEffect } from "react";
import "../styles/ListBang.scss";
import axios from "axios";
const BangDetail = () => {
  const [openModal, setOpenModal] = useState(false);
  const [dataBang, setData] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let result = await axios.get(
          `${
            process.env.REACT_DOMAIN ||
            "http://trungtamdaotaolaixebinhduong.com:8080"
          }/api/degree`
        );
        let data = result && result.data ? result.data.data : [];
        setData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleOpenModal = () => {
    setOpenModal((prevState) => !prevState);
  };

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % dataBang.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prevSlide) => (prevSlide - 1 + dataBang.length) % dataBang.length
    );
  };

  return (
    <div className="list-plan-card">
      {dataBang && dataBang.length > 0 ? (
        <>
          {/* <button onClick={prevSlide} className="slider-button prev-button"> */}

          <button onClick={nextSlide} className="slider-button prev-button">
            Prev
          </button>

          <div className="slider-container">
            <div className="slider-content">
              {dataBang.map((item, index) => {
                const isActiveSlide = index === currentSlide;
                let temp = `${index + 1}10`;
                let curentTemp = `100-${index}0`;

                if (index + 1 === 1) {
                  // temp = `${index + 1}0`;
                  curentTemp = `110`;
                }
                const slideStyle = {
                  transform: isActiveSlide
                    ? `translateX(-${currentSlide * parseInt(curentTemp)}%)`
                    : // `translateX(-${currentSlide * parseInt(curentTemp)}%)`
                      `translateX(-${
                        (index - currentSlide) * 180 + parseInt(temp)
                      }% )`,
                  opacity: isActiveSlide ? 1 : 0,
                };
                console.log("day", currentSlide);
                if (
                  (index === currentSlide - 1) |
                  (index === currentSlide + 1)
                ) {
                  slideStyle.opacity = 0.6;
                }
                if ((index + 1 === 0) | (index + 1 === 1)) {
                  slideStyle.opacity = 0;
                }

                return (
                  <div
                    key={item.id}
                    className={`pricing-table ${isActiveSlide ? "active" : ""}`}
                    style={slideStyle}
                  >
                    <div class="table-header">
                      <h2>
                        <span class="symble"></span>
                        {`${(item.price / 1000000).toLocaleString()}`} &nbsp;
                        <span class="text">triệu</span>
                        <span class="course">toàn khoá</span>
                      </h2>
                    </div>
                    <div class="package-box">
                      <h4>Hạng {item.rating}</h4>
                      <p>{item.description}</p>
                    </div>
                    <div class="table-content-degree">
                      <ul class="feature-list clearfix">
                        <li>
                          Đội tuổi<span> &gt; {item.allowAge} tuổi</span>
                        </li>
                        <li>
                          Thời gian học<span>{item.studyTime} tháng</span>
                        </li>
                        <li>
                          Bổ sung<span>{item.title}</span>
                        </li>
                        <li>
                          Loại xe <span>{item.categoryCar}</span>
                        </li>
                        <li>
                          DAT<span> Học đủ {item.dat}Km </span>
                        </li>
                        <li>
                          Ưu điểm {""}
                          <span> {item.advantage}</span>
                        </li>
                      </ul>
                      <div className="button-register-advise">
                        <button>Đăng ký</button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <button onClick={prevSlide} className="slider-button next-button">
            Next
          </button>
        </>
      ) : (
        <div>Không có dữ liệu</div>
      )}
    </div>
  );
};

export default BangDetail;
