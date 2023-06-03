import React, { useState, useEffect } from "react";
import { fakeData } from "../api/fake-data";
import "../styles/HomePage.scss";
import BangDetail from "./BangDetail";
import Facebook from "./Facebook";
import SocalItem from "./SocalItem";
const HomePage = () => {
  const getAll = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(fakeData);
      }, 1000);
    });
  };

  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const result = await getAll();
      setData(result);
    };

    fetchData();
  }, []);

  return (
    <div>
      {/* <Facebook /> */}

      {/* <SocalItem /> */}
      {data
        .filter((item) => item.id === 1)
        .map((item) => (
          <div key={item.id}>
            <div className="container-homepage">
              <aside className="container-homepage-left">
                <p>GIỚI THIỆU</p>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <div className="button-area">
                  <button className="learn-more">
                    <span className="circle" aria-hidden="true">
                      <span className="icon arrow"></span>
                    </span>
                    <span className="button-text">Tìm hiểu thêm</span>
                  </button>
                </div>
              </aside>
              <aside className="container-homepage-right">
                <img src={item.url} alt="img1" />
              </aside>
            </div>
          </div>
        ))}
      <BangDetail />
    </div>
  );
};

export default HomePage;
