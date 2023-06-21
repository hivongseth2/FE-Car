import React, { useState, useEffect } from "react";
import "../styles/ListBang.scss";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import axios from "axios";

const BangDetail = () => {
  const [openModal, setOpenModal] = useState(false);
  const [dataBang, setData] = useState([]);

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
  return (
    <div className="list-plan-card">
      {dataBang && dataBang.length > 0 ? (
        dataBang.map((item) => (
          <CSSTransition key={item.id} timeout={500} classNames="fade">
          <div key={item.id} class="pricing-table">
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
          </CSSTransition>
        ))
      ) : (
        <div>Không có dữ liệu</div>
      )}
    </div>
  );
};
export default BangDetail;
