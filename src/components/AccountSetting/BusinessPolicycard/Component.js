"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import "@/styles/accountsetting.css";

export default function BusinessPolicyCard() {
  const [isCustomerPopupOpen, setCustomerPopupOpen] = useState(false);
  const [isCustomerDropdownOpen, setIsCustomerDropdownOpen] = useState(false);
  const router = useRouter();
  const { tab } = router.query;
    const [isWebhookModalOpen, setWebhookModalOpen] = useState(false);

  const handleAddWebhook = () => {
    setWebhookModalOpen(true);
  };

  const handleCloseModal = () => {
    setWebhookModalOpen(false);
  };


  const [activeTab, setActiveTab] = useState("website");
  const [keyData, setKeyData] = useState([
    {
      keyId: "rzp_test_ioggEnWzCxKXVV",
      createdAt: "Jun 13th, 2025 11:08:21 AM",
      expiry: "Never",
      action: "Regenerate Test Key",
    },
  ]);
  const [webhooks, setWebhooks] = useState([]); // Initial empty array for webhooks

  

  useEffect(() => {
    if (tab) {
      setActiveTab(tab);
    }
  }, [tab]);

  const renderContent = () => {
    switch (activeTab) {
      case "policy":
        return (
          <>
            <div id="links-container">
              <div className="links-box">
                <div className="link-item">
                  <span className="link-label">Website</span>
                  <a href="https://zapnow.in/" className="link">
                    https://zapnow.in/
                  </a>
                </div>
                <div className="link-item">
                  <span className="link-label">Android app</span>
                  <a
                    href="https://play.google.com/store/apps/details?id=com.zapnow.zapnow"
                    className="link"
                  >
                    https://play.google.com/store/apps/details?id=com.zapnow.zapnow
                  </a>
                </div>
                <div className="link-item">
                  <span className="link-label">iOS app</span>
                  <span className="link">--</span>
                </div>
              </div>
            </div>
          </>
        );
      case "website":
        return (
          <div id="website-details">
            <div className="header">
              <div>
                <h3>Business website/app details</h3>
                <p>
                  Verified websites/apps integrated with Razorpay Payment Gateway
                </p>
              </div>
              <button className="add-btn" onClick={() => {
                setCustomerPopupOpen(true);
                setIsCustomerDropdownOpen(false);
              }}>
                Add additional website/app details
              </button>
            </div>
            <div className="row website-boxes">
              <div className="col-md-6 website-card">
                <span className="icon">🌐</span>
                <p>https://zapnow.in/</p>
                <span className="badge primary">Primary Website</span>
                <span className="badge active">Active</span>
                <button
                  className="edit-btn"
                  onClick={() => {
                    setCustomerPopupOpen(true);
                    setIsCustomerDropdownOpen(false);
                  }}
                >
                  Edit
                </button>
              </div>
              <div className="col-md-6 website-card">
                <span className="icon">📱</span>
                <p>
                  https://play.google.com/store/apps/details?id=com.zapnow.zapnow
                </p>
                <span className="badge app">App</span>
                <span className="badge active">Active</span>
              </div>
            </div>
          </div>
        );
      case "keys":
        return (
          <>
            <div id="key-details">
              <div className="table-responsive fade-in">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>Key Id</th>
                      <th>Created At</th>
                      <th>Expiry</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {keyData.map((key, index) => (
                      <tr key={index}>
                        <td>{key.keyId}</td>
                        <td>{key.createdAt}</td>
                        <td>{key.expiry}</td>
                        <td>
                          <button className="regenerate-btn">
                            {key.action}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        );
      case "webhooks":
        return (
          <>
           <div id="webhook-details">
      <div className="header">
        <h3>Webhook Details</h3>
        <a href="/documentation" className="documentation-link">
          Documentation
        </a>
        <button className="add-webhook-btn" onClick={handleAddWebhook}>
          + Add New Webhook
        </button>
      </div>

      <div className="table-container">
        {/* Example: if no webhooks */}
        <div className="no-webhooks-message">
          <p>You have not setup any webhook</p>
          <button className="add-webhook-btn" onClick={handleAddWebhook}>
            Add new Webhook
          </button>
        </div>
      </div>
           </div>
          </>
        );
      default:
        return <p>Select a tab</p>;
    }
  };


  return (
    <div id="business-card">
      {/* Updated Tabs */}
      <div className="hender">
        <div className="tabs">
          <button
            className={activeTab === "policy" ? "tab active" : "tab"}
            onClick={() => setActiveTab("policy")}
          >
            Business policy details
          </button>
          <button
            className={activeTab === "website" ? "tab active" : "tab"}
            onClick={() => setActiveTab("website")}
          >
            Business website details
          </button>
          <button
            className={activeTab === "keys" ? "tab active" : "tab"}
            onClick={() => setActiveTab("keys")}
          >
            API keys
          </button>
          <button
            className={activeTab === "webhooks" ? "tab active" : "tab"}
            onClick={() => setActiveTab("webhooks")}
          >
            Webhooks
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="tab-content">{renderContent()}</div>

      {isCustomerPopupOpen && (
        <div className="modal-overlay">
          <div className="modal-content smallaccount">
            <div className="modal-header">
              <h4 className="modal-title">Add Website /Apps</h4>
            </div>
            <span
              className="modal-close"
              onClick={() => setCustomerPopupOpen(false)}
            >
              &times;
            </span>
            <div className="modal-main">

              <h4>Connect your website or app to accept payments</h4>

              <div className="mycolor">
                <div className="account-color mx-3">
                  <p className="my1">Please note:</p>
                  <p className="my1">The product/services that you are selling on the website/app should fall under “It And Software” category.</p>
                  <p className="my1">If your website/app belongs to a different category, please create a new Razorpay account.
                  </p>


                </div>

              </div>
              <div className="modal-footer">
                <button className="no-btn" >Cancel</button>
                <button className="yes-btn" >Proceed to update website/app</button>
              </div>
            </div>
          </div>
        </div>
      )}


      {/* NEW WEBHOOK MODAL */}
      {isWebhookModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content large-modal">
            <div className="modal-header">
              <h4 className="modal-title">Webhook Setup</h4>
              <span className="modal-close" onClick={handleCloseModal}>
                &times;
              </span>
            </div>

            <div className="modal-main">
              <form className="webhook-form">
                {/* Webhook URL */}
                <label>Webhook URL*</label>
                <input className="form-control" type="text" placeholder="HTTPS URL is recommended" />

                {/* Secret */}
                <label>Secret</label>
                <input className="form-control" type="password" placeholder="Enter secret key (optional)" />

                {/* Alert Email */}
                <label>Alert Email</label>
                <input className="form-control" type="email" placeholder="your@email.com" />

                {/* Events */}
                <label>Active Events*</label>
                <div className="events-box">
                  <input
                    type="text"
                    className="events-search"
                    placeholder="Search events..."
                    onChange={(e) => {
                      const searchValue = e.target.value.toLowerCase();
                      document.querySelectorAll(".events-box div.event-item").forEach((item) => {
                        const label = item.textContent.toLowerCase();
                        item.style.display = label.includes(searchValue) ? "flex" : "none";
                      });
                    }}
                  />

                  <div className="event-item">
                    <input type="checkbox" id="paymentAuthorized" />
                    <label htmlFor="paymentAuthorized">payment.authorized</label>
                  </div>
                  <div className="event-item">
                    <input type="checkbox" id="paymentFailed" />
                    <label htmlFor="paymentFailed">payment.failed</label>
                  </div>
                  <div className="event-item">
                    <input type="checkbox" id="paymentCaptured" />
                    <label htmlFor="paymentCaptured">payment.captured</label>
                  </div>
                  <div className="event-item">
                    <input type="checkbox" id="paymentDisputeCreated" />
                    <label htmlFor="paymentDisputeCreated">payment.dispute.created</label>
                  </div>
                  <div className="event-item">
                    <input type="checkbox" id="paymentDisputeWon" />
                    <label htmlFor="paymentDisputeWon">payment.dispute.won</label>
                  </div>
                  <div className="event-item">
                    <input type="checkbox" id="paymentDisputeLost" />
                    <label htmlFor="paymentDisputeLost">payment.dispute.lost</label>
                  </div>
                  <div className="event-item">
                    <input  type="checkbox" id="paymentDisputeClosed" />
                    <label htmlFor="paymentDisputeClosed">payment.dispute.closed</label>
                  </div>
                </div>
              </form>
            </div>

            <div className="modal-footer">
              <button className="no-btn" onClick={handleCloseModal}>
                Cancel
              </button>
              <button className="yes-btn">Create Webhook</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
