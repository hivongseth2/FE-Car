import React, { useState, useEffect } from "react";
import "../styles/CreateCertificate.scss";
import { toast } from "react-toastify";
const Certificate = (props) => {
  const [form, setForm] = useState({
    IDStudent: "",
    degree: "",
  });

  const handleChange = (e) => {
    e.preventDefault();
    console.log({ [e.target.name]: e.target.value });
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
    createCertificate(form).then((data) => {
      console.log(data);
      setForm({
        IDStudent: "",
        degree: "",
      });
    });
    props.handleShowCreateCertificate(false);
  };
  const createCertificate = async (data) => {
    try {
      const accessToken = localStorage.getItem("token");
      const url = `http://trungtamdaotaolaixebinhduong.com:8080/api/admin/create?degree-id=${data.degree}&student-id=${data.IDStudent}`;

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        toast.success("Thêm thành công");
        window.location.reload();
        const responseData = await response.json();
        console.log("Certificate created successfully:", responseData);
        return responseData;
      } else {
        toast.error("Thêm thất bại");
        console.error("Failed to create certificate");
        throw new Error("Failed to create certificate");
      }
    } catch (error) {
      console.error("Error creating certificate:", error);
      throw error;
    }
  };

  return (
    <div className="wrapper-create-cer">
      <div className="create-cer">
        <div className="content-create-cer">Thêm mới chứng chỉ</div>
        <div>
          <input
            name="IDStudent"
            className="input-cer"
            type="text"
            placeholder="Nhập ID học viên"
            onChange={handleChange}
            value={form["IDStudent"] || ""}
          />
        </div>
        <div>
          <input
            name="degree"
            className="input-cer"
            type="text"
            placeholder="Nhập ID bằng "
            onChange={handleChange}
            value={form["degree"] || ""}
          />
        </div>

        <div className="group-button">
          <button
            className="search-button"
            type="submit"
            onClick={handleSubmit}
          >
            Save
          </button>
          <button
            className="cancel-button"
            type="button"
            onClick={() => props.handleShowCreateCertificate(false)}
          >
            Hủy
          </button>
        </div>
      </div>
    </div>
  );
};
export default Certificate;
