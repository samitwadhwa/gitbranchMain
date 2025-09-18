"use client";
import React, { useState, useEffect } from "react";
import { QRCodeCanvas } from "qrcode.react";
import "@/styles/Qrcode.css";
import Link from 'next/link';

const GetStarted = () => {
  const [activeTab, setActiveTab] = useState("qrcodes");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTourModalOpen, setIsTourModalOpen] = useState(false);
  const [accordionOpen, setAccordionOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  // Backend API base (same pattern as transactions)
  const API_BASE = (process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3210').replace(/\/$/, '');
  const [qrType, setQrType] = useState("dynamic"); // dynamic | static

  // Form data (for API payloads)
  const [formData, setFormData] = useState({
    // UI helpers
    qrUsage: "multiple",
    fixedAmount: "no",
    description: "",
    name: "",
    amount: "",
    customerId: "",
    expiry: "",
    notes: "",
    // API fields (shared + dynamic/static)
    clientTxnId: "",
    serviceId: "9072", // 9072 dynamic, 9073 static
    txnAmount: "",
    txnNote: "",
    payeeVPA: "",
    txnReference: "",
    ExpiryTime: "5",
    mobileNumber: "",
  });

  const [qrData, setQrData] = useState("");
  const [qrBase64, setQrBase64] = useState("");
  const [qrImageUrl, setQrImageUrl] = useState("");
  const [qrError, setQrError] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [qrRows, setQrRows] = useState([]);
  const [qrLoading, setQrLoading] = useState(false);

  // Keep serviceId synced with selected QR type
  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      serviceId: qrType === "dynamic" ? "9072" : "9073",
    }));
  }, [qrType]);

  // No manual cookie writes; read auth_token like transactions

  const getCookie = (name) => {
    if (typeof document === 'undefined') return '';
    const match = document.cookie.match(new RegExp('(^|; )' + name.replace(/([.$?*|{}()\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)'));
    return match ? decodeURIComponent(match[2]) : '';
  };

  const formatDDMMYYYY = (d) => {
    if (!(d instanceof Date) || isNaN(d)) return '—';
    const dd = String(d.getDate()).padStart(2, '0');
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const yyyy = d.getFullYear();
    return `${dd}-${mm}-${yyyy}`;
  };

  // Fetch existing Dynamic QR codes for merchant
  const fetchQrCodes = async () => {
    setQrLoading(true);
    setQrError(null);
    try {
      const token = getCookie('auth_token');
      const res = await fetch(`${API_BASE}/merchant-qr?merchantId=7`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { 'Cookie': `auth_token=${token}` } : {})
        },
        credentials: 'include'
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || 'Failed to fetch QR codes');
      }
      const mapped = (Array.isArray(data) ? data : []).map((q) => {
        const created = q.createdAt ? new Date(q.createdAt) : null;
        const updated = q.updatedAt ? new Date(q.updatedAt) : null;
        return {
          qrId: String(q.id),
          upiId: q.upiId || '-',
          mobileNumber: q.mobileNumber || '-',
          txnNote: q.txnNote || '-',
          createdAtFmt: formatDDMMYYYY(created),
          updatedAtFmt: formatDDMMYYYY(updated),
          qrCode: q.qrCode || ''
        };
      });
      setQrRows(mapped);
    } catch (e) {
      setQrError(e.message);
    } finally {
      setQrLoading(false);
    }
  };

  useEffect(() => {
    fetchQrCodes();
  }, []);

  const qrCodeData = qrRows;

  const paymentData = [
    { paymentId: "pay001", amount: "₹ 499.00", email: "cust001@example.com", contact: "+91 9876543210", createdAt: "Jul 20 2025, 08:00", status: "Success" },
    { paymentId: "pay002", amount: "₹ 999.00", email: "cust002@example.com", contact: "+91 9876501234", createdAt: "Aug 03 2025, 11:30", status: "Failed" }
  ];

  const getTableData = () => activeTab === "qrcodes" ? qrCodeData : paymentData;

  // handle input
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Validators (minimal per spec)
  const isDynamicValid = () => {
    const { payeeVPA, mobileNumber } = formData;
    if (!payeeVPA || payeeVPA.length < 4) return false;
    if (!mobileNumber || mobileNumber.length < 10) return false;
    return true;
  };

  const isStaticValid = () => {
    const { clientTxnId, serviceId, txnNote, payeeVPA } = formData;
    if (!clientTxnId || clientTxnId.length < 8 || clientTxnId.length > 35) return false;
    if (serviceId !== "9073") return false;
    if (!txnNote || txnNote.length < 4 || txnNote.length > 20) return false;
    if (!payeeVPA || payeeVPA.length < 4 || payeeVPA.length > 35) return false;
    return true;
  };

  const toDataUrlFromBase64 = (b64) => `data:image/png;base64,${b64}`;

  // Call backend APIs to generate QR
  const handleCreate = async () => {
    setQrError(null);
    setSubmitting(true);
    console.log("inside create function");
    
    try {
      // Guard validate here instead of disabling the button
      const valid = qrType === "dynamic" ? isDynamicValid() : isStaticValid();
      if (!valid) {
        throw new Error(qrType === "dynamic" ? "Please fill all required Dynamic QR fields correctly." : "Please fill all required Static QR fields correctly.");
      }
      const isDynamic = qrType === "dynamic";
      const endpoint = isDynamic ? 
        `${API_BASE}/merchant-qr` : 
        `${API_BASE}/static-qr`;

      // Ensure serviceId per type
      const serviceId = isDynamic ? "9072" : "9073";

      const payload = isDynamic ? {
        transactionNote: formData.mobileNumber,
        upiId: formData.payeeVPA,
      } : {
        clientTxnId: formData.clientTxnId,
        serviceId,
        txnNote: formData.txnNote,
        payeeVPA: formData.payeeVPA,
      };

      // Basic guard now handled above

      const token = getCookie('auth_token');
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          ...(token ? { 'Cookie': `auth_token=${token}` } : {})
        },
        credentials: "include",
        body: JSON.stringify(payload),
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.ResponseMessage || data.message || "QR generation failed");
      }

      // Prefer direct QR image URL if provided by backend; fallback to base64
      const qrUrl = data.qrCode || data.data?.qrCode || "";
      const base64 = data.ResponseData || data.responseData || "";
      if (qrUrl) {
        setQrImageUrl(qrUrl);
      } else if (base64) {
        setQrBase64(base64);
      }
      setQrData(JSON.stringify(payload));
    setIsModalOpen(false);
    setIsSuccessModalOpen(true);
    } catch (e) {
      setQrError(e.message);
    } finally {
      setSubmitting(false);
    }
  };

  // Validation (UI enable)
  const isFormValid = qrType === "dynamic" ? isDynamicValid() : isStaticValid();

  return (
    <>
      {/* Get Started Section */}
      <div id="myqrcodeprocess">
        <div className="get-started-wrapper">
          <h3 className="mb-5 text-left">Get Started</h3>
          <div className="steps-container">
            <div className="step-item">
              <div className="step-circle active"><span>1</span></div>
              <div className="step-content mt-3">
                <h6>Create QR Code</h6>
                <p>Generate custom QR Codes for your business to receive payments.</p>
              </div>
            </div>
            <div className="step-line"></div>
            <div className="step-item">
              <div className="step-circle"><span>2</span></div>
              <div className="step-content mt-3">
                <h6>Track Payments</h6>
                <p>Manage and monitor your payment history in real-time.</p>
              </div>
            </div>
            <div className="step-item">
              <img src="../img/chiku.png" alt="Get Started" className="img-fluid mychiku" />
            </div>
          </div>
        </div>
      </div>

      <div id="myqrcodewrapper">
        {/* Header */}
        <div className="hender">
          <div className="tabs">
            <button className={activeTab === "qrcodes" ? "tab active" : "tab"} onClick={() => setActiveTab("qrcodes")}>QR Codes</button>
            <button className={activeTab === "payments" ? "tab active" : "tab"} onClick={() => setActiveTab("payments")}>Payments</button>
          </div>
          <div id="righti">
            {/* <Link href="/qrcodetour"> */}
            <span className="tabi" onClick={() => setIsTourModalOpen(true)} style={{ cursor: "pointer" }} >
              <i className="ri-lightbulb-line"></i> Need Help ? take a tour</span>
            {isTourModalOpen && (
              <div className="modal-overlay">
                <div className="modal-content small-modal">
                  <div className="modal-header"><h4 className="modal-title">Restart the Tour?</h4><p>This tour will give you a quick guide on this product.</p></div>
                  <span className="modal-close" onClick={() => setIsTourModalOpen(false)}>&times;</span>
                  <div className="modal-footer">
                    <button className="no-btn" onClick={() => setIsTourModalOpen(false)}>No</button>
                    <a href="/qrcodetour" className="yes-btn">Yes</a>
                  </div>
                </div>
              </div>
            )}
            {/* </Link> */}
            <span className="tabi"><i className="ri-file-list-3-line"></i> Documentation</span>
            {activeTab === "qrcodes" && (
              <span className="tabi">
                <button className="create-btn" onClick={() => setIsModalOpen(true)}>+ Create New QR Code</button>
              </span>
            )}
          </div>
        </div>

        {/* Filters */}
        {activeTab === "qrcodes" && (
          <div className="myfilters">
            <div className="filter-group">
              <label>QR Code Status</label>
              <select className="form-select small-input">
                <option value="">Select Status</option>
              </select>
            </div>
            <div className="filter-group">
              <label>QR Code ID</label>
              <input
                className="form-control small-input"
                type="text"
                placeholder="QR Code ID"
              />
            </div>



            <div className="filter-group">
              <label>QR Name</label>
              <input
                className="form-control small-input"
                type="text"
                placeholder="QR Name"
              />
            </div>
            <div className="filter-group">
              <label>Customer Name</label>
              <input
                className="form-control small-input"
                type="text"
                placeholder="Customer Name"
              />
            </div>


            <div className="filter-group">
              <label>Customer Email</label>
              <input
                className="form-control small-input"
                type="number"
                placeholder="Customer Email"
              />
            </div>
            <div className="filter-group">
              <label>Customer Contact</label>
              <input
                className="form-control small-input"
                type="number"
                placeholder="Customer Contact"
              />
            </div>
            <div className="filter-group">
              <label>Notes</label>
              <input
                className="form-control small-input"
                type="number"
                placeholder="Notes"
              />
            </div>
            <div className="filter-buttons">
              <button className="search-btn">Search</button>
              <button className="clear-btn">Clear</button>
            </div>
          </div>
        )}

        {activeTab === "payments" && (
          <div className="myfilters">

            <div className="filter-group">
              <label>QR Code ID</label>
              <input
                className="form-control small-input"
                type="text"
                placeholder="QR Code ID"
              />
            </div>



            <div className="filter-group">
              <label>Payment Id</label>
              <input
                className="form-control small-input"
                type="text"
                placeholder="Payment Id"
              />
            </div>
            <div className="filter-group">
              <label>Payment Status</label>
              <select className="form-select small-input">
                <option value="">Select Status</option>
              </select>
            </div>
            <div className="filter-group">
              <label>Email</label>
              <input
                className="form-control small-input"
                type="text"
                placeholder="Email"
              />
            </div>


            <div className="filter-group">
              <label>Bank Reference Number </label>
              <input
                className="form-control small-input"
                type="number"
                placeholder="Bank Reference Number"
              />
            </div>
            <div className="filter-group">
              <label>Notes</label>
              <input
                className="form-control small-input"
                type="text"
                placeholder="Notes"
              />
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

        {/* Tables */}
        <div className="table-responsive">
          <table className="table table-striped settlement-table">
            <thead>
              {activeTab === "qrcodes" ? (
                <tr>
                  <th>QR Code ID</th>
                  <th>UPI Id</th>
                  <th>Mobile Number</th>
                  <th>Txn Note</th>
                  <th>Created</th>
                  <th>Updated</th>
                  <th>QR Code</th>
                </tr>
              ) : (
                <tr>
                  <th>Payment Id</th>
                  <th>Amount</th>
                  <th>Email</th>
                  <th>Contact</th>
                  <th>Created At</th>
                  <th>Status</th>
                </tr>
              )}
            </thead>
            <tbody>
              {getTableData().map((row, i) => (
                <tr key={i}>
                  {activeTab === "qrcodes" ? (
                    <>
                      <td>{row.qrId}</td>
                      <td>{row.upiId}</td>
                      <td>{row.mobileNumber}</td>
                      <td>{row.txnNote}</td>
                      <td>{row.createdAtFmt}</td>
                      <td>{row.updatedAtFmt}</td>
                      <td>
                        {row.qrCode ? (
                          <a className="text-blue" href={row.qrCode} download target="_blank" rel="noreferrer">
                            {row.qrCode.length > 40 ? `${row.qrCode.slice(0, 40)}...` : row.qrCode}
                          </a>
                        ) : '—'}
                      </td>
                    </>
                  ) : (
                    <>
                      <td>{row.paymentId}</td>
                      <td>{row.amount}</td>
                      <td>{row.email}</td>
                      <td>{row.contact}</td>
                      <td>{row.createdAt}</td>
                      <td>
                        <span
                          className={`status-pill ${row.status === "Success"
                            ? "green"
                            : row.status === "Failed"
                              ? "red"
                              : "orange"
                            }`}
                        >
                          {row.status}
                        </span>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>

        </div>

        {/* Create QR Modal */}
        {isModalOpen && (
          <div className="modal-overlay">
            <div className="modal-content">
              <div className="modal-header">
                <h4>Create QR Code</h4>
                <p>Provide details to generate a new QR Code</p>
              </div>
              <span className="modal-close" onClick={() => setIsModalOpen(false)}>&times;</span>

              <div className="modal-body overflow-scroll">
                {/* Type toggle */}
                <div className="form-group">
                  <label>QR Type</label>
                  <div className="radio-group">
                    <label><input type="radio" name="qrType" value="dynamic" checked={qrType === "dynamic"} onChange={() => setQrType("dynamic")}/> Dynamic</label>
                    <label><input type="radio" name="qrType" value="static" checked={qrType === "static"} onChange={() => setQrType("static")}/> Static</label>
                  </div>
                </div>

                {/* Dynamic QR fields only (UPI Id + Mobile Number) */}
                {qrType === "dynamic" && (
                  <>
                    <div className="grid-two">
                <div className="form-group">
                        <label>UPI Id</label>
                        <input className="form-control" type="text" name="payeeVPA" value={formData.payeeVPA} onChange={handleChange} placeholder="name@bank" />
                </div>
                <div className="form-group">
                        <label>Mobile Number</label>
                        <input className="form-control" type="text" name="mobileNumber" value={formData.mobileNumber} onChange={handleChange} placeholder="97179xxxxx" />
                </div>
                </div>
                  </>
                )}

                {/* Static QR fields */}
                {qrType === "static" && (
                  <>
                <div className="form-group">
                      <label>Client Txn ID</label>
                      <input className="form-control" type="text" name="clientTxnId" value={formData.clientTxnId} onChange={handleChange} placeholder="Unique client request id" />
                </div>

                    <div className="grid-two">
                <div className="form-group">
                        <label>Txn Note</label>
                        <input className="form-control" type="text" name="txnNote" value={formData.txnNote} onChange={handleChange} placeholder="Food Payment" />
                      </div>
                      <div className="form-group">
                        <label>Payee VPA</label>
                        <input className="form-control" type="text" name="payeeVPA" value={formData.payeeVPA} onChange={handleChange} placeholder="name@bank" />
                      </div>
                    </div>
                  </>
                  )}


                {qrError && <div className="alert alert-danger" role="alert">{qrError}</div>}

                {/* Footer */}
                <div className="modal-footer">
                  <button className="no-btn" onClick={() => setIsModalOpen(false)}>Cancel</button>
                  <button className="yes-btn" disabled={submitting} onClick={handleCreate}>{submitting ? 'Creating...' : 'Create'}</button>
                </div>
              </div>
            </div>
          </div>
        )}


        {/* Success Modal */}
        {isSuccessModalOpen && (
          <div className="modal-overlay">
            <div className="modal-content success-modal">
              <div className="modal-header"><h4 className="modal-title">QR Code Created Successfully</h4><span className="modal-close" onClick={() => setIsSuccessModalOpen(false)}>&times;</span></div>
              <div className="modal-body text-center">
                {qrImageUrl ? (
                  <img src={qrImageUrl} alt="Generated QR" style={{ maxWidth: 220 }} />
                ) : qrBase64 ? (
                  <img src={toDataUrlFromBase64(qrBase64)} alt="Generated QR" style={{ maxWidth: 220 }} />
                ) : (
                  <QRCodeCanvas value={qrData || 'QR'} size={200} />
                )}
                <p className="mt-3"><b>{formData.txnNote || formData.name}</b>{formData.txnAmount ? ` — ₹${formData.txnAmount}` : ''}</p>
              </div>
              <div className="modal-footer">
                <button className="no-btn" onClick={() => setIsSuccessModalOpen(false)}>Close</button>
                <button
                  className="yes-btn"
                  onClick={() => {
                    const pngUrl = qrImageUrl
                      ? qrImageUrl
                      : qrBase64
                        ? toDataUrlFromBase64(qrBase64)
                        : document.querySelector("canvas").toDataURL("image/png").replace("image/png", "image/octet-stream");
                    const downloadLink = document.createElement("a");
                    downloadLink.href = pngUrl;
                    downloadLink.download = "qrcode.png";
                    document.body.appendChild(downloadLink);
                    downloadLink.click();
                    document.body.removeChild(downloadLink);
                  }}
                >
                  Download QR Code
                </button>
              </div>
            </div>
          </div>
        )}
        <div className="admin-under_filters">
          <div className="admin-under_head">
            <p className="admin-items1 mb-0">Items per page</p>
            <div className="mb-0">
              <select name="cars" id="feald40" className="form-select">
                <option value="volvo" disabled selected>
                  Select one
                </option>
                <option value="saab">1</option>
                <option value="mercedes">2</option>
                <option value="audi">3</option>
              </select>
            </div>
          </div>
          <div id="under_pagination" className="under_pagination">
            <nav aria-label="Page navigation example">
              <ul className="pagination mb-0">
                <li className="page-item">
                  <a className="page-link" href="#" aria-label="Previous">
                    <span aria-hidden="true">&laquo;</span>
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link active" href="#">
                    1
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#">
                    2
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#">
                    3
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#" aria-label="Next">
                    <span aria-hidden="true">&raquo;</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
};

export default GetStarted;
