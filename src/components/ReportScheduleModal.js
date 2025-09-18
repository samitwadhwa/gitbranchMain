import React, { useState, useEffect } from "react";
import "@/styles/ReportScheduleModal.css";

const ReportScheduleModal = ({ show, onClose }) => {
  const [openAccordion, setOpenAccordion] = useState(1);

  // When modal opens, default to Accordion 1
  useEffect(() => {
    if (show) setOpenAccordion(1);
  }, [show]);

  if (!show) return null; // 🔴 Don't render if not visible

  const toggleAccordion = (index) => {
    setOpenAccordion(openAccordion === index ? null : index);
  };

  return (
    <div id="report-modal-container">
      <div id="report-modal">
        <div id="modal-headers" className="modal-header">
          <h2 id="report-modal-title">
            Create Report Schedule <span id="report-badge">New</span>
          </h2>
          <button className="close-btn" aria-label="Close" onClick={onClose}>
            &times;
          </button>
        </div>

        <p id="report-modal-subtitle">
          You can create schedules on your reports and automate their delivery
          to your email. Choose what reports, where and how frequently you want
          them delivered.
        </p>

        <div id="report-modal-scrollable">
          {/* Accordion 1 */}
          <div
            className={`report-accordion ${
              openAccordion === 1 ? "active" : ""
            }`}
          >
            <button
              className="report-accordion-header"
              onClick={() => toggleAccordion(1)}
            >
              What report is this?
            </button>
            {openAccordion === 1 && (
              <div className="report-accordion-body">
                <label>Select Report *</label>
                <select>
                  <option value="">Select A Report</option>
                  <option>Settlements</option>
                  <option>Payments</option>
                  <option>Transfers</option>
                  <option>Combined Report</option>
                  <option>Orders</option>
                  <option>Refunds</option>
                  <option>Payment Links</option>
                  <option>Reversals</option>
                </select>

                <label>Schedule Name *</label>
                <input type="text" placeholder="Eg: Schedule At 5pm daily" />

                <label>Select Format (Optional)</label>
                <select>
                  <option value="">Excel or CSV</option>
                  <option>Excel</option>
                  <option>CSV</option>
                </select>
              </div>
            )}
          </div>

          {/* Accordion 2 */}
          <div
            className={`report-accordion ${
              openAccordion === 2 ? "active" : ""
            }`}
          >
            <button
              className="report-accordion-header"
              onClick={() => toggleAccordion(2)}
            >
              What will you receive in this report?
            </button>
            {openAccordion === 2 && (
              <div className="report-accordion-body">
                <label>Choose Schedule Duration *</label>
                <div className="report-date-range">
                  <input type="date" />
                  <span>to</span>
                  <input type="date" />
                </div>

                <label>Data Duration *</label>
                <select>
                  <option value="">Select data duration</option>
                  <option>1 day</option>
                  <option>7 days</option>
                  <option>30 days</option>
                </select>

                <label>Repetition *</label>
                <select>
                  <option value="">None</option>
                  <option>Daily</option>
                  <option>Weekly</option>
                  <option>Monthly</option>
                </select>

                <label>Set Time *</label>
                <input type="time" />
              </div>
            )}
          </div>

          {/* Accordion 3 */}
          <div
            className={`report-accordion ${
              openAccordion === 3 ? "active" : ""
            }`}
          >
            <button
              className="report-accordion-header"
              onClick={() => toggleAccordion(3)}
            >
              Who will receive this report?
            </button>
            {openAccordion === 3 && (
              <div className="report-accordion-body">
                <label>Add Recipient's Details *</label>
                <input
                  type="email"
                  placeholder="Start typing emails to add"
                  multiple
                />
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div id="report-modal-footer">
          <button className="report-btn cancel" onClick={onClose}>
            Cancel
          </button>
          <button className="report-btn create">Create Schedule</button>
        </div>
      </div>
    </div>
  );
};

export default ReportScheduleModal;
