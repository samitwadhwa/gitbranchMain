
import Link from 'next/link';
import { useState, useRef } from 'react';
import { useEffect } from "react";
import { Dropdown, } from 'react';




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

  const [activeTab, setActiveTab] = useState("settlements");
  
    const settlementsData = [
      {
        paymentId: "sst5656gg",
        bankRRN: "dvwew3rw34csd",
        customerDetail: "John Doe",
        createdOn: "Jul 14 2025, 05:04",
        amount: "₹ 1.16",
        status: "Active",
      },
      {
        paymentId: "sst9656gg",
        bankRRN: "swdddcfed",
        customerDetail: "Jane Smith",
        createdOn: "Jul 14 2025, 05:04",
        amount: "₹ 1.16",
        status: "Active",
      },
      {
        paymentId: "sst56222w",
        bankRRN: "AXIN0976913",
        customerDetail: "Alex Johnson",
        createdOn: "Jul 14 2025, 05:04",
        amount: "₹ 1.16",
        status: "Active",
      },
      {
        paymentId: "sst2226gg",
        bankRRN: "AXISCN097691",
        customerDetail: "Sara Lee",
        createdOn: "Jul 14 2025, 05:04",
        amount: "₹ 1.16",
        status: "Active",
      },
    ];
  
    const ondemandData = [
      {
        orderId: "ond1111",
        amount: "₹ 10.00",
        attempts: 2,
        receipt: "RCT12345",
        createdAt: "Jul 12 2025, 03:22",
        status: "Processed",
      },
      {
        orderId: "ond2222",
        amount: "₹ 5.50",
        attempts: 1,
        receipt: "RCT54321",
        createdAt: "Jul 11 2025, 07:15",
        status: "Failed",
      },
    ];
  
    const getTableHeaders = () => {
      if (activeTab === "settlements") {
        return [
          "Payment ID",
          "Bank RRN",
          "Customer detail",
          "Created on",
          "Amount",
          "Status",
          
        ];
      } else {
        return [
          "Order Id",
          "Amount",
          "Attempts",
          "Receipt",
          "Created At",
          "Status",
        ];
      }
    };
  
    const getTableData = () =>
      activeTab === "settlements" ? settlementsData : ondemandData;

     useEffect(() => {
          const rangeSelect = document.getElementById("rangeSelect");
          const startDate = document.getElementById("startDate");
          const endDate = document.getElementById("endDate");
      
          function formatDate(date) {
            return date.toISOString().split("T")[0];
          }
      
          function getDateDiffInDays(start, end) {
            const oneDay = 1000 * 60 * 60 * 24;
            return Math.round((end - start) / oneDay);
          }
      
          function updateCustomLabel() {
            const start = new Date(startDate.value);
            const end = new Date(endDate.value);
      
            if (!isNaN(start) && !isNaN(end) && end >= start) {
              const diffDays = getDateDiffInDays(start, end) + 1;
              let label = `Custom (${diffDays} days)`;
      
              if (diffDays >= 28 && diffDays <= 31) {
                label = "Custom (1 month)";
              } else if (diffDays > 31) {
                const months = Math.floor(diffDays / 30);
                label = `Custom (${months} months)`;
              }
      
              rangeSelect.options[0].text = label;
              rangeSelect.value = "custom";
            }
          }
      
          rangeSelect.addEventListener("change", function () {
            const today = new Date();
            let pastDate = new Date();
      
            if (this.value === "7") {
              pastDate.setDate(today.getDate() - 6);
              startDate.value = formatDate(pastDate);
              endDate.value = formatDate(today);
            } else if (this.value === "30") {
              pastDate.setDate(today.getDate() - 29);
              startDate.value = formatDate(pastDate);
              endDate.value = formatDate(today);
            }
          });
      
          startDate.addEventListener("change", updateCustomLabel);
          endDate.addEventListener("change", updateCustomLabel);
      
          return () => {
            rangeSelect.replaceWith(rangeSelect.cloneNode(true));
            startDate.replaceWith(startDate.cloneNode(true));
            endDate.replaceWith(endDate.cloneNode(true));
          };
        }, []);

  return (
    <>
      <div id='overview-container' className="overview-container">
        {/* Patterned Header with Background Image */}
        <div
          className="overview-header"

        >
          <div className="overview-title">Overview Today</div>
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
              <a href="#" className="view-all">View All</a>
            </div>


          </div>

          <div className="card">
            <div className="card-icon"><i class="ri-error-warning-line"></i></div>
            <div className='card-content'>
              <h4>Disputes</h4>
              <span className="card-amount">₹0.00</span>
              <span className="card-subtext">0 open &nbsp; 0 under-review</span>
              <a href="#" className="view-all">View All</a>
            </div>


          </div>

          <div className="card">
            <div className="card-icon">✖</div>
            <div className='card-content'>
              <h4>Failed</h4>
              <span className="card-amount">0</span>
              <span className="card-subtext">Payments</span>
              <a href="#" className="view-all">View All</a>
            </div>


          </div>
        </div>
      </div>

      <div className='container admin-sider_comp'>


       
      </div>



      <div id="transaction-tables">
      {/* Tabs */}
      <div className="tabs">
        <button
          className={activeTab === "settlements" ? "tab active" : "tab"}
          onClick={() => setActiveTab("settlements")}
        >
          Payments
        </button>
        <button
          className={activeTab === "ondemand" ? "tab active" : "tab"}
          onClick={() => setActiveTab("ondemand")}
        >
          Orders
        </button>
      </div>

      {/* Filters */}
      <div className="a" id="kk">
        {activeTab === "settlements" ? (
          <div className="tmyflx">
            <div className="tran-one">
              <div id="myselecteddate">
                <select className=" custom-select" id="rangeSelect">
                  <option value="custom">Custom</option>
                  <option value="7">Last 7 Days</option>
                  <option value="30">Last 30 Days</option>
                </select>

                <div className="date-inputs">
                  <input type="date" id="startDate" defaultValue="2025-07-20" />
                  <span className="dash">—</span>
                  <input type="date" id="endDate" defaultValue="2025-07-25" />
                </div>
              </div>
  
              <select className="form-select small-input">
                <option value="">Status All</option>
              </select>
              <select className="form-select small-input">
                <option value="">Payment Method All</option>
              </select>
              <select className="form-select small-input">
                <option value="">Payment ID</option>
              </select>
            </div>
            <div className="tran-two">
              <div className="admin-reportone_search">
                <form action="#">
                  <center>
                    <div className="admin-fsearch-container">
                      <input
                        type="text"
                        className="admin-fsearch-input"
                        placeholder="Search..."
                      />
                      <span className="admin-fsearch-icon">
                        <button type="submit" className="admin-srch">
                          <i className="ri-search-line admin-fsrch_icn"></i>
                        </button>
                      </span>
                    </div>
                  </center>
                </form>
              </div>
            </div>
          </div>
        ) : (
          <div className="myfilters">
            <div className="filter-group">
              <label>Order ID</label>
              <input
                className="form-control small-input"
                type="text"
                placeholder="Settlement ID"
              />
            </div>
            <div className="filter-group">
              <label>Receipt</label>
              <input
                className="form-control small-input"
                type="text"
                placeholder="Receipt"
              />
            </div>
            <div className="filter-group">
              <label>Status</label>
              <select className="form-select small-input">
                <option value="">Select Status</option>
              </select>
            </div>
            <div className="filter-group">
              <label>Count</label>
              <input
                className="form-control small-input"
                type="number"
                placeholder="Count"
              />
            </div>
            <div className="filter-buttons">
              <button className="search-btn">Search</button>
              <button className="clear-btn">Clear</button>
            </div>
          </div>
        )}
      </div>

      {/* Table */}
      <div className="table-responsive fade-in">
        <table className="table table-striped settlement-table">
          <thead>
            <tr>
              {getTableHeaders().map((header, index) => (
                <th key={index}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {getTableData().map((row, index) => (
              <tr key={index}>
                {activeTab === "settlements" ? (
                  <>
                    <td>{row.paymentId}</td>
                    <td>{row.bankRRN}</td>
                    <td>{row.customerDetail}</td>
                    <td>{row.createdOn}</td>
                    <td>{row.amount}</td>
                    <td>
                      
                        {row.status}
                     
                    </td>
                   
                  </>
                ) : (
                  <>
                    <td>{row.orderId}</td>
                    <td>{row.amount}</td>
                    <td>{row.attempts}</td>
                    <td>{row.receipt}</td>
                    <td>{row.createdAt}</td>
                    <td>
                      
                        {row.status}
                      
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>

    </>
  );
}

export default Reportone;
