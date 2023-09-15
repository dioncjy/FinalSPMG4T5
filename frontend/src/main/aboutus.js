import React from 'react'
import OurServices from '../component/HR-services';
import MeetOurs from '../component/meet-ours';
import About from '../component/about';
import { Link } from 'react-router-dom';
import Navbar from '../component/navbar';
import Footer from '../component/footer';

export default function AboutUs() {
    return (
        <>
            <body className="font-inter text-base text-slate-950 dark:text-white dark:bg-slate-900">
                <Navbar />
                <section className="py-28 w-full table relative bg-[url('../../assets/images/bg/bg-5.jpg')] bg-bottom bg-no-repeat"
                    id="home">
                    <div className="absolute inset-0 bg-slate-950/80"></div>

                    <div className="container">
                        <div className="grid grid-cols-1 pb-8 text-center mt-10">
                            <h3 className="font-medium leading-normal text-3xl mt-10 text-white">Company Story</h3>
                        </div>
                    </div>
                </section>
                <section className="relative md:py-24 py-16" id="about">
                    <About />
                    <OurServices />
                    <MeetOurs />
                    <div className="container lg:mt-24 mt-16">
                        <div className="grid grid-cols-1 text-center">
                            <h3 className="mb-6 md:text-2xl text-xl font-medium">Have Question ? Get in touch!</h3>

                            <p className="text-slate-400 max-w-xl mx-auto">This is just a simple text made for this unique and awesome
                                template, you can replace it with any text.</p>

                            <div className="mt-6">
                                <Link to="/contactus"
                                    className="py-2 px-5 inline-block font-normal tracking-wide border align-middle transition duration-500 ease-in-out text-base text-center bg-violet-600 hover:bg-violet-700 border-violet-600 hover:border-violet-700 text-white rounded-md"><i
                                        className="uil uil-phone align-middle me-2"></i> Contact us</Link>
                            </div>
                        </div>
                    </div>
                </section>
                <Footer />
            </body>
        </>
    )
}

