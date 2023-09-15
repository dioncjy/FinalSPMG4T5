import React, { useState } from 'react'
import Footer from '../component/footer';
import StaffServices from '../component/Staff-services';
import NavbarSmallLight from '../component/navbar-small-light';

export default function Index() {
    const [isOpen, setOpen] = useState(false)

    return (
        <>
            <NavbarSmallLight />
            <section className="py-36 lg:py-56 w-full relative table bg-[url('../../assets/images/bg/bg.jpg')] bg-top bg-no-repeat" id="home">
                <div className="absolute inset-0 bg-gradient-to-t to-slate-950/50 via-slate-950/75 from-slate-950"></div>
                <div className="container">
                    <div className="grid grid-cols-1 pb-8 text-center mt-10">
                        <h3 className="font-medium leading-normal text-4xl mb-5 mt-10 text-white">Welcome, John AppleSeed!</h3>
                        <p className="text-slate-400 text-lg max-w-xl mx-auto">Browse and Filter roles, view role-skills match or Appply for roles!</p>
                    </div>
                </div>
            </section>
            <StaffServices />
            <Footer />
        </>
    )
}