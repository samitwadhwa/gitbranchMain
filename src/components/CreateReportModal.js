import React, { useState, useEffect } from "react";
import "@/styles/CreateReportModal.css";

const CreateReportModal = ({ show, onClose }) => {
  const [showDiscardConfirm, setShowDiscardConfirm] = useState(false);
  const [step, setStep] = useState(1);

  // Column groups
  const initialOptions = {
    Settlements: [
      "Settlement ID",
      "Tax",
      "UTR (Unique Transaction Reference)",
      "Additional UTR",
      "Amount",
      "Status",
      "Fees",
      "Created At",
    ],
    Transactions: [
      "Amount",
      "Created At",
      "Credit",
      "Currency",
      "Debit",
      "Description",
      "Entity ID",
      "Fees",
    ],
    Payments: [
      "Amount",
      "Amount Refunded",
      "Amount Transferred",
      "Auth Code",
      "Bank",
      "Bounce URL",
      "Captured",
      "Captured At",
    ],
    Orders: ["Created At", "Currency", "Amount", "Status"],
    "Payment Link Customers": ["Customer ID", "Name", "Email", "Phone"],
    "Payment Links": ["Link ID", "Created At", "Amount", "Status"],
    Customers: ["Customer ID", "Name", "Email", "Phone"],
    Transfers: ["Transfer ID", "Created At", "Amount", "Status"],
    Refunds: ["Refund ID", "Created At", "Amount", "Status"],
    Disputes: ["Dispute ID", "Created At", "Amount", "Status"],
  };

  const [selectedColumns, setSelectedColumns] = useState([]);
  const [openSections, setOpenSections] = useState({}); // dropdown toggle

  useEffect(() => {
    // Default: Settlements pre-selected
    const initialSelected = initialOptions.Settlements.map((o) => ({
      section: "Settlements",
      original: `Settlements.${o}`,
    }));
    setSelectedColumns(initialSelected);
  }, []);

  if (!show) return null;

  const handleCloseClick = () => setShowDiscardConfirm(true);
  const handleDiscard = () => {
    setShowDiscardConfirm(false);
    onClose();
  };
  const handleCancelDiscard = () => setShowDiscardConfirm(false);
  const handleNext = () => setStep((prev) => prev + 1);
  const handleGoBack = () => setStep((prev) => prev - 1);

  const toggleCheckbox = (section, col) => {
    const key = `${section}.${col}`;
    if (selectedColumns.find((c) => c.original === key)) {
      // remove
      setSelectedColumns((prev) => prev.filter((c) => c.original !== key));
    } else {
      // add
      setSelectedColumns((prev) => [...prev, { section, original: key }]);
    }
  };

  const handleRemoveColumn = (col) => {
    setSelectedColumns((prev) =>
      prev.filter((c) => c.original !== col.original)
    );
  };

  const toggleSection = (section) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <div id="createReportModal">
      <div className="modal-overlay">
        <div className="modal-container">
          <div className="modal-header">
            <h2>Create Custom Report</h2>
            <p className="subtitle">
              {step === 1
                ? "Report Description"
                : step === 2
                ? "Column selection and arrangement"
                : "Column names"}
            </p>
            <button className="close-button" onClick={handleCloseClick}>
              ×
            </button>
          </div>

          {/* STEP 1 */}
          {step === 1 && (
            <div className="modal-body">
              <div className="form-group">
                <label>
                  Select Base Report Type<span className="required">*</span>
                </label>
                <select className="input-field">
                  <option>Choose a Type</option>
                  <option>Settlements</option>
                  <option>Payments</option>
                  <option>Combined Report</option>
                  <option>Orders</option>
                  <option>Settlement Recon</option>
                  <option>Payment page</option>
                </select>
                <small>Select from dropdown</small>
              </div>

              <div className="form-group">
                <label>
                  Report Name<span className="required">*</span>
                </label>
                <input
                  className="input-field"
                  placeholder="Type name of your report here"
                />
                <small>Enter a report name.</small>
              </div>

              <div className="form-group">
                <label>
                  Report Description<span className="required">*</span>
                </label>
                <input
                  className="input-field"
                  placeholder="Enter the report description"
                />
                <small>Enter a description for this report.</small>
              </div>
            </div>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <div className="modal-body columns-layout">
              {/* LEFT */}
              <div className="available-columns">
                <h4>AVAILABLE COLUMNS</h4>
                {Object.entries(initialOptions).map(([section, cols]) => (
                  <div className="form-group" key={section}>
                    <div
                      className="dropdown-header"
                      onClick={() => toggleSection(section)}
                    >
                      <span>{section}</span>
                      {openSections[section] ? (
                        <i className="ri-arrow-up-s-line"></i>
                      ) : (
                        <i className="ri-arrow-down-s-line"></i>
                      )}
                    </div>
                    {openSections[section] && (
                      <div className="checkbox-list">
                        {cols.map((col, idx) => (
                          <label key={idx} className="checkbox-item">
                            <input
                              type="checkbox"
                              checked={selectedColumns.some(
                                (c) => c.original === `${section}.${col}`
                              )}
                              onChange={() => toggleCheckbox(section, col)}
                            />
                            {col}
                          </label>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* RIGHT */}
              <div className="selected-columns">
                <h4>
                  SELECTED COLUMNS{" "}
                  <span className="count-tag">{selectedColumns.length}</span>
                </h4>
                <ul className="column-list">
                  {selectedColumns.map((col, idx) => (
                    <li key={idx}>
                      {col.original}
                      <span
                        className="remove"
                        onClick={() => handleRemoveColumn(col)}
                      >
                        ×
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <div className="modal-body">
              <table className="column-rename-table">
                <thead>
                  <tr>
                    <th>Selected Columns</th>
                    <th>Column Name</th>
                    <th>Remove Column</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedColumns.map((col, idx) => {
                    const defaultVal = col.original.split(".").pop();
                    return (
                      <tr key={idx}>
                        <td className="col-original">{col.original}</td>
                        <td className="col-edit">
                          <input
                            className="input-field"
                            defaultValue={defaultVal}
                            maxLength={50}
                          />
                          <small>{defaultVal.length}/50</small>
                        </td>
                        <td className="col-remove">
                          <button
                            className="remove-icon"
                            onClick={() => handleRemoveColumn(col)}
                          >
                            <i className="ri-delete-bin-line"></i>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

          {/* FOOTER */}
          <div className="modal-footer">
  <div className="left-actions">
    {step > 1 && (
      <button className="cancel-button" onClick={handleGoBack}>
        Go Back
      </button>
    )}
  </div>
  <div className="right-actions">
    <button className="cancel-button" onClick={onClose}>
      Cancel
    </button>
    {step < 3 ? (
      <button className="next-button" onClick={handleNext}>
        Next ({step}/3)
      </button>
    ) : (
      <button className="next-button">Create 3/3</button>
    )}
  </div>
</div>

        </div>
      </div>

      {/* DISCARD MODAL */}
      {showDiscardConfirm && (
        <div className="modal-overlay">
          <div className="modal-containerrr small">
            <div className="modal-header">
              <h2>Discard Changes</h2>
              <p className="subtitle">
                Are you sure you want to discard the entire progress?
              </p>
              <button className="close-button" onClick={handleCancelDiscard}>
                ×
              </button>
            </div>
            <div id="discard-modal">
              <div className="modal-body">
                <div className="alert-box">
                  <strong>⚠️ Important</strong>
                  <p>Progress will not be saved</p>
                </div>
                <div className="modal-footer">
                  <button
                    className="cancel-button"
                    onClick={handleCancelDiscard}
                  >
                    Cancel
                  </button>
                  <button className="next-button" onClick={handleDiscard}>
                    Discard
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateReportModal;
