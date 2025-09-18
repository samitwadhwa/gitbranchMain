"use client";
import React, { useState } from "react";
import "@/styles/Subscription.css";

const GetStarted = () => {
  const [activeTab, setActiveTab] = useState("subscription");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTab, setModalTab] = useState("planDetails");
  const [isTourModalOpen, setIsTourModalOpen] = useState(false);

  const [isPlanModalOpen, setIsPlanModalOpen] = useState(false);
  const [showCess, setShowCess] = useState(false);

  const modalTabs = ["planDetails", "addOns", "linkDetails", "review"];
  const tabLabels = {
    planDetails: "Plan Details",
    addOns: "Add Ons",
    linkDetails: "Link Details",
    review: "Review",
  };

  const subscriptionData = [
    { subscriptionId: "sub001", planId: "planA1", subscriptionLink: "https://pay.example.com/sub001", customerId: "cust001", nextDueOn: "Sep 14 2025, 05:04", createdAt: "Jul 14 2025, 05:04", status: "Active" },
    { subscriptionId: "sub002", planId: "planB2", subscriptionLink: "https://pay.example.com/sub002", customerId: "cust002", nextDueOn: "Oct 01 2025, 12:00", createdAt: "Jul 15 2025, 06:12", status: "Expired" },
    { subscriptionId: "sub003", planId: "planC3", subscriptionLink: "https://pay.example.com/sub003", customerId: "cust003", nextDueOn: "Sep 20 2025, 09:45", createdAt: "Jul 16 2025, 04:33", status: "Pending" },
  ];

  const planData = [
    { planId: "planA1", planName: "Basic Plan", amountPerUnit: "₹ 199.00", billingCycle: "Monthly", createdAt: "Jul 10 2025, 03:22" },
    { planId: "planB2", planName: "Pro Plan", amountPerUnit: "₹ 499.00", billingCycle: "Quarterly", createdAt: "Jul 11 2025, 07:15" },
    { planId: "planC3", planName: "Enterprise Plan", amountPerUnit: "₹ 999.00", billingCycle: "Yearly", createdAt: "Jul 12 2025, 09:30" },
  ];

  const getTableData = () => {
    if (activeTab === "subscription") return subscriptionData;
    if (activeTab === "plan") return planData;
    return [];
  };

  const handleNext = () => {
    const i = modalTabs.indexOf(modalTab);
    if (i < modalTabs.length - 1) setModalTab(modalTabs[i + 1]);
  };

  return (
    <>
      {/* Steps */}
      <div id="myzapprocess">
        <div className="get-started-wrapper">
          <h3 className="mb-5 text-left">Get Started</h3>
          <div className="steps-container">
            <div className="step-item"><div className="step-circle active"><span>1</span></div><div className="step-content mt-3"><h6>Create Plan</h6><p>Create your custom plans with different billing cycles and prices.</p></div></div>
            <div className="step-line"></div>
            <div className="step-item"><div className="step-circle"><span>2</span></div><div className="step-content mt-3"><h6>Create Subscription</h6><p>Create subscriptions for your customers to receive recurring payments.</p></div></div>
            <div className="step-line"></div>
            <div className="step-item"><div className="step-circle"><span>3</span></div><div className="step-content mt-3"><h6>Receive Payments</h6><p>Share subscription link with your customers to receive payments.</p></div></div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div id="subscriptionWrapper">
        <div className="hender">
          <div className="tabs">
            <button className={activeTab === "subscription" ? "tab active" : "tab"} onClick={() => setActiveTab("subscription")}>Subscription</button>
            <button className={activeTab === "plan" ? "tab active" : "tab"} onClick={() => setActiveTab("plan")}>Plan</button>
            <button className={activeTab === "settings" ? "tab active" : "tab"} onClick={() => setActiveTab("settings")}>Settings</button>
          </div>
          <div id="righti">
            <span className="tabi" onClick={() => setIsTourModalOpen(true)} style={{ cursor: "pointer" }}>
              <i className="ri-lightbulb-line"></i> Need Help ? take a tour
            </span>
            {isTourModalOpen && (
              <div className="modal-overlay">
                <div className="modal-content small-modal">
                  <div className="modal-header"><h4 className="modal-title">Restart the Tour?</h4><p>This tour will give you a quick guide on this product.</p></div>
                  <span className="modal-close" onClick={() => setIsTourModalOpen(false)}>&times;</span>
                  <div className="modal-footer">
                    <button className="no-btn" onClick={() => setIsTourModalOpen(false)}>No</button>
                    <a href="/subscriptiontour" className="yes-btn">Yes</a>
                  </div>
                </div>
              </div>
            )}
            <span className="tabi"><i className="ri-file-list-3-line"></i> Documentation</span>
            <span className="tabi">
              {activeTab === "subscription" && (
                <button className="create-btn" onClick={() => { setIsModalOpen(true); setModalTab("planDetails"); }}>+ Create New Subscription</button>
              )}
              {activeTab === "plan" && (
                <button
                  className="create-btn"
                  onClick={() => setIsPlanModalOpen(true)}
                >
                  + New Plan
                </button>
              )}
            </span>
          </div>
        </div>

        {/* Subscription Content */}
        {activeTab === "subscription" && (
          <>
            <div className="card-row">
              <div className="stat-card blue">0 Active Subscriptions</div>
              <div className="stat-card red">0 Halted Subscriptions</div>
              <div className="stat-card green">0 Completing in 7 days</div>
              <div className="stat-card orange">0 Cards Expiring in 7 days</div>
            </div>
            <div className="myfilters">
              <div className="filter-group"><label>Customer Email</label><input className="form-control small-input" type="text" placeholder="Customer Email" /></div>
              <div className="filter-group"><label>Cards Expiring In</label><select className="form-select small-input"><option value="">Select Status</option></select></div>
              <div className="filter-group"><label>Subscriptions Completing In</label><select className="form-select small-input"><option value="">Select Status</option></select></div>
              <div className="filter-group"><label>Subscription Id</label><input className="form-control small-input" type="text" placeholder="Subscription Id" /></div>
              <div className="filter-group"><label>Plan Id</label><input className="form-control small-input" type="text" placeholder="Plan Id" /></div>
              <div className="filter-group"><label>Status</label><select className="form-select small-input"><option value="">Select Status</option></select></div>
              <div className="filter-group"><label>Count</label><input className="form-control small-input" type="number" placeholder="Count" /></div>
              <div className="filter-buttons"><button className="search-btn">Search</button><button className="clear-btn">Clear</button></div>
            </div>
          </>
        )}


        {/* Plan Content */}
        {activeTab === "plan" && (
          <>
            <div className="card-row">
              <div className="stat-card blue">0 Active Plans</div>
              <div className="stat-card red">0 Expired Plans</div>
              <div className="stat-card green">0 Renewals in 7 days</div>
              <div className="stat-card orange">0 Plans Ending in 7 days</div>
            </div>
            <div className="myfilters">
              <div className="filter-group"><label>Plan Id</label><input className="form-control small-input" type="text" placeholder="Plan Id" /></div>
              <div className="filter-group"><label>Count</label><input className="form-control small-input" type="number" placeholder="Count" /></div>
              <div className="filter-buttons"><button className="search-btn">Search</button><button className="clear-btn">Clear</button></div>
            </div>
          </>
        )}

        {/* Settings Content */}
        {activeTab === "settings" && (
          <div className="container my-1">
            <h3 className="mb-4">Payment Methods</h3>
            <div className="row">
              <div className="col-md-4">
                <div className="payment-card">
                  <div className="payment-card-header">
                    <span>
                      <i className="ri-bank-card-line">
                      </i>
                    </span>
                    Card
                  </div>
                  <div className="payment-card-body">
                    <p>
                      Accept recurring payments via debit & credit cards for your subscriptions
                      in any of our supported international currencies.
                    </p>
                    <div className="highlight-box">
                      Accept payments upto ₹2,00,000 – Indian Rupee (INR). Payments above ₹15,000
                      – Indian Rupee (INR) will ask the customer for OTP verification as well.
                    </div>
                    <p className="mb-0">
                      Note: Only limited cards are supported due to new payment regulations
                      by RBI.
                      <a href="#">
                        View supported cards
                      </a>
                    </p>
                    <div className="footer-box">
                      To enable this subscription, please fill this
                    </div>
                  </div>
                </div>
              </div>
              {/*
	<!-- Card 2 -->
	*/}
              <div className="col-md-4">
                <div className="payment-card">
                  <div className="payment-card-header">
                    <span>
                      <i className="ri-bank-card-line">
                      </i>
                    </span>
                    UPI
                  </div>
                  <div className="payment-card-body">
                    <p>
                      Accept recurring payments via UPI apps like PhonePe, Paytm & BHIM for
                      your subscriptions. Only supports Indian currency
                    </p>
                    <div className="highlight-box">
                      Accept payments upto ₹ 1,00,000 ₹ - Indian Rupee (INR) (For BFSI: ₹ 2,00,000
                      ₹ - Indian Rupee (INR) ) Payments above ₹ 15,000 ₹ - Indian Rupee (INR)
                      will ask the customer for UPI PIN verification as well.
                    </div>
                    <div className="footer-box">
                      UPI autopay as a payment method is not enabled, please click below to
                      raise a request
                      <div className="mt-2">
                        <button className="enablebot">
                          Enable UPI autopay
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/*
	<!-- Card 3 -->
	*/}
              <div className="col-md-4">
                <div className="payment-card">
                  <div className="payment-card-header">
                    <span>
                      <i className="ri-bank-card-line">
                      </i>
                    </span>
                    eMandate
                  </div>
                  <div className="payment-card-body">
                    <p>
                      Accept recurring payments directly via bank accounts for your subscriptions.
                      Only supports Indian currency.
                    </p>
                    <div className="highlight-box">
                      Accept payments upto: ₹ 1,00,00,000
                    </div>
                    <div className="footer-box">
                      eMandate as a payment method is not enabled, please click below to raise
                      a request
                      <div className="mt-2">
                        <button className="enablebot">
                          Enable UPI autopay
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Table */}
        {(activeTab === "subscription" || activeTab === "plan") && (
          <div className="table-responsive">
            <table className="table table-striped settlement-table">
              <thead>
                {activeTab === "subscription" ? (
                  <tr><th>Subscription Id</th><th>Plan Id</th><th>Subscription Link</th><th>Customer Id</th><th>Next Due on</th><th>Created At</th><th>Status</th></tr>
                ) : (
                  <tr><th>Plan Id</th><th>Plan Name</th><th>Amount/Unit</th><th>Billing Cycle</th><th>Created At</th></tr>
                )}
              </thead>
              <tbody>
                {getTableData().map((row, i) => (
                  <tr key={i}>
                    {activeTab === "subscription" ? (
                      <>
                        <td>{row.subscriptionId}</td>
                        <td>{row.planId}</td>
                        <td>{row.subscriptionLink}</td>
                        <td>{row.customerId}</td>
                        <td>{row.nextDueOn}</td>
                        <td>{row.createdAt}</td>
                        <td><span className={`status-pill ${row.status === "Active" ? "green" : row.status === "Expired" ? "red" : "orange"}`}>{row.status}</span></td>
                      </>
                    ) : (
                      <>
                        <td>{row.planId}</td>
                        <td>{row.planName}</td>
                        <td>{row.amountPerUnit}</td>
                        <td>{row.billingCycle}</td>
                        <td>{row.createdAt}</td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Subscription Modal */}
        {isModalOpen && (
          <div className="modal-overlay">
            <div className="modal-content">
              <div className="modal-header"><h4 className="modal-title">Create Subscription</h4><p>Provide details to create a subscription link</p></div>
              <span className="modal-close" onClick={() => setIsModalOpen(false)}>&times;</span>
              <div className="modal-top-tabs">
                {modalTabs.map((tab) => (
                  <button key={tab} className={modalTab === tab ? "top-tab active" : "top-tab"} onClick={() => setModalTab(tab)}>{tabLabels[tab]}</button>
                ))}
              </div>
              <div className="modal-main">
                {modalTab === "planDetails" && (<><h4>Plan Details</h4><label>Select Plan*</label><select className="form-select"><option>Select a plan</option><option>Basic</option><option>Premium</option></select><label>Start Date*</label><input className="form-control" type="date" /><label>Total Count*</label><input className="form-control" type="number" placeholder="No. of billing cycles" /><label>Offer</label><select className="form-select"><option>Select an offer</option><option>10% Off</option></select></>)}
                {modalTab === "addOns" && (<><h4>Add Ons</h4><label>Addon Name</label><input className="form-control" type="text" placeholder="Enter addon name" /><label>Addon Price</label><input className="form-control" type="number" placeholder="Enter price" /></>)}
                {modalTab === "linkDetails" && (<><h4>Link Details</h4><label>Link Name</label><input className="form-control" type="text" placeholder="Enter link name" /><label>Description</label><textarea className="form-control" placeholder="Enter description"></textarea></>)}
                {modalTab === "review" && (<><h4>Review</h4><p>Check all details before submitting.</p></>)}
                <div className="modal-footer">{modalTab !== "review" ? (<button className="next-btn" onClick={handleNext}>Next →</button>) : (<button className="submit-btn" onClick={() => alert("Form Submitted!")}>Submit</button>)}</div>
              </div>
            </div>
          </div>
        )}

        {/* Modal */}
        {isPlanModalOpen && (
          <div className="modal-overlay">
            <div className="modal-content large-modal">
              <div className="modal-header">
                <h4 className="modal-title">Add Plan</h4>
              </div>
              <span
                className="modal-close"
                onClick={() => {
                  setIsPlanModalOpen(false);
                  setShowCess(false);
                }}
              >
                &times;
              </span>

              <div className="modal-body">
                <div className="form-row">
                  <div className="form-group half">
                    <label>
                      Plan Name <span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Plan Name"
                    />
                  </div>
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
                      To change plan's currency please change currency of invoice
                    </div>
                  </div>
                </div>

                <div className="form-row">
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
                  onClick={() => {
                    setIsPlanModalOpen(false);
                    setShowCess(false);
                  }}
                >
                  Cancel
                </button>
                <button className="yes-btn">Save</button>
              </div>
            </div>
          </div>
        )}

        <div className="admin-under_filters">
          <div className="admin-under_head">
            <p className="admin-items1 mb-0">Items per page</p>
            <div className="mb-0">
              <select name="cars" id="feald40" className="form-select">
                <option value="volvo" disabled selected>
                  Select one
                </option>
                <option value="saab">1</option>
                <option value="mercedes">2</option>
                <option value="audi">3</option>
              </select>
            </div>
          </div>
          <div id="under_pagination" className="under_pagination">
            <nav aria-label="Page navigation example">
              <ul className="pagination mb-0">
                <li className="page-item">
                  <a className="page-link" href="#" aria-label="Previous">
                    <span aria-hidden="true">&laquo;</span>
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link active" href="#">
                    1
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#">
                    2
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#">
                    3
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#" aria-label="Next">
                    <span aria-hidden="true">&raquo;</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
};

export default GetStarted;
