import React, { useState } from 'react'
import Footer from '../component/footer';
import GetInTouch from '../component/get-in-touch';
import BlogsNews from '../component/blogs-news';
import ClientSreview from '../component/clientsreview';
import ComfortablePricing from '../component/comfortable-pricing';
import OurServices from '../component/our-services';
import About from '../component/about';
import cta from '../assets/images/cta.jpg';
import { Link } from "react-router-dom";
import NavbarSmallLight from '../component/navbar-small-light';
import ModalVideo from 'react-modal-video'
import "../../node_modules/react-modal-video/css/modal-video.css";

export default function Index() {
    const [isOpen, setOpen] = useState(false)

    return (
        <>
            <NavbarSmallLight />
            <ModalVideo channel='youtube' autoplay isOpen={isOpen} videoId="yba7hPeTSjk" onClose={() => setOpen(false)} />
            <section className="py-36 lg:py-56 w-full table relative bg-[url('../../assets/images/bg/bg.jpg')] bg-top bg-no-repeat" id="home">
                <div className="absolute inset-0 bg-gradient-to-t to-slate-950/50 via-slate-950/75 from-slate-950"></div>
                <div className="container">
                    <div className="grid grid-cols-1 pb-8 text-center mt-10">
                        <Link to="#" onClick={() => setOpen(true)} data-type="youtube" data-id="yba7hPeTSjk" className="lightbox lg:h-20 h-16 lg:w-20 w-16 rounded-full shadow-lg dark:shadow-gray-800 inline-flex items-center justify-center bg-white hover:bg-violet-600 text-violet-600 hover:text-white duration-500 ease-in-out mx-auto">
                            <i className="mdi mdi-play inline-flex items-center justify-center text-3xl"></i>
                        </Link>
                        <h3 className="font-medium leading-normal text-4xl mb-5 mt-10 text-white">We're Helping to Achieve your Success.</h3>
                        <p className="text-slate-400 text-lg max-w-xl mx-auto">This is just a simple text made for this unique and awesome template, you can replace it with any text.</p>
                        <div className="mt-8">
                            <Link to="#" className="py-2 px-5 inline-block font-normal tracking-wide border align-middle transition duration-500 ease-in-out text-base text-center bg-violet-600 hover:bg-violet-700 border-violet-600 hover:border-violet-700 text-white rounded-md"><i class="uil uil-envelope"></i> Contact Now</Link>
                        </div>
                    </div>
                </div>
            </section>
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
        </>
    )
}
