import MainLayout from "./MainLayout";
import "../styles/Course.scss";
import Register_Advise from "./Register_advise";
const Courses = () => {
  return (
    <MainLayout>
      <div class="lists">
        <span className="content">Học lái xe ô tô B1</span>
        <div class="list">Ưu đãi: Giảm 500k khi đăng ký online</div>
        <div class="list">Đăng ký chỉ cần CMT</div>
        <div class="list">Học phí trọn gói 100%</div>
        <div class="list">Học 1 thầy 1 trò</div>
        <div class="list">Học gần nhà, thời gian linh hoạt</div>
        <div class="list">Học phí chỉ 7.800.000đ</div>
        <div class="list">Có chương trình nâng cao</div>
        <div class="list">Cam kết không phát sinh thêm phí</div>
      </div>

      <div className="register_advise">
        <Register_Advise />
      </div>
    </MainLayout>
  );
};
export default Courses;
