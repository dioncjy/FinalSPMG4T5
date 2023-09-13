import laptop from '../assets/images/laptop.png';
import React, { useState } from 'react'
import NavbarSmallDark from '../component/navbar-small-dark'
import About from '../component/about';
import OurServices from '../component/our-services';
import cta from '../assets/images/cta.jpg';
import ComfortablePricing from '../component/comfortable-pricing';
import ClientSreview from '../component/clientsreview';
import BlogsNews from '../component/blogs-news';
import GetInTouch from '../component/get-in-touch';
import Footer from '../component/footer';
import { Link } from "react-router-dom";
import ModalVideo from 'react-modal-video'
import "../../node_modules/react-modal-video/css/modal-video.css";

export default function IndexThree() {
    const [isOpen, setOpen] = useState(false)

    return (
        <>
            <NavbarSmallDark />
            <section className="py-36 md:h-auto md:py-0 flex items-center relative bg-violet-600/10 dark:bg-violet-600/40" id="home">
                <div className="container relative z-2">
                    <div className="grid grid-cols-1 text-center mt-0 md:mt-12 pt-0 md:pt-12">
                        <div className="mt-28">
                            <div>
                                <h4 className="lg:text-[40px] text-4xl lg:leading-normal leading-normal font-medium mb-7 position-relative dark:text-white">Start Creating Beautiful Landing <br /> Pages Today!</h4>

                                <p className="text-slate-600 dark:text-white/70 opacity-50 mb-0 max-w-2xl text-lg mx-auto">Launch your campaign and benefit from our expertise on designing and managing conversion centered Tailwind CSS html page.</p>

                                <div className="relative mt-10">
                                    <Link to="" className="py-2 px-5 inline-block font-normal tracking-wide border align-middle transition duration-500 ease-in-out text-base text-center bg-violet-600 hover:bg-violet-700 border-violet-600 hover:border-violet-700 text-white rounded-md">Start Free Trail !</Link>
                                </div>
                            </div>

                            <img src={laptop} alt="" className="relative mt-16" />
                        </div>
                    </div>
                </div>
            </section>
            <div className="relative">
                <div className="shape overflow-hidden z-1 text-white dark:text-slate-900">
                    <svg viewBox="0 0 2880 250" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M720 125L2160 0H2880V250H0V125H720Z" fill="currentColor"></path>
                    </svg>
                </div>
            </div>
            <About />
            <OurServices />
            <section className="relative md:py-24 py-16 md:pt-0 pt-0 bg-gray-50 dark:bg-slate-800">
                <div className="container">
                    <div className="grid grid-cols-1 justify-center">
                        <div className="relative z-1">
                            <div className="grid lg:grid-cols-12 grid-cols-1 md:text-start text-center justify-center">
                                <div className="lg:col-start-2 lg:col-span-10">
                                    <div className="relative">
                                        <img src={cta} className="rounded-md shadow-lg" alt="" />
                                        <div className="absolute bottom-2/4 translate-y-2/4 end-0 start-0 text-center">
                                            <Link to="#" onClick={() => setOpen(true)} data-type="youtube" data-id="yba7hPeTSjk" className="lightbox lg:h-20 h-16 lg:w-20 w-16 rounded-full shadow-lg dark:shadow-gray-800 inline-flex items-center justify-center bg-white hover:bg-violet-600 text-violet-600 hover:text-white duration-500 ease-in-out mx-auto">
                                                <i className="mdi mdi-play inline-flex items-center justify-center text-3xl"></i>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="content md:mt-8">
                                <div className="grid lg:grid-cols-12 grid-cols-1 md:text-start text-center justify-center">
                                    <div className="lg:col-start-2 lg:col-span-10">
                                        <div className="grid md:grid-cols-2 grid-cols-1 items-center mt-8 gap-[30px]">
                                            <div>
                                                <div className="section-title text-md-start">
                                                    <h6 className="text-white/50">Customers needs</h6>
                                                    <h3 className="md:text-2xl text-xl font-medium text-white mt-2">Spaces for every size <br /> and type of need.</h3>
                                                </div>
                                            </div>

                                            <div className="section-title text-md-start">
                                                <p className="text-white/50 max-w-xl mx-auto mb-2">This is just a simple text made for this unique and awesome template, you can replace it with any text.</p>
                                                <Link to="" className="text-white">Read More <i className="uil uil-angle-end-b align-middle"></i></Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="absolute bottom-0 end-0 start-0 h-4/5 md:h-2/3 bg-violet-600"></div>
            </section>
            <ComfortablePricing />
            <ClientSreview />
            <BlogsNews />
            <GetInTouch />
            <Footer />
            <ModalVideo channel='youtube' autoplay isOpen={isOpen} videoId="yba7hPeTSjk" onClose={() => setOpen(false)} />

        </>
    )
}
