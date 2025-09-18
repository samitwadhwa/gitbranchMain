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
    localStorage.setItem("subscriptionTour", "false");
  }


  return (

    <div id="subscriptiontour" className="payments-container">
      {/* Main Card */}
      <div className="payments-card">
        <img src="/img/chiku.png" alt="Payments" className="payments-image" />
        <div className="payments-content">
          <h5>Zapnow Payments</h5>
          <h2>Subscription</h2>
          <p>
            Collect recurring payments from customers with Razorpay Subscriptions APIs
          </p>
          <div className="parent">
            <div className="child1">
              8% Reduction in churn
            </div>
            <div className="child2">
              24% Lower collection costs
            </div>
            <div className="child3">
              Upto 1.7x increase in CLTV
            </div>

          </div>



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
          <h2 className="settlements-title">What makes Subscription great?</h2>
          <div className="settlements-grid">
            <div className="settlement-card">
              <div className="home-icon-box01">
                <i className="ri-link home-icon"></i>
              </div>

              <div className="icon2">
                <h4>Subscription Links</h4>
                <p>
                  Share unique links to onboard your customers on your Subscription plans instantly! Zero coding, Zero integration.
                </p>
              </div>
            </div>

            <div className="settlement-card">
              <div className="home-icon-box01">
                <i className="ri-home-7-line home-icon"></i>
              </div>
              <div className="icon2">
                <h4>Multiple Payment methods
                </h4>
                <p>
                  Offer your customers a wide variety of payment methods. All payment methods which support recurring payments are compliant with RBI regulations.
                </p>
              </div>
            </div>
            <div className="settlement-card">
              <div className="home-icon-box01">

                <i className="ri-money-dollar-circle-line home-icon"></i>
              </div>
              <div className="icon2">
                <h4>Multi-currency Support</h4>
                <p>
                  Accept recurring payments from customers in India and abroad via Razorpay Subscriptions. 100 currencies supported!
                </p>
              </div>

            </div>
          </div>

          <div className="settlement-buttons">
            <button className="btn-secondary" onClick={() => setShowFull(false)}>Go Back</button>
            <Link href="/subscription">
              <button className="btn-primary" onClick={handleGetStarted}>Get Started</button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
