import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "../styles/Footer.scss";
import { useRef } from "react";
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
  const [linkFacebook, setLinkFacebook] = useState("");
  const [linkTiktok, setLinkTiktok] = useState("");
  const [linkYoutube, setLinkYoutube] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const [dataBang, setData] = useState([]);
  const registerAdviseRef = useRef(null);

  const scrollToRegisterAdvise = (e) => {
    e.preventDefault();
    if (registerAdviseRef.current) {
      registerAdviseRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };
  const handleCourse = () => {
    if (typeof window !== "undefined") {
      window.scrollToRegisterAdvise();
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        let result = await axios.get(
          `${
            process.env.REACT_DOMAIN ||
            "http://trungtamdaotaolaixebinhduong.com:8080"
          }/api/degree`
        );
        let data = result && result.data ? result.data.data : [];
        setData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let result = await axios.get(
          `${
            process.env.REACT_DOMAIN ||
            "http://trungtamdaotaolaixebinhduong.com:8080"
          }/api/intro/1`
        );
        // console.log(result);
        let data = result && result.data ? result.data : [];
        setLinkFacebook(data.link);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    const fetchDataTikTok = async () => {
      try {
        let result = await axios.get(
          `${
            process.env.REACT_DOMAIN ||
            "http://trungtamdaotaolaixebinhduong.com:8080"
          }/api/intro/7`
        );
        // console.log(result);
        let data = result && result.data ? result.data : [];
        setLinkTiktok(data.link);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    const fetchDataYoutube = async () => {
      try {
        let result = await axios.get(
          `${
            process.env.REACT_DOMAIN ||
            "http://trungtamdaotaolaixebinhduong.com:8080"
          }/api/intro/6`
        );
        // console.log(result);
        let data = result && result.data ? result.data : [];
        setLinkYoutube(data.link);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    const fetchDataAddress = async () => {
      try {
        let result = await axios.get(
          `${
            process.env.REACT_DOMAIN ||
            "http://trungtamdaotaolaixebinhduong.com:8080"
          }/api/intro/14`
        );
        // console.log(result);
        let data = result && result.data ? result.data : [];
        setAddress(data.link);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    const fetchDataEmail = async () => {
      try {
        let result = await axios.get(
          `${
            process.env.REACT_DOMAIN ||
            "http://trungtamdaotaolaixebinhduong.com:8080"
          }/api/intro/15`
        );
        // console.log(result);
        let data = result && result.data ? result.data : [];
        setEmail(data.link);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    const fetchDataPhoneNumber = async () => {
      try {
        let result = await axios.get(
          `${
            process.env.REACT_DOMAIN ||
            "http://trungtamdaotaolaixebinhduong.com:8080"
          }/api/intro/13`
        );
        // console.log(result);
        let data = result && result.data ? result.data : [];
        setPhoneNumber(data.link);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchDataPhoneNumber();
    fetchData();
    fetchDataTikTok();
    fetchDataYoutube();
    fetchDataAddress();
    fetchDataEmail();
  }, []);

  return (
    <div>
      <div className="wrapper-footer">
        <div className="left">
          <ul>
            <p className="content-footer">Thông tin liên hệ</p>
            <li>
              <FontAwesomeIcon icon={faMapMarkerAlt} /> {""} {address}
            </li>
            <li>
              <FontAwesomeIcon icon={faClock} /> {""}
              {email}
            </li>
            <li>
              <FontAwesomeIcon icon={faPhone} /> {""} {phoneNumber}
            </li>
          </ul>
        </div>
        <div className="centre">
          <ul>
            <p className="content-footer">Thông tin liên kết</p>
            <p className="icon">
              <a className="facebook" href={linkFacebook}>
                <img  src={fb} alt="icon-fb"></img>
              </a>
              <a className="tiktok" href={linkTiktok}>
                <img src={tiktok} alt="icon-tiktok"></img>
              </a>
              <a className="youtube" href={linkYoutube}>
                <img src={yt} alt="icon-youtube"></img>
              </a>
            </p>
          </ul>
        </div>
        <div className="right">
          <ul>
            <p className="content-footer">Khóa học</p>
            {dataBang && dataBang.length > 0 ? (
              dataBang.map((item) => (
                <li key={item.id}>
                  <button href="" onClick={handleCourse} className="course">
                    Khóa học lái xe bằng {item.rating}
                  </button>
                </li>
              ))
            ) : (
              <div>không có dữ liệu</div>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};
export default Footer;
