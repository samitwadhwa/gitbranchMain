import { useState } from "react";
import Link from "next/link";

export default function SettlementPage() {
  const [activeTab, setActiveTab] = useState("settlements");

  const settlementsData = [
    {
      createdOn: "Jul 14 2025, 05:04",
      settlementId: "sst5656gg",
      utrNumber: "dvwew3rw34csd",
      netSettlement: "₹ 1.16",
      status: "Processed",
    },
    
    {
      createdOn: "Jul 14 2025, 05:04",
      settlementId: "sst9656gg",
      utrNumber: "swdddcfed",
      netSettlement: "₹ 1.16",
      status: "Processed",
    },
    {
      createdOn: "Jul 14 2025, 05:04",
      settlementId: "sst56222w",
      utrNumber: "AXIN0976913",
      netSettlement: "₹ 1.16",
      status: "Expired",
    },
    {
      createdOn: "Jul 14 2025, 05:04",
      settlementId: "sst2226gg",
      utrNumber: "AXISCN097691",
      netSettlement: "₹ 1.16",
      status: "Processed",
    },
  ];

  const ondemandData = [
    {
      settlementId: "ond1111",
      requestedAmount: "₹ 12.00",
      settledAmount: "₹ 10.00",
      type: "Manual",
      createdAt: "Jul 12 2025, 03:22",
      status: "Processed",
    },
    {
      settlementId: "ond2222",
      requestedAmount: "₹ 7.00",
      settledAmount: "₹ 5.50",
      type: "Auto",
      createdAt: "Jul 11 2025, 07:15",
      status: "Failed",
    },
  ];

  const getTableData = () =>
    activeTab === "settlements" ? settlementsData : ondemandData;

  return (
    <div id="settlements-tables">
      {/* Tabs */}
      <div className="tabs">
        <button
          className={activeTab === "settlements" ? "tab active" : "tab"}
          onClick={() => setActiveTab("settlements")}
        >
          Settlements
        </button>
        <button
          className={activeTab === "ondemand" ? "tab active" : "tab"}
          onClick={() => setActiveTab("ondemand")}
        >
          Ondemand Settlements
        </button>
      </div>

     
      <div className="filters">
        {activeTab === "settlements" ? (
          <>
            <input
              className="form-control small-input"
              type="date"
              placeholder="Duration"
            />
            <input
              className="form-control small-input"
              type="text"
              placeholder="UTR number"
            />
            <input
              className="form-control small-input"
              type="text"
              placeholder="Settlement ID"
            />
            <input
              className="form-control small-input"
              type="text"
              placeholder="Status"
            />
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
        <button className="search-btn">Search</button>
        <button className="clear-btn">Clear</button>
      </div>

      {/* Table */}
      <div className="table-responsive fade-in">
        <table className="table table-striped settlement-table">
          <thead>
            {activeTab === "settlements" ? (
              <tr>
                <th>Created on</th>
                <th>Settlement ID</th>
                <th>UTR number</th>
                <th>Net settlement</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            ) : (
              <tr>
                <th>Settlement ID</th>
                <th>Requested Amount</th>
                <th>Settled Amount</th>
                <th>Type</th>
                <th>Created At</th>
                <th>Status</th>
              </tr>
            )}
          </thead>
          <tbody>
            {getTableData().map((row, index) => (
              <tr key={index}>
                {activeTab === "settlements" ? (
                  <>
                    <td>{row.createdOn}</td>
                    <td>{row.settlementId}</td>
                    <td>{row.utrNumber}</td>
                    <td>{row.netSettlement}</td>
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
                      <Link href="/settlement/details"> <button className="details-btn">Details</button></Link>
                    </td>
                  </>
                ) : (
                  <>
                    <td>{row.settlementId}</td>
                    <td>{row.requestedAmount}</td>
                    <td>{row.settledAmount}</td>
                    <td>{row.type}</td>
                    <td>{row.createdAt}</td>
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
                  </>
                )}
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
  );
}
