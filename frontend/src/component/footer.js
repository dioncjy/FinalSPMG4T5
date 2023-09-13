import logo_icon_64 from '../assets/images/logo-icon-64.png';
import React from 'react'
import { Link } from "react-router-dom";

export default function Footer() {

    return (
        <>
            <footer className="footer bg-slate-950 relative text-gray-200 dark:text-gray-200">
                <div className="container">
                    <div className="grid grid-cols-12">
                        <div className="col-span-12">
                            <div className="py-[60px] px-0">
                                <div className="grid grid-cols-1">
                                    <div className="text-center">
                                        <img src={logo_icon_64} className="block mx-auto" alt="" />
                                        <p className="max-w-xl mx-auto text-slate-400 mt-8">Launch your campaign and benefit from
                                            our expertise on designing and managing conversion centered Tailwind CSS html page.
                                        </p>
                                    </div>

                                    <ul className="list-none footer-list text-center mt-8">
                                        <li className="inline px-2"><Link to="/services"
                                            className="text-gray-300 hover:text-gray-400 duration-500 ease-in-out">Services</Link>
                                        </li>
                                        <li className="inline px-2 mt-[10px]"><Link to="/aboutus"
                                            className="text-gray-300 hover:text-gray-400 duration-500 ease-in-out ms-2">About
                                            Us</Link></li>
                                        <li className="inline px-2 mt-[10px]"><Link to="/blogs"
                                            className="text-gray-300 hover:text-gray-400 duration-500 ease-in-out ms-2">Blogs</Link>
                                        </li>
                                        <li className="inline px-2 mt-[10px]"><Link to="/team"
                                            className="text-gray-300 hover:text-gray-400 duration-500 ease-in-out ms-2">Team</Link>
                                        </li>
                                        <li className="inline px-2 mt-[10px]"><Link to="/pricing"
                                            className="text-gray-300 hover:text-gray-400 duration-500 ease-in-out ms-2">Pricing</Link>
                                        </li>
                                        <li className="inline px-2 mt-[10px]"><Link to="/contactus"
                                            className="text-gray-300 hover:text-gray-400 duration-500 ease-in-out ms-2">Contact
                                            Us</Link></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="py-[30px] px-0 border-t border-slate-800">
                    <div className="container text-center">
                        <div className="grid md:grid-cols-12 items-center">
                            <div className="md:col-span-6">
                                <div className="md:text-start text-center">
                                    <p className="text-gray-400">©
                                        {new Date().getFullYear()} Ovaxo. Design & Develop with <i
                                            className="mdi mdi-heart text-red-700"></i> by <Link to="https://shreethemes.in/"
                                                target="_blank" className="text-reset">Shreethemes</Link>.
                                    </p>
                                </div>
                            </div>

                            <div className="md:col-span-6 md:mt-0 mt-8">
                                <ul className="list-none md:text-end text-center">
                                    <li className="inline"><Link to="https://1.envato.market/ovaxo-react" target="_blank"
                                        className="h-8 w-8 inline-flex items-center text-center justify-center text-base font-normal tracking-wide align-middle transition duration-500 ease-in-out border border-gray-800 rounded-md hover:border-violet-600 dark:hover:border-violet-600 hover:bg-violet-600 dark:hover:bg-violet-600"><i
                                            className="uil uil-shopping-cart align-middle" title="Buy Now"></i></Link></li>
                                    <li className="inline ms-1"><Link to="https://dribbble.com/shreethemes" target="_blank"
                                        className="h-8 w-8 inline-flex items-center text-center justify-center text-base font-normal tracking-wide align-middle transition duration-500 ease-in-out border border-gray-800 rounded-md hover:border-violet-600 dark:hover:border-violet-600 hover:bg-violet-600 dark:hover:bg-violet-600"><i
                                            className="uil uil-dribbble align-middle" title="dribbble"></i></Link></li>
                                    <li className="inline ms-1"><Link to="https://www.behance.net/shreethemes" target="_blank"
                                        className="h-8 w-8 inline-flex items-center text-center justify-center text-base font-normal tracking-wide align-middle transition duration-500 ease-in-out border border-gray-800 rounded-md hover:border-violet-600 dark:hover:border-violet-600 hover:bg-violet-600 dark:hover:bg-violet-600"><i
                                            className="uil uil-behance" title="Behance"></i></Link></li>
                                    <li className="inline ms-1"><Link to="http://linkedin.com/company/shreethemes" target="_blank"
                                        className="h-8 w-8 inline-flex items-center text-center justify-center text-base font-normal tracking-wide align-middle transition duration-500 ease-in-out border border-gray-800 rounded-md hover:border-violet-600 dark:hover:border-violet-600 hover:bg-violet-600 dark:hover:bg-violet-600"><i
                                            className="uil uil-linkedin" title="Linkedin"></i></Link></li>
                                    <li className="inline ms-1"><Link to="https://www.facebook.com/shreethemes" target="_blank"
                                        className="h-8 w-8 inline-flex items-center text-center justify-center text-base font-normal tracking-wide align-middle transition duration-500 ease-in-out border border-gray-800 rounded-md hover:border-violet-600 dark:hover:border-violet-600 hover:bg-violet-600 dark:hover:bg-violet-600"><i
                                            className="uil uil-facebook-f align-middle" title="facebook"></i></Link></li>
                                    <li className="inline ms-1"><Link to="https://www.instagram.com/shreethemes/" target="_blank"
                                        className="h-8 w-8 inline-flex items-center text-center justify-center text-base font-normal tracking-wide align-middle transition duration-500 ease-in-out border border-gray-800 rounded-md hover:border-violet-600 dark:hover:border-violet-600 hover:bg-violet-600 dark:hover:bg-violet-600"><i
                                            className="uil uil-instagram align-middle" title="instagram"></i></Link></li>
                                    <li className="inline ms-1"><Link to="https://twitter.com/shreethemes" target="_blank"
                                        className="h-8 w-8 inline-flex items-center text-center justify-center text-base font-normal tracking-wide align-middle transition duration-500 ease-in-out border border-gray-800 rounded-md hover:border-violet-600 dark:hover:border-violet-600 hover:bg-violet-600 dark:hover:bg-violet-600"><i
                                            className="uil uil-twitter align-middle" title="twitter"></i></Link></li>
                                    <li className="inline ms-1"><Link to="mailto:support@shreethemes.in"
                                        className="h-8 w-8 inline-flex items-center text-center justify-center text-base font-normal tracking-wide align-middle transition duration-500 ease-in-out border border-gray-800 rounded-md hover:border-violet-600 dark:hover:border-violet-600 hover:bg-violet-600 dark:hover:bg-violet-600"><i
                                            className="uil uil-envelope align-middle" title="email"></i></Link></li>
                                    <li className="inline ms-1"><Link to="https://forms.gle/QkTueCikDGqJnbky9" target="_blank"
                                        className="h-8 w-8 inline-flex items-center text-center justify-center text-base font-normal tracking-wide align-middle transition duration-500 ease-in-out border border-gray-800 rounded-md hover:border-violet-600 dark:hover:border-violet-600 hover:bg-violet-600 dark:hover:bg-violet-600"><i
                                            className="uil uil-file align-middle" title="customization"></i></Link></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    )
}
