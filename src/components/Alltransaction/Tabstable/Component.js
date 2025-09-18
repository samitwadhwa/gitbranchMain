import { useState, useEffect } from "react";

import Link from "next/link";
export default function SettlementPage() {
  const [activeTab, setActiveTab] = useState("settlements");
  const [settlementsData, setSettlementsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const API_BASE = (process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3210').replace(/\/$/, '');
  // Filters state (Payments tab)
  const [statusFilter, setStatusFilter] = useState("");
  const [dateRange, setDateRange] = useState("last7");
  const [paymentIdQuery, setPaymentIdQuery] = useState("");
  // Pagination state (Payments tab)
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalCount, setTotalCount] = useState(0);

  // Fetch transactions from API
  const getCookie = (name) => {
    if (typeof document === 'undefined') return '';
    const match = document.cookie.match(new RegExp('(^|; )' + name.replace(/([.$?*|{}()\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)'));
    return match ? decodeURIComponent(match[2]) : '';
  };

  const fetchTransactions = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = getCookie('auth_token');
      const params = new URLSearchParams({ page: String(currentPage), limit: String(itemsPerPage) });
      const response = await fetch(`${API_BASE}/transaction/transactions?${params.toString()}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { 'auth_token': token } : {})
        },
        credentials: 'include'
      });
      const result = await response.json();

      if (Array.isArray(result.transactions)) {
        // Map API data to component format
        const mappedData = result.transactions.map((transaction) => {
          const merchantId = transaction.merchant?.id ?? transaction.merchantId ?? 'N/A';
          const createdAtDate = transaction.createdAt ? new Date(transaction.createdAt) : null;
          return {
            paymentId: String(transaction.id),
            bankRRN: transaction.UPIRefID || 'N/A',
            customerDetail: `Merchant ${merchantId}`,
            createdOn: createdAtDate
              ? createdAtDate.toLocaleDateString('en-US', {
                  month: 'short',
                  day: '2-digit',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })
              : '—',
            createdAtRaw: createdAtDate || new Date(0),
            amount: `₹ ${transaction.amount}`,
            status:
              typeof transaction.status === 'string' && transaction.status.length > 0
                ? transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)
                : 'Unknown',
            type: transaction.type,
            platformFeeAmount: transaction.platformFeeAmount,
            qrCode: transaction.qrCode,
          };
        });
        setSettlementsData(mappedData);
        if (typeof result.total === 'number') {
          setTotalCount(result.total);
        } else {
          setTotalCount(mappedData.length);
        }
        setError(null);
      } else {
        setError('Failed to fetch transactions');
      }
    } catch (err) {
      setError('Error fetching transactions: ' + err.message);
      console.error('Error fetching transactions:', err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchTransactions();
  }, [currentPage, itemsPerPage]);

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
        "Action",
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

  // Sort payments by newest first (createdAt), fallback to numeric id desc
  const sortedPayments = [...settlementsData].sort((a, b) => {
    const timeDiff = (b.createdAtRaw?.getTime?.() || 0) - (a.createdAtRaw?.getTime?.() || 0);
    if (timeDiff !== 0) return timeDiff;
    const aId = Number(a.paymentId);
    const bId = Number(b.paymentId);
    if (!Number.isNaN(aId) && !Number.isNaN(bId)) {
      return bId - aId;
    }
    return 0;
  });

  // Derived: apply filters (Payments tab)
  const filteredPayments = sortedPayments.filter(row => {
    // Status filter
    if (statusFilter && row.status.toLowerCase() !== statusFilter.toLowerCase()) {
      return false;
    }
    // Payment ID query filter (contains)
    if (paymentIdQuery && !row.paymentId.toLowerCase().includes(paymentIdQuery.toLowerCase())) {
      return false;
    }
    // Date range filter
    const now = new Date();
    const created = row.createdAtRaw instanceof Date ? row.createdAtRaw : new Date();
    if (dateRange === 'last7') {
      const past = new Date();
      past.setDate(now.getDate() - 7);
      if (created < past) return false;
    } else if (dateRange === 'last30') {
      const past = new Date();
      past.setDate(now.getDate() - 30);
      if (created < past) return false;
    }
    return true;
  });

  // Pagination calculations (Payments tab)
  const totalItems = totalCount || filteredPayments.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));
  const safeCurrentPage = Math.min(currentPage, totalPages);
  // Server-side pagination already applied; use filtered rows as-is
  const paginatedPayments = filteredPayments;
  // Pagination window (limit visible page buttons to 10)
  const windowSize = 10;
  const windowStart = Math.floor((safeCurrentPage - 1) / windowSize) * windowSize + 1;
  const windowEnd = Math.min(windowStart + windowSize - 1, totalPages);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [statusFilter, dateRange, paymentIdQuery]);

  // Handlers
  const handleStatusChange = (e) => setStatusFilter(e.target.value);
  const handleDateRangeChange = (e) => setDateRange(e.target.value);
  const handlePaymentIdInput = (e) => setPaymentIdQuery(e.target.value);
  const handleItemsPerPageChange = (e) => setItemsPerPage(Number(e.target.value));
  const goToPage = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  return (
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
      <div className="a form-input" id="kk">
        {activeTab === "settlements" ? (
          <div className="tmyflx">
            <div className="tran-one">
              <select className="form-select  my1-input" value={dateRange} onChange={handleDateRangeChange}>
                <option value="last7">Last 7 Days</option>
                <option value="last30">Last 30 Days</option>
                <option value="all">All Time</option>
              </select>
              <select className="form-select my1-input" value={statusFilter} onChange={handleStatusChange}>
                <option value="">Status All</option>
                <option value="Pending">Pending</option>
                <option value="Processed">Processed</option>
                <option value="Completed">Completed</option>
                <option value="Failed">Failed</option>
                <option value="Expired">Expired</option>
              </select>
              <select className="form-select my1-input">
                <option value="">Payment Method All</option>
              </select>
              
            </div>
            <div className="tran-two mtone">
              <select className="form-select my1-input">
                <option value="">Payment ID</option>
              </select>
              <div className="admin-reportone_search">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                  }}
                >
                  <center>
                    <div className="admin-fsearch-container">
                      <input
                        type="text"
                        className="admin-fsearch-input"
                        placeholder="Search..."
                        value={paymentIdQuery}
                        onChange={handlePaymentIdInput}
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
        {loading ? (
          <div className="text-center py-4">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-2">Loading transactions...</p>
          </div>
        ) : error ? (
          <div className="alert alert-danger" role="alert">
            <h4 className="alert-heading">Error!</h4>
            <p>{error}</p>
            <hr />
            <button className="btn btn-outline-danger" onClick={fetchTransactions}>
              Try Again
            </button>
          </div>
        ) : (
          <table className="table table-striped settlement-table">
            <thead>
              <tr>
                {getTableHeaders().map((header, index) => (
                  <th key={index}>{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {(activeTab === "settlements" ? paginatedPayments : getTableData()).length === 0 ? (
                <tr>
                  <td colSpan={getTableHeaders().length} className="text-center py-4">
                    No transactions found
                  </td>
                </tr>
              ) : (
                (activeTab === "settlements" ? paginatedPayments : getTableData()).map((row, index) => (
                  <tr key={index}>
                    {activeTab === "settlements" ? (
                      <>
                        <td>{row.paymentId}</td>
                        <td>{row.bankRRN}</td>
                        <td>{row.customerDetail}</td>
                        <td>{row.createdOn}</td>
                        <td>{row.amount}</td>
                        <td>
                          <span
                            className={`status-pill ${
                              row.status === "Processed" || row.status === "Completed"
                                ? "green"
                                : row.status === "Expired" || row.status === "Failed"
                                ? "red"
                                : row.status === "Pending"
                                ? "orange"
                                : "gray"
                            }`}
                           
                          >
                            {row.status}
                          </span>
                        </td>
                        <td>
                         <Link href="/transaction/details"> <button className="details-btn">Details</button></Link>
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
                          <span
                            className={`status-pill ${
                              row.status === "Processed"
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
                ))
              )}
            </tbody>
          </table>
        )}
      </div>
      {/* Pagination */}
        <div className="admin-under_filters">
          <div className="admin-under_head">
            <p className="admin-items1 mb-0">Items per page</p>
            <div className="mb-0">
              <select name="itemsPerPage" id="feald40" className="form-select" value={itemsPerPage} onChange={handleItemsPerPageChange}>
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
              </select>
            </div>
          </div>
          {activeTab === "settlements" && (
          <div className="under_pagination">
            <nav aria-label="Page navigation">
              <ul className="pagination mb-0">
                <li className={`page-item ${safeCurrentPage === 1 ? 'disabled' : ''}`}>
                  <button className="page-link" aria-label="Previous" onClick={() => goToPage(safeCurrentPage - 1)}>
                    <span aria-hidden="true">&laquo;</span>
                  </button>
                </li>
                {Array.from({ length: windowEnd - windowStart + 1 }).map((_, idx) => {
                  const pageNum = windowStart + idx;
                  return (
                    <li key={pageNum} className="page-item">
                      <button className={`page-link ${safeCurrentPage === pageNum ? 'active' : ''}`} onClick={() => goToPage(pageNum)}>
                        {pageNum}
                      </button>
                    </li>
                  );
                })}
                <li className={`page-item ${safeCurrentPage === totalPages ? 'disabled' : ''}`}>
                  <button className="page-link" aria-label="Next" onClick={() => goToPage(safeCurrentPage + 1)}>
                    <span aria-hidden="true">&raquo;</span>
                  </button>
                </li>
              </ul>
            </nav>
          </div>
          )}
        </div>
    </div>
  );
}
