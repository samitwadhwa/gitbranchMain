import React, { useState } from "react";
import "@/styles/SettleNow.css";

const SettlementModal = ({ onClose }) => {
  const [amount, setAmount] = useState("");
  const [showBreakup, setShowBreakup] = useState(false);
  const [showReason, setShowReason] = useState(false);
  const [selectedReason, setSelectedReason] = useState("");
  const [showSummary, setShowSummary] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState(null);

  const feePercent = 0.0015;
  const fee = (amount * feePercent).toFixed(2);
  const gst = (fee * 0.18).toFixed(2);
  const finalAmount = (amount - fee - gst).toFixed(2);

  if (showReason) {
    return (
      <div id="SettleNow">
        <div className="modal-overlay">
          <div className="modal-container reason-modal">
            <div className="modal-header">
              <h2>Reason</h2>
              <button className="close-btn" onClick={onClose}>✕</button>
            </div>
            <div className="reasons-list">
              {[
                "Need more guidance with feature",
                "The price is too high",
                "Not suitable for your business type",
                "Not needed for all the payments",
                "Other reasons",
              ].map((reason, idx) => (
                <label key={idx} className="reason-option">
                  <input
                    type="radio"
                    name="reason"
                    value={reason}
                    checked={selectedReason === reason}
                    onChange={(e) => setSelectedReason(e.target.value)}
                  />
                  {reason}
                </label>
              ))}
            </div>
            <div className="modal-actions">
              <button className="go-back" onClick={() => setShowReason(false)}>
                Go Back
              </button>
              <button
                className="confirm-btn"
                disabled={!selectedReason}
                onClick={onClose}
              >
                Confirm & Close
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (showSummary) {
    return (
      <div id="SettleNow">
        <div className="modal-overlay">
          <div className="modal-container summary-container">
            <div className="modal-header">
              <h2>Settlement Amount</h2>
              <button className="close-btn" onClick={onClose}>✕</button>
            </div>

            <div className="amount-summary">
              <h1>₹{parseFloat(amount).toFixed(2)}</h1>
              <button
                className="edit-icon"
                onClick={() => setShowSummary(false)}
                title="Edit amount"
              >
                ✏️
              </button>
            </div>

            <p className="summary-label">Select settlement method</p>

            <div
              className={`method-box ${selectedMethod === "instant" ? "selected" : ""}`}
              onClick={() => setSelectedMethod("instant")}
            >
              <span className="method-icon">⚡</span>
              <div className="method-info">
                <strong className="method-name">Instant Settlement</strong>
                <span className="method-tag">Instant</span>
              </div>
            </div>

            <p className="summary-note">
              Settlement will be initiated after this step.
            </p>

            <button
              className="confirm-btn"
              disabled={!selectedMethod}
              onClick={() => {
                console.log("Settlement Done:", {
                  amount,
                  method: selectedMethod,
                });
                onClose();
              }}
            >
              Settle Now
            </button>

            <button className="go-back" onClick={() => setShowSummary(false)}>
              Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div id="SettleNow">
      <div className="modal-overlay">
        <div className="modal-container" id="payment-pageson">
          <div className="modal-header">
            <h2>Instant Settlements</h2>
            <button className="close-btn" onClick={() => setShowReason(true)}>✕</button>
          </div>

          <p className="subtext">
            Settle to your bank account instantly, even on holidays!
          </p>

          <div className="balance-row">
            <span>Available balance</span>
            <span className="balance-amount">₹302.67</span>
          </div>

          <div className="input-section">
            <label>How much do you want to settle now?</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className={amount !== "" && amount < 100 ? "error-input" : ""}
              placeholder="₹ Enter amount"
            />
            {amount !== "" && amount < 100 && (
              <p className="error-text">
                Minimum settlement amount should be ₹100
              </p>
            )}
          </div>

          {amount >= 100 && (
            <>
              <div className="fees-section" onClick={() => setShowBreakup(!showBreakup)}>
                <span>0.15% fees</span>
                <button className="show-breakup">
                  {showBreakup ? "Hide breakup" : "Show breakup"}
                  <span className={`arrow ${showBreakup ? "up" : "down"}`}></span>
                </button>
              </div>

              {showBreakup && (
                <div className="breakup-box">
                  <p><span>Settlement amount</span> <span>₹{parseFloat(amount).toFixed(2)}</span></p>
                  <p><span>Fees (0.15%)</span> <span>₹{fee}</span></p>
                  <p><span>GST</span> <span>₹{gst}</span></p>
                  <p><strong>Amount to be settled</strong> <strong>₹{finalAmount}</strong></p>
                </div>
              )}
            </>
          )}

          <button
            className="confirm-btn"
            onClick={() => {
              if (amount >= 100) {
                setShowSummary(true);
              }
            }}
            disabled={amount === "" || amount < 100}
          >
            Confirm Settlement
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettlementModal;
