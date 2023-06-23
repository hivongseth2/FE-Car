import React from "react";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
const CreateCertificate = (props) => {
  const [form, setForm] = useState({
    IDStudent: props.id.student.id,
    degree: props.id.degree.id,
  });
  const handleConfirm = () => {
    const confirmed = window.confirm("Bạn có chắc chắn muốn tạo chứng chỉ?");
    if (confirmed) {
      createCertificate();
    }
  };
  const createCertificate = async () => {
    try {
      const accessToken = localStorage.getItem("token");
      const url = `${
        process.env.REACT_DOMAIN ||
        "http://trungtamdaotaolaixebinhduong.com:8080"
      }/api/admin/create?degree-id=${props.id.degree.id}&student-id=${props.id.student.id}`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(form),
      });

      if (response.ok) {
        toast.success("Thêm thành công");

        const responseData = await response.json();

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
    <button className="doneButton" onClick={handleConfirm}>
      Hoàn thành
    </button>
  );
};
export default CreateCertificate;
