import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

import logo from "../assets/img/zaplogo.png";

const Sidebar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(null);

  const pathname = usePathname();

  const isActive = (route) => {
    // agar pathname shuru hota hai iss route se
    return pathname.startsWith(route);
  };

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      if (window.innerWidth > 990) {
        setSidebarOpen(true);
      } else {
        setSidebarOpen(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen((prevState) => !prevState);
  };

  const router = useRouter();

  const handleClick = (e) => {
    e.preventDefault();

    const tour = localStorage.getItem("qrcodeTour");

    if (tour === null || tour === "true") {
      // First time → go to tour
      localStorage.setItem("qrcodeTour", "false");
      router.push("/qrcodetour");
    } else {
      // Next times → go directly to QR code
      router.push("/qrcode");
    }
  };
  const handleClicke = (e) => {
    e.preventDefault();

    const tour = localStorage.getItem("paymentlinks");

    if (tour === null || tour === "true") {
      // First time → go to tour
      localStorage.setItem("paymentlinks", "false");
      router.push("/paymentlinks");
    } else {
      // Next times → go directly to QR code
      router.push("/paymentlinkstart");
    }
  };


  const handleClicki = (e) => {
   e.preventDefault();

    const tour = localStorage.getItem("subscriptionTour");

    if (tour === null || tour === "true") {
      // First time → go to tour
      localStorage.setItem("subscriptionTour", "false");
      router.push("/subscriptiontour");
    } else {
      // Next times → go directly to QR code
      router.push("/subscription");
    }
  };
  const handleClickn = (e) => {
   e.preventDefault();

    const tour = localStorage.getItem("routeTour");

    if (tour === null || tour === "true") {
      // First time → go to tour
      localStorage.setItem("routeTour", "false");
      router.push("/routetour");
    } else {
      // Next times → go directly to QR code
      router.push("/route");
    }
  };
  const handleClickp = (e) => {
   e.preventDefault();

    const tour = localStorage.getItem("invoicesTour");

    if (tour === null || tour === "true") {
      // First time → go to tour
      localStorage.setItem("invoicesTour", "false");
      router.push("/invoicestour");
    } else {
      // Next times → go directly to QR code
      router.push("/invoices");
    }
  };
  
  
  


  return (
    <>
      <div>
        <div className="logo-flx">
          <div className="logo-flx1">
            {/* <img src={"hi"} className="mylogo" /> */}
            <img src={logo.src} className="mylogo" />
            {/* <img src="img/zaplogo.png" className='mylogo' /> */}
          </div>
          <div id="hamburger" className="logoFlx2">
            <span
              className="hamburger"
              style={{ fontSize: "30px", cursor: "pointer" }}
              onClick={toggleSidebar}
            >
              <i className="ri-menu-3-line"></i>
            </span>
          </div>
        </div>

        <div
          id="mySidenav"
          className="sidenav"
          style={{
            width: sidebarOpen ? (windowWidth > 990 ? "16.7%" : "80%") : "0",
          }}
        >
          <a
            href="javascript:void(0)"
            className="closebtn"
            onClick={toggleSidebar}
          >
            &times;
          </a>
          <div className={"desk-flx"}>
            {/* <img src="img/zaplogo.png" className="mylogo" /> */}
            <img src={logo.src} className="mylogo" />
          </div>
          <div className="topMargin">
            <Link
              href="/dashboard"
              className={`pages ${isActive("/dashboard") ? "active" : ""}`}
            >
              <i className="ri-home-4-line"></i> Dashboard
            </Link>
            <Link
              href="/transaction"
              className={`pages ${isActive("/transaction") ? "active" : ""}`}
            >
              <i className="ri-arrow-left-right-fill"></i> Transaction
            </Link>
            <Link
              href="/settlement"
              className={`pages ${isActive("/settlement") ? "active" : ""}`}
            >
              <i className="ri-check-double-line"></i> Settlements
            </Link>
            <Link
              href="/report"
              className={`pages ${isActive("/report") ? "active" : ""}`}
            >
              <i className="ri-file-list-3-line"></i> Reports
            </Link>

            <div className="zapgate">Payment Products</div>
            <nav>
              <a
                // href="/paymentlinks"
                // className={`pages ${isActive("/paymentlinks") ? "active" : ""}`}
                 href="/paymentlinkstart" // just a placeholder, actual redirect is in handleClick
              onClick={handleClicke}
              className={`pages ${
                router.pathname.startsWith("/paymentlinkstart") ||
                router.pathname.startsWith("/paymentlinks")
                  ? "active"
                  : ""
              }`}
              >
                <i className="ri-link-m"></i>Payment Links
              </a>
            </nav>

            {/* <Link href="/paymentButton" className={`pages ${isActive("/paymentButton") ? "active" : ""}`}><i className="ri-file-list-3-line"></i>Payment Button</Link> */}

            <Link
              href="/qrcode" // just a placeholder, actual redirect is in handleClick
              onClick={handleClick}
              className={`pages ${
                router.pathname.startsWith("/qrcode") ||
                router.pathname.startsWith("/qrcodetour")
                  ? "active"
                  : ""
              }`}
            >
              <i className="ri-qr-code-line"></i> QR Codes
            </Link>
            <Link
              // href="/subscription"
              // className={`pages ${isActive("/subscription") ? "active" : ""}`}
               href="/subscription" // just a placeholder, actual redirect is in handleClick
              onClick={handleClicki}
              className={`pages ${
                router.pathname.startsWith("/subscription") ||
                router.pathname.startsWith("/subscriptiontour")
                  ? "active"
                  : ""
              }`}
            >
              <i className="ri-refresh-line"></i>Subscription
            </Link>
            <Link
              // href="/routetour"
              // className={`pages ${isActive("/routetour") ? "active" : ""}`}
               href="/route" // just a placeholder, actual redirect is in handleClick
              onClick={handleClickn}
              className={`pages ${
                router.pathname.startsWith("/route") ||
                router.pathname.startsWith("/routetour")
                  ? "active"
                  : ""
              }`}
            >
              <i className="ri-route-line"></i>Route
            </Link>
            <Link
              // href="/invoices"
              // className={`pages ${isActive("/invoices") ? "active" : ""}`}
               href="/invoices" // just a placeholder, actual redirect is in handleClick
              onClick={handleClickp}
              className={`pages ${
                router.pathname.startsWith("/invoices") ||
                router.pathname.startsWith("/invoicestour")
                  ? "active"
                  : ""
              }`}
            >
              <i className="ri-file-list-3-line"></i>Invoices
            </Link>

            <div className="zapgate">Banking Products</div>
            <a href="#" className="pages">
              <i className="ri-xrp-line"></i>X Payroll
            </a>
            <div className="zapgate">Customer Products</div>
            <a
              href="/customer"
              className={`pages ${isActive("/customer") ? "active" : ""}`}
            >
              <i className="ri-group-line"></i>Customer
            </a>

            <a href="/accountsetting" className="pages">
              <i className="ri-settings-3-line"></i>Account Setting
            </a>
          </div>
          <div className="myflx">
            <button className="btn btn1-side">Log out</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
