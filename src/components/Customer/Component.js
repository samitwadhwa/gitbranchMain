import React, { useState, useEffect, useRef } from "react";
import "@/styles/Customer.css";

const CustomerTable = () => {
  const [isCustomerPopupOpen, setCustomerPopupOpen] = useState(false);
  const [isCustomerDropdownOpen, setIsCustomerDropdownOpen] = useState(false);
   const [isEditPopupOpen, setEditPopupOpen] = useState(false);
  const [isEditDropdownOpen, setIsEditDropdownOpen] = useState(false);

  // Ref for dropdown
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsEditDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  const [customers, setCustomers] = useState([
    {
      id: "cust_RF4ESF9rouCj69",
      name: "Arjun Singh",
      email: "zapnow.arjun@gmail.com",
      contact: "8744018060",
      gstin: "22AAAAA0000A1Z5",
    },
     {
      id: "cust_4ESjiosijfr9rouj69",
      name: "Komal Lamba",
      email: "komallamba34@gmail.com",
      contact: "87440178460",
      gstin: "22AAA99900A1Z5",
    },
    {
      id: "cust_4ESjiosijfr9rouj69",
      name: "Krishan Varshney",
      email: "komallamba34@gmail.com",
      contact: "87440178460",
      gstin: "22AAA99900A1Z5",
    },
    // add more customers here
  ]);


  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const handleEdit = (customer) => {
    setSelectedCustomer(customer);
    setEditPopupOpen(true);
  };

  const handleSave = () => {
    alert("Customer Saved!");
    setEditPopupOpen(false);
    // here you can also update customers state via setCustomers
  };

  return (
    <div id="customer-container">
      <div className="customer-header">
        <h3>Customers</h3>
        <button
          className="new-customer-btn"
          onClick={() => {
            setCustomerPopupOpen(true);
            setIsCustomerDropdownOpen(false);
          }}
        >
          + New Customer
        </button>
      </div>

      {/* Popup Modal */}
      {isCustomerPopupOpen && (
        <div className="modal-overlay">
          <div className="modal-content small-modal2">
            <div className="modal-header">
              <h4 className="modal-title">Add Customer</h4>
            </div>
            <span
              className="modal-close"
              onClick={() => setCustomerPopupOpen(false)}
            >
              &times;
            </span>
            <div className="modal-main">
              <label>Company/Individual Name</label>
              <input
                className="form-control"
                type="text"
                placeholder="Enter customer name"
              />

              <label>Email</label>
              <input
                className="form-control"
                type="email"
                placeholder="Enter customer email"
              />

              <label>Contact No.</label>
              <input
                className="form-control"
                type="text"
                placeholder="Enter phone number"
              />

              <label>GSTIN</label>
              <input
                className="form-control"
                type="text"
                placeholder="Enter GSTIN"
              />

              <div className="modal-footer">
                <button
                  className="submit-btn"
                  onClick={() => {
                    alert("Customer Saved!");
                    setCustomerPopupOpen(false);
                  }}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Info Box */}
      <div className="test-mode-box">
        You are in <b>Test Mode</b>, so only test data is shown. Switch to{" "}
        <a href="#">Live mode</a> to see real transaction data.
      </div>

     
      <div className="table-responsive table-wrapper">
      <table className="table customer-table">
        <thead>
          <tr>
            <th>Customer Id</th>
            <th>Customer Name</th>
            <th>Email</th>
            <th>Contact</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((cust) => (
            <tr key={cust.id}>
              <td>
                <a href="#">{cust.id}</a>
              </td>
              <td>
                <a href="#">{cust.name}</a>
              </td>
              <td>{cust.email}</td>
              <td>{cust.contact}</td>
              <td>
                <button className="edit-btn" onClick={() => handleEdit(cust)}>
                  <i className="ri-pencil-line"></i> Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="table-footer">Showing 1 - {customers.length}</div>

      {/* Edit Modal */}
      {isEditPopupOpen && selectedCustomer && (
        <div className="modal-overlay">
          <div className="modal-content small-modal2">
            <div className="modal-header">
              <h4 className="modal-title">Edit Customer</h4>
            </div>
            <span
              className="modal-close"
              onClick={() => setEditPopupOpen(false)}
            >
              &times;
            </span>
            <div className="modal-main">
              <label>Company/Individual Name</label>
              <input
                className="form-control"
                type="text"
                value={selectedCustomer.name}
                onChange={(e) =>
                  setSelectedCustomer({
                    ...selectedCustomer,
                    name: e.target.value,
                  })
                }
              />

              <label>Email</label>
              <input
                className="form-control"
                type="email"
                value={selectedCustomer.email}
                onChange={(e) =>
                  setSelectedCustomer({
                    ...selectedCustomer,
                    email: e.target.value,
                  })
                }
              />

              <label>Contact No.</label>
              <input
                className="form-control"
                type="text"
                value={selectedCustomer.contact}
                onChange={(e) =>
                  setSelectedCustomer({
                    ...selectedCustomer,
                    contact: e.target.value,
                  })
                }
              />

              <label>GSTIN</label>
             
            
              <input
                className="form-control"
                type="text"
                value={selectedCustomer.gstin}
                onChange={(e) =>
                  setSelectedCustomer({
                    ...selectedCustomer,
                    gstin: e.target.value,
                  })
                }

              />
              <div className="footer-above">Note : The updated customer details will be reflected everywhere in the world</div>
               


              <div className="modal-footer">
                <button className="submit-btn" onClick={handleSave}>
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
    </div>
  );
};

export default CustomerTable;
