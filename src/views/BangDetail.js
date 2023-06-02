import React, { useState, useEffect } from "react";
import { chiTietLoaiBang } from "../api/fake-data";
import "../styles/BangDetail.scss";
import Register_Advise from "./Register_advise";

const BangDetail = () => {
  const [openModal, setOpenModal] = useState(false);
  const getAll = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(chiTietLoaiBang);
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

  const handleOpenModal = () => {
    setOpenModal((prevState) => !prevState);
  };
  return (
    <div className="list-plan-card">
      {data &&
        data.map((item) => (
          <div key={item.id}>
            <div className="plan-card">
              <h2>
                {item.hang}
                <span>{item.mo_ta}</span>
              </h2>
              <div className="etiquet-price">
                <p>{item.gia}</p>
                <div></div>
              </div>
              <div className="benefits-list">
                <ul>
                  <li>
                    <svg
                      viewBox="0 0 512 512"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M243.8 339.8C232.9 350.7 215.1 350.7 204.2 339.8L140.2 275.8C129.3 264.9 129.3 247.1 140.2 236.2C151.1 225.3 168.9 225.3 179.8 236.2L224 280.4L332.2 172.2C343.1 161.3 360.9 161.3 371.8 172.2C382.7 183.1 382.7 200.9 371.8 211.8L243.8 339.8zM512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256zM256 48C141.1 48 48 141.1 48 256C48 370.9 141.1 464 256 464C370.9 464 464 370.9 464 256C464 141.1 370.9 48 256 48z"></path>
                    </svg>
                    <span>Thời gian học {item.thoi_gian_hoc}</span>
                  </li>
                  <li>
                    <svg
                      viewBox="0 0 512 512"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M243.8 339.8C232.9 350.7 215.1 350.7 204.2 339.8L140.2 275.8C129.3 264.9 129.3 247.1 140.2 236.2C151.1 225.3 168.9 225.3 179.8 236.2L224 280.4L332.2 172.2C343.1 161.3 360.9 161.3 371.8 172.2C382.7 183.1 382.7 200.9 371.8 211.8L243.8 339.8zM512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256zM256 48C141.1 48 48 141.1 48 256C48 370.9 141.1 464 256 464C370.9 464 464 370.9 464 256C464 141.1 370.9 48 256 48z"></path>
                    </svg>
                    <span>Loại xe {item.loai_xe}</span>
                  </li>
                  <li>
                    <svg
                      viewBox="0 0 512 512"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M243.8 339.8C232.9 350.7 215.1 350.7 204.2 339.8L140.2 275.8C129.3 264.9 129.3 247.1 140.2 236.2C151.1 225.3 168.9 225.3 179.8 236.2L224 280.4L332.2 172.2C343.1 161.3 360.9 161.3 371.8 172.2C382.7 183.1 382.7 200.9 371.8 211.8L243.8 339.8zM512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256zM256 48C141.1 48 48 141.1 48 256C48 370.9 141.1 464 256 464C370.9 464 464 370.9 464 256C464 141.1 370.9 48 256 48z"></path>
                    </svg>
                    <span>Số Km {item.dat}</span>
                  </li>
                  <li>
                    <span>Ưu điểm {item.uu_diem}</span>
                  </li>
                </ul>
              </div>
              <button
                className="button-get-plan openModalBtn"
                onClick={handleOpenModal}
              >
                đăng kí
              </button>
            </div>
          </div>
        ))}
      {openModal && <Register_Advise />}
    </div>
  );
};

export default BangDetail;
