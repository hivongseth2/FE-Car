import { useState } from "react";
import "../styles/CreateStudent.scss";
const CreateStudent = (props) => {
  document.title = "Quản lý học viên";
  const [form, setForm] = useState({
    password: "",
    role: "",
    username: "",
  });
  const handleChange = (e) => {
    e.preventDefault();
    // console.log({ [e.target.name]: e.target.value });
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(form);
    createAccount(form).then((data) => {
      // console.log(data);
      setForm({
        password: "",
        role: "",
        username: "",
      });
      props.handleShowCreateForm(false);
    });
  };

  const createAccount = async (data) => {
    const accessToken = localStorage.getItem("token");
    const response = await fetch(
      `${
        process.env.REACT_DOMAIN ||
        "http://trungtamdaotaolaixebinhduong.com:8080"
      }/api/admin/account/create`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(data),
      }
    );
    return response.json();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="formUpdatePW">
        <p className="content-update">Thêm tài khoản</p>
        <input
          className="input-formUserName"
          name="username"
          type="text"
          placeholder="Nhập tên học viên"
          onChange={handleChange}
          value={form["username"] || ""}
        />
        <input
          className="input-formPW"
          type="password"
          name="password"
          placeholder="Nhập mật khẩu học viên"
          onChange={handleChange}
          value={form["password"] || ""}
        />
        <div>
          <select
            onChange={handleChange}
            name="role"
            value={form["role"] || ""}
            className="create-student-select"
          >
            <option value="admin">admin</option>
            <option value="test">test</option>
            <option value="staff">staff</option>
          </select>
        </div>

        <div className="group-button">
          <button className="search-button" type="submit">
            Save
          </button>
          <button
            className="cancel-button"
            type="button"
            onClick={() => {
              props.handleShowCreateForm(false);
            }}
          >
            Hủy bỏ
          </button>
        </div>
      </div>
      s
    </form>
  );
};
export default CreateStudent;
