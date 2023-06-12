import React, { useState, useEffect } from "react";
import "../../styles/DashboardScss/InfoStudentForAdmin.scss";
import MainLayoutAdmin from "./MainLayoutAdmin";

const InfoStudentForAdmin = () => {
  const accessToken = localStorage.getItem("token");
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url =
          `${
            process.env.REACT_DOMAIN ||
            "http://trungtamdaotaolaixebinhduong.com:8080"
          }/api/admin/account`;
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (!response.ok) {
          throw new Error("Error fetching data");
        }

        const responseData = await response.json();
        
        const fetchedData =
          responseData && responseData.data ? responseData.data : [];
        setData(fetchedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [accessToken]);

  return (
    <MainLayoutAdmin>
      <div className="contain-table-info">
        <div className="header-info">
          <h1>Quản lý học viên</h1>
          <button>Tạo tài khoản</button>
        </div>
        <table className="striped-table-info">
          <thead>
            <tr>
              <th>No.</th>
              <th>UserName</th>
              <th>Role</th>
              <th>Active</th>
              <th className="text-center-info">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.username}</td>
                  <td>{item.role}</td>
                  <td>{item.active}</td>
                  <td className="button-info">
                    <button>Sửa</button>
                    <button>Xóa</button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </MainLayoutAdmin>
  );
};
export default InfoStudentForAdmin;
