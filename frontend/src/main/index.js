import React, { useState } from 'react'
import Footer from '../component/footer';
import Features from '../component/features';
import Login from '../component/login'
import {Button} from "@material-tailwind/react";
import { useNavigate } from 'react-router-dom';

export default function Index() {
    const navigate = useNavigate();
    
    const handleStaffClick = () => {
        navigate("/index-staff")
    }

    const handleHRClick = () => {
        navigate("/index-hr")
    }

    return (
        <>
            <section className="py-36 lg:py-56 w-full relative table bg-[url('../../assets/images/bg/bg.jpg')] bg-top bg-no-repeat" id="home">
                <div className="absolute inset-0 bg-gradient-to-t to-slate-950/50 via-slate-950/75 from-slate-950"></div>
                <div className="container">
                    <div className="flex flex-col pb-8 text-center mt-10">
                        {/* <h3 className="font-medium leading-normal text-4xl mb-5 mt-10 text-white">Explore your next job here!</h3>
                        <p className="text-slate-400 text-lg max-w-xl mx-auto">Our job portal is your gateway to a world of career possibilities.</p> */}
                        <div className="text-white text-3xl">
                            <p className="">Welcome, you are logging in as: </p>
                        </div>
                        
                        <div className="py-8">
                            <Button onClick={handleStaffClick} size="md" className="bg-violet-600">Staff</Button>
                        </div>
                        
                        <div>
                            <Button onClick={handleHRClick} size="md" className="bg-violet-600">HR</Button>
                        </div>
                    </div>
                </div>
            </section>
            <Features />
            <Footer />
        </>
    )
}
