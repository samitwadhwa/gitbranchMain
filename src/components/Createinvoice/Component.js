"use client";
import { useState, useRef, useEffect } from "react";
import "@/styles/Invoices.css";



export default function InvoicePage() {
  
  const [isCustomerPopupOpen, setCustomerPopupOpen] = useState(false);
  const [isCustomerDropdownOpen, setIsCustomerDropdownOpen] = useState(false);

  const [isItemPopupOpen, setItemPopupOpen] = useState(false);
  const [lineItems, setLineItems] = useState([
    { description: "", rate: "0.00", qty: 1, total: "₹ 0.00" },
  ]);
  const [items, setItems] = useState(["Item A", "Item B"]);
  const newItemNameRef = useRef(null);
  const newItemRateRef = useRef(null);

  const dropdownRef = useRef(null);

  const [showCess, setShowCess] = useState(false);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsCustomerDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Add new line item
  const addLineItem = () => {
    setLineItems([
      ...lineItems,
      { description: "", rate: "0.00", qty: 1, total: "₹ 0.00" },
    ]);
  };


  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const [isBillingModalOpen, setBillingModalOpen] = useState(false);
  const [billingAddress, setBillingAddress] = useState(null);

  const [billingForm, setBillingForm] = useState({
    line1: "", line2: "", city: "", state: "", pincode: "", country: ""
  });

  // const dropdownRef = useRef(null);

  const customers = [
    { name: "Goel Enterprises", id: "cust_OsDYWn0dYeuGun", email: "", phone: "" },
    { name: "Sunjay Sharma", id: "cust_OpsN2wOmal1DxhE", email: "sunjaysharma1964@gmail.com", phone: "1234567890" },
    { name: "Goel Enterprises", id: "cust_OswwDYWn0dYeuGun", email: "", phone: "" },
    { name: "Ram Sharma", id: "cust_OpsN22Omal1DxhE", email: "ram@gmail.com", phone: "1234567890" },
  ];
//shipping address
const [shippingAddress, setShippingAddress] = useState(null)
const [shippingForm, setShippingForm] = useState({
  line1: "", line2: "", city: "", state: "", pincode: "", country: ""
})
const [isShippingModalOpen, setShippingModalOpen] = useState(false)

const handleShippingChange = (e) => {
  setShippingForm({...shippingForm, [e.target.name]: e.target.value})
}

const saveShippingAddress = () => {
  setShippingAddress({...shippingForm})
  setShippingModalOpen(false)
}



  // click outside dropdown
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsCustomerDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // handle billing form input
  const handleBillingChange = (e) => {
    setBillingForm({ ...billingForm, [e.target.name]: e.target.value });
  }

  // save billing address
  const saveBillingAddress = () => {
    setBillingAddress({ ...billingForm });
    setBillingModalOpen(false);
  }



  // Handle item selection
  const handleItemSelect = (e, index) => {
    if (e.target.value === "create") {
      setItemPopupOpen(true);
      e.target.value = ""; // reset
    } else {
      const updated = [...lineItems];
      updated[index].description = e.target.value;
      setLineItems(updated);
    }
  };

  // Save new item
  const saveNewItem = () => {
    const name = newItemNameRef.current.value;
    const rate = newItemRateRef.current.value;
    if (!name.trim()) {
      alert("Please enter item name");
      return;
    }
    setItems([...items, name]);
    setItemPopupOpen(false);
    newItemNameRef.current.value = "";
    newItemRateRef.current.value = "";
  };

  // Delete invoice
  const deleteInvoice = () => {
    if (confirm("Are you sure you want to delete this invoice?")) {
      document.getElementById("invoiceMain")?.remove();
    }
  };
  //places
  const places = [
    "Delhi", "Mumbai", "Bangalore", "Chennai", "Kolkata",
    "Hyderabad", "Pune", "Ahmedabad", "Jaipur", "Lucknow"
  ];

  const [search, setSearch] = useState("");
  const [selectedPlace, setSelectedPlace] = useState("");
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const wrapperRef = useRef(null);

  const filteredPlaces = places.filter(place =>
    place.toLowerCase().includes(search.toLowerCase())
  );

  // click outside handler
  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [wrapperRef]);

  return (
    <div id="myzapinvoicepay">
      <div className="main-wrapper" id="invoiceMain">
        {/* Invoice Box */}
        <div className="invoice-box">
          <div className="test-mode">
            Invoice is created in <b>Test Mode</b>. Only test payments can be
            made for this invoice
          </div>

          {/* Header */}
          <div className="header">
            <div className="company">
              <img src="https://i.ibb.co/2W7r9yF/zap.png" alt="ZapNow" />
              <div className="company-details">
                <h2>LESUS INNOVATIONS PRIVATE LIMITED</h2>
                <p>GSTIN - 06AAECL7230L1ZE</p>
                <p>CIN - U74999HR2021PTC097211</p>
              </div>
            </div>
            <div className="logo">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/3/3f/Razorpay_logo.png"
                alt="Razorpay"
              />
            </div>
          </div>

          {/* Invoice Info */}
          <div className="invoice-info">
            <h3>
              Invoice #{" "}
              <input
                type="text"
                className="underline-input"
                placeholder="Enter Invoice Number"
              />
            </h3>
            <input
              type="text"
              className="summary"
              placeholder="Enter a Brief Description or Summary"
            />
          </div>

          {/* Billing/Shipping Info */}
          <div className="grid">
            <div className="field">
        <label>BILLING TO</label>
        <div className="custom-select" ref={dropdownRef}>
          <div
            className="select-box"
            onClick={() => setIsCustomerDropdownOpen(!isCustomerDropdownOpen)}
          >
            {selectedCustomer ? selectedCustomer.name : "Select a customer"}
          </div>

          {isCustomerDropdownOpen && (
            <div className="dropdown-list">
              <div className="dropdown-items">
                {customers.map((cust, i) => (
                  <div
                    key={i}
                    className="dropdown-item"
                    onClick={() => { setSelectedCustomer(cust); setIsCustomerDropdownOpen(false); }}
                  >
                    <strong>{cust.name}</strong><br />
                    <small>({cust.id}) {cust.email}</small>
                  </div>
                ))}
              </div>
              <div
                className="create-new"
                onClick={() => { setCustomerPopupOpen(true); setIsCustomerDropdownOpen(false); }}
              >
                + Create New Customer
              </div>
            </div>
          )}
          {/* Selected Customer Details */}
      {selectedCustomer && (
        <div className="field">
          <p><strong>Name:</strong> {selectedCustomer.name}</p>
          {selectedCustomer.email && <p><strong>Email:</strong> {selectedCustomer.email}</p>}
          {selectedCustomer.phone && <p><strong>Phone:</strong> {selectedCustomer.phone}</p>}
        </div>
      )}
        </div>
      </div>
 

            {/* Customer Modal */}
            {isCustomerPopupOpen && (
              <div className="modal-overlay">
                <div className="modal-content small-modal2">
                  <div className="modal-header">
                    <h4 className="modal-title">New Customer</h4>
                  </div>
                  <span
                    className="modal-close"
                    onClick={() => setCustomerPopupOpen(false)}
                  >
                    &times;
                  </span>
                  <div className="modal-main">
                    {/* Form Fields */}
                    <label>Company/Individual Name</label>
                    <input className="form-control" type="text" placeholder="Enter customer name" />

                    <label>Email</label>
                    <input className="form-control" type="email" placeholder="Enter customer email" />

                    <label>Phone</label>
                    <input className="form-control" type="text" placeholder="Enter phone number" />
                    <label>GSTIN</label>
                    <input className="form-control" type="text" placeholder="Enter GSTIN" />

                    {/* Footer Buttons */}
                    <div className="modal-footer">
                      <button
                        className="submit-btn"
                        onClick={() => {
                          alert("Customer Saved!");
                          setCustomerPopupOpen(false);
                        }}
                      >
                        Add billing deails
                      </button>

                    </div>
                  </div>
                </div>
              </div>
            )}

             {/* BILLING ADDRESS */}
      <div className="field">
        <label>BILLING ADDRESS</label>
        {!billingAddress && (
          <button className="add-billing-btn" onClick={() => setBillingModalOpen(true)}>
           + Add Billing Address
          </button>
        )}

        {/* Show saved billing address */}
        {billingAddress && (
          <div className="billing-details">
            {billingAddress.line1 && <p>{billingAddress.line1}</p>}
            {billingAddress.line2 && <p>{billingAddress.line2}</p>}
            {billingAddress.city && <p>{billingAddress.city}</p>}
            {billingAddress.state && <p>{billingAddress.state}</p>}
            {billingAddress.pincode && <p>{billingAddress.pincode}</p>}
            {billingAddress.country && <p>{billingAddress.country}</p>}
          </div>
        )}
      </div>

      {/* Billing Address Modal */}
      {isBillingModalOpen && (
        <div className="modal-overlay">
  <div className="modal-content small-modal2">
    <div className="modal-header"><h4>Billing Address</h4></div>
    <span className="modal-close" onClick={() => setBillingModalOpen(false)}>&times;</span>
    <div className="modal-main">
      <label>Address Line 1</label>
      <input name="line1" className="form-control" placeholder="Enter Address Line 1" onChange={handleBillingChange} />
      <label>Address Line 2</label>
      <input name="line2" className="form-control" placeholder="Enter Address Line 2" onChange={handleBillingChange} />
      <label>City</label>
      <input name="city" className="form-control" placeholder="Enter City" onChange={handleBillingChange} />
      <label>State</label>
      <input name="state" className="form-control" placeholder="Enter State" onChange={handleBillingChange} />
      
      <label>Country</label>
      <input name="country" className="form-control" placeholder="Enter Country" onChange={handleBillingChange} />

      <div className="modal-footer">
        <button className="submit-btn" onClick={saveBillingAddress}>Save</button>
        <button className="cancel-btn" onClick={() => setBillingModalOpen(false)}>Cancel</button>
      </div>
    </div>
  </div>
</div>

      )}


            <div className="field">
              <label>ISSUE DATE</label>
              <input type="date" defaultValue="2025-09-02" />
            </div>
            <div className="field">
  <label>SHIPPING ADDRESS</label>
  {!shippingAddress && (
    <button className="add-billing-btn" onClick={() => setShippingModalOpen(true)}>
      + Add Shipping Address
    </button>
  )}

  {/* Show saved shipping address */}
  {shippingAddress && (
    <div className="billing-details">
      {shippingAddress.line1 && <p>{shippingAddress.line1}</p>}
      {shippingAddress.line2 && <p>{shippingAddress.line2}</p>}
      {shippingAddress.city && <p>{shippingAddress.city}</p>}
      {shippingAddress.state && <p>{shippingAddress.state}</p>}
      {shippingAddress.pincode && <p>{shippingAddress.pincode}</p>}
      {shippingAddress.country && <p>{shippingAddress.country}</p>}
    </div>
  )}
</div>

{/* Shipping Address Modal */}
{isShippingModalOpen && (
  <div className="modal-overlay">
    <div className="modal-content small-modal2">
      <div className="modal-header"><h4>Shipping Address</h4></div>
      <span className="modal-close" onClick={() => setShippingModalOpen(false)}>&times;</span>
      <div className="modal-main">
        <label>Address Line 1</label>
        <input name="line1" className="form-control" value={shippingForm.line1} onChange={handleShippingChange} />
        <label>Address Line 2</label>
        <input name="line2" className="form-control" value={shippingForm.line2} onChange={handleShippingChange} />
        <label>City</label>
        <input name="city" className="form-control" value={shippingForm.city} onChange={handleShippingChange} />
        <label>State</label>
        <input name="state" className="form-control" value={shippingForm.state} onChange={handleShippingChange} />
       
        <label>Country</label>
        <input name="country" className="form-control" value={shippingForm.country} onChange={handleShippingChange} />

        <div className="modal-footer">
          <button className="submit-btn" onClick={saveShippingAddress}>Save</button>
          <button className="cancel-btn" onClick={() => setShippingModalOpen(false)}>Cancel</button>
        </div>
      </div>
    </div>
  </div>
)}
            <div className="field">
              <label>EXPIRY DATE</label>
              <input type="date" placeholder="Expiry Date" />
            </div>
            <div id="mtpq">
              <div className="field-wrapper" ref={wrapperRef}>
                <label className="label">PLACE OF SUPPLY</label>
                <input
                  type="text"
                  placeholder="Search Place"
                  value={search}
                  onChange={(e) => { setSearch(e.target.value); setDropdownOpen(true); }}
                  onClick={() => setDropdownOpen(true)}
                  className="input-field"
                  autoComplete="off"
                />
                {isDropdownOpen && filteredPlaces.length > 0 && (
                  <ul className="dropdown-list">
                    {filteredPlaces.map((place, i) => (
                      <li
                        key={i}
                        className="dropdown-item"
                        onClick={() => { setSelectedPlace(place); setSearch(place); setDropdownOpen(false); }}
                      >
                        {place}
                      </li>
                    ))}
                  </ul>
                )}
                {!selectedPlace && <div className="note-box">Add a Place of Supply to apply taxes</div>}
              </div>
            </div>
          </div>

          {/* Item Table */}
          <table id="itemTable">
            <thead>
              <tr>
                <th style={{ width: "50%" }}>DESCRIPTION</th>
                <th style={{ width: "20%" }}>RATE/ITEM</th>
                <th style={{ width: "10%" }}>QTY</th>
                <th style={{ width: "20%" }}>TOTAL</th>
              </tr>
            </thead>
            <tbody>
              {lineItems.map((row, index) => (
                <tr key={index}>
                  {/* Item Select Dropdown in Table */}
                  <td>
                    <select
                      value={row.description}
                      onChange={(e) => {
                        if (e.target.value === "create") {
                          setItemPopupOpen(true);  // modal open
                          setShowCess(false);      // reset Cess toggle
                        } else {
                          handleItemSelect(e, index); // normal selection
                        }
                      }}
                    >
                      <option value="">Select an item</option>
                      {items.map((it, i) => (
                        <option key={i} value={it}>{it}</option>
                      ))}
                      <option value="create">+ Create Item</option>
                    </select>
                  </td>

                  <td>
                    <input type="text" defaultValue={row.rate} />
                  </td>
                  <td>
                    <input type="number" defaultValue={row.qty} />
                  </td>
                  <td>{row.total}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <span className="add-line" onClick={addLineItem}>
            + Add Line Item
          </span>


          {/* Item Modal */}
          {isItemPopupOpen && (
            <div className="modal-overlay">
              <div className="modal-content large-modal">
                <div className="modal-header"><h4 className="modal-title">Add Item</h4></div>
                <span className="modal-close" onClick={() => { setItemPopupOpen(false); setShowCess(false); }}>&times;</span>
                <div className="modal-body">
                  <div className="form-row">
                    <div className="form-group half"><label>Name <span className="required">*</span></label><input type="text" className="form-control" placeholder="Item Name" /></div>
                    <div className="form-group half"><label>Description</label><textarea className="form-control" rows="2" placeholder="Enter description"></textarea></div>
                  </div>
                  <div className="form-row">
                    <div className="form-group half">
                      <label>Rate <span className="required">*</span></label>
                      <div className="rate-wrapper"><span className="currency">₹</span><input type="number" className="form-control" placeholder="Amount" /><span className="per-unit">per unit</span></div>
                      <div className="note">To change item's currency please change currency of invoice</div>
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group half">
                      <label>Tax Rate</label>
                      <select className="form-select"><option>Select Tax Rate</option><option>0%</option><option>5%</option><option>12%</option><option>18%</option></select>
                      <small>Tax breakup will be calculated automatically.</small>
                      {!showCess && (<a href="#" className="add-cess" onClick={(e) => { e.preventDefault(); setShowCess(true); }}>+ Add Cess</a>)}
                      {showCess && (
                        <div className="cess-wrapper">
                          <div className="rate-wrapper"><input type="number" className="form-control" placeholder="Cess Amount" /><span className="per-unit">%</span></div>
                          <div className="radio-group"><label><input type="radio" name="taxType" /> Tax Inclusive</label><label><input type="radio" name="taxType" /> Tax Exclusive</label></div>
                        </div>
                      )}
                    </div>
                    <div className="form-group half">
                      <label>HSN/SAC Code</label>
                      <div className="radio-group"><label><input type="radio" name="codeType" /> HSN Code</label><label><input type="radio" name="codeType" /> SAC Code</label></div>
                      <input type="text" className="form-control" placeholder="HSN/SAC Code" />
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button className="cancel-btn" onClick={() => { setItemPopupOpen(false); setShowCess(false); }}>Cancel</button>
                  <button className="submit-btn">Save</button>
                </div>
              </div>
            </div>
          )}

          {/* Total */}
          <div className="total">Total Amount ₹ 0.00</div>

          {/* Notes */}
          <div className="notes">
            <h4>CUSTOMER NOTES</h4>
            <input type="text" placeholder="Add Customer Notes" />
          </div>
          <div className="notes">
            <h4>TERMS AND CONDITIONS</h4>
            <input type="text" placeholder="Add Terms and Conditions" />
          </div>

          {/* Footer */}
          <div className="footer">
            <h4>LESUS INNOVATIONS PRIVATE LIMITED</h4>
            <p>
              FLAT NO.L-1-23,, GF, SECTOR-84,, BPTP FARIDABAD, Faridabad,
              Haryana, India - 121002
            </p>
          </div>
        </div>

        {/* Right Panel */}
        <div className="right-panel">
          <button className="finalize">✔ Finalize and Issue</button>
          <button className="save">💾 Save Invoice</button>
          <button className="delete" onClick={deleteInvoice}>
            ✖ Delete Invoice
          </button>
          <div className="settings">
            <h5>SETTINGS</h5>
            <label>
              <input type="checkbox" /> Enable Partial Payments
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
