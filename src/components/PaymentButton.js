import React, { useState } from "react";
import "@/styles/PaymentPages.css";
import { FaHome } from "react-icons/fa";
import Link from "next/link";
import { useRouter } from "next/router";


export default function PaymentsPage() {
  const [showFull, setShowFull] = useState(false);
  const isActive = (path) => router.pathname === path;
  const router = useRouter();

  return (
  
    <div className="payments-container">
      {/* Main Card */}
      <div className="payments-card">
        <img src="/img/chiku.png" alt="Payments" className="payments-image" />
        <div className="payments-content">
          <h5>Zapnow Payments</h5>
          <h2>Payments Button</h2>
          <p>
            it look like readable English. Many desktop publishing packages and
            web page editors now use Lorem Ipsum as their default model text, it
            look like readable English. Many desktop publishing packages and web
            page editors now use Lorem Ipsum as their default model text.
          </p>

          {!showFull && (
            <a
              href="#"
              className="read-more"
              onClick={(e) => {
                e.preventDefault();
                setShowFull(true);
              }}
            >
              Read More
            </a>
          )}
        </div>
      </div>

      {/* Expanded Section */}
      {showFull && (
        <>
          <h2 className="settlements-title">Settlements</h2>
          <div className="settlements-grid">
            <div className="settlement-card">
              <div className="home-icon-box">
                <FaHome className="home-icon" />
              </div>

              <div className="icon2">
                <h4>No Coding Required</h4>
                <p>
                  This report provides a list of the settlement(s) in selected
                  time range. It does not include details of the transactions
                </p>
              </div>
            </div>

            <div className="settlement-card">
              <div className="home-icon-box">
                <FaHome className="home-icon" />
              </div>
 <div className="icon2">
              <h4>Custom Branded Pages</h4>
              <p>
                This report provides a list of the settlement(s) in selected
                time range. It does not include details of the transactions
              </p>
              </div>
            </div>
            <div className="settlement-card">
              <div className="home-icon-box">
                <FaHome className="home-icon" />
              </div>
              <div className="icon2">
              <h4>Multiple Payment Modes</h4>
              <p>
                This report provides a list of the settlement(s) in selected
                time range. It does not include details of the transactions
              </p>
              </div>

            </div>
          </div>

          <div className="settlement-buttons">
            <button
              className="btn-secondary"
              onClick={() => setShowFull(false)}
            >
              Go Back
            </button>
            {/* <Link href="/paymentstart">
    
    </Link> */}
            <Link
              href="/paymentButtonStart"
              className={`pages ${isActive("/paymentButtonStart") ? "active" : ""}`}
            >
               <button className="btn-primary">Get Started</button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
