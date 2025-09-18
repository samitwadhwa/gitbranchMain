import React from "react";
import "@/styles/accountsetting.css";
import { FaDesktop } from "react-icons/fa";
import Link from "next/link";

const SettingsCards = () => {
  return (
    <div id="settings-container">
      {/* Card 1 */}
      <div className="custom-card">
        <div className="card-header">
          <FaDesktop className="card-icon" />
          <h3>Website and app settings</h3>
        </div>
        <hr />
        <ul className="card-links">
      <li>
  <Link
    href={{
      pathname: "/accountsetting/settingscards/businesspolicycard",
      query: { tab: "policy" },
    }}
  >
    Business policy details
  </Link>
</li>

<li>
  <Link
    href={{
      pathname: "/accountsetting/settingscards/businesspolicycard",
      query: { tab: "website" },
    }}
  >
    Business website details
  </Link>
</li>

<li>
  <Link
    href={{
      pathname: "/accountsetting/settingscards/businesspolicycard",
      query: { tab: "keys" },
    }}
  >
    API keys
  </Link>
</li>

<li>
  <Link
    href={{
      pathname: "/accountsetting/settingscards/businesspolicycard",
      query: { tab: "webhooks" },
    }}
  >
    Webhooks
  </Link>
</li>

      </ul>
      </div>

      {/* Card 2 */}
      <div className="custom-card">
        <div className="card-header">
          <FaDesktop className="card-icon" />
          <h3>Business Settings</h3>
        </div>
        <hr />
        <ul className="card-links">
          <li><a href="#">Account details</a></li>
          <li><a href="#">Business details</a></li>
          <li><a href="#">GST details</a></li>
          <li><a href="#">Customer support details</a></li>
          <li><a href="#">Activation details</a></li>
          <li><a href="#">Manage team</a></li>
          <li><a href="#">Support tickets</a></li>


         
        </ul>
      </div>

      {/* Card 3 */}
      <div className="custom-card">
        <div className="card-header">
          <FaDesktop className="card-icon" />
          <h3>Payments and refunds</h3>
        </div>
        <hr />
        <ul className="card-links">
          <li><a href="#">Balances</a></li>
          <li><a href="#">Credits</a></li>
          <li><a href="#">Reminders</a></li>
          <li><a href="#">Transaction limits</a></li>
          <li><a href="#">Fee bearer</a></li>
          <li><a href="#">Capture and refund settings</a></li>
        </ul>
      </div>
     

      {/* Card 4 */}
      <div className="custom-card">
        <div className="card-header">
          <FaDesktop className="card-icon" />
          <h3>Bank accounts and settlements</h3>
        </div>
        <hr />
        <ul className="card-links">
          <li><a href="#">Bank account details</a></li>
          <li><a href="#">Settlement details</a></li>
          
        </ul>
      </div>


      {/* Card 5 */}
      <div className="custom-card">
        <div className="card-header">
          <FaDesktop className="card-icon" />
          <h3>Notification settings</h3>
        </div>
        <hr />
        <ul className="card-links">
          <li><a href="#">Email</a></li>
          <li><a href="#">SMS</a></li>
          <li><a href="#">WhatsApp</a></li>
          
        </ul>
      </div>

    




      {/* Card 6 */}
      <div className="custom-card">
        <div className="card-header">
          <FaDesktop className="card-icon" />
          <h3>Checkout settings</h3>
        </div>
        <hr />
        <ul className="card-links">
          <li><a href="#">Checkout Styling</a></li>
          <li><a href="#">Checkout Features</a></li>
          <li><a href="#">Payment Configuration</a></li>
          
        </ul>
       


      </div>
    </div>
  );
};

export default SettingsCards;
