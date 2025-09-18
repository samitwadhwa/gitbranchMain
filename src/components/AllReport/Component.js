
import Link from 'next/link';
import { useState } from 'react';
import { Dropdown, } from 'react';
import { useRef } from 'react';
// import CreditCard from './CreditCard/Component';
import ReportsTable from './ReportsTable/Component';
import CreditFilter from './CreditFilter/Component';

// import "../../styles/component.css";

const Component = () => {

  return (
    <>
      <div className='container admin-sider_comp'>
        <Link href="/dashboard">
          <div className='admin-myback_bot'>
            <button className='admin-back'>
              <i className="ri-arrow-left-s-line admin-lefticon"></i>  Go Back
            </button>
          </div>
        </Link>
        
        <CreditFilter />
        <ReportsTable />
      </div>

    </>
  );
}

export default Component;
