import "../styles/Register_advise.scss";
import MainLayout from "./MainLayout";

const Register_advise = () => {
  return (
    <MainLayout>
    <div className="wrapper_register_advise">
      <p>Đăng ký tư vấn</p>
      <label className="label">Họ tên </label>
      <br></br>
      <input type="text" placeholder="Tên của bạn"></input>
      <br></br>
      <label className="label">Số điện thoại </label>
      <br></br>
      <input type="text" placeholder="Số điện thoại"></input> <br></br>
      <label className="label">Loại bằng </label>
      <div className="typeagree">
        <select>
          <option value="A1">A1</option>
          <option value="A2">A2</option>
          <option value="A3">A3</option>
          <option value="A4">A4</option>
          <option value="B1">B1</option>
          <option value="B2">B2</option>
          <option value="C">C</option>
          <option value="E">E</option>
        </select>
      </div>
      <br></br>
      <button className="btn_DKngay">
        <span>Đăng ký ngay</span>
      </button>
    </div>
    </MainLayout>
  );
};
export default Register_advise;
