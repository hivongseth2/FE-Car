import "../styles/Register_advise.scss";

const Register_Advise = () => {
  return (
    <div className="wrapper_register_advise">
      <p>Đăng ký ngay</p>
      <input type="text" placeholder="Tên của bạn"></input>
      <input type="text" placeholder="Số điện thoại"></input> <br></br>
      <div className="typeagree">
        <label>Loại bằng </label>
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
      <button type="submit" className="button">
        Đăng ký ngay
      </button>
    </div>
  );
};
export default Register_Advise;
