"use client";
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function PaymentFailed() {
  // copy function
  const copyText = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      alert("Copied: " + text);
    });
  };
  const [showRefund, setShowRefund] = useState(false);
  const [amount, setAmount] = useState(30);
const [showCommentBox, setShowCommentBox] = useState(false);


  return (
    <div id="mydetailszap" className="py-4 container">
      <div className="row">
        {/* Left Section */}
        <div className="col-lg-8 mb-4">
          <div className="boxzap shadow-sm">
            <div className="p-3">
              {/* Header */}
              <div className="d-flex align-items-center mb-3">
                <div className="display-6 text-danger me-3">
                  <i className="ri-close-circle-line"></i>
                </div>
                <div>
                  <h4 className="mb-0">
                    ₹99.00{" "}
                    <span className="badge failderror">
                      Payment Failed: Bank-Related
                    </span>
                  </h4>
                  <small className="text-muted">
                    Created on: Wed Aug 27, 12:56pm
                  </small>
                </div>
              </div>

              {/* Error box */}
              <div className="alert alert-danger mb-4 py-2 small">
                <i className="ri-error-warning-line me-1"></i>
                Your payment didn't go through due to a temporary issue. Any
                debited amount will be refunded in 4-5 business days.
              </div>

              {/* Details */}
              <h6 className="fw-bold mb-3">Details</h6>
              <div className="details-box">
                <p>
                  <label>Payment ID:</label>{" "}
                  <span className="text-primary">
                    pay_RAHAFwfYS23NSh{" "}
                    <i
                      className="ri-file-copy-line text-secondary ms-1"
                      style={{ cursor: "pointer" }}
                      onClick={() => copyText("pay_RAHAFwfYS23NSh")}
                    ></i>
                  </span>
                </p>
                <p>
                  <label>Status:</label>{" "}
                  <span className="badge bg-danger">Failed</span>
                </p>
                <p>
                  <label>Error:</label> BAD_REQUEST_ERROR
                </p>
                <p>
                  <label>Error Source:</label> issuer
                </p>
                <p>
                  <label>Error Step:</label> payment_authorization
                </p>
                <p>
                  <label>Error Reason:</label> payment_failed
                </p>
                <p>
                  <label>Bank RRN:</label> --
                </p>
                <p>
                  <label>Order ID:</label>{" "}
                  <span className="text-primary">
                    order_RAH9mUa6xikB5E{" "}
                    <i
                      className="ri-file-copy-line text-secondary ms-1"
                      style={{ cursor: "pointer" }}
                      onClick={() => copyText("order_RAH9mUa6xikB5E")}
                    ></i>
                  </span>
                </p>
                <p>
                  <label>Invoice ID:</label> --
                </p>
                <p>
                  <label>Payment Method:</label> Wallet (PhonePe)
                </p>
                <p>
                  <label>Customer:</label>{" "}
                  <i className="ri-phone-line"></i> +91 9958 458040{" "}
                  <i
                    className="ri-file-copy-line text-secondary ms-1"
                    style={{ cursor: "pointer" }}
                    onClick={() => copyText("+919958458040")}
                  ></i>{" "}
                  | <i className="ri-mail-line"></i> karan@zapnow.in{" "}
                  <i
                    className="ri-file-copy-line text-secondary ms-1"
                    style={{ cursor: "pointer" }}
                    onClick={() => copyText("karan@zapnow.in")}
                  ></i>
                </p>
                <p>
                  <label>Total Fee:</label> ₹0.00 (Razorpay Fee - ₹0.00, GST - ₹0.00)
                </p>
                <p>
                  <label>Fee bearer:</label> You pay the Razorpay platform fee
                </p>
                <p>
                  <label>Description:</label> get featured on Advertiser page
                </p>
                <p>
                  <label>Notes:</label> --
                </p>
                <p className="Createtransfer">
                  <label>Transfer:</label> --
                {/* New Create Transfer Button */}
                <button
                  className="btn btn-primary mt-3"
                  data-bs-toggle="offcanvas"
                  data-bs-target="#offcanvasTransfer"
                >
                  Create Transfer
                </button>
                </p>

              </div>
            </div>
            </div>

             <div id="myzaprefund" className="py-3">
      {/* Refund Card */}
      <div className="refund-card">
        <div className="refund-header">
          <h6>Refund</h6>
          <button className="refund-btn" onClick={() => setShowRefund(true)}>
            Issue Refund
          </button>
        </div>
        <p className="refund-text">No refund issued for this payment</p>
      </div>

      {/* Custom Popup */}
      {showRefund && (
        <div className="refund-overlay">
          <div className="refund-popup">
            <div className="popup-header">
              <h4>Refund Payment</h4>
              <span
                className="popup-close"
                onClick={() => setShowRefund(false)}
              >
                ✕
              </span>
            </div>

            <div className="popup-body">
              <label className="popup-label">
                Refund Amount <span className="required">*</span>
              </label>
              <input
                type="number"
                className="popup-input"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
              <small className="popup-small">
                This will be a full refund. Change amount for a partial refund.
              </small>

              <div className="popup-check">
                <input type="checkbox" id="instantRefund" defaultChecked />
                <label htmlFor="instantRefund">
                  Refund Instantly <span className="fee">₹9.43 Fee</span>
                </label>
              </div>

              <p className="popup-note">
                A total amount of <b>₹{Number(amount) + 9.43}</b> will be
                deducted
              </p>

              {/* Toggle Add Comments */}
              <a
                href="#"
                className="popup-link"
                onClick={(e) => {
                  e.preventDefault();
                  setShowCommentBox(!showCommentBox);
                }}
              >
                + Add Comments (Optional)
              </a>

              {/* Show Textarea only when clicked */}
              {showCommentBox && (
                <textarea
                  className="popup-textarea"
                  placeholder="Write your comments..."
                ></textarea>
              )}
            </div>

            <div className="popup-footer">
              <button
                className="popup-submit"
                onClick={() => {
                  alert("Refund Issued");
                  setShowRefund(false);
                }}
              >
                Issue Full Refund
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
        </div>

        {/* Right Section - Timeline */}
        <div className="col-lg-4">
          <div className="boxzap shadow-sm">
            <div className="p-3">
              <h6 className="fw-bold mb-3">Timeline</h6>
              <div className="timeline-box">
                <div className="timeline-step mb-3">
                  <span className="text-success me-2">
                    <i className="ri-check-line"></i>
                  </span>
                  <span className="title"> Payment created</span>
                  <div className="text-muted small">
                    Wed, Aug 27, 2025 12:56 PM
                  </div>
                </div>
                <div className="timeline-step">
                  <span className="text-danger me-2">
                    <i className="ri-close-line"></i>
                  </span>
                  <span className="title"> Payment failed</span>
                  <div className="text-muted small mt-1">
                    Your payment didn’t go through due to a temporary issue. Any
                    debited amount will be refunded in 4-5 business days.
                    <br />
                    If the amount was deducted from the customer’s bank account,
                    it will be credited to them within 5-7 working days.
                  </div>
                </div>
                <button className="refund-btn2" onClick={() => setShowRefund(true)}>
            Issue Refund
          </button>
              </div>
            </div>
          </div>
        </div>
        {/* End Timeline */}
      </div>

      {/* Offcanvas Transfer Form */}
      <div
        className="offcanvas offcanvas-end"
        tabIndex="-1"
        id="offcanvasTransfer"
        aria-labelledby="offcanvasTransferLabel"
      >
        <div className="offcanvas-header">
          <h5 id="offcanvasTransferLabel">Create Transfer</h5>
          <button
            type="button"
            className="btn-close text-reset"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          {/* Transfer Form */}
          <form>
            <div className="mb-3">
              <label className="form-label">Account *</label>
              <select className="form-select">
                <option>Account ID, Account Name</option>
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label">Billing Amount *</label>
              <div className="input-group">
                <span className="input-group-text">INR</span>
                <input type="number" className="form-control" defaultValue="0.00" />
              </div>
              <small className="text-muted">
                Transfer amount can not exceed payment amount.
              </small>
            </div>

            <div className="mb-3">
              <label className="form-label">Settlement schedule</label>
              <div className="form-check">
                <input
                  type="radio"
                  name="schedule"
                  className="form-check-input"
                  defaultChecked
                />
                <label className="form-check-label">Settle Now</label>
                <div className="text-muted small">
                  This transfer will be settled in next available settlement slot.
                </div>
              </div>

              <div className="form-check mt-2">
                <input type="radio" name="schedule" className="form-check-input" />
                <label className="form-check-label">Schedule settlement on</label>
                <input type="date" className="form-control mt-2" />
              </div>

              <div className="form-check mt-2">
                <input type="radio" name="schedule" className="form-check-input" />
                <label className="form-check-label">Put on hold</label>
                <div className="text-muted small">
                  The settlement will be on hold till specified otherwise.
                </div>
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label">Internal Notes</label>
              <input type="text" className="form-control" placeholder="Add Internal Note" />
            </div>

            <div className="d-flex justify-content-between">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="offcanvas"
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                Create Transfer
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
