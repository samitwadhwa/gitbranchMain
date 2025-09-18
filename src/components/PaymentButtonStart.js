import React, { useState } from "react";
import "@/styles/PaymentButtonStart.css";


const GetStarted = () => {
     const [activeTab, setActiveTab] = useState("invoices");
    
      const handleTabClick = (tab) => setActiveTab(tab);
  return (
    <>
    <div id="getwrapper">
    <div className="get-started-wrapper ">
      <h4 className="mb-5 align-items-start">Get Started</h4>

      <div className="steps-container d-flex justify-content-between align-items-start">
        {/* Step 1 */}
        <div className="step-item text-center">
          <div className="step-circle active">
            <span>✔</span>
          </div>
          <div className="step-content mt-3">
            <h6 className="fw-semibold">1. Create a Button</h6>
            <p>
              it look like readable English. Many desktop publishing packages
              and web page editors now use Lorem Ipsum as
            </p>
          </div>
        </div>

        {/* Connector */}
        <div className="step-line"></div>

        {/* Step 2 */}
        <div className="step-item text-center">
          <div className="step-circle">
            <span>✔</span>
          </div>
          <div className="step-content mt-3">
            <h6 className="fw-semibold">2. Copy and Paste the Code</h6>
            <p>
              it look like readable English. Many desktop publishing packages
              and web page editors now use Lorem Ipsum as
            </p>
          </div>
        </div>

        {/* Connector */}
        <div className="step-line"></div>

        {/* Step 3 */}
        <div className="step-item text-center">
          <div className="step-circle">
            <span>✔</span>
          </div>
          <div className="step-content mt-3">
            <h6 className="fw-semibold">3. Receive Payments</h6>
            <p>
              it look like readable English. Many desktop publishing packages
              and web page editors now use Lorem Ipsum as
            </p>
          </div>
        </div>
      </div>
    </div>


<div className="invoice-wrapper container-fluid p-4">
    
      <div className="tab-header d-flex align-items-center mb-3">
        <div
          className={`tab-item ${activeTab === "invoices" ? "active" : ""}`}
          onClick={() => handleTabClick("invoices")}
        >
          Invoices
        </div>
        <div
          className={`tab-item ${activeTab === "items" ? "active" : ""}`}
          onClick={() => handleTabClick("items")}
        >
          Items
        </div>

        <div className="ms-auto d-flex align-items-center gap-3">
          <span className="help-link">💡 Need help ? Take a tour</span>
          <span className="doc-link">Documentation</span>
          <button className="btn btn-outline-dark create-btn">
            + create Invoice
          </button>
        </div>
      </div>

      
      <div className="filter-box p-3 mb-4">
        <div className="row g-3">
          <div className="col-md-2">
            <label>Invoice Status</label>
             <select className="form-select small-input">
             <option>Type Here</option>
              <option value="Processed">Processed</option>
              <option value="Expired">Expired</option>
              <option value="Failed">Failed</option>
            </select>


            
          </div>
          <div className="col-md-2">
           
            <label>Invoice Id</label>
            <input
              className="form-control small-input"
              type="text"
              placeholder="Type Here"
            />
          </div>
          <div className="col-md-2">
            <label>Receipt No.</label>
            <input type="text" className="form-control" placeholder="Type Here" />
          </div>
          <div className="col-md-2">
            <label>Customer Contact</label>
            <input type="text" className="form-control" placeholder="Type Here" />
          </div>
          <div className="col-md-2">
            <label>Customer Email</label>
            <input type="text" className="form-control" placeholder="Type Here" />
          </div>
          <div className="col-md-2">
            <label>Notes</label>
            <input type="text" className="form-control" placeholder="Type Here" />
          </div>
        </div>
        

        {/* <div className="row g-3">
         <div className="col-md-2">
            <label>Count</label>
            <input type="number" className="form-control" defaultValue={3} />
          </div>
          <div className="col-md-2">
            <button className="btn btn-primary search-btn">Search</button>
            <button className="btn btn-dark">Clear</button>
          </div> */}
         
        {/* </div> */}
      </div>

      {/* Table */}
      <div className="table-responsive fade-in">
        <table className="table table-striped settlement-table">
          <thead>
            <tr>
              <th>Invoice Id</th>
              <th>Created At</th>
              <th>Amount</th>
              <th>Receipt No.</th>
              <th>Customer</th>
              <th>Payment Link</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>nk_QwubnK</td>
              <td>19 Dec 2024, 03:31:49 pm</td>
              <td>₹ 0.00</td>
              <td>yme44Link</td>
              <td>Paras</td>
              <td><a href="#">Link</a></td>
            </tr>
            <tr className="alt-row">
              <td>nk_QwubnU</td>
              <td>26 Sep 2024, 01:43:13 pm</td>
              <td>₹ 0.00</td>
              <td>yme44Link</td>
              <td>Paras</td>
              <td><a href="#">Link</a></td>
            </tr>
            <tr>
              <td>nk_QwubnUz</td>
              <td>26 Sep 2024, 01:43:13 pm</td>
              <td>₹ 0.00</td>
              <td>yme44Link</td>
              <td>Paras</td>
              <td><a href="#">Link</a></td>
            </tr>
            <tr className="alt-row">
              <td>nk_QwubnUz</td>
              <td>26 Sep 2024, 01:43:13 pm</td>
              <td>₹ 0.00</td>
              <td>yme44Link</td>
              <td>Paras</td>
              <td><a href="#">Link</a></td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="pagination-box d-flex justify-content-between align-items-center mt-3">
        <div>
          <label>Items per page</label>{" "}
          <select className="form-select d-inline-block w-auto ms-2">
            <option>10</option>
            <option>20</option>
            <option>50</option>
          </select>
        </div>
        <div className="pagination-nav">
          <button className="page-btn">&lt;</button>
          <button className="page-btn active">1</button>
          <button className="page-btn">2</button>
          <button className="page-btn">3</button>
          <button className="page-btn">&gt;</button>
        </div>
      </div>
    </div>

    </div>
    </>
  );
};

export default GetStarted;
