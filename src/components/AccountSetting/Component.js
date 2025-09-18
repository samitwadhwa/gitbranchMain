import React, { useState } from "react";
import "@/styles/accountsetting.css";
import SettingsCards from "./SettingsCards/Component";

const ProfileCard = () => {
  const [twoStep, setTwoStep] = useState(false);

  const handleCopy = () => {
    const merchantId = "INM576BqTrB5Bl";
    navigator.clipboard.writeText(merchantId);
    alert("Merchant ID copied: " + merchantId);
  };

  return (
    <>
    
    <div id="profile-container">
       
      {/* Left Section */}
     
      <div className="profile-left">
        <img
          src="./img/zaplogo.png" // replace with your logo path
          alt="Profile Logo"
          className="profile-logo"
        />
        <h3 className="profile-name">Reuben Route</h3>
        <p className="profile-role">Owner</p>
        <p className="profile-id">
          Merchant ID <span>INM576BqTrB5Bl</span>
          <i className="ri-file-copy-line copy-icon"></i>
        </p>
      </div>

      {/* Right Section */}
      <div className="profile-right">
        <p>
          <span className="label">Phone number</span>
          <span className="value">9560663464 <a href="#">Edit</a></span>
        </p>
        <p>
          <span className="label">Login email</span>
          <span className="value">zapnowofficial@gmail.com <a href="#">Edit</a></span>
        </p>
        <p>
          <span className="label">Password</span>
          <span className="value">•••••••••• <a href="#">Edit</a></span>
        </p>
        <p>
          <span className="label">2-step verification</span>
          <span className="value">
            <i className="ri-information-line info-icon"></i>
            <input type="checkbox" disabled />
          </span>
        </p>
      </div>
    </div>
  
    <SettingsCards/>
    </>
  );
};

export default ProfileCard;
