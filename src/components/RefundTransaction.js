import Link from 'next/link';
import { useState, useRef } from 'react';
import { useEffect } from "react";
import "@/styles/refundPayment.css";


const Credit = () => {
  const [activeTab, setActiveTab] = useState("settlements");

  const settlementsData = [
    {
      refundId: 1,
      paymentId: "5656gg",
      createdOn: "18-apr-25",
      amount: "₹ 0.00",
      status: "Active",
    },
    {
      refundId: 2,
      paymentId: "9656gg",
      createdOn: "18-apr-25",
      amount: "₹ 0.00",
      status: "Active",
    },
    {
      refundId: 3,
      paymentId: "56222w",
      createdOn: "18-apr-25",
      amount: "₹ 0.00",
      status: "Active",
    },
    {
      refundId: 4,
      paymentId: "2226gg",
      createdOn: "18-apr-25",
      amount: "₹ 0.00",
      status: "Active",
    },
  ];


  const ondemandData = [
    {
      orderId: "ond1111",
      amount: "₹ 10.00",
      attempts: 2,
      receipt: "RCT12345",
      createdAt: "Jul 12 2025, 03:22",
      status: "Processed",
    },
    {
      orderId: "ond2222",
      amount: "₹ 5.50",
      attempts: 1,
      receipt: "RCT54321",
      createdAt: "Jul 11 2025, 07:15",
      status: "Failed",
    },
  ];

  const getTableHeaders = () => {
    if (activeTab === "settlements") {
      return [
        "Refund ID",
        "Payment ID",
        "Created on",
        "Amount",
        "Status",
      ];
    } else {
      return [
        "Order Id",
        "Amount",
        "Attempts",
        "Receipt",
        "Created At",
        "Status",
      ];
    }
  };


  const getTableData = () =>
    activeTab === "settlements" ? settlementsData : ondemandData;


  return (
    <>
      {/* Notification Banner */}


      {/* Settlement Section */}
      <div id="refund-payment">
        {/* Top Navigation */}
        <div className="top-bar">
          <div className="leftii">
            <span className="tableu">Refunds  
              <select className='form-select myselectrefund'>
              <option>Today</option>
              <option>Today</option>
              <option>Today</option>
            </select>
            </span>
            
          </div>

        </div>

        {/* Cards */}
        <div className="overview-cards">

          <div className="card">

            <div className='card-content'>
              <h5 className="d-flex align-items-center gap-2">
                Refunded <i className="ri-information-line" title="Enter your title here"></i>
              </h5>

              <span className="card-amount">₹0.00</span>
              <span className="card-subtext">0 processed</span>
            </div>
          </div>
          <div className="card">
            <div className='card-content'>
              <h5 className="d-flex align-items-center gap-2">Processing <i className="ri-information-line" title="Enter your title here"></i>  </h5>
              <span className="card-amount">₹0.00</span>
              <span className="card-subtext">0 open &nbsp; 0 under-review</span>
            </div>
          </div>

          <div className="card">
            <div className='card-content'>
              <h5 className="d-flex align-items-center gap-2">Failed <i className="ri-information-line" title="Enter your title here" ></i>  </h5>
              <span className="card-amount">0</span>
              <span className="card-subtext">Payments</span>
            </div>
          </div>
        </div>

      </div>
      <div className='mysiderr'>

        <div id="transaction-tables" >
          {/* Tabs */}
          <div className="tabs">
            <button
              className={activeTab === "settlements" ? "tab active" : "tab"}
              onClick={() => setActiveTab("settlements")}
            >
              Refunds
            </button>
            <button
              className={activeTab === "ondemand" ? "tab active" : "tab"}
              onClick={() => setActiveTab("ondemand")}
            >
              Batch Refunds
            </button>
          </div>

          {/* Filters */}
          <div className="a" id="kk">
            {activeTab === "settlements" ? (
              <div className="trans-filters">
                <div className="tran-one">

                  <select className="form-select my1-input">
                    <option value="">Last 7 Days</option>
                  </select>


                  <select className="form-select my1-input">
                    <option value="">Select All</option>
                  </select>
                  
                </div>
                <div className="tran-two mtone">
                  <select className="form-select my1-input">
                    <option value="">Refund ID</option>
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
            ) : (
              <div className="myfilters">
                <div className="filter-group">
                  <label>Order ID</label>
                  <input
                    className="form-control small-input"
                    type="text"
                    placeholder="Settlement ID"
                  />
                </div>
                <div className="filter-group">
                  <label>Receipt</label>
                  <input
                    className="form-control small-input"
                    type="text"
                    placeholder="Receipt"
                  />
                </div>
                <div className="filter-group">
                  <label>Status</label>
                  <select className="form-select small-input">
                    <option value="">Select Status</option>
                  </select>
                </div>
                <div className="filter-group">
                  <label>Count</label>
                  <input
                    className="form-control small-input"
                    type="number"
                    placeholder="Count"
                  />
                </div>
                <div className="filter-buttons">
                  <button className="search-btn">Search</button>
                  <button className="clear-btn">Clear</button>
                </div>
              </div>
            )}
          </div>

          {/* Table */}
          <div className="table-responsive fade-in">
            <table className="table table-striped settlement-table">
              <thead>
                <tr>
                  {getTableHeaders().map((header, index) => (
                    <th key={index}>{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {getTableData().map((row, index) => (
                  <tr key={index}>
                    {activeTab === "settlements" ? (
                      <>
                        <td>{row.refundId}</td>
                        <td>{row.paymentId}</td>
                        <td>{row.createdOn}</td>
                        <td>{row.amount}</td>
                        <td>
                          <span

                          >
                            {row.status}
                          </span>
                        </td>
                      </>
                    ) : (
                      <>
                        <td>{row.orderId}</td>
                        <td>{row.amount}</td>
                        <td>{row.attempts}</td>
                        <td>{row.receipt}</td>
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
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
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
                {/* Pagination */}
        
        
      </div>

    </>
  );
};

export default Credit;
