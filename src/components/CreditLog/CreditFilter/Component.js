
import Link from 'next/link';
import { useState } from 'react';
import { Dropdown, } from 'react';
import { useRef } from 'react';
// import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
// import "../../styles/component.css";

const Credit = () => {

  return (
    <>
      <div className='admin-reportone_flx mt-3'>
        <div className='admin-filterData'>
          <p class="admin-credit_head2">Credit Log</p>
        </div>
        <div className='admin-reportone_search'>
          <form action="#">
            <center><div className="admin-fsearch-container">
              <input type="text" className="admin-fsearch-input" placeholder="Search..." />
              <span className="admin-fsearch-icon">
                <button type="submit" className='admin-srch'><i className="ri-search-line admin-fsrch_icn"></i></button>
                {/* <i className="glyphicon glyphicon-search" height="24px" width="24px" viewBox="0 0 24 24" fill="#ccc"></i> */}
              </span>
            </div></center>
          </form>
        </div>
      </div>
    </>
  );
}

export default Credit;
