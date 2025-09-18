
import Link from 'next/link';
import { useState } from 'react';
import { Dropdown, } from 'react';
import { useRef } from 'react';
// import CreditCard from './CreditCard/Component';
// import ReportOnetable from './ReportOnetable/Component';
import Tabstable from './Tabstable/Component';
// import "../../styles/component.css";

const Reportone = ({ options, placeholder }) => {


  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  const [selectedItem, setSelectedItem] = useState('Select an option');

  const handleSelect = (eventKey) => {
    setSelectedItem(eventKey);
  };


  const fileInputRef = useRef(null);

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log('File selected:', file.name);
      // Handle file upload here
    }
  };

  return (
    <>
      <div id='overview-container' className="overview-container">
        {/* Patterned Header with Background Image */}
        <div
          className="overview-header"

        >
          <select className="form-select miniselect">
                <option value="">Last 7 Days</option>
                <option value="">Last 7 Days</option>
                <option value="">Last 7 Days</option>
              </select>
          <div className="overview-amount-section">
            <p className="overview-subtext">Collected Amount</p>
            <h2 className="overview-amount">₹10.00</h2>
            <p className="overview-subtext">from 0 captured payments</p>
          </div>
        </div>

        {/* Cards Section */}
        <div className="overview-cards">

          <div className="card">
            <div className="card-icon">&#8377;
            </div>
            <div className='card-content'>
              <h4>Refunds</h4>
              <span className="card-amount">₹0.00</span>
              <span className="card-subtext">0 processed</span>
              <a href="/transaction/refund" className="view-all">View All</a>
            </div>


          </div>

          <div className="card">
            <div className="card-icon"><i class="ri-error-warning-line"></i></div>
            <div className='card-content'>
              <h4>Disputes</h4>
              <span className="card-amount">₹0.00</span>
              <span className="card-subtext">0 open &nbsp; 0 under-review</span>
              <a href="/transaction/dispute" className="view-all">View All</a> 
            </div>


          </div>

          <div className="card">
            <div className="card-icon">✖</div>
            <div className='card-content'>
              <h4>Failed</h4>
              <span className="card-amount">0</span>
              <span className="card-subtext">Payments</span>
              <a href="/transaction/failed" className="view-all">View All</a>
            </div>


          </div>
        </div>
      </div>

      <div className='container admin-sider_comp'>


        <Tabstable />
        {/* <ReportOnetable /> */}
      </div>

    </>
  );
}

export default Reportone;
