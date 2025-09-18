
import Link from 'next/link';
import { useState } from 'react';
import { Dropdown, } from 'react';
import { useRef } from 'react';
// import CreditCard from './CreditCard/Component';
import TableSettlement from './TableSettlement/Component';
import CardSettlement from './CardSettlement/Component';
// import "../../styles/component.css";

const Component = () => {

  return (
    <>
      <div className='container admin-sider_comp'>
        
        
        <CardSettlement />
        <TableSettlement />
      </div>

    </>
  );
}

export default Component;
