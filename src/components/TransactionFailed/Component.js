import Link from 'next/link';
import { useState, useRef } from 'react';
import "@/styles/transactionfail.css";
import TransactionTable from './TransactionTable/Component';

const Credit = () => {
  return (
    <>
      {/* Notification Banner */}
      

      {/* Settlement Section */}
      <div id="transaction-failed">
        {/* Top Navigation */}
        <div className="top-bar">
          <div className="left">
            
            <span className="tableu">Failed  
              <select className='form-select myselectrefund'>
              <option>Today</option>
              <option>Today</option>
              <option>Today</option>
            </select>
            </span>
            
          </div>
          
        </div>

        {/* Cards */}
        <div className="cards">
          <div className="card2">
            <p className="label">Failed <i className="ri-information-line" title="Enter your title here"></i></p>
            <p className="value">₹45</p>
            <span className="link">payments</span>
          </div>

          <div className="card2">
            <p className="label">Bank-Related <i className="ri-information-line" title="Enter your title here"></i></p>
            <p className="value">₹0</p>
            <span className="link">payments</span>
          </div>

          <div className="card2">
            <p className="label">Customer drop-offs <i className="ri-information-line" title="Enter your title here"></i></p>
            <p className="value">₹36</p>
            <span className="link">payments</span>
          </div>

          <div className="card2">
            <p className="label">Business failures or others <i className="ri-information-line" title="Enter your title here"></i></p>
            <p className="value">322</p>
            <span className="link">payments</span>
          </div>
        </div>
      </div>
      <TransactionTable/>
    </>
  );
};

export default Credit;
