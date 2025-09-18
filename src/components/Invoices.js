"use client";
import React, { useState } from "react";
import "@/styles/Invoices.css";
import Link from "next/link";

const GetStarted = () => {
  const [activeTab, setActiveTab] = useState("invoices");
  const [isNewItemModalOpen, setIsNewItemModalOpen] = useState(false);
  const [isTourModalOpen, setIsTourModalOpen] = useState(false);
  const [showCess, setShowCess] = useState(false);

  // Dummy Data
  const invoiceData = [
    { invoiceId: "inv001", description: "Website Design", amount: "₹ 10,000.00", createdAt: "Jul 14 2025", status: "Paid" },
    { invoiceId: "inv002", description: "Mobile App", amount: "₹ 25,000.00", createdAt: "Aug 01 2025", status: "Pending" }
  ];

  const itemsData = [
    { itemId: "item001", name: "Domain", price: "₹ 999.00", status: "Available" },
    { itemId: "item002", name: "Hosting", price: "₹ 2,499.00", status: "Out of Stock" }
  ];

  const getTableData = () => activeTab === "invoices" ? invoiceData : itemsData;

  return (
    <>
      
      <div id="myqrcodeprocess">
        <div className="get-started-wrapper">
          <h3 className="mb-5 text-left">Get Started</h3>
          <div className="steps-container">
            <div className="step-item">
              <div className="step-circle active"><span>1</span></div>
              <div className="step-content mt-3">
                <h6>Create Invoice</h6>
                <p>Create GST based invoices instantly and notify your customer via sms or email.</p>
              </div>
            </div>
            <div className="step-line"></div>
            <div className="step-item">
              <div className="step-circle"><span>2</span></div>
              <div className="step-content mt-3">
                <h6>Receive Payments</h6>
                <p>Your customers can make payments directly via the invoice link.</p>
              </div>
            </div>
            <div className="step-item">
              <img src="./img/chiku.png" alt="Get Started" className="img-fluid mychiku" />
            </div>
          </div>
        </div>
      </div>


      <div id="myinvoicewrapper">
        {/* Header */}
        <div className="hender">
          <div className="tabs">
            <button
              className={activeTab === "invoices" ? "tab active" : "tab"}
              onClick={() => setActiveTab("invoices")}
            >
              Invoices
            </button>
            <button
              className={activeTab === "items" ? "tab active" : "tab"}
              onClick={() => setActiveTab("items")}
            >
              Items
            </button>
          </div>

          {/* Right Side Buttons */}
          <div id="righti">
            {/* Need Help */}
            <span className="tabi" style={{ cursor: "pointer" }} onClick={() => setIsTourModalOpen(true)}>
              <i className="ri-lightbulb-line"></i> Need Help? take a tour
            </span>

            {/* Documentation */}
            <span className="tabi" style={{ cursor: "pointer" }}>
              <i className="ri-file-text-line"></i> Documentation
            </span>

            {/* Create New Invoice → page redirect */}
            {activeTab === "invoices" && (
              <span className="tabi">
                <Link href="/createinvoice">
                  <button className="create-btn">+ Create New Invoice</button>
                </Link>
              </span>
            )}

            {/* New Item → abhi modal hi khulega */}
            {activeTab === "items" && (
              <span className="tabi">
                <button className="create-btn" onClick={() => setIsNewItemModalOpen(true)}>
                  + New Item
                </button>
              </span>
            )}
          </div>
        </div>

        {/* Tables */}
        <div className="table-responsive">
          <table className="table table-striped settlement-table">
            <thead>
              {activeTab === "invoices" ? (
                <tr>
                  <th>Invoice ID</th>
                  <th>Description</th>
                  <th>Amount</th>
                  <th>Created At</th>
                  <th>Status</th>
                </tr>
              ) : (
                <tr>
                  <th>Item ID</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Status</th>
                </tr>
              )}
            </thead>
            <tbody>
              {getTableData().map((row, i) => (
                <tr key={i}>
                  {activeTab === "invoices" ? (
                    <>
                      <td>{row.invoiceId}</td>
                      <td>{row.description}</td>
                      <td>{row.amount}</td>
                      <td>{row.createdAt}</td>
                      <td>
                        <span
                          className={`status-pill ${row.status === "Paid"
                            ? "green"
                            : row.status === "Pending"
                              ? "orange"
                              : "red"
                            }`}
                        >
                          {row.status}
                        </span>
                      </td>
                    </>
                  ) : (
                    <>
                      <td>{row.itemId}</td>
                      <td>{row.name}</td>
                      <td>{row.price}</td>
                      <td>
                        <span
                          className={`status-pill ${row.status === "Available" ? "green" : "red"
                            }`}
                        >
                          {row.status}
                        </span>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Tour Modal */}
        {isTourModalOpen && (
          <div className="modal-overlay">
            <div className="modal-content small-modal">
              <div className="modal-header">
                <h4 className="modal-title">Restart the Tour?</h4>
                <p>This tour will give you a quick guide on this product.</p>
              </div>
              <span className="modal-close" onClick={() => setIsTourModalOpen(false)}>
                &times;
              </span>
              <div className="modal-footer">
                <button className="no-btn" onClick={() => setIsTourModalOpen(false)}>No</button>
                <a href="/invoicestour" className="yes-btn">Yes</a>
              </div>
            </div>
          </div>
        )}

        {/* New Item Modal */}
        {/* New Item Modal */}
        {isNewItemModalOpen && (
          <div className="modal-overlay">
            <div className="modal-content large-modal">
              <div className="modal-header">
                <h4>Add Item</h4>
              </div>
              <span
                className="modal-close"
                onClick={() => setIsNewItemModalOpen(false)}
              >
                &times;
              </span>

              <div className="modal-body">
                <div className="form-row">
                  {/* Name */}
                  <div className="form-group half">
                    <label>
                      Name <span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Item Name"
                    />
                  </div>

                  {/* Description */}
                  <div className="form-group half">
                    <label>Description</label>
                    <textarea
                      className="form-control"
                      rows="2"
                      placeholder="Enter description"
                    ></textarea>
                  </div>
                </div>

                <div className="form-row">
                  {/* Rate */}
                  <div className="form-group half">
                    <label>
                      Rate <span className="required">*</span>
                    </label>
                    <div className="rate-wrapper">
                      <span className="currency">₹</span>
                      <input
                        type="number"
                        className="form-control"
                        placeholder="Amount"
                      />
                      <span className="per-unit">per unit</span>
                    </div>
                    <div className="note">
                      To change item's currency please change currency of invoice
                    </div>
                  </div>
                </div>

                <div className="form-row">
                  {/* Tax Rate */}
                  <div className="form-group half">
                    <label>Tax Rate</label>
                    <select className="form-select">
                      <option>Select Tax Rate</option>
                      <option>0%</option>
                      <option>5%</option>
                      <option>12%</option>
                      <option>18%</option>
                    </select>
                    <small>Tax breakup will be calculated automatically.</small>

                    {/* Add Cess */}
                    {!showCess && (
                      <a
                        href="#"
                        className="add-cess"
                        onClick={(e) => {
                          e.preventDefault();
                          setShowCess(true);
                        }}
                      >
                        + Add Cess
                      </a>
                    )}

                    {showCess && (
                      <div className="cess-wrapper">
                        <div className="rate-wrapper">
                          <input
                            type="number"
                            className="form-control"
                            placeholder="Cess Amount"
                          />
                          <span className="per-unit">%</span>
                        </div>
                        <div className="radio-group">
                          <label>
                            <input type="radio" name="taxType" /> Tax Inclusive
                          </label>
                          <label>
                            <input type="radio" name="taxType" /> Tax Exclusive
                          </label>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* HSN/SAC Code */}
                  <div className="form-group half">
                    <label>HSN/SAC Code</label>
                    <div className="radio-group">
                      <label>
                        <input type="radio" name="codeType" /> HSN Code
                      </label>
                      <label>
                        <input type="radio" name="codeType" /> SAC Code
                      </label>
                    </div>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="HSN/SAC Code"
                    />
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <button
                  className="no-btn"
                  onClick={() => setIsNewItemModalOpen(false)}
                >
                  Cancel
                </button>
                <button className="yes-btn">Save</button>
              </div>
            </div>
          </div>
        )}


      </div>
    </>
  );
};

export default GetStarted;
