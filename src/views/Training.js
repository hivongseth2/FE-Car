import "../styles/Traning.scss";
import React from "react";
import MainLayout from "./MainLayout";

const Training = () => {
  return (
    <MainLayout>
      <div className="container-training">
        <div className="list-test-left">
          <h1>Thi Lý Thuyết Bằng Lái Xe Ô Tô Hạng B2 Online 2023</h1>
          <p>
            Dưới đây là bộ 18 đề thi sát hạch lái xe B2 tương đương 600 câu hỏi
            ôn luyện chuẩn của cục Quản lý đường bộ và bộ Giao thông vận tải.
            Hãy thử làm bài thi lý thuyết bằng lái xe B2 online Miễn Phí
          </p>
          <h1>Cấu trúc bài thi B2 (theo luật định 2023)</h1>
          <ul>
            <li>Thời gian làm bài: 22 phút</li>
            <li>Số câu hỏi: 30 câu</li>
            <li>Số câu hỏi cần trả lời đúng: 32/35 câu là ĐẠT</li>
            <li>
              Mỗi câu hỏi có từ 2 đến 4 sự lựa chọn nhưng chỉ có 01 đáp án đúng
            </li>
          </ul>
          <p>
            Chú ý: Mỗi đề sẽ có 01 câu điểm liệt – các bạn buộc phải trả lời
            đúng nếu không sẽ bị đánh trượt bất kể các câu khác trả lời đúng
            hết.
          </p>
          <div className="test-note">
            <ul>
              <li>01 câu hỏi về phần khái niệm, lý thuyết</li>
              <li>01 câu hỏi về phần nghiệp vụ vận tải</li>
              <li>07 câu hỏi luật giao thông B2</li>
              <li>01 câu về tốc độ & khoảng cách</li>
              <li>01 câu hỏi về văn hóa & đạo đức của người lái xe</li>
              <li>02 câu hỏi kỹ thuật lái xe ô tô</li>
              <li>01 câu hỏi về cấu tạo & sửa chữa</li>
              <li>10 câu hỏi về biển báo giao thông</li>
              <li>10 câu hỏi sa hình</li>
              <li>01 câu điểm liệt (câu hỏi nghiêm trọng và rất căn bản)</li>
            </ul>
          </div>
          <h1>18 Đề Thi Tương Đương 600 câu lý thuyết B2</h1>
          <p>
            Dưới đây là 18 đề 600 câu hỏi thi lý thuyết B2 tiêu chuẩn. Hãy thử
            sức với bộ đề đầu tiên bên dưới, nếu đã hoàn thành và muốn thử sức
            với một đề thi khác, chọn “Làm lại (đề khác)”.
          </p>
          <p>Hãy xem ngay các Mẹo thi lý thuyết B2 trước khi làm bài</p>f
        </div>
        <div className="news-right">
          <div className="news-right-item"></div>
        </div>
      </div>
    </MainLayout>
  );
};
export default Training;
