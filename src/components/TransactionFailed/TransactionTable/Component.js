import Link from "next/link";
import { useState, useRef } from "react";
import { useEffect } from "react";
import "@/styles/paymentFail.css";

const PaymentFail = () => {
  const [activeTab, setActiveTab] = useState("settlements");

  const settlementsData = [
    {
      amount: "₹ 114.00",
      status: "Expired",
      reason: "Customer drop-offs",
      phone: "+91 9868 243633",
      email: "ram@gmail.com",
      paymentId: "pay_R7Wlfhs25tlkN7",
      bankRrn: "-- UPI",
      createdOn: "Wed Aug 20, 1:47pm",
    },
    {
      amount: "₹ 14,846.00",
      status: "Processed",
      reason: "Customer drop-offs",
      phone: "+91 8745 027387",
      email: "kumar.vikash@gmail.com",
      paymentId: "pay_R6QPbrDjF7rPAh",
      bankRrn: "-- UPI",
      createdOn: "Sun Aug 17, 7:23pm",
    },
    {
      amount: "₹ 14,846.00",
      status: "Expired",
      reason: "Customer drop-offs",
      phone: "+91 8745 027387",
      email: "kumar.vikash@gmail.com",
      paymentId: "pay_R6QPbrDjF7rPAh",
      bankRrn: "-- UPI",
      createdOn: "Sun Aug 17, 7:23pm",
    },

    {
      amount: "₹ 14,846.00",
      status: "Failed",
      reason: "Customer drop-offs",
      phone: "+91 8745 027387",
      email: "kumar.vikash@gmail.com",
      paymentId: "pay_R6QPbrDjF7rPAh",
      bankRrn: "-- UPI",
      createdOn: "Sun Aug 17, 7:23pm",
    },
    {
      amount: "₹ 14,846.00",
      status: "Processed",
      reason: "Customer drop-offs",
      phone: "+91 8745 027387",
      email: "kumar.vikash@gmail.com",
      paymentId: "pay_R6QPbrDjF7rPAh",
      bankRrn: "-- UPI",
      createdOn: "Sun Aug 17, 7:23pm",
    },
  ];

  const getTableData = () => settlementsData;

  return (
    <>
      <div id="transaction-failure">
        {/* Tabs */}
        <div className="tabs">
          <div className="tab-active">Failed payments</div>
        </div>

        <div className="fil-ters">
          {activeTab === "settlements" ? (
            <>
              {/* <div className="top-bar"> */}
              <div className="left">
                <select className="form-select" id="dateRange">
                  <option value="7">Last 7 Days</option>
                  <option value="30">Last 30 Days</option>
                </select>

                <select className="form-select" id="paymentMethod">
                  <option value="custom">Payment Method All</option>
                  <option value="upi">UPI</option>
                  <option value="card">Card</option>
                </select>


              </div>

              <div className="right">
                <div className="tran-two mtone">
                  <select className="form-select" id="paymentMethodAll">
                    <option value="custom">Payment ID</option>
                    <option value="cash">Cash</option>
                    <option value="netbanking">Net Banking</option>
                  </select>
                  <div className="admin-reportone_search">
                    <form action="#">
                      <center>
                        <div className="admin-fsearch-container">
                          <input
                            type="text"
                            className="admin-fsearch-input"
                            placeholder="Search..."
                          />
                          <span className="admin-fsearch-icon">
                            <button type="submit" className="admin-srch">
                              <i className="ri-search-line admin-fsrch_icn"></i>
                            </button>
                          </span>
                        </div>
                      </center>
                    </form>
                  </div>
                </div>
              </div>

              {/* </div> */}
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
      <th></th>
    </tr>
  </thead>
  <tbody>
    {getTableData().map((row, index) => (
      <tr key={index}>
        <td>{row.amount}</td>

        {/* Status with class-based colors */}
        <td>
          <span
            className={`status-pill ${
              row.status === "Processed"
                ? "green"
                : row.status === "Failed"
                ? "red"
                : row.status === "Expired"
                ? "orange"
                : "blue"
            }`}
          >
            {row.status}
          </span>
        </td>

        <td>{row.reason}</td>

        {/* Customer detail: phone + email */}
        <td>
          <div className="customer-detail">
            <div>{row.phone}</div>
            <small className="text-muted">{row.email}</small>
          </div>
        </td>

        <td>{row.paymentId}</td>
        <td>{row.bankRrn}</td>
        <td>{row.createdOn}</td>

        {/* Details link */}
        <td>
          <Link href="/transaction/failed/details" className="details-link">
            Details &gt;
          </Link>
        </td>
      </tr>
    ))}
  </tbody>
</table>
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

       
      </div>
    </>
  );
};

export default PaymentFail;
