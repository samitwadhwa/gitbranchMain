import React from "react";
import "@/styles/PaymentLinkCard.css";
import Link from "next/link";

// ...

const PaymentLinks = () => {
  return (
    <div id="payment-link-card">
      <h3 className="payment-title">Pick a Payment Link Type</h3>

      <div className="payment-cards">
        {/* Standard Payment Link */}
        <div className="payment-card">
          <div className="card-content">
            <h4 className="card-title">Standard Payment Link</h4>
            <p className="card-desc">
              Create a classic payment link to collect payment from your
              customers in all payment methods.
            </p>
            <Link
              href="/paymentlinks/paymentlinkstart/paymentcreate/standard"
              className="card-link"
            >
              Create Now
            </Link>
          </div>
          <div className="card-image">
            <img src="../../img/chiku.png" alt="Standard Payment Link" />
          </div>
        </div>

        {/* UPI Payment Link */}
        <div className="payment-card">
          <div className="card-content">
            <h4 className="card-title">Upi Payment Link</h4>
            <p className="card-desc">
              Create a classic payment link to collect payment from your
              customers in all payment methods.
            </p>
            <Link href="/paymentlinks/paymentlinkstart/paymentcreate/upi" className="card-link">
              Create Now
            </Link>
          </div>
          <div className="card-image">
            <img src="../../img/chiku.png" alt="UPI Payment Link" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentLinks;
