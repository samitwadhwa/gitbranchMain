"use client";
import { useState, useRef, useEffect } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

export default function MyDatePicker() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [open, setOpen] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const formatDate = (date) =>
    date ? date.toLocaleDateString("en-GB") : "";

  return (
    <div id="mydatepick" ref={ref}>
      <div className="input-wrapper" onClick={() => setOpen(!open)}>
        <input
          type="text"
          readOnly
          value={formatDate(selectedDate)}
          placeholder="dd-mm-yyyy"
        />
        <i className="ri-calendar-2-line calendar-icon"></i>
      </div>

      <div className={`calendar-popup ${open ? "show" : ""}`}>
        <DayPicker
          mode="single"
          selected={selectedDate}
          onSelect={(date) => {
            setSelectedDate(date);
            setOpen(false); // ✅ auto-close on date select
          }}
          modifiersClassNames={{
            selected: "selected-day",
          }}
        />
      </div>
    </div>
  );
}
