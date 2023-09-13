import image from '../assets/images/client/04.jpg';
import image2 from '../assets/images/client/06.jpg';
import image3 from '../assets/images/client/07.jpg';
import image1 from '../assets/images/client/05.jpg';
import image4 from '../assets/images/client/01.jpg';
import image5 from '../assets/images/client/02.jpg';
import image6 from '../assets/images/client/03.jpg';
import image7 from '../assets/images/client/08.jpg';
import React from 'react'
import Navbar from '../component/navbar'
import { Link } from 'react-router-dom';
import Footer from '../component/footer';
import { Facebook, Instagram, Linkedin } from 'react-feather';

export default function Team() {
    return (
        <>
            <Navbar />
            <section className="py-28 w-full table relative bg-[url('../../assets/images/bg/bg-5.jpg')] bg-bottom bg-no-repeat" id="home">
                <div className="absolute inset-0 bg-slate-950/80"></div>

                <div className="container">
                    <div className="grid grid-cols-1 pb-8 text-center mt-10">
                        <h3 className="font-medium leading-normal text-3xl mt-10 text-white">Our Mind Power</h3>
                    </div>
                </div>
            </section>

            <section className="relative md:py-24 py-16">
                <div className="container">
                    <div className="grid md:grid-cols-12 grid-cols-1 gap-[30px]">
                        <div className="lg:col-span-3 md:col-span-6">
                            <div className="group text-center">
                                <div className="relative inline-block mx-auto h-52 w-52 rounded-full overflow-hidden">
                                    <img src={image} className="" alt="" />

                                    <ul className="list-none absolute top-1/2 -translate-y-1/2 -end-20 group-hover:end-5 transition-all duration-500 ease-in-out">
                                        <li className=""><Link to="" className="h-8 w-8 inline-flex items-center text-center justify-center text-base font-normal tracking-wide border align-middle transition duration-500 ease-in-out rounded-full bg-violet-600 hover:bg-violet-700 border-violet-600 hover:border-violet-700 text-white"><Facebook className="h-4 w-4"></Facebook></Link></li>
                                        <li className="mt-1"><Link to="" className="h-8 w-8 inline-flex items-center text-center justify-center text-base font-normal tracking-wide border align-middle transition duration-500 ease-in-out rounded-full bg-violet-600 hover:bg-violet-700 border-violet-600 hover:border-violet-700 text-white"><Instagram className="h-4 w-4"></Instagram></Link></li>
                                        <li className="mt-1"><Link to="" className="h-8 w-8 inline-flex items-center text-center justify-center text-base font-normal tracking-wide border align-middle transition duration-500 ease-in-out rounded-full bg-violet-600 hover:bg-violet-700 border-violet-600 hover:border-violet-700 text-white"><Linkedin className="h-4 w-4"></Linkedin></Link></li>
                                    </ul>
                                </div>

                                <div className="content mt-3">
                                    <Link to="" className="text-lg hover:text-violet-600 transition-all duration-500 ease-in-out h5">Jack John</Link>
                                    <p className="text-slate-400">Designer</p>
                                </div>
                            </div>
                        </div>

                        <div className="lg:col-span-3 md:col-span-6">
                            <div className="group text-center">
                                <div className="relative inline-block mx-auto h-52 w-52 rounded-full overflow-hidden">
                                    <img src={image1} className="" alt="" />

                                    <ul className="list-none absolute top-1/2 -translate-y-1/2 -end-20 group-hover:end-5 transition-all duration-500 ease-in-out">
                                        <li className=""><Link to="" className="h-8 w-8 inline-flex items-center text-center justify-center text-base font-normal tracking-wide border align-middle transition duration-500 ease-in-out rounded-full bg-violet-600 hover:bg-violet-700 border-violet-600 hover:border-violet-700 text-white"><Facebook className="h-4 w-4"></Facebook></Link></li>
                                        <li className="mt-1"><Link to="" className="h-8 w-8 inline-flex items-center text-center justify-center text-base font-normal tracking-wide border align-middle transition duration-500 ease-in-out rounded-full bg-violet-600 hover:bg-violet-700 border-violet-600 hover:border-violet-700 text-white"><Instagram className="h-4 w-4"></Instagram></Link></li>
                                        <li className="mt-1"><Link to="" className="h-8 w-8 inline-flex items-center text-center justify-center text-base font-normal tracking-wide border align-middle transition duration-500 ease-in-out rounded-full bg-violet-600 hover:bg-violet-700 border-violet-600 hover:border-violet-700 text-white"><Linkedin className="h-4 w-4"></Linkedin></Link></li>
                                    </ul>
                                </div>

                                <div className="content mt-3">
                                    <Link to="" className="text-lg hover:text-violet-600 transition-all duration-500 ease-in-out h5">Krista John</Link>
                                    <p className="text-slate-400">Designer</p>
                                </div>
                            </div>
                        </div>

                        <div className="lg:col-span-3 md:col-span-6">
                            <div className="group text-center">
                                <div className="relative inline-block mx-auto h-52 w-52 rounded-full overflow-hidden">
                                    <img src={image2} className="" alt="" />

                                    <ul className="list-none absolute top-1/2 -translate-y-1/2 -end-20 group-hover:end-5 transition-all duration-500 ease-in-out">
                                        <li className=""><Link to="" className="h-8 w-8 inline-flex items-center text-center justify-center text-base font-normal tracking-wide border align-middle transition duration-500 ease-in-out rounded-full bg-violet-600 hover:bg-violet-700 border-violet-600 hover:border-violet-700 text-white"><Facebook className="h-4 w-4"></Facebook></Link></li>
                                        <li className="mt-1"><Link to="" className="h-8 w-8 inline-flex items-center text-center justify-center text-base font-normal tracking-wide border align-middle transition duration-500 ease-in-out rounded-full bg-violet-600 hover:bg-violet-700 border-violet-600 hover:border-violet-700 text-white"><Instagram className="h-4 w-4"></Instagram></Link></li>
                                        <li className="mt-1"><Link to="" className="h-8 w-8 inline-flex items-center text-center justify-center text-base font-normal tracking-wide border align-middle transition duration-500 ease-in-out rounded-full bg-violet-600 hover:bg-violet-700 border-violet-600 hover:border-violet-700 text-white"><Linkedin className="h-4 w-4"></Linkedin></Link></li>
                                    </ul>
                                </div>

                                <div className="content mt-3">
                                    <Link to="" className="text-lg hover:text-violet-600 transition-all duration-500 ease-in-out h5">Roger Jackson</Link>
                                    <p className="text-slate-400">Designer</p>
                                </div>
                            </div>
                        </div>

                        <div className="lg:col-span-3 md:col-span-6">
                            <div className="group text-center">
                                <div className="relative inline-block mx-auto h-52 w-52 rounded-full overflow-hidden">
                                    <img src={image3} className="" alt="" />

                                    <ul className="list-none absolute top-1/2 -translate-y-1/2 -end-20 group-hover:end-5 transition-all duration-500 ease-in-out">
                                        <li className=""><Link to="" className="h-8 w-8 inline-flex items-center text-center justify-center text-base font-normal tracking-wide border align-middle transition duration-500 ease-in-out rounded-full bg-violet-600 hover:bg-violet-700 border-violet-600 hover:border-violet-700 text-white"><Facebook className="h-4 w-4"></Facebook></Link></li>
                                        <li className="mt-1"><Link to="" className="h-8 w-8 inline-flex items-center text-center justify-center text-base font-normal tracking-wide border align-middle transition duration-500 ease-in-out rounded-full bg-violet-600 hover:bg-violet-700 border-violet-600 hover:border-violet-700 text-white"><Instagram className="h-4 w-4"></Instagram></Link></li>
                                        <li className="mt-1"><Link to="" className="h-8 w-8 inline-flex items-center text-center justify-center text-base font-normal tracking-wide border align-middle transition duration-500 ease-in-out rounded-full bg-violet-600 hover:bg-violet-700 border-violet-600 hover:border-violet-700 text-white"><Linkedin className="h-4 w-4"></Linkedin></Link></li>
                                    </ul>
                                </div>

                                <div className="content mt-3">
                                    <Link to="" className="text-lg hover:text-violet-600 transition-all duration-500 ease-in-out h5">Johnny English</Link>
                                    <p className="text-slate-400">Designer</p>
                                </div>
                            </div>
                        </div>

                        <div className="lg:col-span-3 md:col-span-6">
                            <div className="group text-center">
                                <div className="relative inline-block mx-auto h-52 w-52 rounded-full overflow-hidden">
                                    <img src={image4} className="" alt="" />

                                    <ul className="list-none absolute top-1/2 -translate-y-1/2 -end-20 group-hover:end-5 transition-all duration-500 ease-in-out">
                                        <li className=""><Link to="" className="h-8 w-8 inline-flex items-center text-center justify-center text-base font-normal tracking-wide border align-middle transition duration-500 ease-in-out rounded-full bg-violet-600 hover:bg-violet-700 border-violet-600 hover:border-violet-700 text-white"><Facebook className="h-4 w-4"></Facebook></Link></li>
                                        <li className="mt-1"><Link to="" className="h-8 w-8 inline-flex items-center text-center justify-center text-base font-normal tracking-wide border align-middle transition duration-500 ease-in-out rounded-full bg-violet-600 hover:bg-violet-700 border-violet-600 hover:border-violet-700 text-white"><Instagram className="h-4 w-4"></Instagram></Link></li>
                                        <li className="mt-1"><Link to="" className="h-8 w-8 inline-flex items-center text-center justify-center text-base font-normal tracking-wide border align-middle transition duration-500 ease-in-out rounded-full bg-violet-600 hover:bg-violet-700 border-violet-600 hover:border-violet-700 text-white"><Linkedin className="h-4 w-4"></Linkedin></Link></li>
                                    </ul>
                                </div>

                                <div className="content mt-3">
                                    <Link to="" className="text-lg hover:text-violet-600 transition-all duration-500 ease-in-out h5">Samuel Bales</Link>
                                    <p className="text-slate-400">Designer</p>
                                </div>
                            </div>
                        </div>

                        <div className="lg:col-span-3 md:col-span-6">
                            <div className="group text-center">
                                <div className="relative inline-block mx-auto h-52 w-52 rounded-full overflow-hidden">
                                    <img src={image5} className="" alt="" />

                                    <ul className="list-none absolute top-1/2 -translate-y-1/2 -end-20 group-hover:end-5 transition-all duration-500 ease-in-out">
                                        <li className=""><Link to="" className="h-8 w-8 inline-flex items-center text-center justify-center text-base font-normal tracking-wide border align-middle transition duration-500 ease-in-out rounded-full bg-violet-600 hover:bg-violet-700 border-violet-600 hover:border-violet-700 text-white"><Facebook className="h-4 w-4"></Facebook></Link></li>
                                        <li className="mt-1"><Link to="" className="h-8 w-8 inline-flex items-center text-center justify-center text-base font-normal tracking-wide border align-middle transition duration-500 ease-in-out rounded-full bg-violet-600 hover:bg-violet-700 border-violet-600 hover:border-violet-700 text-white"><Instagram className="h-4 w-4"></Instagram></Link></li>
                                        <li className="mt-1"><Link to="" className="h-8 w-8 inline-flex items-center text-center justify-center text-base font-normal tracking-wide border align-middle transition duration-500 ease-in-out rounded-full bg-violet-600 hover:bg-violet-700 border-violet-600 hover:border-violet-700 text-white"><Linkedin className="h-4 w-4"></Linkedin></Link></li>
                                    </ul>
                                </div>

                                <div className="content mt-3">
                                    <Link to="" className="text-lg hover:text-violet-600 transition-all duration-500 ease-in-out h5">Judith Grasser</Link>
                                    <p className="text-slate-400">Designer</p>
                                </div>
                            </div>
                        </div>

                        <div className="lg:col-span-3 md:col-span-6">
                            <div className="group text-center">
                                <div className="relative inline-block mx-auto h-52 w-52 rounded-full overflow-hidden">
                                    <img src={image6} className="" alt="" />

                                    <ul className="list-none absolute top-1/2 -translate-y-1/2 -end-20 group-hover:end-5 transition-all duration-500 ease-in-out">
                                        <li className=""><Link to="" className="h-8 w-8 inline-flex items-center text-center justify-center text-base font-normal tracking-wide border align-middle transition duration-500 ease-in-out rounded-full bg-violet-600 hover:bg-violet-700 border-violet-600 hover:border-violet-700 text-white"><Facebook className="h-4 w-4"></Facebook></Link></li>
                                        <li className="mt-1"><Link to="" className="h-8 w-8 inline-flex items-center text-center justify-center text-base font-normal tracking-wide border align-middle transition duration-500 ease-in-out rounded-full bg-violet-600 hover:bg-violet-700 border-violet-600 hover:border-violet-700 text-white"><Instagram className="h-4 w-4"></Instagram></Link></li>
                                        <li className="mt-1"><Link to="" className="h-8 w-8 inline-flex items-center text-center justify-center text-base font-normal tracking-wide border align-middle transition duration-500 ease-in-out rounded-full bg-violet-600 hover:bg-violet-700 border-violet-600 hover:border-violet-700 text-white"><Linkedin className="h-4 w-4"></Linkedin></Link></li>
                                    </ul>
                                </div>

                                <div className="content mt-3">
                                    <Link to="" className="text-lg hover:text-violet-600 transition-all duration-500 ease-in-out h5">Nina Baker</Link>
                                    <p className="text-slate-400">Designer</p>
                                </div>
                            </div>
                        </div>

                        <div className="lg:col-span-3 md:col-span-6">
                            <div className="group text-center">
                                <div className="relative inline-block mx-auto h-52 w-52 rounded-full overflow-hidden">
                                    <img src={image7} className="" alt="" />

                                    <ul className="list-none absolute top-1/2 -translate-y-1/2 -end-20 group-hover:end-5 transition-all duration-500 ease-in-out">
                                        <li className=""><Link to="" className="h-8 w-8 inline-flex items-center text-center justify-center text-base font-normal tracking-wide border align-middle transition duration-500 ease-in-out rounded-full bg-violet-600 hover:bg-violet-700 border-violet-600 hover:border-violet-700 text-white"><Facebook className="h-4 w-4"></Facebook></Link></li>
                                        <li className="mt-1"><Link to="" className="h-8 w-8 inline-flex items-center text-center justify-center text-base font-normal tracking-wide border align-middle transition duration-500 ease-in-out rounded-full bg-violet-600 hover:bg-violet-700 border-violet-600 hover:border-violet-700 text-white"><Instagram className="h-4 w-4"></Instagram></Link></li>
                                        <li className="mt-1"><Link to="" className="h-8 w-8 inline-flex items-center text-center justify-center text-base font-normal tracking-wide border align-middle transition duration-500 ease-in-out rounded-full bg-violet-600 hover:bg-violet-700 border-violet-600 hover:border-violet-700 text-white"><Linkedin className="h-4 w-4"></Linkedin></Link></li>
                                    </ul>
                                </div>

                                <div className="content mt-3">
                                    <Link to="" className="text-lg hover:text-violet-600 transition-all duration-500 ease-in-out h5">Avery Slade</Link>
                                    <p className="text-slate-400">Designer</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container lg:mt-24 mt-16">
                    <div className="grid grid-cols-1 text-center">
                        <h3 className="mb-6 md:text-2xl text-xl font-medium">Have Question ? Get in touch!</h3>

                        <p className="text-slate-400 max-w-xl mx-auto">This is just a simple text made for this unique and awesome template, you can replace it with any text.</p>

                        <div className="mt-6">
                            <Link to="/contactus" className="py-2 px-5 inline-block font-normal tracking-wide border align-middle transition duration-500 ease-in-out text-base text-center bg-violet-600 hover:bg-violet-700 border-violet-600 hover:border-violet-700 text-white rounded-md"><i className="uil uil-phone align-middle me-2"></i> Contact us</Link>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    )
}
