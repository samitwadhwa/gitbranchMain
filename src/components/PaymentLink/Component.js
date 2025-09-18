import React, { useState } from "react";
import "@/styles/PaymentPages.css";
import Link from "next/link";
import { useRouter } from "next/router";


export default function PaymentsPage() {
  const [showFull, setShowFull] = useState(false);
  const isActive = (path) => router.pathname === path;
  const router = useRouter();
   const handleGetStarted = () => {
    localStorage.setItem("paymentlinks", "false");
  }

  return (

    <div className="payments-container">
      {/* Main Card */}
      <div className="payments-card">
        <img src="/img/chiku.png" alt="Payments" className="payments-image" />
        <div className="payments-content">
          <h5>Zapnow Payments</h5>
          <h2>Payments Links</h2>
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
          <h2 className="settlements-title">What makes Payment Links great?</h2>
          <div className="settlements-grid">
            <div className="settlement-card">
              <div className="home-icon-box01">
                <i className="ri-link home-icon"></i>
              </div>
              <div className="icon2">
                <h4>Businesses Without Website</h4>
                <p>
                  Don't have an app or website for selling? Now let your customers pay
                  online with payment links.
                </p>
              </div>
            </div>

            <div className="settlement-card">
              <div className="home-icon-box01">
                <i className="ri-home-7-line home-icon"></i>
              </div>
              <div className="icon2">
                <h4>Alternative Payment Option</h4>
                <p>
                  Payment Links can be an easy substitute for cash-on-delivery and
                  point-of-sale payment methods in your business.
                </p>
              </div>
            </div>
            <div className="settlement-card">
              <div className="home-icon-box01">

                <i className="ri-money-dollar-circle-line home-icon"></i>
              </div>
              <div className="icon2">
                <h4>Partial Payments</h4>
                <p>
                  Provide your customers with the flexibility to make payments in parts
                  against large orders instead of making the entire payment at once.
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
            
            <Link
              // href="paymentlinks/paymentlinkstart"
              href="/paymentlinkstart"

            >
              <button className="btn-primary" onClick={handleGetStarted}>Get Started</button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
