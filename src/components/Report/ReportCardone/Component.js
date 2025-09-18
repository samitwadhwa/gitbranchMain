"use client";
import React from "react";
import { useState } from "react";
import CreateReportModal from "../../CreateReportModal";
import DownloadReportModal from "../../DownloadReportModal";

export default function ReportsPage() {
  // Define all sections in one array
  const [open, setOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const sections = [
    {
      heading: "Settlements",
      icon: "ri-home-5-line",
      reports: [
        {
          title: "Settlements",
          description:
            "This report provides a list of the settlement(s) in selected time range. It does not include details of the transactions",
        },
        {
          title: "Settlements",
          description:
            "This report provides a list of the settlement(s) in selected time range. It does not include details of the transactions",
        },
        {
          title: "Settlements",
          description:
            "This report provides a list of the settlement(s) in selected time range. It does not include details of the transactions",
        },
      ],
    },
    {
      heading: "Payments",
      icon: "ri-bank-card-line",
      reports: [
        {
          title: "Payments",
          description:
            "This report contains payment details of all transactions in the selected time range.",
        },
        {
          title: "Payments",
          description:
            "This report contains payment details of all transactions in the selected time range.",
        },
        {
          title: "Payments",
          description:
            "This report contains payment details of all transactions in the selected time range.",
        },
        {
          title: "Payments",
          description:
            "This report contains payment details of all transactions in the selected time range.",
        },
        {
          title: "Payments",
          description:
            "This report contains payment details of all transactions in the selected time range.",
        },
      ],
    },
    // 👇 Add more sections easily
    {
      heading: "Refunds",
      icon: "ri-refund-2-line",
      reports: [
        {
          title: "Refund Summary",
          description:
            "This report shows refund details including reason codes and amounts refunded.",
        },
        {
          title: "Refund Summary",
          description:
            "This report shows refund details including reason codes and amounts refunded.",
        },
      ],
    },
  ];

  return (
    <div id="myreportcrd1" className="container">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <select className="form-select small-input">
          <option value="">Last 7 Days</option>
          <option value="">Last 30 Days</option>
          <option value="">Last 90 Days</option>
        </select>
        <button className="create-btn"
          style={{  cursor: "pointer" }}
          onClick={() => setOpen(true)}
        >
          + Create Custom Report
        </button>
        <CreateReportModal show={open} onClose={() => setOpen(false)} />
      </div>

      {sections.map((section, sectionIndex) => (
        <div key={sectionIndex}>
          {/* Section Heading */}
          <h2 className="section-heading">{section.heading}</h2>

          {/* Section Cards */}

          <div className="row">
            {section.reports.map((item, i) => (
              <div key={i} className="col-lg-4 col-md-6 d-flex">
                <div className="report-card h-100">
                  <div className="icon-box">
                    <i className={section.icon}></i>
                  </div>
                  <div className="inrdiv">
                    <h3>{item.title}</h3>
                    <p className="flex-grow-1">{item.description}</p>
                    <button
                      className="download-btn mt-auto"
                      onClick={() => setIsOpen(true)}
                      style={{ cursor: "pointer" }}
                    >
                      Download Report
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      <DownloadReportModal show={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
}
