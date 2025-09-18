import React, { useState } from "react";
import "@/styles/SettlementModal.css";

const SettlementModal = ({ show, onClose }) => {
  const [view, setView] = useState("settlement"); // "settlement" or "holidays"
  const [open, setOpen] = useState(false);

  if (!show) return null;

  const holidays = [
    { date: "19/02/2025", name: "Chhatrapati Shivaji Maharaj Jayanti" },
    { date: "26/02/2025", name: "Mahashivratri" },
    { date: "14/03/2025", name: "Holi (second Day) - Dhuleti/dhulandi/dol Jatra" },
    { date: "31/03/2025", name: "Ramzan-id (id-ul-fitr) (shawal-1)/khutub-e-ramzan" },
    { date: "01/04/2025", name: "Banks To Close Their Yearly Accounts" },
    { date: "10/04/2025", name: "Mahavir Janmakalyanak/mahavir Jayanti" },
    { date: "14/04/2025", name: "Dr. Babasaheb Ambedkar Jayanti" },
    { date: "10/04/2025", name: "Mahavir Janmakalyanak/mahavir Jayanti" },
    { date: "14/04/2025", name: "Dr. Babasaheb Ambedkar Jayanti" },
  ];

  return (
    <div id="SettlementBack">
    <div className="modal-backdrop">
      <div className="modal-box">
        {/* Header */}
        <div className="modal-header">
          <h2>{view === "settlement" ? "Settlement Cycle" : "Holidays List"}</h2>
          <button
            className="close-btn"
            onClick={() => {
              if (view === "holidays") {
                setView("settlement"); // back to settlement screen
              } else {
                onClose(); // close modal
              }
            }}
          >
            ✖
          </button>
        </div>

        {/* Body */}
        <div className="modal-body">
          {view === "settlement" ? (
            <>
              <h4 className="section-title">Online</h4>

              <div className="section">
                <p className="section-heading">Payments default settlement cycle</p>
                <div className="row-box">
                  <span>Domestic Payments</span>
                  <span className="highlight">T0 - 9AM &amp; 5PM</span>
                </div>
                <div className="row-box">
                  <span>International Payments</span>
                  <span className="highlight">Basic T7</span>
                </div>
                <p className="note-red">*T is the date of payment capture</p>
              </div>

              <div className="section">
                <p className="section-heading">Other Settlement cycle</p>
                <div className="row-box">
                  <span>Refunds</span>
                  <span className="highlight">Instant</span>
                </div>
                <div className="row-box">
                  <span>Reversals</span>
                  <span className="highlight">
                    Instant <i className="ri-information-line"></i>
                  </span>
                </div>
                <div className="row-box">
                  <span>Transfers</span>
                  <span className="highlight">
                    Instant <i className="ri-information-line"></i>
                  </span>
                </div>
                <p className="note-red">*T is the date of initiation</p>
              </div>

              <div className="note-box">
                <p>
                  <strong>Note:</strong>{" "}
                  <span className="link">Bank holidays</span> aren’t counted as working days.{" "}
                 <div className="accordion-container">
      <a
        href="#"
        className="accordion-toggle"
        onClick={(e) => {
          e.preventDefault();
          setOpen(!open);
        }}
      >
        {open ? "Hide Example ▴" : "View Example ▾"}
      </a>

      {open && (
        <div className="accordion-content">
          <p>
            <strong>Note:</strong>{" "}
            <span className="holiday-text">Bank holidays</span> aren’t counted
            as working days.
          </p>
          <p>Assume settlement schedule for a payment is T+3</p>

          <div className="example-box">
            <h4>No bank holiday</h4>
            <div className="timeline">
              <span className="circle blue">T</span>
              <span className="line" />
              <span className="circle gray">T+1</span>
              <span className="line" />
              <span className="circle gray">T+2</span>
              <span className="line" />
              <span className="circle green">T+3</span>
            </div>
            <div className="labels">
              <span>Payment Captured</span>
              <span>Payment Settled</span>
            </div>
          </div>

          <div className="example-box">
            <h4>Bank Holidays in between</h4>
            <div className="timeline">
              <span className="circle blue">T</span>
              <span className="line" />
              <span className="circle gray">T+1</span>
              <span className="line" />
              <span className="circle gray">T+2</span>
              <span className="line curved" />
              <span className="circle red">H</span>
              <span className="line" />
              <span className="circle green">T+3</span>
            </div>
            <div className="labels">
              <span>Payment Captured</span>
              <span>Payment Settled</span>
            </div>
          </div>
        </div>
      )}
    </div>

                </p>
              </div>
            </>
          ) : (
            <div className="holiday-list">
              <table>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Name</th>
                  </tr>
                </thead>
                <tbody>
                  {holidays.map((holiday, idx) => (
                    <tr key={idx}>
                      <td>{holiday.date}</td>
                      <td>{holiday.name}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Footer */}
        {view === "settlement" && (
          <div className="modal-footer">
            <button
              className="btn"
              onClick={() => setView("holidays")}
            >
              List of Bank Holidays
            </button>
            <button className="btn">Settlement Guide</button>
          </div>
        )}
      </div>
    </div>
    </div>
  );
};

export default SettlementModal;
