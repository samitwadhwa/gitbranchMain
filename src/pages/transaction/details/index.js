// src/pages/index.js
import React from 'react';
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/SideBar";
import Transactiondetail from '@/components/Transactiondetail';

const Dashboarrd = () => {
  const callNow = () => {
    window.location.href=`tel:${9632587410}`;
  };
  return (
    <div class="container-fluid side-padd">
    <div class="row main-parent">
        <div class="col_parent_class col-xl-2 col-lg-3 first_child_width">
            <Sidebar/>
        </div>
        <div class="col_parent_class col-xl-10 col-lg-9  second_child_width" >
            <Navbar/>
            <Transactiondetail/>

        </div>
    </div>
    <div>
      
    </div>
</div>
  );
}

export default Dashboarrd;
