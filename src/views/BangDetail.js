import React, { useState, useEffect } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "../styles/BangDetail.scss";
import RegisterAdvise from "./RegisterAdvise";
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
        <TransitionGroup>
          {dataBang.map((item) => (
            <CSSTransition key={item.id} timeout={500} classNames="fade">
              <div className="plan-card">
                {/* Nội dung của plan-card */}
                <button
                  className="button-get-plan-detail openModalBtn"
                  onClick={handleOpenModal}
                >
                  <a href="#">
                    <span>ĐĂNG KÝ</span>
                  </a>
                </button>
              </div>
            </CSSTransition>
          ))}
        </TransitionGroup>
      ) : (
        <div>Không có dữ liệu</div>
      )}
      {openModal && <RegisterAdvise />}
    </div>
  );
};

export default BangDetail;
