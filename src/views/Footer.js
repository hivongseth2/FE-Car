import Sidebar from "./Sidebar";
import "../styles/Footer.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapMarkerAlt,
  faClock,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import fb from "../img/facebook.png";
import tiktok from "../img/tik-tok-logo.png";
import yt from "../img/youtube.png";
const Footer = () => {
  return (
    <div>
      <div className="wrapper-footer">
        <div className="left">
          <ul>
            <p className="content-footer">Thông tin liên hệ</p>
            <li>
              {" "}
              <FontAwesomeIcon icon={faMapMarkerAlt} /> 12 Nguyễn Văn Bảo, Gò
              Vấp, Hồ Chí Minh
            </li>
            <li>
              {" "}
              <FontAwesomeIcon icon={faClock} />
              Mở cửa: 7:30 AM - 17 PM
            </li>
            <li>
              <FontAwesomeIcon icon={faPhone} /> Số điện thoại:0909789789
            </li>
          </ul>
        </div>
        <div className="centre">
          <ul>
            <p className="content-footer">Thông tin liên kết</p>
            <p className="icon">
              <a
                className="facebook"
                href="https://www.facebook.com/profile.php?id=10006067046012"
              >
                {" "}
                <img src={fb}></img>
              </a>
              <a
                className="tiktok"
                href="https://www.facebook.com/profile.php?id=10006067046012"
              >
                <img src={tiktok}></img>
              </a>
              <a
                className="youtube"
                href="https://www.facebook.com/profile.php?id=10006067046012"
              >
                <img src={yt}></img>
              </a>
            </p>
          </ul>
        </div>
        <div className="right">
          <ul>
            <p className="content-footer">Khóa học</p>
            <li>Khóa học lái xe bằng B</li>
            <li>KHóa học lái xe bằng C</li>
            <li>Khóa học lái xe bằng D</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
export default Footer;
