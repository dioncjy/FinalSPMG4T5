import React from 'react'
import { Link } from 'react-router-dom';
import Footer from '../component/footer';
import RoleTable from '../component/roleTable';
import RoleListings from '../component/role_listings_test';

function Roles() {
  return (
    <>
      <section className="py-26 lg:py-36 w-full relative table bg-top bg-no-repeat" id="home">
          <div className="absolute inset-0 bg-gradient-to-t to-slate-950/50 via-slate-950/75 from-slate-950"></div>
          <div className="container">
              <div className="grid grid-cols-1 pb-8 text-center mt-10">
                  <h3 className="font-medium leading-normal text-4xl mb-5 mt-10 text-white">Roles</h3>
                  {/* <p className="text-slate-400 text-lg max-w-xl mx-auto">Proceed to maintain role listings or view staff skills</p> */}
              </div>
          </div>
      </section>
      <RoleTable />
      
    </>
    
  )
  
}

export default Roles