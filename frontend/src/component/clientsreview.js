import image from '../assets/images/client/01.jpg';
import image1 from '../assets/images/client/05.jpg';
import image2 from '../assets/images/client/02.jpg';
import image3 from '../assets/images/client/04.jpg';
import image4 from '../assets/images/client/03.jpg';
import image5 from '../assets/images/client/06.jpg';
import React from 'react'
import { Link } from "react-router-dom";

export default function ClientSreview() {
    return (
        <>
            <section className="relative md:py-24 py-16 bg-gray-50 dark:bg-slate-800" id="testi">
                <div className="container">
                    <div className="grid grid-cols-1 pb-8 text-center">
                        <h3 className="mb-6 md:text-2xl text-xl font-medium">Client's Review</h3>

                        <p className="text-slate-400 max-w-xl mx-auto">This is just a simple text made for this unique and awesome
                            template, you can replace it with any text.</p>
                    </div>

                    <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 mt-8 gap-[30px]">
                        <ul className="space-y-8">
                            <li className="rounded-lg shadow-lg dark:shadow-gray-800 p-6 bg-white dark:bg-slate-900">
                                <div className="flex items-center pb-6 border-b border-gray-100 dark:border-gray-800">
                                    <img src={image}
                                        className="h-16 w-16 rounded-full shadow dark:shadow-gray-800" alt="" />

                                    <div className="ps-4">
                                        <Link to="" className="text-lg h5 hover:text-violet-600 duration-500 ease-in-out">Thomas
                                            Israel</Link>
                                        <p className="text-slate-400">C.E.O</p>
                                    </div>
                                </div>

                                <div className="mt-6">
                                    <p className="text-slate-400">I didn't know a thing about icon design until I read this book.
                                        Now I can create any icon I need in no time. Great resource!</p>
                                    <ul className="list-none mb-0 text-amber-400 mt-2">
                                        <li className="inline"><i className="mdi mdi-star"></i></li>
                                        <li className="inline ms-1"><i className="mdi mdi-star"></i></li>
                                        <li className="inline ms-1"><i className="mdi mdi-star"></i></li>
                                        <li className="inline ms-1"><i className="mdi mdi-star"></i></li>
                                        <li className="inline ms-1"><i className="mdi mdi-star"></i></li>
                                    </ul>
                                </div>
                            </li>

                            <li className="rounded-lg shadow-lg dark:shadow-gray-800 p-6 bg-white dark:bg-slate-900">
                                <div className="flex items-center pb-6 border-b border-gray-100 dark:border-gray-800">
                                    <img src={image1}
                                        className="h-16 w-16 rounded-full shadow dark:shadow-gray-800" alt="" />

                                    <div className="ps-4">
                                        <Link to="" className="text-lg h5 hover:text-violet-600 duration-500 ease-in-out">Barbara
                                            McIntosh</Link>
                                        <p className="text-slate-400">C.E.O</p>
                                    </div>
                                </div>

                                <div className="mt-6">
                                    <p className="text-slate-400">There are so many things I had to do with my old software that I
                                        just don't do at all with Techwind. Suspicious but I can't say I don't love it.</p>
                                    <ul className="list-none mb-0 text-amber-400 mt-2">
                                        <li className="inline"><i className="mdi mdi-star"></i></li>
                                        <li className="inline ms-1"><i className="mdi mdi-star"></i></li>
                                        <li className="inline ms-1"><i className="mdi mdi-star"></i></li>
                                        <li className="inline ms-1"><i className="mdi mdi-star"></i></li>
                                        <li className="inline ms-1"><i className="mdi mdi-star"></i></li>
                                    </ul>
                                </div>
                            </li>
                        </ul>

                        <ul className="space-y-8 hidden sm:block">
                            <li className="rounded-lg shadow-lg dark:shadow-gray-800 p-6 bg-white dark:bg-slate-900">
                                <div className="flex items-center pb-6 border-b border-gray-100 dark:border-gray-800">
                                    <img src={image2}
                                        className="h-16 w-16 rounded-full shadow dark:shadow-gray-800" alt="" />

                                    <div className="ps-4">
                                        <Link to="" className="text-lg h5 hover:text-violet-600 duration-500 ease-in-out">Carl
                                            Oliver</Link>
                                        <p className="text-slate-400">C.E.O</p>
                                    </div>
                                </div>

                                <div className="mt-6">
                                    <p className="text-slate-400">The best part about Techwind is every time I pay my employees, my
                                        bank balance doesn't go down like it used to. Looking forward to spending this extra
                                        cash when I figure out why my card is being declined.</p>
                                    <ul className="list-none mb-0 text-amber-400 mt-2">
                                        <li className="inline"><i className="mdi mdi-star"></i></li>
                                        <li className="inline ms-1"><i className="mdi mdi-star"></i></li>
                                        <li className="inline ms-1"><i className="mdi mdi-star"></i></li>
                                        <li className="inline ms-1"><i className="mdi mdi-star"></i></li>
                                        <li className="inline ms-1"><i className="mdi mdi-star"></i></li>
                                    </ul>
                                </div>
                            </li>

                            <li className="rounded-lg shadow-lg dark:shadow-gray-800 p-6 bg-white dark:bg-slate-900">
                                <div className="flex items-center pb-6 border-b border-gray-100 dark:border-gray-800">
                                    <img src={image3}
                                        className="h-16 w-16 rounded-full shadow dark:shadow-gray-800" alt="" />

                                    <div className="ps-4">
                                        <Link to="" className="text-lg h5 hover:text-violet-600 duration-500 ease-in-out">Jill
                                            Webb</Link>
                                        <p className="text-slate-400">C.E.O</p>
                                    </div>
                                </div>

                                <div className="mt-6">
                                    <p className="text-slate-400">I'm trying to get a hold of someone in support, I'm in a lot of
                                        trouble right now and they are saying it has something to do with my books. Please get
                                        back to me right away.</p>
                                    <ul className="list-none mb-0 text-amber-400 mt-2">
                                        <li className="inline"><i className="mdi mdi-star"></i></li>
                                        <li className="inline ms-1"><i className="mdi mdi-star"></i></li>
                                        <li className="inline ms-1"><i className="mdi mdi-star"></i></li>
                                        <li className="inline ms-1"><i className="mdi mdi-star"></i></li>
                                        <li className="inline ms-1"><i className="mdi mdi-star"></i></li>
                                    </ul>
                                </div>
                            </li>
                        </ul>

                        <ul className="space-y-8 hidden lg:block">
                            <li className="rounded-lg shadow-lg dark:shadow-gray-800 p-6 bg-white dark:bg-slate-900">
                                <div className="flex items-center pb-6 border-b border-gray-100 dark:border-gray-800">
                                    <img src={image4}
                                        className="h-16 w-16 rounded-full shadow dark:shadow-gray-800" alt="" />

                                    <div className="ps-4">
                                        <Link to="" className="text-lg h5 hover:text-violet-600 duration-500 ease-in-out">Barbara
                                            McIntosh</Link>
                                        <p className="text-slate-400">C.E.O</p>
                                    </div>
                                </div>

                                <div className="mt-6">
                                    <p className="text-slate-400">I used to have to remit tax to the EU and with Techwind I somehow
                                        don't have to do that anymore. Nervous to travel there now though.</p>
                                    <ul className="list-none mb-0 text-amber-400 mt-2">
                                        <li className="inline"><i className="mdi mdi-star"></i></li>
                                        <li className="inline ms-1"><i className="mdi mdi-star"></i></li>
                                        <li className="inline ms-1"><i className="mdi mdi-star"></i></li>
                                        <li className="inline ms-1"><i className="mdi mdi-star"></i></li>
                                        <li className="inline ms-1"><i className="mdi mdi-star"></i></li>
                                    </ul>
                                </div>
                            </li>

                            <li className="rounded-lg shadow-lg dark:shadow-gray-800 p-6 bg-white dark:bg-slate-900">
                                <div className="flex items-center pb-6 border-b border-gray-100 dark:border-gray-800">
                                    <img src={image5}
                                        className="h-16 w-16 rounded-full shadow dark:shadow-gray-800" alt="" />

                                    <div className="ps-4">
                                        <Link to="" className="text-lg h5 hover:text-violet-600 duration-500 ease-in-out">Janisha
                                            Doll</Link>
                                        <p className="text-slate-400">C.E.O</p>
                                    </div>
                                </div>

                                <div className="mt-6">
                                    <p className="text-slate-400">This is the fourth email I've sent to your support team. I am
                                        literally being held in jail for tax fraud. Please answer your damn emails, this is
                                        important.</p>
                                    <ul className="list-none mb-0 text-amber-400 mt-2">
                                        <li className="inline"><i className="mdi mdi-star"></i></li>
                                        <li className="inline ms-1"><i className="mdi mdi-star"></i></li>
                                        <li className="inline ms-1"><i className="mdi mdi-star"></i></li>
                                        <li className="inline ms-1"><i className="mdi mdi-star"></i></li>
                                        <li className="inline ms-1"><i className="mdi mdi-star"></i></li>
                                    </ul>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </section>
        </>
    )
}
