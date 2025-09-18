import Link from 'next/link';
import { useState, useRef } from 'react';
import SettlementModal from "../../SettlementModal";
import SettleNow from "../../SettleNow";

const Credit = () => {
  //  const [show, setShow] = useState(false);

  const [open, setOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);



  return (
    <>
      {/* Notification Banner */}
      <div id="settlement">
        <div className="myfirst">
          <i className="ri-notification-3-line"></i>
        </div>
        <div className="myfirst2">
          <h3>Scheduled settlement will be skipped</h3>
          <p>
            Since you do not have enough current balance, your 5pm scheduled settlement will be skipped
          </p>
        </div>
      </div>

      {/* Settlement Section */}
      <div id="set-element">
        {/* Top Navigation */}
        <div className="top-bar">
          <div className="left">
            <span className="tab">Overview</span>
            <span className="time">
              <i className="ri-timer-line"></i> 10 mins ago
            </span>
            <button className="refresh">Refresh</button>
          </div>
          <div className="right">

            <span className="tab" onClick={() => setOpen(true)} style={{ cursor: "pointer" }}>
              <i className="ri-timer-line"></i> My Settlement Cycle
            </span>

            {/* Modal */}
            <SettlementModal show={open} onClose={() => setOpen(false)} />
            <span className="tab">
              <i className="ri-timer-line"></i> Documentation
            </span>
          </div>
        </div>





        {/* Cards */}
        <div className="cards">
          <div className="card2">
            <p className="label">Current Balance</p>
            <p className="value">₹45</p>


            <a href="#" className="link" onClick={() => setIsOpen(true)}>
              Settle Now
            </a>

            {isOpen && <SettleNow onClose={() => setIsOpen(false)} />}


          </div>

          <div className="card2">
            <p className="label">Settlement due today</p>
            <p className="value">₹0</p>
          </div>

          <div className="card2">
            <p className="label">Previous settlement</p>
            <p className="value">₹36</p>
            <p className="status">Processed</p>
          </div>

          <div className="card2">
            <p className="label">Upcoming settlement</p>
            <p className="value">322</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Credit;
