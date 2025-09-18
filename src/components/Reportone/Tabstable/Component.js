import { useState } from "react";

export default function SettlementPage() {
  const [activeTab, setActiveTab] = useState("settlements");

  const settlementsData = [
    {
      paymentId: "sst5656gg",
      bankRRN: "dvwew3rw34csd",
      customerDetail: "John Doe",
      createdOn: "Jul 14 2025, 05:04",
      amount: "₹ 1.16",
      status: "Processed",
    },
    {
      paymentId: "sst9656gg",
      bankRRN: "swdddcfed",
      customerDetail: "Jane Smith",
      createdOn: "Jul 14 2025, 05:04",
      amount: "₹ 1.16",
      status: "Processed",
    },
    {
      paymentId: "sst56222w",
      bankRRN: "AXIN0976913",
      customerDetail: "Alex Johnson",
      createdOn: "Jul 14 2025, 05:04",
      amount: "₹ 1.16",
      status: "Expired",
    },
    {
      paymentId: "sst2226gg",
      bankRRN: "AXISCN097691",
      customerDetail: "Sara Lee",
      createdOn: "Jul 14 2025, 05:04",
      amount: "₹ 1.16",
      status: "Processed",
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
        "Payment ID",
        "Bank RRN",
        "Customer detail",
        "Created on",
        "Amount",
        "Status",
        "Action",
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
    <div id="transaction-tables">
      {/* Tabs */}
      <div className="tabs">
        <button
          className={activeTab === "settlements" ? "tab active" : "tab"}
          onClick={() => setActiveTab("settlements")}
        >
          Payments
        </button>
        <button
          className={activeTab === "ondemand" ? "tab active" : "tab"}
          onClick={() => setActiveTab("ondemand")}
        >
          Orders
        </button>
      </div>

      {/* Filters */}
      <div className="a" id="kk">
        {activeTab === "settlements" ? (
          <div className="tmyflx">
            <div className="tran-one">
              <select className="form-select small-input">
                <option value="">Last 7 Days</option>
              </select>
              <select className="form-select small-input">
                <option value="">Status All</option>
              </select>
              <select className="form-select small-input">
                <option value="">Payment Method All</option>
              </select>
              <select className="form-select small-input">
                <option value="">Payment ID</option>
              </select>
            </div>
            <div className="tran-two">
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
                    <td>{row.paymentId}</td>
                    <td>{row.bankRRN}</td>
                    <td>{row.customerDetail}</td>
                    <td>{row.createdOn}</td>
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
                    <td>
                      <button className="details-btn">Details</button>
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
                        className={`status-pill ${
                          row.status === "Processed"
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
      </div>
    </div>
  );
}
