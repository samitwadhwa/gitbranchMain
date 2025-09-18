"use client";
import React, { useState } from "react";
import Link from 'next/link';

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
  const [openGross, setOpenGross] = useState(true);
  const [openDeductions, setOpenDeductions] = useState(true);
   const [activeTab, setActiveTab] = useState("payments");

  const paymentsData = [
    {
      date: "13 Jun 2025, 11:49:55 am",
      paymentId: "pay_QgZxv6lWr0rQRV",
      grossAmount: "₹ 30.00",
      deductions: "₹ 0.76",
      netAmount: "₹ 29.24",
    },
    {
      date: "13 Jun 2025, 11:47:56 am",
      paymentId: "pay_QgZvpPUJN7AKcP",
      grossAmount: "₹ 30.00",
      deductions: "₹ 0.76",
      netAmount: "₹ 29.24",
    },
  ];

  return (
    <div id="mydetailszap" className="py-4 container">
      <div className="row">
        {/* Left Section */}
        <div className="col-lg-8 mb-4">
          <div className="boxzap shadow-sm mb-3">
            <div className="p-3">
              {/* Header */}
              <div className="d-flex align-items-center mb-3">
                <div className="display-6 text-secondary me-3">
                  <i class="ri-time-line"></i>
                </div>
                <div>
                  <h4 className="mb-0">
                    ₹58.5{" "}
                    <span className="badge failderror">
                      <i class="ri-information-line"></i> Created
                    </span>
                  </h4>
                  <small className="text-muted">
                    Created on: Wed Aug 27, 12:56pm
                  </small>
                </div>
              </div>
            </div>
          </div>
            <div className="boxzap shadow-sm mb-3">
            <div className="p-3">
              {/* Header */}

              {/* Accordion Style Content */}
              <div>
                {/* Gross settlement */}
                <div
                  className="d-flex  align-items-center py-2 border-bottom"
                  style={{ cursor: "pointer" }}
                  onClick={() => setOpenGross(!openGross)}
                >
                  <span className="fw-bold">Gross settlement</span>
                  <i
                    className={`ri-arrow-${openGross ? "up" : "down"}-s-line`}
                  ></i>
                </div>
                {openGross && (
                  <div className="ps-3 py-2">
                    <p className="d-flex justify-content-between mb-1">
                      <span>Payment</span> <span>₹ 60.00</span>
                    </p>
                  </div>
                )}

                {/* Deductions */}
                <div
                  className="d-flex  align-items-center py-2 border-bottom mt-3"
                  style={{ cursor: "pointer" }}
                  onClick={() => setOpenDeductions(!openDeductions)}
                >
                  <span className="fw-bold">Deductions</span>
                  <i
                    className={`ri-arrow-${
                      openDeductions ? "up" : "down"
                    }-s-line`}
                  ></i>
                </div>
                {openDeductions && (
                  <div className="ps-3 py-2">
                    <p className="d-flex justify-content-between mb-1">
                      <span>Tax</span> <span>₹ 0.24</span>
                    </p>
                    <p className="d-flex justify-content-between mb-1">
                      <span>Fee</span> <span>₹ 1.28</span>
                    </p>
                    <p className="d-flex justify-content-between fw-bold border-top pt-2">
                      <span>Total Deductions</span>{" "}
                      <span className="text-danger">₹ 1.52</span>
                    </p>
                  </div>
                )}

                {/* Net Settlements */}
                <div className="d-flex justify-content-between align-items-center fw-bold mt-3">
                  <span>Net settlements</span>
                  <span>₹ 58.48</span>
                </div>
              </div>
            </div>
          </div>

          <div className="boxzap shadow-sm">
            <div className="p-3">
              {/* Details */}
              <h6 className="fw-bold mb-3">Details</h6>
              <div className="details-box">
                <p>
                  <label>Payment ID:</label>{" "}
                  <span className="text-seconadry">
                    pay_RAHAFwfYS23NSh{" "}
                    <i
                      className="ri-file-copy-line text-secondary ms-1"
                      style={{ cursor: "pointer" }}
                      onClick={() => copyText("pay_RAHAFwfYS23NSh")}
                    ></i>
                  </span>
                </p>
                <p>
                  <label>UTR number:</label>{" "}
                  <span className="text-seconadry">
                    generated after settlement get processed
                  </span>
                </p>
              </div>
            </div>
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
                <button
                  className="refund-btn2"
                  onClick={() => setShowRefund(true)}
                >
                  Issue Refund
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* End Timeline */}
        
          <div className="gross-settlements">
      {/* Tabs */}
      <div className="tabs">
        <button
          className={activeTab === "payments" ? "tab active" : "tab"}
          onClick={() => setActiveTab("payments")}
        >
          Payment <span className="count">2</span>
        </button>
      </div>

      {/* Table */}
      {activeTab === "payments" && (
        <div className="table-responsive">
          <table className="table table-striped settlement-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Payment ID</th>
                <th>Gross amount</th>
                <th>Deductions</th>
                <th>Net amount</th>
                <th> Action</th>
              </tr>
            </thead>
            <tbody>
              {paymentsData.map((row, index) => (
                <tr key={index}>
                  <td>{row.date}</td>
                  <td>{row.paymentId}</td>
                  <td>{row.grossAmount}</td>
                  <td>{row.deductions}</td>
                  <td>{row.netAmount}</td>
                  <td>
                 <Link href="/transactiondetail">   <span className="details-btn">Details</span></Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
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
                <input
                  type="number"
                  className="form-control"
                  defaultValue="0.00"
                />
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
                  This transfer will be settled in next available settlement
                  slot.
                </div>
              </div>

              <div className="form-check mt-2">
                <input
                  type="radio"
                  name="schedule"
                  className="form-check-input"
                />
                <label className="form-check-label">
                  Schedule settlement on
                </label>
                <input type="date" className="form-control mt-2" />
              </div>

              <div className="form-check mt-2">
                <input
                  type="radio"
                  name="schedule"
                  className="form-check-input"
                />
                <label className="form-check-label">Put on hold</label>
                <div className="text-muted small">
                  The settlement will be on hold till specified otherwise.
                </div>
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label">Internal Notes</label>
              <input
                type="text"
                className="form-control"
                placeholder="Add Internal Note"
              />
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
