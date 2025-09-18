"use client";
import { useRef, useEffect, useState } from "react";
import "@/styles/route.css";

export default function DashboardTabs() {
  const [activeTab, setActiveTab] = useState("payments");
  const [isTourModalOpen, setIsTourModalOpen] = useState(false);

  // Batch Dropdown & Modals
  const [showBatchDropdown, setShowBatchDropdown] = useState(false);
  const [showTransfersModal, setShowTransfersModal] = useState(false);
  const [showReversalsModal, setShowReversalsModal] = useState(false);
  const [showLinkedAccountsModal, setShowLinkedAccountsModal] = useState(false);

  // OTP state for Linked Accounts modal
  const [otp, setOtp] = useState(new Array(6).fill("")); // 6-digit OTP
  const [otpTimer, setOtpTimer] = useState(5); // in minutes
  const [resendTimer, setResendTimer] = useState(20); // in seconds


  const handleFileUpload = (file) => {
  console.log("Uploaded file:", file);
  // You can now process the file
};

  const handleOtpChange = (value, index) => {
    if (/^\d?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // auto-focus next input
      if (value && index < otp.length - 1) {
        document.querySelectorAll(".otp-input")[index + 1].focus();
      }
    }
  };

  const handleConfirmOtp = () => {
    const enteredOtp = otp.join("");
    console.log("Entered OTP:", enteredOtp);
    // Add OTP verification API logic here
  };

  const handleResendOtp = () => {
    setResendTimer(20);
    console.log("Resent OTP");
    // Add OTP resend API logic here
  };

  // Countdown timers
  useEffect(() => {
    const otpInterval = setInterval(() => {
      setOtpTimer(prev => (prev > 0 ? prev - 1 : 0));
    }, 60000); // 1 min

    const resendInterval = setInterval(() => {
      setResendTimer(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000); // 1 sec

    return () => {
      clearInterval(otpInterval);
      clearInterval(resendInterval);
    };
  }, []);

  const dropdownRef = useRef(null);

  // Close dropdown if clicked outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowBatchDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownRef]);

  // Dummy data
  const [paymentsData] = useState([
    { id: "P001", bankRRN: "RRN123", customer: "Alice", amount: 1000, status: "Success" },
    { id: "P002", bankRRN: "RRN124", customer: "Bob", amount: 500, status: "Failed" },
    { id: "P003", bankRRN: "RRN123", customer: "Alice", amount: 1000, status: "Success" },
    { id: "P004", bankRRN: "RRN124", customer: "Bob", amount: 500, status: "Failed" },
  ]);

  const [transfersData] = useState([
    { id: "T001", source: "Account1", recipient: "Account2", amount: 200 },
    { id: "T002", source: "Account3", recipient: "Account4", amount: 350 },
  ]);

  const [reversalsData] = useState([
    { id: "R001", transferId: "T001", amount: 200 },
    { id: "R002", transferId: "T002", amount: 350 },
  ]);

  const [accountsData, setAccountsData] = useState([
    { id: "A001", email: "alice@example.com", name: "Alice", status: "Active", dashboardAccess: true, allowRefunds: true, count: 5 },
    { id: "A002", email: "bob@example.com", name: "Bob", status: "Inactive", dashboardAccess: false, allowRefunds: false, count: 3 },
    { id: "A003", email: "alice@example.com", name: "Alice", status: "Active", dashboardAccess: true, allowRefunds: true, count: 5 },
    { id: "A004", email: "bob@example.com", name: "Bob", status: "Inactive", dashboardAccess: false, allowRefunds: false, count: 3 },
  ]);

  const [batchData] = useState([
    { id: "B001", name: "Batch1", count: 10, status: "Processed" },
    { id: "B002", name: "Batch2", count: 5, status: "Pending" },
  ]);

  // Handlers for accounts select boxes
  const handleDashboardAccessChange = (index, value) => {
    const updated = [...accountsData];
    updated[index].dashboardAccess = value;
    setAccountsData(updated);
  };

  const handleAllowRefundsChange = (index, value) => {
    const updated = [...accountsData];
    updated[index].allowRefunds = value;
    setAccountsData(updated);
  };

  // CSV Export Function
  const exportCSV = () => {
    const header = ["Account Id", "Account Email", "Count"];
    const rows = accountsData.map(acc => [acc.id, acc.email, acc.count]);
    const csvContent = [header, ...rows].map(e => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", "accounts.csv");
    link.click();
  };

  return (

    <>
    {/* Get Started Section */}
      <div id="myqrcodeprocess">
        <div className="get-started-wrapper">
          <h3 className="mb-5 text-left">Get Started</h3>
          <div className="steps-container">
            <div className="step-item">
              <div className="step-circle active"><span>1</span></div>
              <div className="step-content mt-3">
                <h6>Create a Linked Account</h6>
                <p>Easily add your vendor/seller/service provider account details as a linked account.</p>
              </div>
            </div>
            <div className="step-line"></div>
            <div className="step-item">
              <div className="step-circle"><span>2</span></div>
              <div className="step-content mt-3">
                <h6>Initiate transfers</h6>
                <p>Initiate the payment to be transferred to a linked account from your transactions.</p>
              </div>
            </div>
            <div className="step-item">
              <img src="./img/chiku.png" alt="Get Started" className="img-fluid mychiku" />
            </div>
          </div>
        </div>
      </div>
    
    <div id="myroute">
      <div className="container py-3">

        {/* Tabs */}
        <div className="hender">
          <div className="tabs">
            {["payments", "transfers", "reversals", "accounts", "batchupload"].map((tab) => (
              <button
                key={tab}
                className={activeTab === tab ? "tab active" : "tab"}
                onClick={() => setActiveTab(tab)}
              >
                {tab === "payments" && "Payments"}
                {tab === "transfers" && "Transfers"}
                {tab === "reversals" && "Reversals"}
                {tab === "accounts" && "Accounts"}
                {tab === "batchupload" && "Batch Upload"}
              </button>
            ))}
          </div>

          {/* Right side actions */}
          <div id="righti">
            <span className="tabi" onClick={() => setIsTourModalOpen(true)} style={{ cursor: "pointer" }}>
              <i className="ri-lightbulb-line"></i> Need Help ? take a tour
            </span>

            <span className="tabi"><i className="ri-file-list-3-line"></i> Documentation</span>

            {activeTab === "accounts" && (
              <span className="tabi">
                <button className="create-btn" onClick={() => setShowLinkedAccountsModal(true)}>+ Add Account</button>
                <button className="create-btn" onClick={exportCSV}>Export All (CSV)</button>
              </span>
            )}

            {activeTab === "batchupload" && (
              <span className="tabi batch-dropdown-wrapper" ref={dropdownRef}>
                <button className="create-btn" onClick={() => setShowBatchDropdown(!showBatchDropdown)}>
                  Upload New Batch
                </button>
                {showBatchDropdown && (
                  <div className="batch-dropdown">
                    <div onClick={() => { setShowTransfersModal(true); setShowBatchDropdown(false); }}>
                      1 Transfers<br /><small>Create transfers in batch</small>
                    </div>
                    <div onClick={() => { setShowReversalsModal(true); setShowBatchDropdown(false); }}>
                      2 Reversals<br /><small>Create reversals in batch</small>
                    </div>
                    <div onClick={() => { setShowLinkedAccountsModal(true); setShowBatchDropdown(false); }}>
                      3 Linked accounts<br /><small>Create linked accounts in a batch</small>
                    </div>
                  </div>
                )}
              </span>
            )}
          </div>

        </div>

        {/* Filters */}
        <div className="myfiltersty">
          {activeTab === "payments" && (
            <>
              <div className="tmyflx">
                <div className="tran-one">
                  <select className="form-select  my1-input">
                    <option value="">Last 7 Days</option>
                    <option value="">Last 7 Days</option>
                    <option value="">Last 7 Days</option>
                  </select>
                  <select className="form-select my1-input">
                    <option value="">Status All</option>
                  </select>
                  <select className="form-select my1-input">
                    <option value="">Payment Method All</option>
                  </select>

                </div>
                <div className="tran-two mtone">
                  <select className="form-select my1-input">
                    <option value="">Payment ID</option>
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
            </>
          )}

          {activeTab === "transfers" && (
            <div className="myfilters">
              <div className="filter-group"><label>Transfer Id</label><input className="form-control small-input" type="text" placeholder="All" /></div>
              <div className="filter-group"><label>Transfer Status</label><select className="form-select small-input"><option value="">All</option></select></div>
              <div className="filter-group"><label>Settlement Status</label><select className="form-select small-input"><option value="">All</option></select></div>
              <div className="filter-group"><label>Recipient Id</label><input className="form-control small-input" type="text" placeholder="All" /></div>
              <div className="filter-group"><label>Count</label><input className="form-control small-input" type="number" placeholder="Count" /></div>
              <div className="filter-buttons"><button className="search-btn">Search</button><button className="clear-btn">Clear</button></div>
            </div>

          )}
          {activeTab === "reversals" && (
            <>
              <div className="myfilters">
                <div className="filter-group"><label>Reversal Id</label><input className="form-control small-input" type="text" placeholder="All" /></div>
                <div className="filter-group"><label>Count</label><input className="form-control small-input" type="number" placeholder="Count" /></div>
                <div className="filter-buttons"><button className="search-btn">Search</button><button className="clear-btn">Clear</button></div>
              </div>
            </>
          )}
          {activeTab === "accounts" && (
            <>
              <div className="myfilters">
                <div className="filter-group"><label>Account Id</label><input className="form-control small-input" type="text" placeholder="All" /></div>
                <div className="filter-group"><label>Account Email</label><input className="form-control small-input" type="email" placeholder="All" /></div>
                <div className="filter-group"><label>Count</label><input className="form-control small-input" type="number" placeholder="Count" /></div>
                <div className="filter-buttons"><button className="search-btn">Search</button><button className="clear-btn">Clear</button></div>
              </div>
            </>
          )}
          {activeTab === "batchupload" && (
            <>
              <div className="myfilters">
                <div className="filter-group"><label>Batch Upload Id</label><input className="form-control small-input" type="text" placeholder="All" /></div>
                <div className="filter-group"><label>Batch Type</label><select className="form-select small-input"><option value="">All</option></select></div>
                <div className="filter-group"><label>Count</label><input className="form-control small-input" type="number" placeholder="Count" /></div>
                <div className="filter-buttons"><button className="search-btn">Search</button><button className="clear-btn">Clear</button></div>
              </div>            </>
          )}
        </div>

        {/* Tables */}
        <div className="tab-table">
          {/* Payments Tab */}
          {activeTab === "payments" && (
            <div className="table-responsive">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Payment ID</th>
                    <th>Bank RRN</th>
                    <th>Customer</th>
                    <th>Amount</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {paymentsData.map(p => (
                    <tr key={p.id}>
                      <td>{p.id}</td>
                      <td>{p.bankRRN}</td>
                      <td>{p.customer}</td>
                      <td>{p.amount}</td>
                      <td>{p.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Transfers Tab */}
          {activeTab === "transfers" && (
            <div className="table-responsive">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Transfer ID</th>
                    <th>Source</th>
                    <th>Recipient</th>
                    <th>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {transfersData.map(t => (
                    <tr key={t.id}>
                      <td>{t.id}</td>
                      <td>{t.source}</td>
                      <td>{t.recipient}</td>
                      <td>{t.amount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Reversals Tab */}
          {activeTab === "reversals" && (
            <div className="table-responsive">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Reversal ID</th>
                    <th>Transfer ID</th>
                    <th>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {reversalsData.map(r => (
                    <tr key={r.id}>
                      <td>{r.id}</td>
                      <td>{r.transferId}</td>
                      <td>{r.amount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Accounts Tab */}
          {activeTab === "accounts" && (
            <div className="table-responsive">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Account ID</th>
                    <th>Email</th>
                    <th>Name</th>
                    <th>Status</th>
                    <th>Dashboard Access</th>
                    <th>Allow Refunds</th>
                  </tr>
                </thead>
                <tbody>
                  {accountsData.map((a, index) => (
                    <tr key={a.id}>
                      <td>{a.id}</td>
                      <td>{a.email}</td>
                      <td>{a.name}</td>
                      <td>{a.status}</td>
                      <td>
                        <select className="form-select trueslct"
                          value={a.dashboardAccess ? "true" : "false"}
                          onChange={(e) => handleDashboardAccessChange(index, e.target.value === "true")}
                        >
                          <option value="true">True</option>
                          <option value="false">False</option>
                        </select>
                      </td>
                      <td>
                        <select className="form-select trueslct"
                          value={a.allowRefunds ? "true" : "false"}
                          onChange={(e) => handleAllowRefundsChange(index, e.target.value === "true")}
                        >
                          <option value="true">True</option>
                          <option value="false">False</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Batch Upload Tab */}
          {activeTab === "batchupload" && (
            <div className="table-responsive">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Batch ID</th>
                    <th>Name</th>
                    <th>Count</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {batchData.map(b => (
                    <tr key={b.id}>
                      <td>{b.id}</td>
                      <td>{b.name}</td>
                      <td>{b.count}</td>
                      <td>{b.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Modals */}

        
        {/* Transfers Modal */}
        {showTransfersModal && (
          <div className="modal-overlay">
            <div className="modal-content">
              <div className="modal-header">
                <h4>Batch Transfers</h4>
              </div>
              <span className="modal-close" onClick={() => setShowTransfersModal(false)}>
                &times;
              </span>
              <div className="modal-body">
                {/* File Upload Section */}
                <div
                  className="file-upload-dropzone"
                  onClick={() => document.getElementById("batchFileInput").click()}
                >
                  <p>Drop file here or click to upload (11.00 MB Max)</p>
                  <p>Upload .csv or .xlsx file</p>
                </div>
                <input
                  type="file"
                  id="batchFileInput"
                  accept=".csv,.xlsx"
                  style={{ display: "none" }}
                  onChange={(e) => handleFileUpload(e.target.files[0])}
                />

                {/* Instructions Section */}
                <div className="file-instructions">
                  <p><strong>Getting Started with Batch Uploads?</strong></p>
                  <p>Upload a batch file to continue.</p>
                  <p>Please note the following before proceeding:</p>
                  <ul>
                    <li>The amount mentioned should be in paise.</li>
                    <li>The number of rows should not exceed 50,000.</li>
                    <li>In case of any issues, please download the sample file.</li>
                  </ul>
                </div>
              </div>

              {/* <div className="modal-footer">
                <button className="no-btn" onClick={() => setShowTransfersModal(false)}>Cancel</button>
                <button className="yes-btn">Create</button>
              </div> */}
            </div>
          </div>
        )}

        {/* Reversals Modal */}
        {showReversalsModal && (
          <div className="modal-overlay">
            <div className="modal-content">
              <div className="modal-header">
                <h4>Batch Transfers</h4>
              </div>
              <span className="modal-close" onClick={() => setShowReversalsModal(false)}>
                &times;
              </span>
              <div className="modal-body">
                {/* File Upload Section */}
                <div
                  className="file-upload-dropzone"
                  onClick={() => document.getElementById("batchFileInput").click()}
                >
                  <p>Drop file here or click to upload (11.00 MB Max)</p>
                  <p>Upload .csv or .xlsx file</p>
                </div>
                <input
                  type="file"
                  id="batchFileInput"
                  accept=".csv,.xlsx"
                  style={{ display: "none" }}
                  onChange={(e) => handleFileUpload(e.target.files[0])}
                />

                {/* Instructions Section */}
                <div className="file-instructions">
                  <p><strong>Getting Started with Batch Uploads?</strong></p>
                  <p>Upload a batch file to continue.</p>
                  <p>Please note the following before proceeding:</p>
                  <ul>
                    <li>The amount mentioned should be in paise.</li>
                    <li>The number of rows should not exceed 50,000.</li>
                    <li>In case of any issues, please download the sample file.</li>
                  </ul>
                </div>
              </div>

              {/* <div className="modal-footer">
                <button className="no-btn" onClick={() => setShowReversalsModal(false)}>Cancel</button>
                <button className="yes-btn">Create</button>
              </div> */}
            </div>
          </div>
        )}

        {/* Linked Accounts Modal */}
        {showLinkedAccountsModal && (
          <div className="modal-overlay">
            <div className="modal-content small-modal-acount">
              <div className="modal-header">
                <h4>2-Step Verification</h4>
              </div>
              <span className="modal-close" onClick={() => setShowLinkedAccountsModal(false)}>
                &times;
              </span>
              <div className="modal-body">
                <p>The action you are trying to perform needs 2-step verification.</p>
                <p>
                  An SMS with a 6-digit OTP has been sent to <strong>9560663464</strong>
                </p>
                <p>OTP will expire in <strong>{otpTimer} mins</strong></p>

                <div className="form-group">
                  <label>Enter the code</label>
                  <div className="otp-group">
                    {otp.map((o, i) => (
                      <input
                        key={i}
                        className="form-control otp-input"
                        maxLength={1}
                        value={o}
                        onChange={(e) => handleOtpChange(e.target.value, i)}
                      />
                    ))}
                  </div>
                  <small>
                    Resend OTP in {resendTimer} seconds
                    <button
                      className="resend-btn"
                      disabled={resendTimer > 0}
                      onClick={handleResendOtp}
                    >
                      Resend OTP
                    </button>
                  </small>
                </div>
              </div>
              <div className="modal-footer">
                <button className="yes-btn" onClick={handleConfirmOtp}>
                  Confirm
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Tour Modal */}
        {isTourModalOpen && (
          <div className="modal-overlay">
            <div className="modal-content small-modal">
              <div className="modal-header">
                <h4 className="modal-title">Restart the Tour?</h4>
                <p>This tour will give you a quick guide on this product.</p>
              </div>
              <span className="modal-close" onClick={() => setIsTourModalOpen(false)}>&times;</span>
              <div className="modal-footer">
                <button className="no-btn" onClick={() => setIsTourModalOpen(false)}>No</button>
                <a href="/routetour" className="yes-btn">Yes</a>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
    </>
  );
}
