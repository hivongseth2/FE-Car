import React, { useState, useEffect } from "react";
import MainLayout from "./MainLayout";
import imgavt from "../img/hinh-anh-chu-cho-trogn-bon-tam.jpg"
import { profile } from "../api/fake-data";
import "../styles/InfoStudent.scss";
const InfoStudent = () => {
  const getAll = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(profile);
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
    <MainLayout>
      <div>
        {data
          .filter((item) => item.id === 1)
          .map((item) => (
            <div key={item.id}>
                <div class="center">
                  <div class="profile">
                    <div class="image">
                      <div class="circle-1"></div>
                      <div class="circle-2"></div>
                      <img src={imgavt} alt="anh" />
                    </div>
                    <div class="name">Họ và tên: {item.tenHocVien}</div>
                    <div class="job">
                      Ngày tháng năm sinh: {item.ngayThangNamSinh}
                    </div>
                    <div class="job">Số điện thoại: {item.soDienThoai}</div>
                    <div class="job">Địa chỉ: {item.diaChi}</div>
                    <div class="job">Khóa học: {item.khoaHoc}</div>
                    <div class="job">Loại bằng: {item.loaiBang}</div>
                    <div class="job">Tên thầy dạy: {item.tenThayDay}</div>
                  </div>

                  <div class="stats">
                    <div class="box">
                      <span class="parameter">Giờ chạy DAT</span>
                      <span class="value">{item.gioChayDAT}</span>
                    </div>
                    <div class="box">
                      <span class="parameter">Giờ chạy đêm</span>
                      <span class="value">{item.gioChayDem}</span>
                    </div>
                    <div class="box">
                      <span class="parameter">Giờ chạy số tự động</span>
                      <span class="value">{item.gioChaySoTuDong}</span>
                    </div>
                    <div class="box">
                      <span class="parameter">Số Km DAT</span>
                      <span class="value">{item.kmDAT}</span>
                    </div>
                    <div class="box">
                      <span class="parameter">Điểm thi lý thuyết</span>
                      <span class="value">{item.diemThiThuLyThuyet}</span>
                    </div>
                    <div class="box">
                      <span class="parameter">Điểm thi thử mô phỏng</span>
                      <span class="value">{item.diemThiThuMoPhong}</span>
                    </div>
                  </div>
                </div>
              </div>
          ))}
      </div>
    </MainLayout>
  );
};
export default InfoStudent;
