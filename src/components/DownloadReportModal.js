import React, { useState, useEffect } from "react";
import "@/styles/DownloadReportModal.css";

const DownloadReportModal = ({ show, onClose }) => {
  const [openSection, setOpenSection] = useState("section1");
  const [custom, setCustom] = useState(false);
  const [emailToggle, setEmailToggle] = useState(false);

  // Reset state when modal opens
  useEffect(() => {
    if (show) {
      setOpenSection("section1");
      setCustom(false);
      setEmailToggle(false);
    }
  }, [show]);

  if (!show) return null;

  const toggleSection = (section) => {
    setOpenSection((prev) => (prev === section ? null : section));
  };

  return (
    <div id="download-modal-overlay">
      <div id="download-modal">
       <div className="download-header">
          <h2 className="download-title">Download report for your business</h2>
          <button className="close-btn" onClick={onClose} aria-label="Close">
            &times;
          </button>
        </div>
        <p className="download-subtitle">
          A new improved version of reports now available for you to download.
          You can now select the specific date and time period for which you
          would like to see the report.
        </p>

        <div id="download-modal-body">
          {/* Section 1 */}
          <div
            className={`download-section ${
              openSection === "section1" ? "active" : ""
            }`}
          >
            <div
              className="section-header clickable"
              onClick={() => toggleSection("section1")}
            >
              <p>What report is this?</p>
            </div>
            {openSection === "section1" && (
              <>
                <p className="section-subtext">Report type</p>

                <label>
                  Select Report<span className="required">*</span>
                </label>
                <select>
                  <option>Select A Report</option>
                  <option>Payments</option>
                  <option>Settlements</option>
                  <option>Orders</option>
                  <option>Refunds</option>
                </select>

                <label>Save Report As (optional)</label>
                <input type="text" placeholder="Eg: Monthly Recon Report" />

                <label>Select Format (optional)</label>
                <select>
                  <option>Excel, CSV or More</option>
                  <option>Excel</option>
                  <option>CSV</option>
                  <option>PDF</option>
                </select>
              </>
            )}
          </div>

          {/* Section 2 */}
          <div
            className={`download-section ${
              openSection === "section2" ? "active" : ""
            }`}
          >
            <div
              className="section-header clickable"
              onClick={() => toggleSection("section2")}
            >
              <p>What will you receive in this report?</p>
              <div className="toggle-switch">
                <label>Custom</label>
                <input
                  type="checkbox"
                  checked={custom}
                  onChange={(e) => {
                    e.stopPropagation();
                    setCustom(!custom);
                  }}
                />
              </div>
            </div>
            {openSection === "section2" && (
              <>
                <p className="section-subtext">
                  Period of data, time, date etc.
                </p>

                <label>
                  Select Duration<span className="required">*</span>
                </label>
                <select>
                  <option>Select duration covered in each report</option>
                  <option>1 Day</option>
                  <option>7 Days</option>
                  <option>30 Days</option>
                </select>
              </>
            )}
          </div>

          {/* Section 3 */}
          <div
            className={`download-section ${
              openSection === "section3" ? "active" : ""
            }`}
          >
            <div
              className="section-header clickable"
              onClick={() => toggleSection("section3")}
            >
              <p>Do you want this report in an email?</p>
              <div className="toggle-switch">
                <label>Yes</label>
                <input
                  type="checkbox"
                  checked={emailToggle}
                  onChange={(e) => {
                    e.stopPropagation();
                    setEmailToggle(!emailToggle);
                  }}
                />
              </div>
            </div>
            {openSection === "section3" && (
              <>
                <p className="section-subtext">
                  Add receiver's email addresses.
                </p>
                <input type="email" placeholder="Enter recipient email" />
              </>
            )}
          </div>
        </div>

        {/* Footer */}
        <div id="download-modal-footer">
          <button className="btn cancel" onClick={onClose}>
            Cancel
          </button>
          <button className="btn primary">Start Download</button>
        </div>
      </div>
    </div>
  );
};

export default DownloadReportModal;
