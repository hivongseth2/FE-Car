import React, { useState } from "react";
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

  const toggleAdditionalContacts = () => {
    setShowAdditionalContacts(!showAdditionalContacts);
  };

  return (
    <div className="fast-contact-container">
      {showAdditionalContacts && (
        <div className="additional-contacts">
          <div className="additional-contacts">
      <a href="https://www.google.com" target="_blank" rel="noopener noreferrer">
        <img src={contactGoogle} alt="Google" className="contact-icon" />
      </a>
      <a href="https://www.facebook.com/profile.php?id=100093409633684" target="_blank" rel="noopener noreferrer">
        <img src={contactFacebook} alt="Facebook" className="contact-icon" />
      </a>
      <a href="tel:0123456789">
        <img src={contactPhone} alt="Phone" className="contact-icon" />
      </a>
      <a href="https://zalo.me/0344449778" target="_blank" rel="noopener noreferrer">
        <img src={contactZalo} alt="Zalo" className="contact-icon" />
      </a>
      <a href="https://www.tiktok.com/@daylaixebinhduongg" target="_blank" rel="noopener noreferrer">
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
