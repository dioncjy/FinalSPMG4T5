import React from 'react'
import Navbar from '../component/navbar'
import { Link } from 'react-router-dom';
import Footer from '../component/footer';
import RoleTable from '../component/roleTable';

function Roles() {
  return (
    <>
      <div className="">
        <RoleTable />
      </div>
    </>
    
  )
  
}

export default Roles