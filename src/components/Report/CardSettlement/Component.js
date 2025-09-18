import Link from "next/link";
import { useState, useRef } from "react";
import ReportScheduleModal from "../../ReportScheduleModal";
import DownloadReportModal from "../../DownloadReportModal";
//

const Credit = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [open, setOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const schedulesData = [
  {
    name: "Weekly Settlement Report",
    format: "CSV",
    email: "finance@company.com",
    status: "Active",
    statusColor: "green",
    repeatOn: "Every Monday",
    actions: ["Modify", "Pause", "Delete"],
  },
  {
    name: "Daily Orders Report",
    format: "Excel",
    email: "ops@company.com",
    status: "Paused",
    statusColor: "orange",
    repeatOn: "Every Day",
    actions: ["Modify", "Resume", "Delete"],
  },
  {
    name: "Monthly Recon Report",
    format: "PDF",
    email: "audit@company.com",
    status: "Expired",
    statusColor: "red",
    repeatOn: "1st of Month",
    actions: ["Modify", "Pause", "Delete"],
  },
];

  return (
    <>
      {/* Notification Banner */}
      <div id="reportonr">
        <div className="myfirst">
          <i className="ri-notification-3-line"></i>
        </div>
        <div className="myfirst2">
          <h3>Scheduled settlement will be skipped</h3>
          <p>
            Since you do not have enough current balance, your 5pm scheduled
            settlement will be skipped
          </p>
        </div>
        {/* <button className="myport">Schedule </button> */}
      </div>

      <div id="myreporton">
        <div className="custom-tabs-container">
          {/* Left side tabs */}
          <div className="custom-tab-list">
            <div
              className={`custom-tab-item ${
                activeTab === "overview" ? "active" : ""
              }`}
              onClick={() => setActiveTab("overview")}
            >
              Overview
            </div>
            <div
              className={`custom-tab-item ${
                activeTab === "downloads" ? "active" : ""
              }`}
              onClick={() => setActiveTab("downloads")}
            >
              Downloads
            </div>
            <div
              className={`custom-tab-item ${
                activeTab === "schedules" ? "active" : ""
              }`}
              onClick={() => setActiveTab("schedules")}
            >
              Schedules
            </div>
          </div>

          {/* Right side content */}
          <div className="custom-tab-content">
            {activeTab === "overview" && (
              <>
                <h3>
                  Generate & schedule reports for all your business
                  transactions, settlements & subscription
                </h3>
                <p>
                  All your products reports in one place, now with new and
                  better interface.
                </p>
                <div className="rightside">
                  <button
                    className="btn-primary"
                    onClick={() => setOpen(true)}
                    style={{ cursor: "pointer" }}
                  >
                    Schedule Report
                  </button>
                  <ReportScheduleModal
                    show={open}
                    onClose={() => setOpen(false)}
                  />
                  <button
                    className="btn-outline"
                    onClick={() => setIsOpen(true)}
                    style={{ cursor: "pointer" }}
                  >
                    Download Report
                  </button>
                </div>
              </>
            )}
            {activeTab === "downloads" && (
  <div className="downloads-section">
    {/* Header Row */}
   

    {/* Action Row */}
    <div className="downloads-actions">
      <button className="btn-primary "  onClick={() => setIsOpen(true)}
                    style={{ cursor: "pointer" }}>
        <i className="ri-download-line"></i> Download Report
      </button>
      <select className="filter-dropdown form-select my2-input">
        <option>Date - Newest</option>
        <option>Date - Oldest</option>
      </select>
    </div>

    {/* Table */}
    <div className="downloads-table-wrapper">
      <table className="downloads-table">
        <thead>
          <tr>
            <th>Duration Covered</th>
            <th>Name</th>
            <th>Format</th>
            <th>Email</th>
            <th>Status</th>
            <th>Download</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              Jul 22, 2025 (12:00 AM) – <br />
              Jul 29, 2025 (12:22 PM)
            </td>
            <td>Settlements</td>
            <td>csv</td>
            <td>zapnowofficial@gmail.com</td>
            <td>
              <span className="status-badge">No Data</span>
            </td>
            <td>-</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
)}

           {activeTab === "schedules" && (
  <div className="schedules-section">
   
   

    {/* Action Row */}
    <div className="schedules-actions">
      <button className="btn-primary"   onClick={() => setOpen(true)}
                    style={{ cursor: "pointer" }}>
        <i className="ri-file-list-line"></i> Create Schedule
      </button>
       <ReportScheduleModal
                    show={open}
                    onClose={() => setOpen(false)}
                  />
      <select className="filter-dropdown form-select my2-input">
        <option>Date - Newest</option>
        <option>Date - Oldest</option>
      </select>
    </div>

    {/* Table */}
    <div className="schedules-table-wrapper">
      <table className="schedules-table">
        <thead>
          <tr>
            <th>Schedule &amp; Report Name</th>
            <th>Format</th>
            <th>Email</th>
            <th>Status</th>
            <th>Repeat On</th>
            <th>Actions</th>
            <th>View Activity</th>
          </tr>
        </thead>
        <tbody>
          {schedulesData.map((row, index) => (
            <tr key={index}>
              <td>{row.name}</td>
              <td>{row.format}</td>
              <td>{row.email}</td>
              <td>
                <span className={`status-pill ${row.statusColor}`}>
                  {row.status}
                </span>
              </td>
              <td>{row.repeatOn}</td>
              <td>
                <select className="form-select">
                  {row.actions.map((action, i) => (
                    <option key={i}>{action}</option>
                  ))}
                </select>
              </td>
              <td>
                <button className="table-btn">View</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

  </div>
)}

          </div>
        </div>
      </div>

      <DownloadReportModal show={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};

export default Credit;
