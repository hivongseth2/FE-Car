import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/FastContact.scss";
import contactFacebook from "../img/contact-facebook.png";
import contactGoogle from "../img/contact-google-maps.png";
import contactPhone from "../img/contact-phone-call.png";
import contactZalo from "../img/contact-zalo-icon.png";
import contactTiktok from "../img/contact-tiktok.png";
import contactPlus from "../img/contact-plus.png";
import minusContact from "../img/minus-button.png";

const FastContact = () => {
  const [showAdditionalContacts, setShowAdditionalContacts] = useState(true);
  const [linkFacebook, setLinkFacebook] = useState("");
  const [linkTiktok, setLinkTiktok] = useState("");
  const [linkZalo, setLinkZalo] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

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
    const fetchDataZalo = async () => {
      try {
        let result = await axios.get(
          `${
            process.env.REACT_DOMAIN ||
            "http://trungtamdaotaolaixebinhduong.com:8080"
          }/api/intro/12`
        );
        // console.log(result);
        let data = result && result.data ? result.data : [];
        setLinkZalo(data.link);
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
    fetchDataZalo();
    fetchDataTikTok();
    fetchData();
  }, []);

  const toggleAdditionalContacts = () => {
    setShowAdditionalContacts(!showAdditionalContacts);
  };
  const phoneNumberLink = `tel:${phoneNumber}`;
  return (
    <div className="fast-contact-container">
      {showAdditionalContacts && (
        <div className="additional-contacts">
          <div className="additional-contacts">
      {/* <a href="https://www.google.com" target="_blank" rel="noopener noreferrer">
        <img src={contactGoogle} alt="Google" className="contact-icon" />
      </a> */}
      <a href={linkFacebook} target="_blank" rel="noopener noreferrer">
        <img src={contactFacebook} alt="Facebook" className="contact-icon" />
      </a>
      <a href={phoneNumberLink}>
        <img src={contactPhone} alt="Phone" className="contact-icon" />
      </a>
      <a href={linkZalo} target="_blank" rel="noopener noreferrer">
        <img src={contactZalo} alt="Zalo" className="contact-icon" />
      </a>
      <a href={linkTiktok} target="_blank" rel="noopener noreferrer">
        <img src={contactTiktok} alt="Tiktok" className="contact-icon" />
      </a>
    </div>
        </div>
      )}
      <div className="fast-contact-component">
        {showAdditionalContacts ? (
          <img
            src={minusContact}
            alt="Minus"
            className="contact-icon-plus"
            onClick={toggleAdditionalContacts}
          />
        ) : (
          <img
            src={contactPlus}
            alt="Plus"
            className="contact-icon-plus"
            onClick={toggleAdditionalContacts}
          />
        )}
      </div>
    </div>
  );
};
export default FastContact;
