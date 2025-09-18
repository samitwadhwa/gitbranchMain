import { useState, useEffect, useRef } from "react";
import MultiSelect from "../components/MultiSelect";
// import { RiUserLine, RiMoneyDollarCircleLine, RiGroupLine } from "react-icons/ri";
import dynamic from "next/dynamic";
import { RiCalendarLine, RiBarChart2Line } from "react-icons/ri";
import { useRouter } from 'next/navigation'; // use 'next/router' if you're in the pages directory
import { usePathname } from 'next/navigation';
import Link from "next/link";

import DatePickerComponent from "../utils/DatePicker.js";


const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const products = [
  {
    title: "Cross Border Payments",
    desc: "Grow your business with your own, branded multi-feature QR Code",
    img: "/img/file.png",
  },
  {
    title: "QR Code",
    desc: "Grow your business with your own, branded multi-feature QR Code",
    img: "/img/file.png",
  },
  {
    title: "Payment Links",
    desc: "Grow your business with your own, branded multi-feature QR Code",
    img: "/img/file.png",
  },
  {
    title: "Razorpay POS",
    desc: "Grow your business with your own, branded multi-feature QR Code",
    img: "/img/file.png",
  },
  {
    title: "Razorpay POS",
    desc: "Grow your business with your own, branded multi-feature QR Code",
    img: "/img/file.png",
  },
  {
    title: "Razorpay POS",
    desc: "Grow your business with your own, branded multi-feature QR Code",
    img: "/img/file.png",
  },
  {
    title: "Razorpay POS",
    desc: "Grow your business with your own, branded multi-feature QR Code",
    img: "/img/file.png",
  },
];

