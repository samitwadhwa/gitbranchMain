import Link from "next/link";
import { useState, useRef } from "react";
import { useEffect } from "react";
import "@/styles/dispute.css";

const PaymentFail = () => {
  const [activeTab, setActiveTab] = useState("settlements");

  const settlementsData = [
    {
      disputeId: "DSPT_001",
      paymentId: "pay_R7Wlfhs25tlkN7",
      amount: "₹ 2,500.00",
      type: "Chargeback",
      respondBy: "Sep 02, 2025",
      createdAt: "Aug 20, 2025",
      status: "Failed",
    },
    {
      disputeId: "DSPT_002",
      paymentId: "pay_R6QPbrDjF7rPAh",
      amount: "₹ 1,200.00",
      type: "Refund",
      respondBy: "Sep 05, 2025",
      createdAt: "Aug 22, 2025",
      status: "Processed",
    },
    {
      disputeId: "DSPT_002",
      paymentId: "pay_R6QPbrDjF7rPAh",
      amount: "₹ 1,200.00",
      type: "Refund",
      respondBy: "Sep 05, 2025",
      createdAt: "Aug 22, 2025",
      status: "Processed",
    },
    {
      disputeId: "DSPT_002",
      paymentId: "pay_R6QPbrDjF7rPAh",
      amount: "₹ 1,200.00",
      type: "Refund",
      respondBy: "Sep 05, 2025",
      createdAt: "Aug 22, 2025",
      status: "Failed",
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
      

      <div id="payment-fail-table">
        {/* Tabs */}
        <div className="tabs">
          <div className="tab-active">Disputes</div>
        </div>

        <div className="filters">
          {activeTab === "settlements" ? (
            <>
              <div>
                <label>Dispute Id</label>
                <input
                  className="form-control small-input"
                  type="text"
                  placeholder="Type Here"
                />
              </div>
              <div>
                <label>Payment Id</label>
                <input
                  className="form-control small-input"
                  type="text"
                  placeholder="Type Here"
                />
              </div>
              <div>
                <label>Dispute Id</label>
                <div id="myselecteddate" className="myslt mt-2">
                  <select className="custom-select" id="rangeSelect">
                    <option value="custom">Custom</option>
                    <option value="7">Last 7 Days</option>
                    <option value="30">Last 30 Days</option>
                  </select>

                  <div className="date-inputs">
                    <input
                      type="date"
                      id="startDate"
                      defaultValue="2025-07-20"
                    />
                    <span className="dash">—</span>
                    <input type="date" id="endDate" defaultValue="2025-07-25" />
                  </div>
                </div>
              </div>

              <div>
                <label>Dispute Type</label>
                <select className="form-select small-input">
                  <option>Type Here</option>
                  <option value="Processed">Processed</option>
                  <option value="Expired">Expired</option>
                  <option value="Failed">Failed</option>
                </select>
              </div>
              <div>
                <label>Dispute Search</label>
                <select className="form-select small-input">
                  <option>Type Here</option>
                  <option value="Processed">Processed</option>
                  <option value="Expired">Expired</option>
                  <option value="Failed">Failed</option>
                </select>
              </div>
              <button className="search-btn searchji ">Search</button>
              <button className="clear-btn">Clear</button>


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
                <th>Dispute Id</th>
                <th>Payment Id</th>
                <th>Amount</th>
                <th>Type</th>
                <th>Respond By</th>
                <th>Created At</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {getTableData().map((row, index) => (
                <tr key={index}>
                  <td>{row.disputeId}</td>
                  <td>{row.paymentId}</td>
                  <td>{row.amount}</td>
                  <td>{row.type}</td>
                  <td>{row.respondBy}</td>
                  <td>{row.createdAt}</td>
                  <td>
                    <span
                      className={`status-pill ${row.status === "Processed"
                          ? "green"
                          : row.status === "Failed"
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
