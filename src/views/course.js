import MainLayout from "./MainLayout";
import "../styles/Course.scss";
import Register_Advise from "./Register_advise";
const course = () => {
  return (
    <MainLayout>
      <div className="rapper">
        <div className="header">
          <p>Học lái xe ô tô B1</p>
        </div>
        <div className="img"></div>
        <div className="title">
          <ul>
            <li>Ưu đãi: Giảm 500k khi đăng ký online</li>
            <li>Đăng ký chỉ cần CMT</li>
            <li>Học phí trọn gói 100%</li>
            <li>Học 1 thầy 1 tròtrò</li>
            <li>Học gần nhà, thời gian linh hoạt</li>
            <li>Học phí chỉ 7.800.000đ</li>
            <li>Có chương trình nâng cao</li>
            <li>Cam kết không phát sinh thêm phí</li>
          </ul>

          <button>Xem chi tiết</button>
        </div>
      </div>

      <div className="register_advise">
        <Register_Advise />
      </div>
    </MainLayout>
  );
};
export default course;
