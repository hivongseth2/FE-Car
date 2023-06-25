import React, { useState, useEffect } from "react";
import "../styles/ListBangMobile.scss";
import axios from "axios";

const ListBangMobile = () => {
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
  return (
    <div className="list-plan-card-mobile">
      {dataBang && dataBang.length > 0 ? (
        dataBang.map((item) => (
          <div key={item.id} className="pricing-table-mobile">
            <div className="table-header-mobile">
              <h2>
                <span className="symble-mobile"></span>
                {`${(item.price / 1000000).toLocaleString()}`} &nbsp;
                <span className="text-mobile">triệu</span>
                <span className="course-mobile">toàn khoá</span>
              </h2>
            </div>
            <div className="package-box-mobile">
              <h4>Hạng {item.rating}</h4>
              <p>{item.description}</p>
            </div>
            <div className="table-content-degree-mobile">
              <ul className="feature-list-mobile clearfix-mobile">
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
        ))
      ) : (
        <div>Không có dữ liệu</div>
      )}
    </div>
  );
};
export default ListBangMobile;
