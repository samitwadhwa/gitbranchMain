import Link from "next/link";
import { useState, useRef } from "react";
import { useEffect } from "react";
import "@/styles/paymentFail.css";

const PaymentFail = () => {
  const [activeTab, setActiveTab] = useState("settlements");

  const settlementsData = [
    {
      amount: "₹ 0.00",
      status: "Processed",
      reason: "Everyone",
      customerDetail: "crafted for designers",
      paymentId: "cgzQbgRnJVw",
      bankRrn: "Active",
      createdOn: "18-Apr-25",
    },
    {
      amount: "₹ 0.00",
      status: "Processed",
      reason: "Everyone",
      customerDetail: "crafted for designers",
      paymentId: "cgzQbgRnJVw",
      bankRrn: "Active",
      createdOn: "18-Apr-25",
    },
    {
      amount: "₹ 0.00",
      status: "Expired",
      reason: "Everyone",
      customerDetail: "crafted for designers",
      paymentId: "cgzQbgRnJVw",
      bankRrn: "Active",
      createdOn: "18-Apr-25",
    },
    {
      amount: "₹ 0.00",
      status: "Processed",
      reason: "Everyone",
      customerDetail: "crafted for designers",
      paymentId: "cgzQbgRnJVw",
      bankRrn: "Active",
      createdOn: "18-Apr-25",
    },
  ];

  const getTableData = () => settlementsData;

  useEffect(() => {
    const rangeSelect = document.getElementById("rangeSelect");
    const startDate = document.getElementById("startDate");
    const endDate = document.getElementById("endDate");

    function formatDate(date) {
      return date.toISOString().split("T")[0];
    }

    function getDateDiffInDays(start, end) {
      const oneDay = 1000 * 60 * 60 * 24;
      return Math.round((end - start) / oneDay);
    }

    function updateCustomLabel() {
      const start = new Date(startDate.value);
      const end = new Date(endDate.value);

      if (!isNaN(start) && !isNaN(end) && end >= start) {
        const diffDays = getDateDiffInDays(start, end) + 1;
        let label = `Custom (${diffDays} days)`;

        if (diffDays >= 28 && diffDays <= 31) {
          label = "Custom (1 month)";
        } else if (diffDays > 31) {
          const months = Math.floor(diffDays / 30);
          label = `Custom (${months} months)`;
        }

        rangeSelect.options[0].text = label;
        rangeSelect.value = "custom";
      }
    }

    rangeSelect.addEventListener("change", function () {
      const today = new Date();
      let pastDate = new Date();

      if (this.value === "7") {
        pastDate.setDate(today.getDate() - 6);
        startDate.value = formatDate(pastDate);
        endDate.value = formatDate(today);
      } else if (this.value === "30") {
        pastDate.setDate(today.getDate() - 29);
        startDate.value = formatDate(pastDate);
        endDate.value = formatDate(today);
      }
    });

    startDate.addEventListener("change", updateCustomLabel);
    endDate.addEventListener("change", updateCustomLabel);

    return () => {
      rangeSelect.replaceWith(rangeSelect.cloneNode(true));
      startDate.replaceWith(startDate.cloneNode(true));
      endDate.replaceWith(endDate.cloneNode(true));
    };
  }, []);
  return (
    <>
      {/* Notification Banner */}

      {/* Settlement Section */}
      <div id="Payment-Fail">
        {/* Top Navigation */}
        <div className="top-bar">
          <div className="left">
            <span className="tab">Failed</span>

            <button className="refresh">Last 30 days </button>
            <div className="right">
              <span className="tab">100% success rate</span>
              <span className="tab">View Dashboard</span>
            </div>
          </div>
        </div>

        {/* Cards */}
        <div className="cards">
          <div className="card2">
            <p className="label">Current Balance</p>
            <p className="value">₹45</p>
            <a href="#" className="link">
              Settle Now
            </a>
          </div>

          <div className="card2">
            <p className="label">Settlement due today</p>
            <p className="value">₹0</p>
          </div>

          <div className="card2">
            <p className="label">Previous settlement</p>
            <p className="value">₹36</p>
            <p className="status">Processed</p>
          </div>

          <div className="card2">
            <p className="label">Upcoming settlement</p>
            <p className="value">322</p>
          </div>
        </div>
      </div>

      <div id="payment-fail-table">
        {/* Tabs */}
        <div className="tabs">
          <div className="tab-active">Failed payments</div>
        </div>

        <div className="filters">
          {activeTab === "settlements" ? (
            <>
              <div id="myselecteddate">
                <select className=" custom-select" id="rangeSelect">
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
              <select className="form-select small-input " id="rangeSelect">
                <option value="custom">Payment Method All</option>
                <option value="7">Last 7 Days</option>
                <option value="30">Last 30 Days</option>
              </select>
              <select className=" small-input form-select" id="rangeSelect">
                <option value="custom">Payment ID</option>
                <option value="7">Last 7 Days</option>
                <option value="30">Last 30 Days</option>
              </select>
            </>
          ) : (
            <>
              <input
                className="form-control small-input"
                type="text"
                placeholder="Settlement ID"
              />
              <select className="form-select small-input">
                <option value="">Select Status</option>
                <option value="Processed">Processed</option>
                <option value="Expired">Expired</option>
                <option value="Failed">Failed</option>
              </select>
              <input
                className="form-control small-input"
                type="number"
                placeholder="Count"
              />
            </>
          )}
        </div>

        {/* Table */}
        <div className="table-responsive fade-in">
          <table className="table table-striped settlement-table">
            <thead>
              <tr>
                <th>Amount</th>
                <th>Status</th>
                <th>Reason</th>
                <th>Customer detail</th>
                <th>Payment ID</th>
                <th>Bank RRN</th>
                <th>Created on</th>
              </tr>
            </thead>
            <tbody>
              {getTableData().map((row, index) => (
                <tr key={index}>
                  <td>{row.amount}</td>
                  <td>
                    <span
                      className={`status-pill ${
                        row.status === "Processed"
                          ? "green"
                          : row.status === "Expired"
                          ? "red"
                          : "orange"
                      }`}
                    >
                      {row.status}
                    </span>
                  </td>
                  <td>{row.reason}</td>
                  <td>{row.customerDetail}</td>
                  <td>{row.paymentId}</td>
                  <td>{row.bankRrn}</td>
                  <td>{row.createdOn}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
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
          <div className="under_pagination">
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

export default PaymentFail;
