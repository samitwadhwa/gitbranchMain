import React from "react";
import "@/styles/PaymentLinks.css";
import { FaRegCalendarAlt } from "react-icons/fa";
import Link from "next/link";

const GetStarted = () => {
  const data = [
    {
      id: "nk_QwubnK",
      date: "18-apr-25",
      amount: "₹ 0.00",
      reference: "yme44Link",
      customer: "Paras",
      link: "Link",
      status: "Processed",
    },
    {
      id: "nk_QwubnU",
      date: "18-apr-25",
      amount: "₹ 0.00",
      reference: "yme44Link",
      customer: "Paras",
      link: "Link",
      status: "Processed",
    },
    {
      id: "nk_QwubnUz",
      date: "18-apr-25",
      amount: "₹ 0.00",
      reference: "yme44Link",
      customer: "Paras",
      link: "Link",
      status: "Expired",
    },
    {
      id: "nk_QwubnUz",
      date: "18-apr-25",
      amount: "₹ 0.00",
      reference: "yme44Link",
      customer: "Paras",
      link: "Link",
      status: "Processed",
    },
  ];
  return (
    <>
      <div id="myqrcodeprocess">
        <div className="get-started-wrapper">
          <h3 className="mb-5 text-left">Get Started</h3>
          <div className="steps-container">
            <div className="step-item">
              <div className="step-circle active"><span>1</span></div>
              <div className="step-content mt-3">
                <h6>Create Payment Page</h6>
                <p>Create a payment link instantly and notify your customer via sms or email.</p>
              </div>
            </div>
            <div className="step-line"></div>
            <div className="step-item">
              <div className="step-circle"><span>2</span></div>
              <div className="step-content mt-3">
                <h6>2. Receive Payments</h6>
                <p>Your customers can make domestic and international payments directly on the payment link.</p>
              </div>
            </div>
            <div className="step-item">
              <img src="../img/chiku.png" alt="Get Started" className="img-fluid mychiku" />
            </div>
          </div>
        </div>
      </div>
      <div id="payment-links">
        <div className="payment2-links">
          {/* Header */}
          <div className="header">
            {/* <h4 className="title">Payments Links</h4> */}
            <div className="right">
              <span className="tab">Payments Links</span>
            </div>


            <div id="righti">
              <span className="tabi">
                <i class="ri-settings-5-line"></i> Reminder Settings
              </span>
              <span className="tabi">
                <i class="ri-lightbulb-line"></i> Need Help ? take a tour
              </span>
              <span className="tabi">
                <i className="ri-file-list-3-line"></i> Documentation
              </span>

              <Link
                href="/paymentlinks/paymentlinkstart/paymentcreate" className="tabi"

              >
                <button className="create-btn">+ create payment link</button>
              </Link>

            </div>
          </div>

          {/* Form */}
          <div className="myfilters">
            <div className="filter-group">
              <label>Payment Link Status</label>
              <select className="form-select small-input">
                <option value="">Select Status</option>
              </select>
            </div>

            <div className="filter-group">
              <label>Payment Link Id</label>
              <input className="form-control small-input" type="text" placeholder="Payment Link Id" />
            </div>

            <div className="filter-group">
              <label>Batch Id</label>
              <input className="form-control small-input" type="text" placeholder="Batch Id" />
            </div>

            <div className="filter-group">
              <label>Reference Id</label>
              <input className="form-control small-input" type="text" placeholder="Reference Id" />
            </div>

            <div className="filter-group">
              <label>Customer Contact</label>
              <input className="form-control small-input" type="text" placeholder="Customer Contact" />
            </div>

            <div className="filter-group">
              <label>Customer Email</label>
              <input className="form-control small-input" type="email" placeholder="Customer Email" />
            </div>

            <div className="filter-group">
              <label>Notes</label>
              <input className="form-control small-input" type="text" placeholder="Notes" />
            </div>

            <div className="filter-group">
              <label>Count</label>
              <input className="form-control small-input" type="number" defaultValue="3" />
            </div>

            <div className="filter-group">
              <label>Payment Link Type</label>
              <select className="form-select small-input">
                <option value="">Select Type</option>
              </select>
            </div>

            <div id="myselecteddate">
              <select className="custom-select" id="rangeSelect">
                <option value="custom">Custom</option>
                <option value="7">Last 7 Days</option>
                <option value="30">Last 30 Days</option>
              </select>

              <div className="date-inputs">
                <input type="date" id="startDate" defaultValue="2025-07-20" />
                <span className="dash">—</span>
                <input type="date" id="endDate" defaultValue="2025-07-25" />
              </div>
            </div>

            {/* Buttons */}
            <div className="filter-buttons">
              <button className="search-btn">Search</button>
              <button className="clear-btn">Clear</button>
            </div>
          </div>


          <div className="table-responsive fade-in">
            <table className="table table-striped settlement-table">
              <thead>
                <tr>
                  <th>Payment Link Id</th>
                  <th>Created At</th>
                  <th>Amount</th>
                  <th>Reference Id</th>
                  <th>Customer</th>
                  <th>Payment Link</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {data.map((row, index) => (
                  <tr key={index}>
                    <td>{row.id}</td>
                    <td>{row.date}</td>
                    <td>{row.amount}</td>
                    <td>{row.reference}</td>
                    <td>{row.customer}</td>
                    <td className="link-text">{row.link}</td>
                    <td>
                      <span
                        className={`status-pill ${row.status === "Processed"
                          ? "green"
                          : row.status === "Expired"
                            ? "red"
                            : "orange"
                          }`}
                      >
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

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
