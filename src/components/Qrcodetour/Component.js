import React, { useState } from "react";
import "@/styles/PaymentPages.css";

import Link from "next/link";
import { useRouter } from "next/router";

import "@/styles/Subscription.css";
export default function PaymentsPage() {
  const [showFull, setShowFull] = useState(false);
  const isActive = (path) => router.pathname === path;
  const router = useRouter();
  const handleGetStarted = () => {
    localStorage.setItem("qrcodetour", "false");
  }

  return (

    <div id="myqrcodetour" >
    <div className="payments-container">
      {/* Main Card */}
      <div className="payments-card">
        <img src="/img/chiku.png" alt="Payments" className="payments-image" />
        <div className="payments-content">
          <h5>Zapnow Payments</h5>
          <h2>QR Codes</h2>
          <p>
           Create UPI QR codes in 3 simple steps with no integration efforts. Adopt contactless payments through customized QR codes and track payments easily.
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
          <h2 className="settlements-title">Whats unique about QR Codes?</h2>
          <div className="settlements-grid">
            <div className="settlement-card">
              <div className="home-icon-box01">
                <i class="ri-link home-icon"></i>
              </div>

              <div className="icon2">
                <h4>QR Codes unique to your businesss</h4>
                <p>
                  Create QR codes for multiple customers, collect single or multiple payments, set expiry limits and much more.
                </p>
              </div>
            </div>

            <div className="settlement-card">
              <div className="home-icon-box01">
                <i class="ri-home-7-line home-icon"></i>
              </div>
              <div className="icon2">
                <h4>Easy Tracking and Reconciliation
                </h4>
                <p>
                  Track payments instantly and generate reports in real-time.
                </p>
              </div>
            </div>
            <div className="settlement-card">
              <div className="home-icon-box01">

                <i class="ri-money-dollar-circle-line home-icon"></i>
              </div>
              <div className="icon2">
                <h4>Unlimited QR codes at no cost</h4>
                <p>
                  Generate as many QR codes as you need, absolutely free.
                </p>
              </div>

            </div>
          </div>

          <div className="settlement-buttons">
            <button className="btn-secondary" onClick={() => setShowFull(false)}>Go Back</button>
           
  <Link href="/qrcode">
      <button className="btn-primary" onClick={handleGetStarted}>
        Get Started
      </button>
    </Link>
            
          </div>
        </>
      )}
    </div>
    </div>
  );
}
