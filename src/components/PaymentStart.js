import React from "react";
import "@/styles/PaymentStart.css";
import { useState } from "react";

const GetStarted = () => {

  const [activeTab, setActiveTab] = useState("pages");

  return (
    <>
      <div id="PaymentStart">
        <section className="get-started">
          <div className="getstarted-header">
            <h2 >Get Started</h2>

            <div className="row align-items-center">
              {/* Left Content */}
              <div className="col-lg-7">
                <div className="steps">
                  <div className="timeline">
                    <div className="circle">
                      <span className="check">&#10003;</span>
                    </div>
                    <div className="dots"></div>
                    <div className="circle">
                      <span className="check">&#10003;</span>
                    </div>
                  </div>

                  <div className="step-row">
                    <div className="step text-center">
                      <h5 className="mt-3">Create Payment Page</h5>
                      <p>
                        it look like readable English. Many desktop publishing packages
                        and web page editors now use Lorem Ipsum as
                      </p>
                    </div>

                    <div className="step text-center">
                      <h5 className="mt-3">2. Receive Payments</h5>
                      <p>
                        it look like readable English. Many desktop publishing packages
                        and web page editors now use Lorem Ipsum as
                      </p>
                    </div>
                  </div>
                </div>

              </div>

              {/* Right Image */}
              <div className="col-lg-4 text-center">
                <img src="./img/chiku.png" alt="Get Started" className="img-fluid get-image" />
              </div>
            </div>
          </div>
        </section>

        <div className="payments-container">
          {/* Top Nav */}
          <div className="topbar">
            <div className="tabs">
              <button
                className={`tab-btn ${activeTab === "pages" ? "active" : ""}`}
                onClick={() => setActiveTab("pages")}
              >
                Payments Pages
              </button>
              <button
                className={`tab-btn ${activeTab === "store" ? "active" : ""}`}
                onClick={() => setActiveTab("store")}
              >
                Zapnow webstore
              </button>
            </div>
            <div className="top-links">
              <span>💡 Need help ? Take a tour</span>
              <i className="ri-file-list-3-line"></i> <span>Documentation</span>
              <button className="create-btn">+ create payment Page</button>
            </div>
          </div>

          {/* Filters */}
          <div className="filters">
            <div className="form-group">
              <label>Title</label>
              <input type="text" placeholder="Type Here" />
            </div>
            <div className="form-group">
              <label>Status</label>
              <select>
                <option>Type Here</option>
                <option>Active</option>
                <option>Inactive</option>
              </select>
            </div>
            <div className="form-group">
              <label>Count</label>
              <input type="number" defaultValue={3} />
            </div>
            <div className="buttons">
              <button className="search-btn">Search</button>
              <button className="clear-btn">Clear</button>
            </div>
          </div>

          {/* Empty State */}
          <div className="empty-state">
            <p>There are no storefront pages yet!!</p>
            <p>Start creating new pages now.</p>
          </div>
        </div>

      </div>



    </>



  );
};

export default GetStarted;