const Dashboard = () => {
  const [activeCard, setActiveCard] = useState("collected");
  const [startDate, setStartDate] = useState(null);

  // Chart Data for each card
  const chartData = {
    collected: [
      { name: "Collected Amount", data: [10, 20, 30, 25, 35, 40] },
      { name: "Orders", data: [8, 15, 25, 20, 28, 32] },
    ],
    refunds: [
      { name: "Refunds", data: [3, 5, 8, 4, 6, 5] },
      { name: "Orders", data: [2, 4, 6, 3, 5, 4] },
    ],
    orders: [
      { name: "Orders", data: [15, 18, 20, 17, 19, 22] },
      { name: "Revenue", data: [10, 12, 14, 11, 15, 18] },
    ],
  };

  const chartOptions = {
    chart: { toolbar: { show: false }, zoom: { enabled: false } },
    stroke: { curve: "smooth", width: 3 },
    colors: ["#4a00e0", "#00c2ff"],
    xaxis: {
      categories: ["SEP", "OCT", "NOV", "DEC", "JAN", "FEB"],
      labels: { style: { colors: "#9CA3AF" } },
    },
    yaxis: { labels: { style: { colors: "#9CA3AF" } } },
    tooltip: {
      y: {
        formatter: (val) => `₹${val}`,
      },
    },
    legend: { show: false },
  };
  const carouselRef = useRef(null);

  const scrollLeft = () => {
    carouselRef.current.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = () => {
    carouselRef.current.scrollBy({ left: 300, behavior: "smooth" });
  };

  const router = useRouter();
  const pathname = usePathname(); // needed to check active path

  const isActive = (path) => pathname === path;

  const handleCardClick = () => {
    router.push('/paymentCount');
  };


  return (
    <>
      <div id="Dashboard-container">

        <div className="overview-container">
          {/* Patterned Header */}
          <div className="overview-header">
            <h2 className="overview-greeting">Good afternoon, Reuben Route!</h2>
            <p className="overview-date">Thu, Jul 24</p>
          </div>

          {/* Cards Section */}
          <div className="overview-cards">
            <div className="card">
              <div className="card-icon">
                <i class="ri-team-fill"></i>
              </div>
              <div className="card-content">
                <h4>Current Balance</h4>
                <span className="card-amount">₹45</span>
              </div>
            </div>

            <div className="card" >
              <div className="card-icon">
                <i class="ri-money-dollar-circle-line"></i>
              </div>
              <div className="card-content">
                <h4>Last Settlement</h4>
                <span className="card-amount">₹200,000</span>
              </div>
            </div>

            <div className="card">
              <div className="card-icon">
                <i class="ri-user-3-fill"></i>
              </div>
              <div className="card-content">
                <h4>Total Payments</h4>
                <span className="card-amount">220</span>
              </div>
            </div>

            <div className="card">
              <div className="card-icon">
                <i class="ri-user-3-fill"></i>
              </div>
              <div className="card-content">
                <h4>No. of Transaction</h4>
                <span className="card-amount">322</span>
              </div>
            </div>
          </div>
        </div>
        <div className="m-mypay">
          <div className="payments-overview">
            <div className="payments-header">
              <h2>Payments Overview</h2>
              <div id="myselecteddate">
              <select className="custom-select" id="rangeSelect">
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
            </div>

            <div className="overview-content">
              <div className="stats-boxes">
                <div
                  className={`stat-item ${activeCard === "collected" ? "active" : ""
                    }`}
                  onClick={() => setActiveCard("collected")}
                >
                  <p>Collected Amount</p>
                  <h3>₹0.00</h3>
                </div>
                <div
                  className={`stat-item ${activeCard === "refunds" ? "active" : ""
                    }`}
                  onClick={() => setActiveCard("refunds")}
                >
                  <p>Refunds</p>
                  <h3>₹0.00</h3>
                </div>
                <div
                  className={`stat-item ${activeCard === "orders" ? "active" : ""}`}
                  onClick={() => setActiveCard("orders")}
                >
                  <p>Orders</p>
                  <h3>₹0.00</h3>
                </div>
              </div>

              <div className="chart-section">
                <div className="chart-header-icon">
                  <RiBarChart2Line />
                </div>
                <Chart
                  options={chartOptions}
                  series={chartData[activeCard]}
                  type="line"
                  height={250}
                />
              </div>
            </div>
          </div>

          <div id="top-insights" className="top-insights">
            {/* Header */}
            <div className="header">
              <h4>Top Insights</h4>
              <div id="myselecteddate">
              <select className="custom-select" id="rangeSelect">
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
            </div>

            {/* Cards */}
            <div className="cards-grid">
              {/* Card 1 */}
              <div className="card"
                onClick={handleCardClick}
                style={{ cursor: 'pointer' }}
              >
                <div className="card-text">
                  <h6>Payment count</h6>
                  <p className="subtitle">Last month</p>
                  <p className="value">50</p>
                  <span>View all</span>
                </div>
                <div className="card-icon">
                  <svg
                    width="60"
                    height="60"
                    viewBox="0 0 60 60"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {/* Axis */}
                    <line
                      x1="5"
                      y1="5"
                      x2="5"
                      y2="55"
                      stroke="#A7B1C2"
                      strokeWidth="3"
                    />
                    <line
                      x1="5"
                      y1="55"
                      x2="55"
                      y2="55"
                      stroke="#A7B1C2"
                      strokeWidth="3"
                    />

                    {/* Blue curve */}
                    <path
                      d="M10 50 C 20 25, 30 25, 40 50"
                      stroke="#4DC4FF"
                      strokeWidth="3"
                      fill="none"
                    />

                    {/* Purple curve */}
                    <path
                      d="M20 50 C 30 10, 40 10, 50 50"
                      stroke="#7B61FF"
                      strokeWidth="3"
                      fill="none"
                    />
                  </svg>
                </div>
              </div>

              {/* Card 2 */}
              <Link href="/paymentFail">
                <div className="card">
                  <div className="card-text">
                    <h6>Payment failure count</h6>
                    <p className="subtitle">Last month</p>
                    <p className="value">50</p>
                    <span className="view-link">View all</span>
                  </div>
                  <div className="card-icon">
                    <svg
                      width="60"
                      height="60"
                      viewBox="0 0 60 60"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      {/* Axes */}
                      <line x1="5" y1="5" x2="5" y2="55" stroke="#A5CFE3" strokeWidth="2" />
                      <line x1="5" y1="55" x2="55" y2="55" stroke="#A5CFE3" strokeWidth="2" />

                      {/* Tick marks on Y-axis */}
                      {Array.from({ length: 6 }).map((_, i) => (
                        <line
                          key={i}
                          x1="3"
                          y1={55 - i * 10}
                          x2="7"
                          y2={55 - i * 10}
                          stroke="#A5CFE3"
                          strokeWidth="2"
                        />
                      ))}

                      {/* Tick marks on X-axis */}
                      {Array.from({ length: 6 }).map((_, i) => (
                        <line
                          key={i}
                          x1={5 + i * 10}
                          y1="53"
                          x2={5 + i * 10}
                          y2="57"
                          stroke="#A5CFE3"
                          strokeWidth="2"
                        />
                      ))}

                      {/* Green smooth line */}
                      <path
                        d="M10,45 C15,35 25,55 30,30 C35,10 45,35 50,20"
                        fill="none"
                        stroke="#7DDF64"
                        strokeWidth="3"
                        strokeLinecap="round"
                      />

                      {/* Purple smooth line */}
                      <path
                        d="M10,50 C18,40 25,45 30,32 C35,20 42,40 50,25"
                        fill="none"
                        stroke="#B07CFF"
                        strokeWidth="3"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                </div>

              </Link>

              {/* Card 3 */}
              <Link href="/refundPayment">
                <div className="card">
                  <div className="card-text">
                    <h6>Refund count</h6>
                    <p className="subtitle">Last month</p>
                    <p className="value">50</p>
                    <span>View all</span>
                  </div>
                  <div className="card-icon">
                    <svg
                      width="60"
                      height="60"
                      viewBox="0 0 60 60"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      {/* Axes */}
                      <line
                        x1="5"
                        y1="5"
                        x2="5"
                        y2="55"
                        stroke="#A5CFE3"
                        strokeWidth="2"
                      />
                      <line
                        x1="5"
                        y1="55"
                        x2="55"
                        y2="55"
                        stroke="#A5CFE3"
                        strokeWidth="2"
                      />

                      {/* Tick marks on Y-axis */}
                      {Array.from({ length: 6 }).map((_, i) => (
                        <line
                          key={i}
                          x1="3"
                          y1={55 - i * 10}
                          x2="7"
                          y2={55 - i * 10}
                          stroke="#A5CFE3"
                          strokeWidth="2"
                        />
                      ))}

                      {/* Tick marks on X-axis */}
                      {Array.from({ length: 6 }).map((_, i) => (
                        <line
                          key={i}
                          x1={5 + i * 10}
                          y1="53"
                          x2={5 + i * 10}
                          y2="57"
                          stroke="#A5CFE3"
                          strokeWidth="2"
                        />
                      ))}

                      {/* Green line */}
                      <polyline
                        points="10,45 20,35 30,25 40,20 50,15"
                        fill="none"
                        stroke="#7DDF64"
                        strokeWidth="3"
                        strokeLinecap="round"
                      />

                      {/* Purple line */}
                      <polyline
                        points="10,45 20,40 30,30 40,25 50,23"
                        fill="none"
                        stroke="#B07CFF"
                        strokeWidth="3"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                </div>
              </Link>

              {/* Card 4 */}
              <Link href="/refundPayment">
                <div className="card">
                  <div className="card-text">
                    <h6>Refund failure count</h6>
                    <p className="subtitle">Last month</p>
                    <p className="value">50</p>
                    <span >View all</span>
                  </div>
                  <div className="card-icon">
                    <svg
                      width="60"
                      height="60"
                      viewBox="0 0 60 60"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      {/* Axes */}
                      <line
                        x1="8"
                        y1="5"
                        x2="8"
                        y2="55"
                        stroke="#A5CFE3"
                        strokeWidth="2"
                      />
                      <line
                        x1="8"
                        y1="30"
                        x2="55"
                        y2="30"
                        stroke="#A5CFE3"
                        strokeWidth="2"
                      />

                      {/* Tick marks on Y-axis */}
                      {Array.from({ length: 4 }).map((_, i) => (
                        <line
                          key={i}
                          x1="6"
                          y1={10 + i * 15}
                          x2="10"
                          y2={10 + i * 15}
                          stroke="#A5CFE3"
                          strokeWidth="2"
                        />
                      ))}

                      {/* Tick marks on X-axis */}
                      {Array.from({ length: 4 }).map((_, i) => (
                        <line
                          key={i}
                          x1={15 + i * 12}
                          y1="28"
                          x2={15 + i * 12}
                          y2="32"
                          stroke="#A5CFE3"
                          strokeWidth="2"
                        />
                      ))}

                      {/* Blue sine wave */}
                      <path
                        d="M10 30
       Q 15 10, 25 30
       T 40 30
       T 55 30"
                        fill="none"
                        stroke="#6EC1FF"
                        strokeWidth="3"
                        strokeLinecap="round"
                      />

                      {/* Purple sine wave */}
                      <path
                        d="M10 30
       Q 15 20, 25 30
       T 40 30
       T 55 25"
                        fill="none"
                        stroke="#8A5CFF"
                        strokeWidth="3"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                </div>
              </Link>

              {/* Card 5 */}
              <div className="card">
                <div className="card-text">
                  <h6>Payment method split</h6>
                  <p className="subtitle">Last month</p>
                  <p>
                    Card <span className="bold">₹37,000</span>
                  </p>
                  <p>
                    Upi <span className="bold">₹3,000</span>
                  </p>
                </div>
                <div className="card-icon">
                  <svg
                    width="60"
                    height="60"
                    viewBox="0 0 60 60"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {/* Axes */}
                    <line
                      x1="8"
                      y1="5"
                      x2="8"
                      y2="55"
                      stroke="#4A5A68"
                      strokeWidth="2"
                    />
                    <line
                      x1="8"
                      y1="55"
                      x2="55"
                      y2="55"
                      stroke="#4A5A68"
                      strokeWidth="2"
                      markerEnd="url(#arrow)"
                    />

                    {/* Arrow marker */}
                    <defs>
                      <marker
                        id="arrow"
                        markerWidth="6"
                        markerHeight="6"
                        refX="5"
                        refY="3"
                        orient="auto"
                        markerUnits="strokeWidth"
                      >
                        <path d="M0,0 L0,6 L6,3 z" fill="#4A5A68" />
                      </marker>
                    </defs>

                    {/* Tick marks on Y-axis */}
                    {Array.from({ length: 5 }).map((_, i) => (
                      <line
                        key={i}
                        x1="6"
                        y1={15 + i * 8}
                        x2="10"
                        y2={15 + i * 8}
                        stroke="#A5CFE3"
                        strokeWidth="2"
                      />
                    ))}

                    {/* Bars */}
                    <rect
                      x="12"
                      y="45"
                      width="5"
                      height="10"
                      fill="#A974FF"
                      rx="1"
                    />
                    <rect
                      x="20"
                      y="40"
                      width="5"
                      height="15"
                      fill="#FFD86E"
                      rx="1"
                    />
                    <rect
                      x="28"
                      y="35"
                      width="5"
                      height="20"
                      fill="#6ED6C0"
                      rx="1"
                    />
                    <rect
                      x="36"
                      y="30"
                      width="5"
                      height="25"
                      fill="#FF8B6E"
                      rx="1"
                    />
                    <rect
                      x="44"
                      y="20"
                      width="5"
                      height="35"
                      fill="#7CD6FF"
                      rx="1"
                    />


                    <polyline
                      points="12,50 20,45 28,40 36,30 44,20"
                      fill="none"
                      stroke="#6ED6C0"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />


                    <circle cx="16" cy="14" r="6" fill="#6ED6C0" />
                    <path d="M16,14 L16,8 A6,6 0 0,1 21.2,17 z" fill="#FF8B6E" />
                    <path d="M16,14 L21.2,17 A6,6 0 0,1 10,17 z" fill="#FFD86E" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="products-wrapper">
          <h2 className="products-heading">Products for you</h2>

          <div className="products-carousel-container">
            <button className="nav-btn nav-left" onClick={scrollLeft}>
              &#8249;
            </button>

            <div className="products-carousel" ref={carouselRef}>
              {products.map((product, index) => (
                <div key={index} className="product-card">
                  <img
                    src={product.img}
                    alt={product.title}
                    className="product-img"
                  />
                  <div className="product-body">
                    <h3 className="product-title">{product.title}</h3>
                    <p className="product-desc">{product.desc}</p>
                    <button className="know-more-btn">Know More</button>
                  </div>
                </div>
              ))}
            </div>

            <button className="nav-btn nav-right" onClick={scrollRight}>
              &#8250;
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
