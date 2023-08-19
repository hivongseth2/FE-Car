import React, { useState, useEffect } from "react";
import "../styles/ListBang.scss";
import ListBangMobile from "./ListBangMobile";
import axios from "axios";
import next from "../img/next.png";
const BangDetail = () => {
  const [dataBang, setData] = useState([]);
  const [dataTemp, setDataTemp] = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

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
        setDataTemp(data.slice(0, 3));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  // auto next
  useEffect(() => {
    const interval = setInterval(() => {
      setData((prevData) => {
        const newData = [...prevData];
        const tempData = newData.shift();
        newData.push(tempData);
        setDataTemp(newData.slice(0, 3));
        return newData;
      });
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, []);
  const handleNext = () => {
    setData((prevData) => {
      const newData = [...prevData];
      const tempData = newData.shift();
      newData.push(tempData);
      setDataTemp(newData.slice(0, 3));
      return newData;
    });
  };

  const handlePrev = () => {
    setData((prevData) => {
      const newData = [...prevData];
      const tempData = newData.pop();
      newData.unshift(tempData);
      setDataTemp(newData.slice(0, 3));
      return newData;
    });
  };

  //

  const handleButtonClick = () => {
    if (typeof window !== "undefined") {
      window.scrollToRegisterAdvise();
    }
  };

  return (
    <>
      {isMobile ? (
        <ListBangMobile />
      ) : (
        <div className="list-plan-card">
          {/* <div>
        <button onClick={handlePrev}>Prev</button>
        <button onClick={handleNext}>Next</button>
      </div> */}
          <img
            onClick={handlePrev}
            className="next-left"
            src={next}
            alt="next-lefft"
          ></img>
          {dataTemp && dataTemp.length > 0 ? (
            dataTemp.map((item, index) => (
              <div
                key={item.id}
                className={`pricing-table ${index === 1 ? "middle-item" : ""}`}
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
                  <div className="container-button-register-advise">
                    <div className="button-register-advise">
                      <button onClick={handleButtonClick}>Đăng ký</button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div>Không có dữ liệu</div>
          )}
          <img onClick={handleNext} src={next} alt="next-right"></img>
        </div>
      )}
    </>
  );
};

export default BangDetail;
