import React from 'react'
import about from '../assets/images/about.jpg';
import { Link } from "react-router-dom";

export default function About() {
    return (
        <>
            <section className="relative md:py-24 py-16" id="about">
                <div className="container mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-12 md:grid-cols-2 gap-10 items-center">
                        <div className="lg:col-span-5">
                            <div className="relative">
                                <img src={about} className="rounded-lg shadow-lg relative" alt="" />
                                <div className="absolute bottom-2/4 translate-y-2/4 end-0 start-0 text-center">
                                    {/* <Link to="#!" data-type="youtube" data-id="yba7hPeTSjk"
                                    className="lightbox h-20 w-20 rounded-full shadow-lg shadow-slate-100 dark:shadow-slate-800 inline-flex items-center justify-center bg-white dark:bg-slate-950 text-violet-600">
                                    <i className="mdi mdi-play inline-flex items-center justify-center text-2xl"></i>
                                </Link> */}
                                </div>
                            </div>
                        </div>
                        <div className="lg:col-span-7">
                            <div className="lg:ms-7">
                                <h3 className="mb-4 md:text-2xl text-xl font-medium">About Us: Ovaxo</h3>

                                <p className="text-slate-400 dark:text-slate-300 max-w-2xl mx-auto">Start working with Ovaxo that
                                    can provide everything you need to generate awareness, drive traffic, connect. Dummy text is
                                    text that is used in the publishing industry or by web designers to occupy the space which
                                    will later be filled with 'real' content. This is required when, for example, the final text
                                    is not yet available. Dummy texts have been in use by typesetters since the 16th century.
                                </p>

                                <div className="relative mt-8">
                                    <Link to="/aboutus"
                                        className="py-2 px-5 inline-block font-normal tracking-wide border align-middle transition duration-500 ease-in-out text-base text-center bg-violet-600 hover:bg-violet-700 border-violet-600 hover:border-violet-700 text-white rounded-md">Read
                                        More <i className="uil uil-arrow-right"></i></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
};