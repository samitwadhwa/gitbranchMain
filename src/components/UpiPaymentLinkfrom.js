// File: PaymentLinkForm.js

import React from 'react';
import "@/styles/PaymentLinkCard.css";

const PaymentLinkForm = () => {
  return (
    <div className="payment-form-wrapper">
      <div className="payment-form-container">
        <h2 className="form-title">UPI Payment Link</h2>

        <form className="payment-form">
          <div className="form-grid">
            <div className="form-group">
              <label>Amount</label>
              <input type="text" placeholder="Type here" />
            </div>
            <div className="form-group">
              <label>Payment For</label>
              <input type="text" placeholder="Type here" />
            </div>

            <div className="form-group">
              <label>Customer Details:– Mail Id:–</label>
              <input type="email" placeholder="Type here" />
            </div>
            <div className="form-group">
              <label>Phone No.</label>
              <input type="text" placeholder="Type here" />
            </div>

            <div className="form-group checkbox-group">
              <input type="checkbox" id="notify-email" />
              <label htmlFor="notify-email">Notify via Email</label>
            </div>
            <div className="form-group checkbox-group">
              <input type="checkbox" id="notify-phone" />
              <label htmlFor="notify-phone">Notify via Phone no.</label>
            </div>

            <div className="form-group">
              <label>Reference Id</label>
              <input type="text" placeholder="Type here" />
            </div>
            <div className="form-group expiry-group">
              <label>Link Expiry</label>
              <input type="date" />
              <div className="checkbox-inline">
                <input type="checkbox" id="no-expiry" />
                <label htmlFor="no-expiry">No Expiry</label>
              </div>
            </div>
          </div>

          <div className="reminder-info">
            <strong>Reminders</strong>
            <p>Reminders are not set to payment links with no expiry date.</p>
            <p>
              Set it up <a href="#">Here</a>
            </p>
          </div>

          <div className="form-group checkbox-group">
            <input type="checkbox" id="notify-expiry" />
            <label htmlFor="notify-expiry">Notify via Phone no.</label>
          </div>

          <div className="form-group notes-section">
            <label>Notes</label>
            <a href="#" className="add-notes">+Add Notes</a>
            <textarea rows="4" placeholder="Type Here"></textarea>
          </div>

          <div className="form-actions">
            <button className="btn-primary">Create Payment Link</button>
            <button className="btn-secondary">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PaymentLinkForm;
